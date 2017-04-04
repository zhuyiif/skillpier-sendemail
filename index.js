var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zhuyi8319@gmail.com',
        pass: '5223637'
    }
});

// setup email data with unicode symbols




app.get('/sendemail/:info', function (req, res) {

console.log("info = ", req.params.info);

let mailOptions = {
    from: 'zhuyi8319@gmail.com', // sender address
    to: 'zhuyiif@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: req.params.info, // plain text body
    html: req.params.info // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


  res.send('Hello World')
})

app.post('/sendemailp', function(req, res) {
 

  let mailOptions = {
    from: 'zhuyi8319@gmail.com', // sender address
    to: 'zhuyiif@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: req.body.firstname + "#" + req.body.lastname, // plain text body
    html: req.params.info // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);

     res.send('You sent the name ' + req.body.firstname + " last:" + req.body.lastname);
});


});

app.listen(9876)