import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.static('../out'));


app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../out' });
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('Example app listening on http://localhost:3000/');
});


