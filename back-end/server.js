const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");


//TODO: de facut bara pe facultatile din ASE 


//Initializing server
const app = express();
const port = 8081;
app.listen(port, () => {
  console.log("Server online on: " + port);
});
app.use("/", express.static("../front-end"));
app.use(bodyParser.json()); // support json encoded bodies
//app.use(fileupload());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "the_twelve_back-end"
});
connection.connect(function(err) {
  console.log("Connected to database!");
  const sql =
    "CREATE TABLE IF NOT EXISTS persoane_inscrise(nume VARCHAR(255) , prenume VARCHAR(255) , telefon VARCHAR(255), email VARCHAR(255) , facultate VARCHAR(255) , an VARCHAR(8) , facebook VARCHAR(255) , specializare VARCHAR(255) ,  more VARCHAR(255) )";
  connection.query(sql, function(err, result) {
     
    if (err) throw err;
  });
});
app.post("/inscriere", (req, res) => {
    const persoana ={
        nume: req.body.nume,
        prenume: req.body.prenume,
        telefon: req.body.telefon,
        email: req.body.email,
        facultate: req.body.facultate,
        an: req.body.an,
        facebook: req.body.facebook,
        specializare: req.body.specializare,
        //cv: req.body.cv,
        more: req.body.more,
        regulament: req.body.regulament,
        gdpr: req.body.gdpr
       
    }
  let error = [];
  
  if (!persoana.nume) {
    console.log('Nu ați introdus numele');
    error.push('Nu ați introdus numele');
} else if (!persoana.nume.match(/^(?!-)(?!.*--)[A-ZÂĂÎȘȚa-zăâîșț-\s]+(?<!-)$/)) {
    console.log('Numele trebuie să conțină doar litere');
    error.push('Numele trebuie să conțină doar litere');
}

if (!persoana.prenume) {
    console.log('Nu ați introdus prenumele');
    error.push('Nu ați introdus prenumele');
} else if (!persoana.prenume.match(/^(?!-)(?!.*--)[A-ZÂĂÎȘȚa-zăâîșț-\s]+(?<!-)$/)) {
    console.log('Prenumele trebuie să conțină doar litere');
    error.push('Prenumele trebuie să conțină doar litere');
}

if (!persoana.telefon) {
    console.log('Nu ați introdus numărul de telefon');
    error.push('Nu ați introdus numărul de telefon');
} else if (!persoana.telefon.match(
    /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/)) {
    console.log('Formatul telefonului este invalid');
    error.push('Formatul telefonului este invalid');
}
if (!persoana.email) {
    console.log('Nu ați introdus email-ul');
    error.push('Nu ați introdus email-ul');
} else if (!persoana.email.match('^[A-Za-z]{1,}[a-zA-Z0-9_.-]+@[a-zA-Z]+\.[a-zA-Z]{1,}$')) {
    console.log('Formatul email-ului este invalid');
    error.push('Formatul email-ului este invalid');
}

if(persoana.facebook) {
 if (!persoana.facebook.match('(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?')) { //FB-ul este optional
    console.log('Adresa de Facebook este invalidă');
    error.push('Adresa de Facebook este invalidă');
 }
}


if (!persoana.facultate) {
    console.log('Nu ați introdus facultatea!');
    error.push('Nu ați introdus facultatea!');
}

if (!persoana.an) {
    console.log('Nu ați introdus anul universitar');
    error.push('Nu ați introdus anul universitar');
}

//Specializarea este optionala

// if (!persoana.cv) {
//     console.log('Nu ați incărcat CV-ul');
//     error.push('Nu ați incărcat CV-ul');
// }
// console.log("2nd debuger");
// if (persoana.cv.size > 2097152) { // 2 mb for bytes.
//          console.log('Fișierul nu trebuie să depășească 2MB.');
//          error.push('Fișierul nu trebuie să depășească 2MB.');    
// }


if (!persoana.regulament) {
    console.log('Trebuie să fiți de acord cu regulamentul');
    error.push('Trebuie să fiți de acord cu regulamentul');
}

if (!persoana.gdpr) {
    console.log('Trebuie să fiți de acord cu regulamentul GDPR');
    error.push('Trebuie să fiți de acord cu regulamentul GDPR');
}
          if(error.length === 0) {
            
            const sql = 
            'INSERT INTO persoane_inscrise (nume,prenume,telefon,email,facultate,an,facebook,specializare,more)  VALUES (?,?,?,?,?,?,?,?,?)';
            connection.query(sql,
              [
              persoana.nume, 
              persoana.prenume, 
              persoana.telefon, 
              persoana.email, 
              persoana.facultate,
              persoana.an,
              persoana.facebook,
              persoana.specializare,
              //persoana.cv,
              persoana.more,
              persoana.regulament,
              persoana.gdpr
              ],
              function(err, result) {
                 
                  if (err) throw err;
                 
                  console.log("Student inscris in baza de date!");
                  res.status(200).send({
                  message: "Student inscris in baza de date!" 
                  });
              console.log(sql);
          });
         } else {
          res.status(500).send(error);
          console.log("Eroare la inserarea in baza de date!");
         }
});
