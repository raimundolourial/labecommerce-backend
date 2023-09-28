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