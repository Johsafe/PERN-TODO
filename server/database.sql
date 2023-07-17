CREATE DATABASE todobd;//perntodo

CREATE TABLE todotable(
    todo_id SERIAL PRIMARY KEY,-- //serial ensures uniqueness
    todo_name VARCHAR(255),
    todo_day VARCHAR(50)

);
 SELECT * FROM todotable;-- //get all todo

 


ALTER USER postgres WITH PASSWORD 'mypassword';


-- sudo psgl -U postgres -h localhost;