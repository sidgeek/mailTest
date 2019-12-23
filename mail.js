// import * as nodemailer from "nodemailer";
var nodemailer = require("nodemailer");

class Mail {
  constructor(opt) {
    if (opt == null || typeof opt !== "object") {
      throw Error("parameter opt must be a valid object");
    }

    if (opt.user == null || opt.pass == null) {
      throw Error("parameter opt must have properties user and pass");
    }

    if (opt.onError == null || opt.onError.to == null) {
      throw Error(
        'parameter opt must have property onError like "onError": {"to": ["xxx@yyy.com"]}'
      );
    }

    if (opt.onInfo == null || opt.onInfo.to == null) {
      throw Error(
        'parameter opt must have property onInfo like "onInfo": {"to": ["xxx@yyy.com"]}'
      );
    }

    this.opt = opt;
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp-relay.gmail.com", //"smtp.gmail.com"  "localhost" 'smtp-relay.gmail.com'
      // port: 587,
      auth: {
        user: this.opt.user,
        pass: this.opt.pass
      }
    });

    console.log("dg>> transporter params:", this.transporter.options);
  }

  onError(title, error) {
    return this.send("[Error]", title, this.opt.onError.to.join(" ,"), error);
  }

  onInfo(title, info) {
    return this.send("[Info]", title, this.opt.onInfo.to.join(" ,"), info);
  }

  send(tag, title, to, content) {
    let mailOptions = {
      from: this.opt.user,
      to: to,
      subject: `${tag} ENV:${process.env.NODE_ENV} - ${title}`,
      text: content
    };

    let _this = this;
    return new Promise((resolve, reject) => {
      _this.transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve({ info });
        }
      });
    });
  }

  verify() {
    this.transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages", success);
      }
    });
  }
}

// export default Mail;
module.exports = Mail;
