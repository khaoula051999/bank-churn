document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const notificationResults = document.getElementById('notificationResults'); // Element to display results

    if (uploadButton && fileInput) {
        uploadButton.addEventListener('click', function(event) {
            event.preventDefault();
            const file = fileInput.files[0];

            if (file) {
                Papa.parse(file, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        processCSVData(results.data);
                    },
                    error: function(error) {
                        console.error("Error parsing CSV:", error);
                    }
                });
            } else {
                alert("Please select a CSV file to upload.");
            }
        });
    } else {
        console.error("Upload button or file input element not found in the DOM.");
    }
});

function processCSVData(data) {
    if (!Array.isArray(data) || data.length === 0) {
        console.error("CSV data is empty or not an array.");
        return;
    }

    const geography = {
        "france": [1, 0, 0],
        "germany": [0, 1, 0],
        "spain": [0, 0, 1]
    };
    const gender = {
        "female": [1, 0],
        "male": [0, 1]
    };
    const cardType = {
        "diamond": [1, 0, 0, 0],
        "gold": [0, 1, 0, 0],
        "platinum": [0, 0, 1, 0],
        "silver": [0, 0, 0, 1]
    };

    data.forEach(row => {
        if (!row || Object.values(row).every(value => value === null || value === '')) {
            console.warn("Empty or null row detected, skipping...");
            return;
        }

        const geoKey = row["Geography"] ? row["Geography"].toLowerCase() : null;
        const genderKey = row["Gender"] ? row["Gender"].toLowerCase() : null;
        const cardTypeKey = row["Card Type"] ? row["Card Type"].toLowerCase() : null;

        if (geoKey in geography && genderKey in gender && cardTypeKey in cardType) {
            const surname=row["Surname"]
            const inputData = {
                "CreditScore": row["CreditScore"],
                "Age": row["Age"],
                "Tenure": row["Tenure"],
                "Balance": row["Balance"],
                "NumOfProducts": row["NumOfProducts"],
                "HasCrCard": row["HasCrCard"],
                "IsActiveMember": row["IsActiveMember"],
                "EstimatedSalary": row["EstimatedSalary"],
                "Satisfaction Score": row["Satisfaction Score"],
                "Point Earned": row["Point Earned"],
                "Geography_France": geography[geoKey][0],
                "Geography_Germany": geography[geoKey][1],
                "Geography_Spain": geography[geoKey][2],
                "Gender_Female": gender[genderKey][0],
                "Gender_Male": gender[genderKey][1],
                "Card Type_DIAMOND": cardType[cardTypeKey][0],
                "Card Type_GOLD": cardType[cardTypeKey][1],
                "Card Type_PLATINUM": cardType[cardTypeKey][2],
                "Card Type_SILVER": cardType[cardTypeKey][3]
            };

            fetchPrediction(inputData,surname);
        } else {
            console.error("Invalid categorical data in row:", {
                Geography: row["Geography"],
                Gender: row["Gender"],
                "Card Type": row["Card Type"]
            });
        }
    });
}

function fetchPrediction(data,surname) {
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        if(result.prediction===1){
            console.log('Prediction result:', result);

            // Display the result in the HTML
            const titleResultElement = document.createElement('h3');
            titleResultElement.textContent=`Risque du churn du client : ${surname}`
            const resultElement = document.createElement('p');
            resultElement.textContent = `Prediction result: ${result.prediction}`;
            notificationResults.appendChild(titleResultElement);
            notificationResults.appendChild(resultElement);
        }
        
    })
    .catch(error => {
        console.error('Error fetching prediction:', error);

        // Display the error in the HTML
        const errorElement = document.createElement('p');
        errorElement.textContent = `Error: ${error.message}`;
        notificationResults.appendChild(errorElement);
    });
}
