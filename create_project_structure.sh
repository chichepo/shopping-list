#!/bin/bash

# Set the project name
PROJECT_NAME="shopping-list-app"

# Create project root directory
mkdir -p $PROJECT_NAME

# Create client directories and files
mkdir -p $PROJECT_NAME/client/{public,src/{components,pages,store}}

# Create public files
touch $PROJECT_NAME/client/public/index.html

# Create src files
touch $PROJECT_NAME/client/src/{App.js,index.js}
touch $PROJECT_NAME/client/src/components/{AddItem.js,Categories.js,ItemList.js,TotalItems.js}
touch $PROJECT_NAME/client/src/pages/HomePage.js
touch $PROJECT_NAME/client/src/store/{index.js,itemsSlice.js}

# Create client package.json
cat <<EOL > $PROJECT_NAME/client/package.json
{
  "name": "client",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {}
}
EOL

# Create server directories and files
mkdir -p $PROJECT_NAME/server/{config,controllers,models,routes}

# Create config files
touch $PROJECT_NAME/server/config/db.js

# Create controller files
touch $PROJECT_NAME/server/controllers/itemsController.js

# Create model files
touch $PROJECT_NAME/server/models/{Category.js,Item.js}

# Create route files
touch $PROJECT_NAME/server/routes/itemRoutes.js

# Create server entry file
touch $PROJECT_NAME/server/server.js

# Create server package.json
cat <<EOL > $PROJECT_NAME/server/package.json
{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {}
}
EOL

# Create project root files
touch $PROJECT_NAME/.gitignore
touch $PROJECT_NAME/README.md

echo "Project hierarchy created successfully!"

