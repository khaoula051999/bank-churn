document.getElementById('predict-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const data = {
        "CreditScore": parseInt(document.getElementById('CreditScore').value),
        "Age": parseInt(document.getElementById('Age').value),
        "Tenure": parseInt(document.getElementById('Tenure').value),
        "Balance": parseFloat(document.getElementById('Balance').value),
        "NumOfProducts": parseInt(document.getElementById('NumOfProducts').value),
        "HasCrCard": parseInt(document.getElementById('HasCrCard').value),
        "IsActiveMember": parseInt(document.getElementById('IsActiveMember').value),
        "EstimatedSalary": parseFloat(document.getElementById('EstimatedSalary').value),
        "SatisfactionScore": parseFloat(document.getElementById('SatisfactionScore').value),
        "PointEarned": parseInt(document.getElementById('PointEarned').value),
        "Geography_France": parseInt(document.getElementById('Geography_France').value),
        "Geography_Germany": parseInt(document.getElementById('Geography_Germany').value),
        "Geography_Spain": parseInt(document.getElementById('Geography_Spain').value),
        "Gender_Female": parseInt(document.getElementById('Gender_Female').value),
        "Gender_Male": parseInt(document.getElementById('Gender_Male').value),
        "Card_Type_DIAMOND": parseInt(document.getElementById('Card_Type_DIAMOND').value),
        "Card_Type_GOLD": parseInt(document.getElementById('Card_Type_GOLD').value),
        "Card_Type_PLATINUM": parseInt(document.getElementById('Card_Type_PLATINUM').value),
        "Card_Type_SILVER": parseInt(document.getElementById('Card_Type_SILVER').value)
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('result').innerText = `Prediction: ${result.prediction}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An error occurred. Please try again.';
    }
});
