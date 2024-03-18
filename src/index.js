import express from 'express'
import routes from '../route.js';
import connection from '../db.js';
import bodyParser from 'body-parser';
import cors from 'cors'


const app = express()



app.use(cors())

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
connection.query('SELECT 1').then(val=>{
  console.log('conneted');
  }).catch(err=>{console.log(err);})
// Middleware

app.use(express.json()); // Parse JSON bodies

app.use('/',routes)

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port `);
});