document.getElementById('predict-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const geography = {
        "France": [1, 0, 0],
        "Germany": [0, 1, 0],
        "Spain": [0, 0, 1]
    };
    const gender = {
        "Female": [1, 0],
        "Male": [0, 1]
    };
    const cardType = {
        "DIAMOND": [1, 0, 0, 0],
        "GOLD": [0, 1, 0, 0],
        "PLATINUM": [0, 0, 1, 0],
        "SILVER": [0, 0, 0, 1]
    };

    const data = {
        "CreditScore": parseInt(document.getElementById("CreditScore").value),
        "Age": parseInt(document.getElementById("Age").value),
        "Tenure": parseInt(document.getElementById("Tenure").value),
        "Balance": parseFloat(document.getElementById("Balance").value),
        "NumOfProducts": parseInt(document.getElementById("NumOfProducts").value),
        "HasCrCard": parseInt(document.getElementById("HasCrCard").value),
        "IsActiveMember": parseInt(document.getElementById("IsActiveMember").value),
        "EstimatedSalary": parseFloat(document.getElementById("EstimatedSalary").value),
        "Satisfaction Score": parseFloat(document.getElementById("SatisfactionScore").value),
        "Point Earned": parseInt(document.getElementById("PointEarned").value),
        "Geography_France": geography[document.getElementById("Geography").value][0],
        "Geography_Germany": geography[document.getElementById("Geography").value][1],
        "Geography_Spain": geography[document.getElementById("Geography").value][2],
        "Gender_Female": gender[document.getElementById("Gender").value][0],
        "Gender_Male": gender[document.getElementById("Gender").value][1],
        "Card Type_DIAMOND": cardType[document.getElementById("CardType").value][0],
        "Card Type_GOLD": cardType[document.getElementById("CardType").value][1],
        "Card Type_PLATINUM": cardType[document.getElementById("CardType").value][2],
        "Card Type_SILVER": cardType[document.getElementById("CardType").value][3]
    };

    console.log('Data to send:', data);

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log('Server response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('result').innerText = `Result of Prediction of Churn: ${result.prediction}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred. Please try again.';
    }
});
