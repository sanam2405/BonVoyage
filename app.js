const express = require('express');
const app = express();
const bcrypt = require("bcryptjs");
// const port = process.env.PORT || 3000;
const port = 3000; // Choosing a port for your server
require("./assets/db/conn");
const Register = require("./assets/models/registration");


console.log(__dirname);

// Serving static files from the 'assets' directory
app.use(express.static('assets'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
  

// Defining your routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/',async(req,res)=>{
  try{

    formvalue=req.body.formValue;

    if(formvalue==="form1"){
      const email = req.body.email1;
      const password = req.body.password1;

      const useremail = await Register.findOne({email:email});

      const isMatch = await bcrypt.compare(password,useremail.password);

      if(isMatch){
        res.status(201).send("success");
      }else{
        res.send("Invalid Credentials");
      }

    }

    else if(formvalue==="form2"){

      const password = req.body.password;
      const cpassword = req.body.confirmpassword;

      if(password===cpassword){

        const registerUser = new Register({
          email : req.body.email,
          username : req.body.username,
          password : req.body.password,
          confirmpassword : req.body.confirmpassword
        })

        const registered= await registerUser.save();
        res.sendFile(__dirname+'/index.html');

      }else{
        res.send("passwords are not matching");
      }
    }

  } catch (error) {
    res.status(400).send(error);
  }
})

app.get('/navigation', (req, res) => {
  res.sendFile(__dirname + '/navigation.html');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
