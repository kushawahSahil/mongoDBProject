var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        user: 'kushawah.sahil2001@gmail.com',
        pass: '7698015148'
    }
});

const otpsend = (email, otp) => {
    let mailDetail = {
        to: email,
        subject: "OTP for new password",
        html: "<h3>OTP for new password is</h3>" + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
    }
    let mailSending = transporter.sendMail(mailDetail, function(error, info){
        if (error) {
            console.log(error);
        }else{
            console.log(' Email sent: '+ info.response);
        }
    })
    return mailSending;
};

module.exports = { otpsend };