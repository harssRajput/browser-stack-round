const express = require('express');
const app = express()
const port = 3000;

const {handleSSE} = require('./index');

app.get('/', (req, res) => {
    console.log('home page req');
  res.send('Hello World!')
})
app.get('/log', handleSSE);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})