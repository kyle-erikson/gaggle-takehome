# Gaggle Takehome Exercise

A simple HTTP REST web application wrapped in a Serverless library for deployment as an AWS Lambda function. Built with Serverless, NodeJS, Express, TS, TypeORM, and Postgres. Submission by Kyle Erikson.

## Table of Contents

- [Gaggle Takehome Exercise](#gaggle-takehome-exercise)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Git](#git)
    - [Node](#node)
  - [Installation](#installation)
  - [Running The Project](#running-the-project)
    - [Starting The Project](#starting-the-project)
    - [Using The Project](#using-the-project)
  - [API Information](#api-information)
    - [Endpoints](#endpoints)
  - [Running Tests](#running-tests)
  - [Possible Improvements](#possible-improvements)
  - [Issues](#issues)

---

## Requirements

For development, only the latest version of Git, Node.js and a global package manager, `npm`, are required to be installed. It is recommended to follow this order of installation as the Git Bash CLI tool can be used to run the commands needed for Node and `npm` installation.

### Git

Simply visit the [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installation page and follow the instructions for your correct OS.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)). Feel free to use the default options in the installer.

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.3

    $ npm --version
    7.20.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install -g npm@latest

---

## Installation

The below series of commands will clone my submitted project, move your user into the working directory, and install all relevant project dependencies.

```
$ git clone https://github.com/kyle-erikson/gaggle-takehome
$ cd gaggle-takehome
$ npm install
```

---

## Running The Project

You will need a Postgres instance either locally or hosted, for this application to work. I can provide a connection to a simple hosted Postgres instance that should work.

### Starting The Project

The following command will attempt to start the web application at the url: `localhost:3000`

Note: This will only run the express server and not the AWS Lambda function. All functions work fine.

```
$ npm start
```

If you wish to run the AWS Lambda function locally, you will need to do the following:

```
$ npm install -D serverless-offline
$ npm install -g serverless-offline
$ sls offline
```

Note: The serverless-offline library has been incredibly finicky with this configuration. The server crashes randomly and the `/users/search` GET endpoint does not work correctly due to, what I'm chalking up to as a library error at this point.

### Using The Project

Calls to the web application can be made using a tool like [Postman](https://www.postman.com/downloads/). The next section will showcase the accessible endpoints and the necessary request bodies, as well as expected responses.

---

## API Information

All endpoints can be accessed via tool like Postman, when the proper HTTP method and url are given.

### Endpoints

- `GET /users/:id`
  - The id of the user you wish to retrieve can simply be accessed by replacing the `:id` url parameter.
  - #### Responses
    - 200 OK
      ```
      {
        "id": 1,
        "first_name": "Kyle",
        "last_name": "Erikson"
      }
      ```
    - 404 Not Found
      ```
      {
        message: "No user found for id: {:id}",
      }
      ```
    - 500 Internal Server Error
      ```
      {
        "error": "{error message}"
      }
      ```
- `GET /users/search`
  - #### Request Body
    ```
    {
      "searchTerm": "kyle"
    }
    ```
  - #### Responses
    - 200 OK
      ```
      [{
        "id": 1,
        "first_name": "Kyle",
        "last_name": "Erikson"
      },...]
      ```
    - 422 Unprocessable Entity
      ```
      {
        "error": "\"searchTerm\" length must be at least 2 characters long"
      }
      ```
    - 404 Not Found
      ```
      {
        "error": "No user(s) found for search term: kyle"
      }
      ```
    - 500 Internal Server Error
      ```
      {
        "error": "{error message}"
      }
      ```
- `GET /users/allUsers`
  - This is just a utility to see all users in the database instance.
  - #### Responses
    - 200 OK
      ```
      [{
        "id": 1,
        "first_name": "Kyle",
        "last_name": "Erikson"
      },...]
      ```
    - 404 Not Found
      ```
      {
        "error": "No users found."
      }
      ```
    - 500 Internal Server Error
      ```
      {
        "error": "{error message}"
      }
      ```

---

## Running Tests

In a normal application, I would have written integration tests for things like the routes and the user repository, but I considered those out of scope for this exercise as they would require spinning up and potentially hosting test database instances. So for now, only the User Controller logic is being tested, while things like the database queries remain untested.

Unit tests may be run using the following command:

```
$ npm test
```

---

## Possible Improvements

Here are some things that I would do if I was moving this into a production ready environment.

1. Ensure correct configuration of environment variables for consuming AWS resources within the application.
2. Control AWS resource access with things like IAM.
3. Ensure security within the API via technologies like JWT, OAuth2.0, etc.
4. Implement better distributed logging.
5. Write "Infrastructure as Code" pieces and automate deployment of application.
6. Enhance the test coverage by adding integration and end to end tests.

---

## Issues

I ran into a number of issues with my choice of different libraries this project. Most especially seen when trying to convert the Express application into a Lambda function. Here are some of the issues that need resolution, but time did not permit.

- Using `sls offline` GET requests that had a request body would not process through the API. Consistent error about content-length not matching the request body.
- Random shutdowns while debugging the app locally due to `Port in use` errors.
