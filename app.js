/*const express = require('express')

const app = express()
// create the server from express library 
const port = 3000
// is there is a get request on the port then call the callback function which sends the data
// 
app.get('/home', (req,res) => {
  console.log("request recived")
  // res.send('Hello World!')
  response.json({
    message:"get the get request"
  })

})

// we do not have to pass the listener function to the server because express is giving us the 
// // inuid express listener function 

// app.post('/home ',(request,response)=>{
//   response.json({
//     message:"ok get the post request"
//   })
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
console.log("jj")
*/
const express = require('express');
const https = require('node:https');
const app = express();
const port = 3000;



//creating middle ware

const middleware = (req,res,next)=>{
   return res.json({
    message:"hii from the first middleware"
  })
  console.log("hii from the first middle ware ")
  next()
}

// cteating the middleware chaining
const middle = (req,res,next)=>{
  console.log("calling from the second middleware")
  // sending the  json data from the middleware
  return res.json({
    message:"this is coming from the middleware"
  })
  next()
}
const middlewarearr=[ middleware , middle]
app.get('/home',middlewarearr,(req, res) => {
  console.log("request received");
  res.json({
    message: "get the get request"
  });
});
// this olyy print the single response because if the get function called then it cal the middleware which response json and the second middlewarre 
// never called 

// when you send the request to the server your request frist goes to the middleware then if the middleware is having the n
// next middleware then it frist complete the  chain then to the request handler 

// you can also right all of the middleware in the array [] and pass tis array so you dont hanve to write again and again 

app.post('/home',middleware,middle,(req,res)=>{
   res.json({
    message:"get the post request"
     })
})
// self finding -- only one response can be rendered inthe screnn agat vo middel w

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// why middleware are important?
/*middleware are the frist line of deffence we are having whatever the request is coming it id fristly go to the middleware and last middle ware is pass the request 
to the controller and all this middle ware works as filter which filer the finla reqrest which goes to the backend 

why middleware 
--let's have a situation wher you have to build an api where user have to post the blog on the site 
so in this blog it is mandatort to have a name ,description and basic features
if the user requesting without any of these then you are having middleware which handlles tis task to check all the details
and in middleware you can do request validation which will make your backend efficent 

once these requsets done wirth the middleware things come to the controller 

controller--these controller sends the requeset to the models layer 
and prepares the response object
--when controller pass the request to the models layer then model perform the logic on the requsr and sends back to the controller
then this controller makes the json structur ans send to the client 

dirict json send karne se error aa rahi thi sab chal sahi raha tha terninal me  error aa rahi thi 
jo ki return lagane se sahi ho jayagi 
if you do no put return the the function still callthe next middleware and express shows the error */