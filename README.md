# Churn Prediction API

Cette API utilise Flask pour fournir des prédictions de churn basées sur un modèle de machine learning pré-entraîné.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
- Python 3.6 ou supérieur
- `pip` pour gérer les paquets Python

## Installation

1. Créez un environnement virtuel :
    ```sh
    python -m venv venv
    ```

2. Activez l'environnement virtuel :
    - Sous Windows :
        ```sh
        venv\Scripts\activate
        ```
    - Sous macOS et Linux :
        ```sh
        source venv/bin/activate
        ```

3. Installez les dépendances :
    ```sh
    pip install -r requirements.txt
    ```

## Utilisation

1. Assurez-vous que les fichiers `best_model.pkl` et `scaler.pkl` sont présents dans le répertoire `model`.

2. Lancez l'application Flask :
    ```sh
    python app.py
    ```

3. L'API sera disponible à l'adresse `http://127.0.0.1:5000`.

## Endpoints

### POST /predict

- **Description** : Prédire le churn pour un client donné.
- **Request Body** : JSON contenant les caractéristiques du client.
- **Exemple de requête** :
    ```sh
    curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{"CreditScore": 600, "Age": 40, "Tenure": 3, "Balance": 60000, "NumOfProducts": 2, "HasCrCard": 1, "IsActiveMember": 1, "EstimatedSalary": 50000, "Satisfaction Score": 3, "Point Earned": 200, "Geography_France": 1, "Geography_Germany": 0, "Geography_Spain": 0, "Gender_Female": 1, "Gender_Male": 0, "Card Type_DIAMOND": 0, "Card Type_GOLD": 1, "Card Type_PLATINUM": 0, "Card Type_SILVER": 0}'
    ```
- **Exemple de réponse** :
    ```json
    {
        "prediction": 1
    }
    ```

## Exemple de Code

Voici un exemple pour envoyer une requête à l'API en Python :

```python
import requests

url = 'http://127.0.0.1:5000/predict'
data = {
    "CreditScore": 600,
    "Age": 40,
    "Tenure": 3,
    "Balance": 60000,
    "NumOfProducts": 2,
    "HasCrCard": 1,
    "IsActiveMember": 1,
    "EstimatedSalary": 50000,
    "Satisfaction Score": 3,
    "Point Earned": 200,
    "Geography_France": 1,
    "Geography_Germany": 0,
    "Geography_Spain": 0,
    "Gender_Female": 1,
    "Gender_Male": 0,
    "Card Type_DIAMOND": 0,
    "Card Type_GOLD": 1,
    "Card Type_PLATINUM": 0,
    "Card Type_SILVER": 0
}

response = requests.post(url, json=data)
print(response.json())
