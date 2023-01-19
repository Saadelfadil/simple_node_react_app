const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 5000
const mysql = require("mysql")
const cors = require("cors")


const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        password: "password",
        database: "companydb"
    }
)

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("SUCCES")
})

app.get('/companies', (req, res) => {
    db.query("SELECT * FROM companydb", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
})

app.post('/add', (req, res) => {
    const company_name = req.body.company_name;
    const company_city = req.body.company_city;
    const company_country = req.body.company_country;
    const company_subsidiary = req.body.company_subsidiary;

    db.query(
        "INSERT INTO companydb (company_name, company_city, company_country, company_subsidiary) VALUES (?,?,?,?)",
        [company_name, company_city, company_country, company_subsidiary],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );

  })

app.post('/update', (req, res) => {

    const id = req.body.id;
    const city = req.body.company_city;
    db.query(
        "UPDATE companydb SET company_city = ? WHERE id = ?",
        [company_city, id],
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        }
    );

})

app.delete('/delete/:id', (req, res) => {

    const id = req.params.id;
    db.query("DELETE FROM companydb WHERE id = ?", id, (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    });
})

app.listen(port, () => {
  console.log(`GText app listening on port ${port}`)
})