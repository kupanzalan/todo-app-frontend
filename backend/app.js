const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
const taskRouter = require('./router');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.use('/api', taskRouter); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});