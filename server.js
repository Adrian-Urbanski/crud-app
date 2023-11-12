const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://xxx:xxx@cluster0.urobizr.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString)
    .then(client => {
      console.log('Connected to Database')
      const db = client.db('start-wars')
      const quotesCollection = db.collection('quotes')
      app.set('view engine', 'ejs')
      app.use(bodyParser.urlencoded({extended:true}))
      app.use(bodyParser.json())
      app.use(express.static('public'))
      

      app.get('/', (req,res) => {
      // res.sendFile(__dirname + '/index.html')
        db.collection('quotes')
        .find()
        .toArray()
        .then(results => {
          res.render('index.ejs',{quotes: results})
        })
        .catch(error =>console.error(error))
})
      app.post('/quotes', (req,res) =>{
        quotesCollection
        .insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
})
      app.listen(3000,function(){
       console.log('listening on 3000')
})
    })
    .catch(error => console.error(error))
    

