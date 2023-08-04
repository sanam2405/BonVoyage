// const jwt = require("jsonwebtoken");
// const Register = require("../models/registration");

// const func = async(req,res) =>{
//     try{

//         const token = req.cookies.jwt;
//         const verifyUser = jwt.verify(token,process.env.SECRET_KEY_JWT);
//         const user = await Register.findOne({_id:verifyUser._id});
//         console.log(user);

//         req.token=token;
//         req.user=user;

//     }catch(error){
//         res.status(401).send(error);
//     }    
// }


const usernameContainer = document.getElementById("usernameContainer");
const userData = localStorage.getItem("userData");
const parsedUserData = userData ? JSON.parse(userData) : null;

if (parsedUserData && parsedUserData.username) {
    usernameContainer.textContent = `Hello, ${parsedUserData.username}!`;
}else{
    location.href("/index.html")
}


