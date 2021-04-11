# NoBoring.email

NoBoring.Email - Send real paper postcards to your friends via the internet (University Project)

With NoBoring.email you can design and write a postcard online. Our website renders your text to a handwritten font, prints, and sends the postcard for you. This way, you can send real postcards to your friends and family with minimal time investment. 

Tools used: Reacts JS, MongoDB

## Demo 

<p align="center"><img src="media/write postcard.jpg"\></p>

## Installation
Use `npm start` for the frontend and `node index.js` for the backend.

### Start the database server
```
mkdir /tmp/mongotmp
mongod --dbpath /tmp/mongotmp
```


### Option 1) Create all database schemes and import data to begin with
```
mongorestore backend/dump/
```


### Option2 ) Import by json (advanced)
This does not create the schemas and indexes, run the backend once beforehand.
```

mongoimport --db noboringemaildb --collection images --file mongodb/image_default_set.json
```

### Quick setup with import
```
rm -rf /tmp/mongotmp && mkdir /tmp/mongotmp && mongod --dbpath /tmp/mongotmp
node backend/index.js
mongoimport --db noboringemaildb --collection images --file backend/dump_json/image_default_set.json
mongoimport --db noboringemaildb --collection printeries --file backend/dump_json/printery_default_set.json
```

## Screenshots

### Homepage

<p align="center"><img src="media/home screen.jpg"\></p>

### Select an image for your postcard

<p align="center"><img src="media/Select image for postcard.jpg"\></p>

### Adjust your design

<p align="center"><img src="media/confirm design.jpg"\></p>

### Write and render your postcard

<p align="center"><img src="media/write postcard.jpg"\></p>

### Track your order

<p align="center"><img src="media/track order.jpg"\></p>

