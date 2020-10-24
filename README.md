# Sequelize and Apollo Graphql Dockerized template

## Setup for Development Environment

- create a file named ".env" in the root of this project with this content

```
APP_PORT=8080
DB_LOGGING=1
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DIALECT=postgres
DB_NAME=postgres
DB_HOST=database

PASSWORD_SALT=10
PLAYGROUND=1
JWT_SECRET_1=someRandomString
JWT_SECRET_2=someDifferentRandomString

USER_DEFAULT_PASSWORD=Super$Password$123
```

- create a file named ".db.env" in the root of this project with this content

```
POSTGRES_PASSWORD=postgres
```

- `yarn install`
- `sudo docker-compose build`
- `sudo docker-compose run --rm app sequelize db:migrate`
- `sudo docker-compose run --rm app sequelize db:seed:all`
- `sudo docker-compose up`

## Try it! :fire:

Go to http://localhost:8080/

Use this in the playground

```
mutation createUser {
    createUser(email: "my@mail.com", password: "superSecurePassword", firstName: "MyName", lastName: "MyLastName") {
        email
        firstName
        lastName
    }
}
```

```
query getUsers {
    getUsers {
        email
        firstName
        lastName
    }
}
```
