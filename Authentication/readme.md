# Authentication Module

This package handles login and registeration of users.
This package basically contain, 2 API endpoints for authentication

* `/create-user/` This endpoint will create a user if doesn't exist
    * Return : true / false
        * true - ok
        * false - badRequest
* `/get-user/` This Endpoint will fetch a boolean that whether a user is present in the database or not
    * Return: true / false
        * true - ok
        * false - badRequest

### Update Logs 

    * [06-06-20024] Completed mapping and UserAuth logic.
        * Added 2 API Endpoints - `/create-user/` and `/get-user/`