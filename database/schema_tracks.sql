-- MYSQL: Boiler Plate Tracks Table --

-- 1. Create database --
CREATE DATABASE spotify_db;
USE spotify_db;

-- 2. Create table for tracks_table --
USE spotify_db;
DROP TABLE IF EXISTS tracks_table;
CREATE TABLE tracks_table(
id int AUTO_INCREMENT,
artist VARCHAR(200),
isrc VARCHAR(50),
album_name VARCHAR(200),
image_url VARCHAR(200),
popularity VARCHAR(50),
PRIMARY KEY (id)
);

-- 3. Open / show tracks_table --
SELECT * FROM spotify_db.tracks_table;