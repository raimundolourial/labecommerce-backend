-- Active: 1695689059242@@127.0.0.1@3306
--Criando a Tabela Usuario
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    creat_at TEXT NOT NULL
)

--Populando a Tabela com 3 usuarios:
INSERT INTO users(id, name, email, password, creat_at) VALUES
('u001','Raimundo','raimundo@email.com','123','asdfdsgdfgfd'),
('u002','Leo','leonardo@email.com','147','gvhfgh'),
('u003','Romana','romana@email.com','789','afdfff')

--Criando a Tabela de Produtos:
CREATE TABLE produtos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
)

--Populando a tabela Produtos com 5 produtos:
INSERT INTO produtos(id, name,price, description, image_url) VALUES
('p001','panela de pressão',100.0,'panela bronze','llllllllllll'),
('p002','Frigideira',68.5,'Frigideira prata','lllllaaaaaa'),
('p003','Fritadeira Eletrica',190.0,'Frita na Ernegia','fffffffffafa'),
('p004','Papeiro',28.9,'papeiro vermelho','pppppvvvv'),
('p005','Panela Tampa de vidro',120.0,'panela de vidro','pvasdasd')

--GET ALL USERS
SELECT* FROM users

--GET ALL PRODUCTS
SELECT* FROM produtos

--GET ALL PRODUCTS 2
SELECT* FROM produtos where name LIKE '%gamer%'
-- CREATE USER
INSERT INTO users(id, name, email, password, creat_at) VALUES
('u004','Wesley','wesley@email.com','12341','asdfdsgdfg')

--CREATE PRODUCTS
INSERT INTO produtos(id, name,price, description, image_url) VALUES
('p006','panela gamer',177.0,'panela bronze gamer','llllllll')

--DELETE USER BY ID
DELETE FROM users
WHERE id = 'u002';

--DELETE PRODUTO BY ID
DELETE FROM produtos
WHERE id = 'p002';

--Edit Product by id
UPDATE produtos
SET 
id='p0022',
name = 'Iphone 8',
price = 1200.0,
description = 'Iphone completo',
image_url = 'sadsaf48484a63s'
WHERE id = 'p001';

CREATE TABLE purchase(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
    )

    INSERT INTO purchase (id,buyer,total_price,created_at) VALUES ('p001','u001',122.50,'15/12/2015'),
    ('p002','u003',22.50,'05/01/2014'),
    ('p003','u003',99.50,'22/08/2023')

    UPDATE purchase
    SET 
    total_price = 200.0
    WHERE id = 'p003'

    SELECT users.id,purchase.id,users.name,users.email, purchase.total_price, purchase.created_at FROM users INNER JOIN purchase ON users.id = purchase.buyer