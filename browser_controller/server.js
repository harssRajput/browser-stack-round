const express = require('express');
const app = express()
const port = 3000;

const {open_browser, kill_browser, cleanUp} = require('./app');

app.get('/', (req, res) => {
    console.log('home page req');
    res.send('Hello World!')
})

app.get('/start', async (req, res) => {
    console.log('/start req');
    console.log(req.query);
    var obj= await open_browser(req.query.browser, req.query.url);
    res.send(obj.status || 'Success execution')
})

app.get('/stop', async (req, res) => {
    console.log('/stop req');
    console.log(req.query);
    var obj= await kill_browser(req.query.browser);
    res.send(obj.status || 'Success execution')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})