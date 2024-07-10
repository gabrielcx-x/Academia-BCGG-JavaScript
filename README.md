Este projeto foi feito na linguagem de Java Script, para ser um sistema de uma Academia, com conexão ao banco de dados. 


Para conseguir a conexão com o banco de dados você devera utilizar o XAMP e inserir esse código para criar as tabelas:
CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomecliente VARCHAR(255) NOT NULL,
    documentocliente VARCHAR(255) NOT NULL
);
CREATE TABLE cadastroconsulta  (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nomepaciente VARCHAR(255) NOT NULL,
   dataconsulta VARCHAR(255) NOT NULL
);
CREATE TABLE cadastroequipamento  (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nomeequipamento VARCHAR(255) NOT NULL,
   grupomuscular VARCHAR(255) NOT NULL
);
CREATE TABLE fichatreino  (
   id INT PRIMARY KEY AUTO_INCREMENT,
   objetivo VARCHAR(255) NOT NULL,
   treino VARCHAR(255) NOT NULL
);
CREATE TABLE cadastrofuncionario (
   id INT PRIMARY KEY AUTO_INCREMENT,
   nomefuncionario VARCHAR(255) NOT NULL,
   cargo VARCHAR(255) NOT NULL
);
