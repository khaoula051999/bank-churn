document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.getElementById("upload-btn");
  const fileInput = document.getElementById("file-input");
  const notificationResults = document.getElementById("notificationResults"); // Élément pour afficher les résultats

  if (uploadButton && fileInput) {
    uploadButton.addEventListener("click", function (event) {
      event.preventDefault();
      const file = fileInput.files[0];

      if (file) {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            processCSVData(results.data);
          },
          error: function (error) {
            console.error("Erreur lors du parsing du fichier CSV:", error);
          },
        });
      } else {
        alert("Veuillez sélectionner un fichier CSV.");
      }
    });
  } else {
    console.error(
      "Le bouton d'upload ou l'input fichier est introuvable dans le DOM."
    );
  }
});

function processCSVData(data) {
  fetch("recommendations.json")
    .then((response) => response.json())
    .then((recommendations) => {
      console.log("Recommandations chargées:", recommendations);

      data.forEach((row) => {
        const geoKey = row["Geography"] ? row["Geography"].toLowerCase() : null;
        const genderKey = row["Gender"] ? row["Gender"].toLowerCase() : null;
        const cardTypeKey = row["Card Type"]
          ? row["Card Type"].toLowerCase()
          : null;

        if (geoKey && genderKey && cardTypeKey) {
          const inputData = {
            CreditScore: row["CreditScore"],
            Age: row["Age"],
            Tenure: row["Tenure"],
            Balance: row["Balance"],
            NumOfProducts: row["NumOfProducts"],
            HasCrCard: row["HasCrCard"],
            IsActiveMember: row["IsActiveMember"],
            EstimatedSalary: row["EstimatedSalary"],
            "Satisfaction Score": row["Satisfaction Score"],
            "Point Earned": row["Point Earned"],
            Geography_France: geoKey === "france" ? 1 : 0,
            Geography_Germany: geoKey === "germany" ? 1 : 0,
            Geography_Spain: geoKey === "spain" ? 1 : 0,
            Gender_Female: genderKey === "female" ? 1 : 0,
            Gender_Male: genderKey === "male" ? 1 : 0,
            "Card Type_DIAMOND": cardTypeKey === "diamond" ? 1 : 0,
            "Card Type_GOLD": cardTypeKey === "gold" ? 1 : 0,
            "Card Type_PLATINUM": cardTypeKey === "platinum" ? 1 : 0,
            "Card Type_SILVER": cardTypeKey === "silver" ? 1 : 0,
          };

          fetchPrediction(
            inputData,
            row["Surname"],
            row["CustomerId"],
            row["Geography"],
            recommendations
          );
        } else {
          console.error("Données catégorielles invalides dans la ligne:", {
            Geography: row["Geography"],
            Gender: row["Gender"],
            "Card Type": row["Card Type"],
          });
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des recommandations:", error);
    });
}

function fetchPrediction(
  data,
  surname,
  customerId,
  geography,
  recommendations
) {
  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.prediction === 1) {
        console.log("Résultat de la prédiction:", result);

        const topAttributes = getTopThreeAttributes(result.explanation, data);

        const titleResultElement = document.createElement("h3");
        titleResultElement.textContent = `Risque du churn du client (Nom:${surname} , Pays: ${geography})`;

        const resultElement = document.createElement("p");
        resultElement.textContent = `Résultat de la prédiction : Churn à risque`;

        const attributesElement = document.createElement("p");
        attributesElement.textContent = `Top 3 attributs contribuant au churn : ${topAttributes.join(
          ", "
        )}`;

        const recommendationsElement = document.createElement("p");
        recommendationsElement.textContent = `Conseils : ${getRecommendationsForAttributes(
          topAttributes,
          recommendations
        ).join(", ")}`;

        notificationResults.appendChild(titleResultElement);
        notificationResults.appendChild(resultElement);
        notificationResults.appendChild(attributesElement);
        notificationResults.appendChild(recommendationsElement);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la prédiction:", error);
      const errorElement = document.createElement("p");
      errorElement.textContent = `Erreur : ${error.message}`;
      notificationResults.appendChild(errorElement);
    });
}

function getTopThreeAttributes(explanation, data) {
  const attributeNames = Object.keys(data);
  const attributesWithContribution = explanation.map((value, index) => ({
    name: attributeNames[index],
    contribution: Math.abs(value[0]),
  }));

  attributesWithContribution.sort((a, b) => b.contribution - a.contribution);
  const topAttributes = attributesWithContribution
    .slice(0, 3)
    .map((attr) => attr.name);
  console.log("Top 3 attributs:", topAttributes);
  return topAttributes;
}

function getRecommendationsForAttributes(attributes, recommendations) {
  return attributes.map((attr) => {
    const recommendation = recommendations[attr];
    return recommendation || "Aucune recommandation trouvée";
  });
}
