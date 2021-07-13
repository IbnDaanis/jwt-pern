CREATE DATABASE authtodolist;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(), -- CREATE EXTENSION "uuid-ossp";
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE todos(
  todo_id SERIAL,
  user_id uuid,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_name, user_email, user_password) values ('john', 'john@example.com', 'password');
INSERT INTO users (user_name, user_email, user_password) values ('jimmy', 'jimmy@example.com', 'password');

INSERT INTO todos (user_id, description ) values ('3cc88b1e-62af-455d-b02c-aef54c5467d9', 'First todo');
INSERT INTO todos (user_id, description ) values ('88d0ffed-3432-415a-9deb-225094b80b7a', 'Jimmy''s first todo');