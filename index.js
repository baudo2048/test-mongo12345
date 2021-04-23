const express = require('express');
const path = require('path');
const http = require('http')

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = process.env.PORT || 3000;



const server = http.createServer(app)

app.get('/', (req, res) => {


    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const db = client.db('ux-comp');
        var query = { };
        db.collection("comps").find(query).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          client.close();
          console.log('closed');
        });
    
    });

    //res.sendFile(path.join(__dirname,'static','index.html'));
});


//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

console.log("__dirname is + " + __dirname)
app.use(express.static(path.join(__dirname,'static')));

