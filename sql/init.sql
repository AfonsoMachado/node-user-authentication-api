-- Habilitando extensão para a função uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Extensão para usar a função crypt()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user (
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

-- Criação do usuário inicial
INSERT INTO application_user (username, password) VALUES ('admin', crypt('admin', 'my_salt'));