# Shopping List App

This is a Shopping List application built with React for the client-side and Node.js for the server-side. 

It includes features like adding items to categories, displaying the total number of items, and ensuring a responsive design using a UI library.

## Project Structure

### Project Root
    shopping-list-app
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
            |       |-- components
            |       |   |-- AddItem.js
            |       |   |-- Categories.js
            |       |   |-- ItemList.js
            |       |   `-- TotalItems.js
            |       |-- index.js
            |       |-- pages
            |       |   `-- HomePage.js
            |       `-- store
            |           |-- index.js
            |           `-- itemsSlice.js
            `-- server
                |-- Dockerfile
                |-- config
                |   `-- db.js
                |-- controllers
                |   `-- itemsController.js
                |-- initCategories.js
                |-- models
                |   |-- Category.js
                |   `-- Item.js
                |-- package-lock.json
                |-- package.json
                |-- routes
                |   `-- itemRoutes.js
                `-- server.js

### Client Side Structure (`client`)
- **public/**:  Contains static files like `index.html`.
- **src/**: Main source directory for React code.
  - **components/**: Contains reusable React components like:
    - `AddItem.js`, 
    - `Categories.js`, 
    - `ItemList.js`,
    - `TotalItems.js`.
  - **pages/**: Contains page components, for example, `HomePage.js`.
  - **store/**: Contains Redux or MobX store configurations and slices like `index.js` and `itemsSlice.js`.
  - **App.js**: Main application component.
  - **index.js**: Entry point of the React application.

### Server Side Structure (`server`)
- **config/**: Contains configuration files like `db.js` for database connection.
- **controllers/**: Contains controller files like `itemsController.js` to handle request logic.
- **models/**: Contains Mongoose models like `Category.js` and `Item.js`.
- **routes/**: Contains route files like `itemRoutes.js` for API endpoints.
- **server.js**: Entry point of the Node.js server.

### Additional Files
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Project documentation.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
        git clone https://github.com/your-username/shopping-list-app.git

2. Install dependencies for the client:

    ```bash
        cd shopping-list-app/client
        npm install

3. Install dependencies for the server:

    ```bash
        cd ../server
        npm install

### Running the Application

#### Start the MongoDB server.

1. Start the client:

    ```bash
        cd client
        npm start

2. Start the server:

    ```bash
        cd ../server
        npm start

The application should now be running, and you can access it in your browser.


## Verifying the Setup
### Server Verification:

The server should be running on `http://localhost:5000`.

You can verify by opening a browser and navigating to `http://localhost:5000/api/items` (assuming you have a route that responds to GET requests at this endpoint).


### Client Verification:

The client should be running on `http://localhost:3000`.

Open a browser and navigate to `http://localhost:3000` to see your React application.