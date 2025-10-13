const express = require('express');
const app = express();
const allRouter = require('./routes/index');

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json()) // Menangkap req body dalam format json
app.use(allRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})