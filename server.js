const express = require('express');

const app = express();

app.listen(3030, () => {
  console.log('Started on port 3030');
});

app.get('/', (req, res) => {
  console.log('Res', res);
  res.send('hello world');
});
