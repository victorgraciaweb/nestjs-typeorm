<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest TypeORM and Postgres

RESTful API with NestJS, TypeScript, Docker, TypeORM and Postgres, along with other libraries

## Development execution

1. Clone repository
```
git clone git@github.com:victorgraciaweb/nestjs-typeorm.git
```

2. Navigate folder project
```
cd nestjs-typeorm
```

3. Clone file ```.env.template``` and rename to ```
.env```

```
cp .env.template .env
```

4. Fill enviroment variables in ```.env```

5. Install dependencies
```
yarn install
```

6. Up Postgres Database
```
docker compose up -d
```

7. Up app in dev (watch mode):
```
yarn start:dev
```

8. Install Nest CLI (Optional)
```
npm i -g @nestjs/cli
```

## Run Tests

To execute the tests, use the following commands (without and with coverage):

```
yarn test
```
```
yarn test:cov
```

## Stack used
* Postgres
* Nest
* Docker
* TypeORM
