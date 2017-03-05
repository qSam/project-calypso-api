const api_key = 'key-aeef4a8a2f3aebef7a61dde586fae5e6';
const domain = 'sandbox5077d4bfd5344f9b9efea5e3352d6837.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


exports.sendEmail = function(req, res, next) {

const toEmail = req.body.toEmail;

if(!toEmail) {
  return res.status(422).send({Error:'To Email not provided'});
}


toEmail.forEach( (email) => {
  var data = {
    from: 'project.calypso.1988@gmail.com',
    to: email,
    subject: 'Hello from Calypso API : ' + email,
    text: 'Hey There Bud'
  };

  mailgun.messages().send(data, function (error, body) {
    if(error){
      console.log("Error is : ", error);
    }
    console.log(body);
  });
});




res.send({"Message" : "Email has been sent"});

}
