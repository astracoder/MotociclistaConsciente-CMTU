CREATE TABLE USUARIO (
    ID_USUARIO INTEGER PRIMARY KEY,
    STATUS BOOLEAN,
    NOME VARCHAR(255),
    E_MAIL VARCHAR(255),
    SENHA VARCHAR(100),
    ADMIN BOOLEAN
);

CREATE TABLE MODULO (
    ID_MODULO INTEGER PRIMARY KEY,
    STATUS BOOLEAN,
    NOME_MODULO VARCHAR(100),
    PORCENTAGEM_NECESSARIA INTEGER
);

CREATE TABLE CERTIFICADO (
    ID_CERTIFICADO INTEGER PRIMARY KEY,
    STATUS BOOLEAN,
    DATA_CONCLUSAO DATE,
    HORAS TIME,
    FK_USUARIO_ID_USUARIO INTEGER
);

CREATE TABLE ATIVIDADE (
    ID_ATIVIDADE INTEGER PRIMARY KEY,
    STATUS BOOLEAN,
    RESPOSTA_CERTA INTEGER,
    NOME VARCHAR(100),
    TEXTO TEXT,
    FK_MODULO_ID_MODULO INTEGER
);

CREATE TABLE ALTERNATIVA (
    ID_ALTERNATIVA INTEGER PRIMARY KEY,
    STATUS BOOLEAN,
    TEXTO VARCHAR(255),
    FK_ATIVIDADE_ID_ATIVIDADE INTEGER
);

CREATE TABLE USUARIO_MODULO (
    FK_MODULO_ID_MODULO INTEGER,
    FK_USUARIO_ID_USUARIO INTEGER,
    PORCENTAGEM_CONCLUIDO INTEGER,
    ID_USUARIO_MODULO INTEGER PRIMARY KEY
);

ALTER TABLE USUARIO 
ADD CONSTRAINT FK_USUARIO_2
    FOREIGN KEY (FK_TIPO
