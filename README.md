# jwtauth

JSON Web Token implementation with HapiJS in collaboration with MongoDB via mongoose.

## Usage

Clone the repository and then issue the command to install application dependencies

`npm install`

In the repository root folder run the command to start the server

`npm start`

## Create a new user

Register a new user to the system

**URL** : `/api/user/create`

**Method** : `POST`

**Auth required** : NO

**Payload example**

```json
{
  "email": "foo@bar.com",
  "password": "061182"
}
```

## Success Responses

**Condition** : Data provided is valid and User is created.

**Code** : `200 OK`

**Content example** : Response with the new user data

```json
{
  "success": true,
  "data": {
    "user": {
      "created_at": "2018-10-10T21:34:41.417Z",
      "_id": "5bbe7077a613335cef0fd7ec",
      "email": "rvpanozhh5529@gmail.com",
      "password": "$2b$10$UmonZBB3bx8sxJU3SQpS.e60Gq.FMsyunTlJ6q58VsXEqXNGcEawi",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYmU3MDc3YTYxMzMzNWNlZjBmZDdlYyIsImVtYWlsIjoicnZwYW5vemhoNTUyOUBnbWFpbC5jb20iLCJpYXQiOjE1MzkyMDcyODcsImV4cCI6MTUzOTIxMDg4N30.Y-E__abwHOhJX5UQDpW4uETyRrRRJCbU7QeRha_mjTs"
  }
}
```

## Error Response - Email taken

**Condition** : If provided email is taken

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Email taken"
}
```

## Add custom routes

Add your own routes to the routes folder. In order to register the routes with the server import your routes in `./server.js` and then issue the command

```javascript
import { your_routes } from "./routes";

server.route(your_routes);
```

## Notes

- You can change the default configuration file `./config.js` to setup your mongodb installation.
