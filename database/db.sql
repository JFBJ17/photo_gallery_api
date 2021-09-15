CREATE DATABASE gallery_db;

CREATE TABLE photo (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(25),
    description TEXT,
    imagePath VARCHAR(255),
    CONSTRAINT Pk_Photo PRIMARY KEY (id)
);