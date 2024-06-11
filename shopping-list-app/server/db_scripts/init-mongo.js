db = db.getSiblingDB('shoppinglist'); // use or create the 'shoppinglist' database

db.createCollection('dummy'); // create a dummy collection to ensure the database is created
db.dummy.insert({ initialized: true }); // insert a dummy document
