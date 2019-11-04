# CRUD da API Contato conforme está na especificação no diretório especificacao_API/contato.yaml

Linguagem utilizada JavaScript/NodeJS

**_1 - Especificação da API _**

Faça o clone no seu pc/linux e acesse o diretório da aplicação que irá ser executada na porta 3001, depois crie um banco como desejar e configure no arquivo knexfile.js (as informações contidas neste arquivo são fictícias), logo após criar o banco execute os seguintes comandos para criar as migrations:

_Para instalar as dependencias do nodeJS_

npm install

_Para criar as migrations_

node_modules/.bin/knex migrate:latest --env test
node_modules/.bin/knex migrate:latest --env prod

Após criar as migrations vamos para o passo 2.

**_2 - Iniciando a API_**

Execute o seguinte comndo para executar a API

npm start

**_3 - Criando o Usuário para acessa a API_**

Com a API em execussão vamos acessar todo conteúdo através de um SOAP & REST Client, ex: Postman, Boomerang...

Passo1 - criando o usuário (Método POST):

_acesse o seguinte link http://localhost:3001/auth/signup/ e coloque o seguinte comando_

{
    "name": "Davi",
    "mail": "dnssites@gmail.com",
    "passwd": "123456"
}

_Você receberá uma mensagem que o usuário foi criado com sucesso._

Passo2 - Acessando o usuário para gerar o token (Método POST)

_Acesse o seguinte link http://localhost:3001/auth/signin:_

{
    "mail": "dnssites@gmail.com",
    "passwd": "123456"
}

_Você receberá o token para fazer todo CRUD da API de contato conforme o exemplo abaixo:_

{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRhdmkiLCJtYWlsIjoiZG5zc2l0ZXNAZ21haWwuY29tIn0.48A3y1tv5_w83ydntYLmZgbBaAXXPL8FXvWpfAh6DOs"
}

**_4 - Criando e acessando a API contato_**

OBSERVAÇÃO:

_É necessário colocar nos HEADERS de toda aplicação SOAP & REST Client o seguinte:

Content-Type => application/json
Authorization =>bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRhdmkiLCJtYWlsIjoiZG5zc2l0ZXNAZ21haWwuY29tIn0.48A3y1tv5_w83ydntYLmZgbBaAXXPL8FXvWpfAh6DOs  (Este é o token gerado)


Passo 1 - Criando o contato (Método POST)

_Para criar o contato basta acessar no link http://localhost:3001/contatos:_

_Você receberá uma mensagem que o foi "Contato cadastrado com sucesso!"._

Passo 2 - Buscando todos os contatos cadastrados (Método GET)

_Para buscar os contatos cadastrados basta acessar o seguinte link http://localhost:3001/contatos_

Passo 3 - Buscando um contato cadastrado específico passando o ID (Método GET)

_Para buscar o contato cadastrado específico basta acessar o seguinte link http://localhost:3001/contatos/10_

Passo 4 - Atualizando um contato passando o ID (Método PUT)

_Para atualizar um contato cadastrado basta acessar o seguinte link http://localhost:3001/contatos/10_ e colocar o conteúdo que será alterado

{
	"nome": "Davi Bernardo10",
	"canal": "dnssites@gmail.com10",
	"valor": "$Valor10",
	"obs": "Esta é a API contatos10"
}

Passo 5 - Deletando um contato passando o ID (Método DELETE)

_Para deletar um contato cadastrado basta acessar o seguinte link http://localhost:3001/contatos/10_

