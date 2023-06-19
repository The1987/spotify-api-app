# Project

Simple node.js app connecting to Spotify API, reading from API, local DB and writing to DB from Spotify. Not currently integrated with Shopify.

## Setup

**Setting Up Local Database**

- Use the file within the database directory to help create local ```spotify_db``` within MySQL.


**Setting Up Code (Locally)**
- Clone repo locally using the following command:
```bash 
git clone https://github.com/The1987/spotify-api-app.git
```
- Open the repo and run ```npm init```
- Run the command ```npm install```
- In the root directory add in ```.env``` file (example below).

```python
## Local ##
PORT="3000"
DBHOST="localhost"
USERID="your-db-user-id"
DBSECRET="your-db-password"
DATABASE="spotify_db"
DBPORT="3306"

## Spotify Api Creds ##
SPOTIFYCLIENTID="ypur-spotify-client-id"
SPOTIFYCLIENTSECRET="your-spotify-client-secret"
```

Note: To find Spotify Creds login to your [Spotify Developer Account](https://developer.spotify.com/)

- To run the app run the command: ```npm run start```

## License

[MIT](https://choosealicense.com/licenses/mit/)
