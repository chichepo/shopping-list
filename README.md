# Shopping List App

This is a Shopping List application built with React for the client-side and Node.js for the server-side. 

It includes features like adding items to categories, displaying the total number of items, and ensuring a responsive design using Material UI library.

## Project Root
    shopping-list-app
        .
        |-- README.md
        |-- create_project_structure.sh
        |-- docker-compose.yml
        |-- package-lock.json
        |-- package.json
        `-- shopping-list-app
            |-- client
            |   |-- Dockerfile
            |   |-- package-lock.json
            |   |-- package.json
            |   |-- public
            |   |   `-- index.html
            |   `-- src
            |       |-- App.js
            |       |-- assets
            |       |   `-- shopping-list.png
            |       |-- components
            |       |   |-- AddItem.js
            |       |   |-- Categories.js
            |       |   |-- ItemList.js
            |       |   |-- TotalItems.js
            |       |   `-- collapsibleTable
            |       |       |-- Row.js
            |       |       |-- collapsibleTable.js
            |       |       `-- utils.js
            |       |-- index.js
            |       |-- pages
            |       |   `-- HomePage.js
            |       |-- store
            |       |   |-- index.js
            |       |   `-- itemsSlice.js
            |       `-- styles.css
            `-- server
                |-- Dockerfile
                |-- config
                |   `-- db.js
                |-- controllers
                |   `-- itemsController.js
                |-- db_scripts
                |   |-- cleanDatabase.js
                |   |-- initCategories.js
                |   `-- initItems.js
                |-- models
                |   |-- Category.js
                |   `-- Item.js
                |-- package-lock.json
                |-- package.json
                |-- routes
                |   `-- itemRoutes.js
                `-- server.js

        15 directories, 35 files

### Root Directory

- **README.md**: Documentation file for the project.
- **create_project_structure.sh**: Script to create the project structure.
- **docker-compose.yml**: Docker Compose configuration file for setting up multi-container Docker applications.
- **package-lock.json**: Auto-generated file that locks the versions of the installed packages.
- **package.json**: Top-level configuration file for managing project dependencies and scripts.

### Client Directory (`shopping-list-app/client`)

- **Dockerfile**: Dockerfile for building the client-side application container.
- **package-lock.json**: Auto-generated file that locks the versions of the installed packages for the client.
- **package.json**: Configuration file for managing client-side dependencies and scripts.
- **public/index.html**: The main HTML file for the React application.
- **src/App.js**: The main application component.
- **src/assets/shopping-list.png**: Image asset used in the application.
- **src/components**: Directory containing reusable React components.
  - **AddItem.js**: Component for adding a new item to the shopping list.
  - **Categories.js**: Component for displaying categories.
  - **ItemList.js**: Component for displaying the list of items.
  - **TotalItems.js**: Component for displaying the total number of items.
  - **collapsibleTable**: Directory containing components for the collapsible table.
    - **Row.js**: Component for a row in the collapsible table.
    - **collapsibleTable.js**: Component for the collapsible table.
    - **utils.js**: Utility functions for the collapsible table.
- **src/index.js**: The entry point for the React application.
- **src/pages/HomePage.js**: Component for the home page.
- **src/store**: Directory containing Redux store configuration.
  - **index.js**: Configuration file for the Redux store.
  - **itemsSlice.js**: Redux slice for managing items state.
- **src/styles.css**: Global CSS styles for the application.

### Server Directory (`shopping-list-app/server`)

- **Dockerfile**: Dockerfile for building the server-side application container.
- **config/db.js**: Database configuration file.
- **controllers/itemsController.js**: Controller for handling item-related API requests.
- **db_scripts**: Directory containing scripts for database initialization and cleaning.
  - **cleanDatabase.js**: Script to clean the database.
  - **initCategories.js**: Script to initialize categories in the database.
  - **initItems.js**: Script to initialize items in the database.
- **models**: Directory containing Mongoose models.
  - **Category.js**: Mongoose model for the category.
  - **Item.js**: Mongoose model for the item.
- **package-lock.json**: Auto-generated file that locks the versions of the installed packages for the server.
- **package.json**: Configuration file for managing server-side dependencies and scripts.
- **routes/itemRoutes.js**: Express routes for item-related API endpoints.
- **server.js**: The main entry point for the server application.

## Prerequisites
- Operating System

    Windows 10/11, macOS, or Linux (Ubuntu/Debian recommended)

- Node.js

    Ensure Node.js is installed. Recommended version: 14.x or later.

- npm (Node Package Manager)

    npm is installed with Node.js. Ensure npm is available. Recommended version: 6.x or later.

- Docker
    Docker is recommended for running the application in a containerized environment.

- Docker-compose

- Git

    Git is required for cloning the repository.

- bash

- MongoDB

    MongoDB is required as the database for the application.

    You can run the script `shopping-list\shopping-list-app\server\db_scripts\launchMongodbContainer.sh` to get a running mondoDB session using containers.

    Alternatively, you can use MongoDB Atlas (cloud service) or Docker to run MongoDB locally.

## Installation

`Important note:`

`You can deploy the application in a more "traditional" way (for developer tasks), or by using Containers (refer to "Building and Running using Containers" later in this document).`

`The following steps describe the "traditional" way.`


1. Clone the repository:
    ```bash
    git clone https://github.com/chichepo/shopping-list.git
    ```

### Database Initialization

Ensure to have, under the server folder, the Database connections files:

Copy the Appropriate `.env` File: 

Each script copies the correct `.env` file for the environment. 
The `.env` file will be used by the server to load environment variables.

- For development/QA: `.env_dev` is copied to `.env`.
- For production: `.env_prod` is copied to `.env`.

The content of the files should be similar to the following:

    MONGO_URI=mongodb://<mongodb server address>:<port>/shoppinglist


You can initialize the database using the provided scripts.

**Ensure MongoDB is running before executing these scripts.**

Navigate to the shopping-list-app/server/db_scripts directory and run the scripts in the following order:

1. Clean Database:

    ```bash
    cd shopping-list-app/server/db_scripts
    node cleanDatabase.js
    ```
2. Initialize Categories:

    ```bash
    node initCategories.js
    ```
3. Initialize Items:

    ```bash
    node initItems.js
    ```

### Client

Navigate to the shopping-list-app/client directory and use the following scripts:

1. Clean: 
    ```bash
    rm -rf node_modules
    ```
2. Install:
    ```bash
    npm install
    ```
3. Start:
    ```bash
    npm start
    ```

### Server

Navigate to the shopping-list-app/server directory and use the following scripts:

1. Clean:
    ```bash
    rm -rf node_modules
    ```
2. Install:
    ```bash
    npm install
    ```
3. Start:
    ```bash
    npm start
    ```
The application should now be running, and you can access it in your browser.

## Global Usage (if a global setup is preferred)

### Development and QA

To set up the development and QA environment, use the dev_setup.sh script:

```bash
cd shopping-list-app/server
./dev_setup.sh

cd shopping-list-app/client
./dev_setup.sh
```

### Production

To set up the production environment, use the prod_setup.sh script:

```bash
cd shopping-list-app/server
./prod_setup.sh

cd shopping-list-app/client
./prod_setup.sh
```

### Server Verification:

The server should be running on `http://localhost:5000`.

You can verify by opening a browser and navigating to `http://localhost:5000/api/items`.


### Client Verification:

The client should be running on `http://localhost:3000`.


### Stop the application

   ```bash
   ./stop_services.sh
   ```

**Pay attention: Useful commands to check and kill process running on port:**

**MS-DOS:**

    netstat -ano | findstr :5000
    taskkill /PID 11116 /F

**LINUX:**

    netstat -anp | grep :5000
    kill -9 <proces #>

### Unit tests for the server module

```bash
cd shopping-list-app/server
npm test
```

Unit test report example:

    $ npm test

    > server@1.0.0 test
    > jest

    PASS  test/controllers/itemsController.test.js (5.207 s)
    Items Controller
        GET /api/categories
        √ should return all categories (43 ms)
        DELETE /api/delete-item
        √ should delete an item from a category (25 ms)
        √ should return 404 if category not found (6 ms)

    Test Suites: 1 passed, 1 total
    Tests:       3 passed, 3 total
    Snapshots:   0 total
    Time:        5.26 s
    Ran all test suites.


## Building and Running using Containers

### Build the Docker Images

```bash
docker-compose build
```

### Start the Containers:

```bash
docker-compose up
```

### execute the initialization scripts inside the server container:

```bash
docker exec -it shopping-list-server node db_scripts/initCategories.js
docker exec -it shopping-list-server node db_scripts/initItems.js
```

### Stopping the Containers:

```bash
docker-compose down
```