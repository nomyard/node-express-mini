const express = require('express');
const bodyParser = require('body-parser');

const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send({ api: 'Running....' });
});

server.get('/api/users', (req, res) => {
  //get the data
  db
  .find()
  .then(users => {
    res.json(users);
  })
  .catch(error => {
    //handle it
    res.status(500).json(err);
  })
  //send the data
  //send error if ther is one

});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db
  .findById(id)
  .then(users => {
    res.json(users[0]);
  })
  .catch(error => {
    res.status(500).json(err);
  })
});

server.post('/api/users', (req, res) => {
  const user  = req.body;
  db
  .insert(user)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error=> {
    res.status(500).json(error);
  })
});

server.put('/api/users/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params;

  db
    .update(id, user)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  db
    .remove(id)
    .then(users => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});




const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));