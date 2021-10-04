# MÁXIMATECH TEST

## Back-end - wallet/api

## Terminal

- Se tiver docker instalado, rodar: docker-compose up -d, no diretório root da pasta para criar o container do banco de dados Postgres
- Rodar: yarn install, para instalar todas as dependências, incluindo de desenvolvimento

## Configuração dotenv

- Alterar o nome do arquivo chamado: .env.example para .env ou copiar e colar todo conteúdo dentro de um arquivo chamado .env.
- UNIX: cp .env.example .env
- Substituir em: <<hash_md5>> por um hash em md5

## Configuração TypeORM

- Alterar o nome do arquivo chamado: ormconfig.example.json para ormconfig.json ou copiar e colar todo conteúdo dentro de um arquivo chamado ormconfig.json.
- UNIX: cp ormconfig.example.json ormconfig.json

## TypeORM migrations

- Rodar: yarn typeorm migration:run, para rodar as migrações contidas em src/shared/infra/typeorm/migrations/

## Rodar o projeto

- yarn dev:server


## Front-end - wallet-web

## Configuração da API

- Configurar o arquivo api.ts em src/services com a baseURL da API

## Terminal

- Rodar: yarn install, para instalar todas as dependências, incluindo de desenvolvimento

## Rodar o projeto

- yarn start

# Acessar documentação das rotas

- http://localhost:3333/api-docs ou com outra porta que escolheu pra rodar o servidor
