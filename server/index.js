const express = require('express');
const cors = require('cors');
const redis = require('redis');
const { Pool } = require('pg');
const keys = require('./keys');

const app = express();
app.use(cors());
app.use(express.json());

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('connect', client => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.error(err));
});

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});
const redisPublisher = redisClient.duplicate();

const port = 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    // const values = await redisClient.hGetAll('values');
    res.send([{1:2}, {3: 4}]);
});

app.post('/values', async (req, res) => {
  const {index} = req.body;
  if(parseInt(index) > 40){
    return res.status(422).send('Index too high');
  }

//   await redisClient.hSet('values', index, 'Nothing yet!');
//   redisPublisher.publish('insert', index);
  await pgClient.query("INSERT INTO values(number) VALUES ($1)", [index]);
  res.send({working: true})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))