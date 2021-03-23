<h1 align="center">Chat app</h1>

### Chat app

Chat app é uma aplicação com foco em troca de mensagens por salas!

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

### Iniciando projeto

## Iniciando back end!

```bash
# Clone este repositório
$ git clone <https://github.com/luezu-42/chat-back-end>

# Acesse a pasta do projeto no terminal/cmd
$ cd chat-back-end

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# Aguarde o fim da compilação do projeto...
# O servidor inciará na porta:3333 - <http://localhost:3333/>
```

## Iniciando front end!

```bash
# Clone este repositório
$ git clone <https://github.com/luezu-42/chat-front-end>

# Acesse a pasta do projeto no terminal/cmd
$ cd chat-front-end

# Instale as dependências com npm ou yarn
$ npm install

# Execute a aplicação em modo de desenvolvimento. Caso você tenha feito a instalção por yarn escreva apenas 'yarn start'
$ npm run start

# Aguarde o fim da compilação do projeto...
# O servidor inciará na porta:3000 - acesse <http://localhost:3000/>
```

### Testes(jest)

```bash
# Entre na pasta de back end
$ cd chat-back-end

# Após a instalação dos pacotes(npm install) feito no "Iniciando back end!" execute
$ npm run test

# Aguarde a execução do código
```
Guia dos testes feitos

1️⃣ - Rotas de acesso funcionando? 🟢 <br>
2️⃣ - Deve cadastrar um usuário com sucesso 🟢 <br>
3️⃣ - Impedir que o usuário se cadastre com campos vazios 🟢 <br>
4️⃣ - Impedir o cadastro de email repetido 🟢 <br>
5️⃣ - Deve retornar um token quando logar 🟢 <br>
6️⃣ - Grupo deve ser criado 🟢 <br>
7️⃣ - Retorno de todos os grupos 🟢

### -------------------------

Este app teve como foco o back, o sistema de envio de mensagens <br>
Repositório do front end está bem simples 😂 https://github.com/luezu-42/chat-front-end

### Tecnologias aprendidas

* Jest
* JWT
* Socket.io
* AWS
* PM2
* Tailwind
* OpenSSl
* Uso um pouco mais avançado de Mongodb
* Express com Socket.io

### Melhorias

* Um erro foi ter usado muitas tecnologias novas para mim juntas...
* UI, os erros de login e registro para o usuário não está claro, estão presentes apenas no console do back end
* Função de logout (excluir token)
* Falta de testes(jest) sobre o sokcet.io
* Uso do Tailwind sem pesquisa antecipada sobre o deploy, pela necessidade de alteração de ambiente do Tailwind, não foi possivel fazer o deploy do front-end do app na Vercel e no Heroku. 
* Mais testes sobre as autorizações do certificado (openssl)
* Componentização do app no front
* Falta de estudo sobre middleware
* Design system na estrutura de arquivos no front (mesmo que não há muitas pages, se tivessse o minimo de componetização poderia ser aplicado)

### Outros

-Deixei as variaveis de ambiente ".env" no repositório por se tratar de um uso local. <br>

-App feito em 4 dias!  <br>

-Caso algum participante do challenge venha a mencionar um erro no mongoose, avise-os que a ultima versão do mongoose está mostrando alguns bugs na conectividade, ultilizar versão "mongoose": "^5.11.18" para correção do erro
