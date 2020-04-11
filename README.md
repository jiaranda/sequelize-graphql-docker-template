# Sequelize and Apollo Graphql Dockerized template

## Setup for Development Environment

- create a file named ".env" in the root of this project with this content

```
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DIALECT=postgres
DB_NAME=postgres
DB_HOST=database
DB_LOGGING=1
APP_PORT=8080
PLAYGROUND=1
```

- `npm install`
- `sudo docker-compose build`
- `sudo docker-compose run --rm app sequelize db:migrate`
- `sudo docker-compose run --rm app sequelize db:seed:all`
- `sudo docker-compose up`

## Try it! :fire:
Go to http://localhost:8080/

Use this in the playground

```
mutation createMessage {
    createMessage(data: "hello world") {
        data
    }
}
```

```
{
    getMessages {
        data
    }
}
```


