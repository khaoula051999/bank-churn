# Churn Prediction API

Cette API utilise Flask pour fournir des prédictions de churn basées sur un modèle de machine learning pré-entraîné.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Python 3.10 ou supérieur
- `pip` pour gérer les paquets Python

## Installation du Backend

1. **Cloner le dépôt :**

   ```sh
   git clone https://github.com/khaoula051999/bank-churn.git
   cd bank-churn
   ```

2. **Créer un environnement virtuel :**

   ```sh
   python -m venv venv
   ```

3. **Activer l'environnement virtuel :**

   - Sous Windows :
     ```sh
     venv\Scripts\activate
     ```
   - Sous macOS et Linux :
     ```sh
     source venv/bin/activate
     ```

4. **Installer les dépendances :**
   ```sh
   pip install -r requirements.txt
   ```

## Utilisation

1. **Assurez-vous que les fichiers `best_model.pkl` et `scaler.pkl` sont présents dans le répertoire `model`.**

2. **Naviguer dans le répertoire `app` :**

   ```sh
   cd app
   ```

3. **Lancer l'application Flask :**

   ```sh
   python app.py
   ```

4. **Tester l'API avec Postman**:
   - **Méthode** : `POST`
   - **URL** : `http://127.0.0.1:5000/predict`
   - **Headers** : Ajouter `Content-Type: application/json`
   - **Body** : Sélectionnez "raw", puis "JSON" et ajoutez le JSON suivant :
   ```json
   {
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
   ```

## Lancement du Frontend

Pour lancer le frontend de l'application de prédiction de churn, suivez les étapes ci-dessous :

1. **Assurez-vous que le backend est en cours d'exécution :**

   - Commencez par vous assurer que le serveur backend fonctionne. Vous pouvez démarrer le backend en accédant au répertoire `app` et en exécutant :
     ```bash
     python app.py
     ```
   - Le backend devrait être en cours d'exécution sur `http://127.0.0.1:5000`.

2. **Accédez au répertoire du frontend :**

   - Ouvrez une nouvelle fenêtre de terminal et accédez au répertoire `template` où se trouvent vos fichiers HTML :
     ```bash
     cd template
     ```

3. **Démarrez un serveur HTTP local :**

   - Pour servir les fichiers HTML, utilisez le serveur HTTP intégré de Python. Exécutez la commande suivante :
     ```bash
     python -m http.server 8000
     ```
   - Cela démarrera un serveur local sur `http://127.0.0.1:8000`.

4. **Accédez à l'application :**

   - Ouvrez votre navigateur web et allez sur `http://127.0.0.1:8000/index.html` pour accéder à la page d'introduction.
   - Vous pouvez naviguer vers d'autres pages comme `simulator.html` ou `notifications.html` en utilisant le menu.

5. **Tester et utiliser l'application :**
   - Vous pouvez maintenant utiliser l'application en entrant les données requises dans le formulaire sur la page "Simulateur de Churn" et en cliquant sur "Predict Churn" pour obtenir la prédiction de churn.

**Note :** Assurez-vous que le backend est en cours d'exécution avant de commencer à tester le frontend pour que l'application fonctionne correctement.
