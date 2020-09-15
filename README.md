# API para fornecedores de Petshop

## Começando

Para executar o projeto, será necessário instalar os seguintes programas:

- [Node v12: Necessário para executar o projeto Node](https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi)
- [MySQL v8: Necessário para banco de dados(https://dev.mysql.com/downloads/mysql/)


## Desenvolvimento

Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:

```shell
cd "diretorio de sua preferencia"
git clone https://github.com/willtet/node-api-fornecedorPetshop
```

### Construção

Para construir o projeto com o node, executar os comando abaixo:

```shell
npm install
```

Para construir database, execute comandos abaixo no mysql:
```shell
CREATE DATABASE petshop;
```


O comando irá baixar todas as dependências do projeto e criar o banco de dados necessario.

Em seguida, abra a pasta com o editor a sua escolha, abra o default.json e altere os dados do banco de dados
```shell
/config/default.json
```
