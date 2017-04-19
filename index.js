var express = require('express')
var cors = require('cors');

var app = express()
var path = require('path');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cors());
const nodemailer = require('nodemailer');

var mailuser="zhuyiskillpier@gmail.com"

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailuser,
        pass: 'skillpier123'
    }
});

// setup email data with unicode symbols

app.use('/skillpier-action_files', express.static(path.join(__dirname + '/skillpier-action_files')))

app.use('/app.min.css', express.static(path.join(__dirname + '/app.min.css')))
app.use('/images', express.static(path.join(__dirname + '/images')))

app.use('/lib', express.static(path.join(__dirname + '/lib')))
app.get('/', function(req, res) {
    //res.sendfile('./skillpier-action.htm');
    res.sendFile(path.join(__dirname, '/', 'skillpier-pingpong.html'));
});


app.get('/payment',function(req,res){
  res.sendFile(path.join(__dirname, '/', 'skillpier-pay.html'));
});



app.get('/sendemail/:info', function (req, res) {

console.log("info = ", req.params.info);

  res.send('Hello World')
})

app.get('/sendemailp', function(req, res) {
 

var first = req.param('firstname');
  var last = req.param('lastname');
  

  let mailOptions = {
    from: mailuser, // sender address
    to: 'administrator@skillpier.com,zhuyi8319@163.com', // list of receivers
    subject: 'Hello Zack test', // Subject line
    text: first + "#" + last, // plain text body
    html: req.params.info // html body
};

// // send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);

   //  res.send('You sent the name ' + first + " last:" + last);
   res.redirect('/payment?name='+first+'&'+'phone='+last);
});


});




app.listen(9876);