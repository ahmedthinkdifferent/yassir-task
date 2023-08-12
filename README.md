<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Base App Architecture
* I mixed project packing between packaging by feature & by layer to get the benefits of both of them ,
[Read More]https://medium.com/sahibinden-technology/package-by-layer-vs-package-by-feature-7e89cde2ae3a#:~:text=%E2%80%94%20Package%20by%20Feature%20is%20like,package%20will%20increase%20without%20bound.
* I used restful api versioning based on url [Read More] https://josipmisko.com/posts/rest-api-versioning
* I used knex orm for simplicity, but most of the time i use Sequelize & TypeORM
* I used a nest js cron job just for simplicity and run it every 5 mins to overcome 429 too many requests from third party
* using nest js cron job is not a valid solution for production apps because we have many instances who are running at same time and to fix that issue we can use [Agenda] https://github.com/agenda/agenda
* because we are having a small number of records, we don't need to index aqius column but in future we should have btree index to speed fetching data
* we may use redis cache aside pattern to get data from redis and update it every x number of minutes.

## PostMan Api
* for simplicity i didn't create multi environment and kept api url on localhost
* saved each api response to help people discover api without calling it.
* my way of Rest Api Response Architecture: -
  1- 200 success operation, 400 bad request, 412 for validation, 500 server error ,401 unauthorized , 403 forbidden to do action
  2- create single response and use it on all app responses.

## Security
* for simplicity, people can call api without security, but in a production apps we may use JWT or Passito
* api should have rate limiting to prevent DDOS Attack

## Deployment
* most time i use Docker & Docker Swarm for deployment.
* We can deploy through aws Lambda Functions.

## GIT
* most time I use GitFlow Strategy [Read More] https://medium.com/@knoldus/introduction-to-git-flow-4dbfd96e32e
* Branch name & commits as following:-
  1- Branching -> feat/ticketNumber/task-description
  2- Branch names -> feat - fix - chore - refactor - test
  3- Commit naming -> feat(optional context): [Task Number] description in max 2 lines
  4- Commits ->  feat - fix - chore - refactor - test - perf .

## Observability
* We may use Loki & Grafana - DataDog - NewRelic