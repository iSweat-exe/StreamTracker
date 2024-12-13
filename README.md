
# StreamerTracker

StreamerTracker est une application web permettant de suivre en temps réel les informations de stream Twitch pour un utilisateur spécifique. Ce projet récupère les informations du stream, telles que le titre, le nombre de spectateurs, le jeu en cours, et l'image de la miniature du stream. Il permet également de se connecter aux réseaux sociaux du streamer via des icônes.

## Fonctionnalités

- Affichage du titre du stream, du nombre de spectateurs et du jeu en cours.
- Image de profil et miniature du stream.
- Calcul de la durée du stream.
- Liens vers les réseaux sociaux du streamer.
- Affichage dynamique des informations du stream.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Un éditeur de code comme [Visual Studio Code](https://code.visualstudio.com/).
- Un serveur local pour exécuter l'application (par exemple, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).
- Un navigateur moderne comme [Google Chrome](https://www.google.com/chrome/) ou [Mozilla Firefox](https://www.mozilla.org/fr/firefox/new/).

## Installation

1. Clonez ce dépôt sur votre machine locale ou téléchargez le code source.
   ```bash
   git clone https://github.com/votre-utilisateur/StreamerTracker.git
   ```

2. Ouvrez le dossier du projet dans votre éditeur de code.

3. Assurez-vous d'avoir le fichier `style.css` pour le style de la page et le fichier `test.js` pour la logique du JavaScript.

4. **Remarque importante** : Vous devrez obtenir vos propres clés `CLIENT_ID` et `CLIENT_SECRET` pour utiliser l'API Twitch.

## Configuration de l'API Twitch

1. Allez sur le [site de développeur Twitch](https://dev.twitch.tv/console/apps) et créez une nouvelle application.
2. Récupérez votre `CLIENT_ID` et `CLIENT_SECRET` et remplacez-les dans le fichier `test.js` :
   ```javascript
   const CLIENT_ID = 'votre_client_id';
   const CLIENT_SECRET = 'votre_client_secret';
   ```
3. Vous devrez peut-être également ajouter un `ACCESS_TOKEN` et un `REFRESH_TOKEN` pour l'authentification, ce qui vous permettra d'accéder aux informations du stream via l'API.

## Utilisation

1. Ouvrez le fichier `index.html` dans votre navigateur.
2. Modifiez la fonction `fetchLiveInfo` dans `test.js` pour inclure le nom du streamer que vous souhaitez suivre, par exemple :
   ```javascript
   fetchLiveInfo("Squeezie");
   ```
3. L'interface se mettra à jour automatiquement avec les informations du streamer en direct.

## Structure du projet

- `index.html` : Le fichier HTML principal qui contient la structure de la page.
- `style.css` : Le fichier CSS pour styliser l'application.
- `test.js` : Le fichier JavaScript qui contient la logique du projet, y compris l'appel à l'API Twitch.

## Aide et contributions

Les contributions au projet sont les bienvenues ! Si vous avez des idées d'amélioration ou des corrections à proposer, ouvrez une _pull request_.

- Forkez ce projet.
- Créez une branche pour votre fonctionnalité (`git checkout -b ma-nouvelle-fonctionnalite`).
- Faites vos modifications et validez (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`).
- Poussez à votre branche (`git push origin ma-nouvelle-fonctionnalite`).
- Ouvrez une _pull request_.

## Licences

Distribué sous la licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Auteurs

- [Nyosix_](https://github.com/HSKNinja) (Chef de projet, Responsable du design.)
- [iSweat](https://github.com/iSweat-exe) (Développeur front-end et responsable de l'intégration de l'API Twitch.)