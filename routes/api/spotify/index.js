import express from 'express';
import store from '../../../models/store.js';
import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'qs';

dotenv.config();
const router = express.Router();
const spotifyClientId = process.env.SPOTIFYCLIENTID;
const spotifyClientSecret = process.env.SPOTIFYCLIENTSECRET;
const spotifyAccessToken = process.env.SPOTIFYACCESSTOKEN;

const authenticateRoute = async (req, res, next) => {
    console.log("Requesting Access Token...");
    const auth_token = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`, 'utf-8').toString('base64');
    try {
        const url = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify({ 'grant_type': 'client_credentials' });
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        console.log(response.data.access_token);
        return response.data.access_token
    }
    catch (err) {
        console.log("Catch Error: ", err)
    }
}

//  Create Track //
router.post('/api/create/track', async (req, res) => {
    console.log("Create Track Route...")

    // Create Access Token //
    const accessToken = await authenticateRoute();
    console.log("Your new access token is: ", accessToken);
    // Then use to validate request
    res.sendStatus(200)
});


//  "Create Track" - Getting track from Spotify and saving in DB //

// ● Read access: There should be 2 endpoints to retrieve metadata
// ○ By “ISRC”: single result
// ○ By “artist”: multiple results
// ■ "like" search in the DB
// ■ Multiple results (list/array)

router.get('/api/get/track', async (req, res) => {
    console.log("GET Track Route...")

    // Create Access Token //
    const accessToken = await authenticateRoute();
    console.log("Your new access token is: ", accessToken);

    // https://api.spotify.com/v1/search?q=isrc:USEE10001992&type=track

    var isrc = req.query.isrc;
    console.log("req.query.", isrc);
    console.log("isrc: ", isrc);
    // let isrc = 'USVT10300001';

    const url = `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=track`;
    const config = { headers: { 'Authorization': `Bearer ${accessToken}` } };

    if (isrc.length === 0) {
        console.log("isrc is blank", isrc);
        console.log("No ISRC");
        return res.json({
            status: "error"
        });
    }
    else {
        axios.get(url, config).then(function (response) {
            var isrcSource = isrc;
            var data = response.data;
            // console.log("Track Data: ", data.tracks)
            // console.log("Tracks: ", data.tracks);
            // console.log("Albums: " + data.tracks.items);

            console.log("data.tracks.total.........." + data.tracks.total)

            if (data.tracks.total < 1) {
                // If no results return. Sorry. Unable to find any results.
                console.log("No Results");
                return res.json({
                    status: "error"
                });
            }
            else {
                console.log("Search Results (" + data.tracks.total + ")");

                let artist
                let isrcRecord
                let album_name
                let image_url
                let popularity

                for (var i = 0; i < data.tracks.items.length; i++) {
                    // console.log('........', data.tracks.items[i].album)
                    console.log('Album General ........', data.tracks.items[i])
                    // console.log('Album General ........', data.tracks.items[i].artists[0].name)

                    // This will save the first result, which I think is most popular //
                    // Else we would need to loop and create this JSON and then add logic to find most popular //
                    // json = [{
                    //     "Artist Name": data.tracks.items[i].artists[0].name,
                    //     "ISRC": isrcSource,
                    //     "Album Name": data.tracks.items[i].name,
                    //     "Image Url": data.tracks.items[i].album.images[0].url,
                    //     "Popularity": data.tracks.items[i].popularity
                    // }]
                    artist = data.tracks.items[i].artists[0].name,
                    isrcRecord = isrcSource,
                    album_name = data.tracks.items[i].album.name,
                    image_url = data.tracks.items[i].album.images[0].url,
                    popularity = data.tracks.items[i].popularity
                }

                // console.log("json obj: ", json)

                console.log("artist", artist)
                console.log("isrcRecord", isrcRecord)
                console.log("album_name", album_name)
                console.log("image_url", image_url)
                console.log("popularity", popularity)

                const tracks_table = "tracks_table";

                const cols = [
                    'artist',
                    'isrc',
                    'album_name',
                    'image_url',
                    'popularity'
                ]

                const vals = [
                    artist,
                    isrcRecord,
                    album_name,
                    image_url,
                    popularity,
                ]

                // Save item to database //
                store.create(tracks_table, cols, vals, function (data) {
                    console.log("=============================================");
                    console.log('New track being added to the database');
                    console.log(data);
                    console.log("=============================================");
                });

                // Return result and status if saved to DB //

                return res.json({
                    status: "success",
                    artist: artist,
                    isrc: isrcRecord,
                    album_name: album_name,
                    image_url: image_url,
                    popularity: popularity
                });
            }
        });
    }
});

// Search Database by ISRC //
router.get('/api/search/track/isrc', async (req, res) => {

    var isrc_query = req.query.isrc;
    console.log("isrc_query", isrc_query)

    const tracks_table = "tracks_table";
    const condition = `isrc="${isrc_query}"`;
    console.log("condition: ", condition)

    // 1. Add Webhooks - Uninstall and Updates //
    store.getRow(tracks_table, condition, function (data) {
        console.log("Search results for ISRC: ", data.length)
        // if not match
        if (data.length === 0) {
            return res.json({
                status: "warning",
                data: 0
            });
        }
        else {
            return res.json({
                data: data
            })
        }
    })
})

// Search Databse by Artist Name //
router.get('/api/search/track/artist', async (req, res) => {

    var artist_query = req.query.artist;
    console.log("artist_query", artist_query)

    const tracks_table = "tracks_table";
    const condition = `artist="${artist_query}"`;
    console.log("condition: ", condition)

    // 1. Add Webhooks - Uninstall and Updates //
    store.getRow(tracks_table, condition, function (data) {
        console.log("Search results for Artist: ", data.length)
        // if not match
        if (data.length === 0) {
            return res.json({
                status: "warning",
                data: 0
            });
        }
        else {
            return res.json({
                data: data
            })
        }
    })
})
















export default router
