var Mail = require("./mail");

// account 1
var SenderMail = "slljndx1989@gmail.com";
var SenderPassword = "xgypiqrkmijkhzgq";

// var SenderMail = "sid.shi@nirvana-info.com";
var TargetMail = "18262272638@163.com";

var config = {
  mail: {
    user: SenderMail,
    pass: SenderPassword,
    onError: {
      to: [TargetMail]
    },
    onInfo: {
      to: [TargetMail]
    }
  }
};

// new Mail(config).onError(title, content);
new Mail(config.mail).onInfo("success", "test success");
// new Mail(config.mail).verify();
