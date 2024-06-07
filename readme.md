This is a MicroServices based WebApp basically a Task Manager

Building Order

    1. Authentication
    2. TaskHandler
    3. View/UI


### Update Log
    1) [06-06-20024] [Authentication] Completed mapping and UserAuth logic.
        Added 2 API Endpoints
            - `GET /create-user/`  
            - `GET /get-user/`
            
    2) [07-06-2024] [TaskHandler] Completed mapping and Task Related CRUD Implementation.
        Added 7 API Endpoints:
            - `GET /create-task-file/`  
            - `GET /get-all-task/`  
            - `POST /add-task/`  
            - `POST /get-task/id/`  
            - `POST /update-task/id/`  
            - `POST /delete-task/id/`  
            - `GET /`

    3) [08-06-2024] [UIServiceGateway] Completed and Integrated Auhentication Microservice with UI.

