const express = require('express');
const app = express();
const PORT = 8080;
const { sequelize } = require('./models');
const serverPrefix = '/api-server';
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// /api-server
const indexRouter = require('./routes');
app.use(serverPrefix, indexRouter);

app.get('/', (req, res) => {
  console.log('/ 접속');
  res.json({ message: 'hi' });
});

app.use('*', (req, res) => {
  res.json({ message: '해당 경로가 존재하지 않습니다' });
});

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log('database sync 오류!');
  });
