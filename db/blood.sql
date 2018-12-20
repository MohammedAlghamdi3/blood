DROP DATABASE IF EXISTS blood;
CREATE DATABASE blood;

\c blood 

CREATE TABLE bloodusers(
  id serial primary key, 
  name varchar(255), 
  city varchar(255), 
  blood_type varchar(255), 
  phone varchar(255),
  location varchar(255),
  details varchar(255)
    );

CREATE TABLE gender(
  id INT, 
  gender varchar(255)
);