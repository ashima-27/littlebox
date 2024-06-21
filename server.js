require("dotenv").config();
const express = require("express"); // adding exress npm i express
const mongoose = require("mongoose"); //adding mongoose npm i mongoose
const app = express();
const multer = require("multer");
const fs = require("fs");
const webpush = require("web-push");
const dbconfig = require("./database/db");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser"); //ading body-parser
app.use(express.urlencoded({ extended: false })); // always use this before making api
app.use(express.json());
const CryptoJS = require("crypto-js");

// cors :-  it means we are sending data from port 4200 t0 3000 or different ports ,c= cross o= origin  r= resource s= sharing
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

console.log(webpush.generateVAPIDKeys());

const publicKey =
  "BPyCNBNBSA0d_iZ0hRlvd-_R4k-w7fpRCI6HNedgwadFMnS3_Vx9ojPtlkbeSlYmgbZhyciOXSI7cjeHIVRpyxI";
const privateKey = "cp5SO50ityDzjfU9bBuAuMXS6-zTkFqXy_OSvYYTDnM";

const DIR = "src/uploads";

var picname;

let mystorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    picname = Date.now() + file.originalname;
    cb(null, picname);
  },
});

let upload = multer({ storage: mystorage });

// ********************************************************************************************************//

// schema
var SignupSchema = new mongoose.Schema(
  {
    name: "String",
    phone: "String",
    username: { type: "String", unique: true },
    password: String,
    cpassword: String,
    usertype: String,
    activated: Boolean,
    userhash: String,
  },
  { versionKey: false }
);

//  model
var Signup = mongoose.model("signup", SignupSchema, "signup");

// signup api
app.post("/api/signup", function (req, res) {
  var uhash = CryptoJS.MD5(Date.now() + req.body.username).toString();
  console.log(uhash.toString());
  // connection
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("connection successful");
  console.log(req.body);

  // collection
  var newsignup = new Signup({
    name: req.body.name,
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password,
    cpassword: req.body.cpassword,
    usertype: req.body.usertype,
    activated: false,
    userhash: uhash,
  });
  //  saving data
  newsignup.save(function (err) {
    if (err) {
      console.log(err);
      res.send("Error  while signing up, try again ");
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      var mailoptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: req.body.username,
        subject: " Activation Mail from Website signup Page",
        html:
        // "Hello  " +
        // req.body.name +
        // "<br><br> Thanks for Signing up ,.<br>Regards<br>Littebox.com",

          "Hello  " +
          req.body.name +
          "<br><br> Thanks for Signing up . Click on the  link to activate your account.<br><a href='http://localhost:4200/activate?code=" +
          uhash +
          "'>Activate Account </a><br>Regards<br>Littlebox.com",
      };
      transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
          console.log("Error sending mail" + error);
        } else {
          console.log("Mail send" + info.response);
        }
      });

      res.send("Signup Successfull ");
      console.log("done");
    }
    mongoose.connection.close();
  });
});

//  signin api
app.post("/api/signin", function (req, res) {
  // connection
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);

  //  fetching username and password for log in
  Signup.find({ username: req.body.uname }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("err ");
    } else {
      console.log(req.body);
      console.log("hello");
    console.log(req.body);
    var userid=data[0].name;
     console.log("userid: " + userid);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      var mailoptions = {
        from:process.env.NODEMAILER_EMAIL,
        to: req.body.uname,
        subject: "Sign In/ Login ",
        html:

        "Hey " +

          "<br><br> Thanks for Signing In .<br>Regards Littlebox.com ",

    };
      transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
          console.log("Error sending mail" + error);
        } else {
          console.log("Mail send" + info.response);
        }
      });
      res.send(data);
    }
    mongoose.connection.close();
  });
});

//  changepassword api
app.put("/api/updatepass", function (req, res) {
  // connection
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);

  // fetching old password and then replacing it with new password
  Signup.updateOne(
    { username: req.body.uname },
    {
      $set: { password: req.body.newpass },
    },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send("err ");
      } else {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user:process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
          },
        });
        var mailoptions = {
          from:process.env.NODEMAILER_EMAIL,
          to: req.body.username,
          subject: "Update Password",
          html:

            "Hello  " +
            req.body.name +
            "<br><br> Password Updated .<br>Regards<br>Littlebox.com",
        };
        transporter.sendMail(mailoptions, function (error, info) {
          if (error) {
            console.log("Error sending mail" + error);
          } else {
            console.log("Mail send" + info.response);
          }
        });
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }
  );
});

//  activated true api

app.put("/api/getacode", function (req, res) {
  // connection
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  console.log(req.query.ac);
  // fetching old password and then replacing it with new password
  Signup.updateOne(
    { userhash: req.query.ac },
    {
      $set: { activated: true },
    },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send("err ");
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }
  );
});

//reset pass shema

var resetpasswordSchema = new mongoose.Schema(
  {
    username: String,
    userhash: String,
    exptime: String,
  },
  { versionKey: false }
);

//  model
var resetpassmodel = mongoose.model(
  "resetpassmodel",
  resetpasswordSchema,
  "resetpassmodel"
);

//  forgetpassword api
app.post("/api/forgetpassword", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("connection successful");
  console.log(req.body);

  // connection
  // mongoose.connect(dbconfig.mongopath,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
  // console.log(req.query);

  // fetching old password and then replacing it with new password
  Signup.find({ username: req.body.uname }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("err ");
    } else {
      console.log(data);
      // console.log("find");
      if (data.length == 0) {
        res.send("Incorrect username ");
      } else {
        var uhash = CryptoJS.MD5(Date.now() + req.body.uname).toString();
        var minutesToAdd = 15;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        var newresetpass = new resetpassmodel({
          username: req.body.uname,
          userhash: uhash,
          exptime: futureDate,
        });
        newresetpass.save(function (err) {
          if (err) {
            console.log(err);
            res.send("error  while sending link  !");
          } else {
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user:process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS,
              },
            });
            var mailoptions = {
              from: process.env.NODEMAILER_EMAIL,
              to: req.body.uname,
              subject: "Reset Password Mail from Littlebox",
              html:
                "  Hello  " +
                data[0].name +
                "<br><br> Click On the link to Reset your Password <br><a href='http://localhost:4200/forgetpassword?code=" +
                uhash +
                "'>Reset Password </a><br>Regards<br>Littlebox.com",
            };

            transporter.sendMail(mailoptions, function (error, info) {
              if (error) {
                console.log("Error sending mail" + error);
              } else {
                console.log("Mail send" + info.response);
              }
            });

            res.send(
              "Reset password  link has been sent , Please check your mail "
            );
          }

          mongoose.connection.close();
        });
      }
    }
  });
});

//checktime api

app.get("/api/checktime", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  resetpassmodel.find({ userhash: req.query.hash }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});

//search user for reset pass
app.get("/api/getuser", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  resetpassmodel.find({ userhash: req.query.user }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});

//  searchuser api
app.get("/api/searchuser", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  // searching user through username ie.email
  Signup.find({ username: req.query.username }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// list of members api

app.get("/api/memlist", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  // we are finding list of members hence we need all the info related to user so we r using find() method
  Signup.find(function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// delete user api
app.delete("/api/deleteuser", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  Signup.deleteOne({ _id: req.query.uid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed! ");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// ********************************************************************************************************//

// category Schema

var CategorySchema = new mongoose.Schema(
  {
    categoryname: "String",
    categorypic: "String",
  },
  {
    versionKey: false,
  }
);

// category model

var managecatmodel = mongoose.model("managecat", CategorySchema, "managecat");

//category api

// 1. add category api
app.post("/api/addcat", upload.single("catpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);
  if (!req.file) {
    picname = "noimage.jpg";
  }

  var cat = new managecatmodel({
    categoryname: req.body.cname,
    categorypic: picname,
  });
  cat.save(function (err) {
    if (err) {
      console.log(err);
      res.send("failed  ");
    } else {
      res.send("category added successfully ");
    }
    mongoose.connection.close();
  });
});

// 2.fetching all categories

app.get("/api/getallcat", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  managecatmodel.find(function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// 3.updating the categories

app.put("/api/updatecat", upload.single("catpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  if (!req.file) {
    picname = req.body.oldpicname;
    //* copying old name into variable for saving into database
  } else {
    if (req.body.oldpicname != "noimage.jpg") {
      fs.unlink("src/uploads/" + req.body.oldpicname, (err) => {
        if (err) throw err;
        else console.log("file was deleted");
      });
    }
  }
  managecatmodel.updateOne(
    { _id: req.body.cid },
    { $set: { categoryname: req.body.cname, categorypic: picname } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

// 4. delete cat

app.delete("/api/deletecat", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  managecatmodel.deleteOne({ _id: req.query.cid }, function (err, data) {
    // managecatmodel.deleteMany({categoryname:req.query.name},function(err,data){
    if (err) {
      console.log(err);
      res.send("failed! ");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});
// ********************************************************************************************************//

// ********************************************************************************************************//

//  women category Schema

var WCategorySchema = new mongoose.Schema(
  {
    categoryname: "String",
    categorypic: "String",
  },
  {
    versionKey: false,
  }
);

// category model

var managewcatmodel = mongoose.model(
  "managewcat",
  WCategorySchema,
  "managewcat"
);

//category api

// 1. add category api
app.post("/api/addwcat", upload.single("catpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);
  if (!req.file) {
    picname = "noimage.jpg";
  }

  var wcat = new managewcatmodel({
    categoryname: req.body.cname,
    categorypic: picname,
  });
  wcat.save(function (err) {
    if (err) {
      console.log(err);
      res.send("failed");
    } else {
      res.send("category added successfully");
    }
    mongoose.connection.close();
  });
});

// 2.fetching all categories

app.get("/api/getallwcat", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  managewcatmodel.find(function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// 3.updating the categories

app.put("/api/updatewcat", upload.single("catpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  if (!req.file) {
    picname = req.body.oldpicname;
    //* copying old name into variable for saving into database
  } else {
    if (req.body.oldpicname != "noimage.jpg") {
      fs.unlink("src/uploads/" + req.body.oldpicname, (err) => {
        if (err) throw err;
        else console.log("file was deleted");
      });
    }
  }
  managewcatmodel.updateOne(
    { _id: req.body.cid },
    { $set: { categoryname: req.body.cname, categorypic: picname } },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
});

// 4. delete cat

app.delete("/api/deletewcat", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  managewcatmodel.deleteOne({ _id: req.query.cid }, function (err, data) {
    // managecatmodel.deleteMany({categoryname:req.query.name},function(err,data){
    if (err) {
      console.log(err);
      res.send("failed!");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});
// ********************************************************************************************************//

// subcat schema

var SubCategorySchema = new mongoose.Schema(
  {
    catid: String,
    subcatname: String,
    subcatpic: String,
  },
  { versionKey: false }
);

// subcat model
var subcatmodel = mongoose.model("subcat", SubCategorySchema, "subcat");

// subcat adding data api
app.post("/api/addsubcat", upload.single("scatpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);

  if (!req.file) {
    picname = "noimage.jpg";
  }

  var newsubcat = new subcatmodel({
    catid: req.body.cid,
    subcatname: req.body.scname,
    subcatpic: picname,
  });

  // saving data using save()
  newsubcat.save(function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// delete subcat
app.delete("/api/deletesubcat", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  subcatmodel.deleteOne({ _id: req.query.catid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed! ");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

//  fetching all data of subcat
app.get("/api/fetchsubcatdetails", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  subcatmodel.find({ _id: req.query.scid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed! ");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// updating the subcat data
app.put("/api/updatesubcat", upload.single("scatpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  if (!req.file) {
    picname = req.body.oldpicname;
    //  admin want to retain old pic so here we r copying old name into the variable for saving into database
  } else {
    if (req.body.oldpicname != "noimage.jpg") {
      fs.unlink("src/assets/" + req.body.oldpicname, (err) => {
        //    if(err) throw err;
        console.log("file was deleted 🗑");
      });
    }
  }

  //    catid:req.body.cid,
  subcatmodel.updateOne(
    { _id: req.body.scid },
    {
      $set: {
        catid: req.body.cid,
        subcatname: req.body.scname,
        subcatpic: picname,
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }

      mongoose.connection.close();
    }
  );
});
// showing data in already subcat
app.get("/api/getallprod", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  subcatmodel.find({ catid: req.query.cid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});
// ********************************************************************************************************//

// Product Schema

var ProductSchema = new mongoose.Schema(
  {
    catid: String,
    subcatid: String,
    prodname: String,
    rate: Number,
    discount: Number,
    Stock: Number,
    description: String,
    Productpic: String,
  },
  { versionKey: false }
);

// product Schema

var Productmodel = mongoose.model("product", ProductSchema, "product");

// add product api
app.post("/api/addproduct", upload.single("prodpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);

  if (!req.file) {
    picname = "noimage.jpg";
  }

  var newproduct = new Productmodel({
    catid: req.body.cid,
    subcatid: req.body.scid,
    prodname: req.body.pid,
    rate: req.body.rate,
    discount: req.body.discount,
    Stock: req.body.stock,
    description: req.body.descp,
    Productpic: picname,
  });

  newproduct.save(function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed ");
    } else {
      res.send("product added successfully ");
    }

    mongoose.connection.close();
  });
});

// fetching all data related to products
app.get("/api/getproditems", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  Productmodel.find({ subcatid: req.query.scid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed ");
    } else {
      // res.send("product added successfully");
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// getting products of only 1 type of subcategory
app.get("/api/fetchprodbysubcatid", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  Productmodel.find({ subcatid: req.query.scatid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// fetching all details of the products
app.get("/api/fetchproddetails", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  Productmodel.find({ _id: req.query.pid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});

app.get("/api/getallsubcat", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  Productmodel.find({ subcatid: req.query.scid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

app.get("/api/fetchproddetails", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  Productmodel.find({ _id: req.query.pid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});

app.delete("/api/deleteproduct", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  Productmodel.deleteOne({ _id: req.query.prodid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed! ");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// updateproduct

app.put("/api/product", upload.single("Productpic"), function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  if (!req.file) {
    picname = req.body.oldpicname;
    //  admin want to retain old pic so here we r copying old name into the variable for saving into database
  } else {
    if (req.body.oldpicname != "noimage.jpg") {
      fs.unlink("src/assets/" + req.body.oldpicname, (err) => {
        //    if(err) throw err;
        console.log("file was deleted 🗑");
      });
    }
  }
  Productmodel.updateOne(
    { pid: req.body.prodid },
    {
      $set: {
        subcatid: req.body.scid,
        prodname: req.bodyp.productname,
        Productpic: picname,
      },
    },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }

      mongoose.connection.close();
    }
  );
});
//Cart Apis

var CartSchema = new mongoose.Schema(
  {
    prodid: String,
    prodname: String,
    rate: Number,
    qty: Number,
    totalcost: Number,
    picture: String,
    username: String,
  },
  { versionKey: false }
);
var CartModel = mongoose.model("cart", CartSchema, "cart");

app.post("/api/addcart", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);
  var newcart = new CartModel({
    prodid: req.body.prodid,
    prodname: req.body.prodname,
    rate: req.body.rate,
    qty: req.body.qty,
    totalcost: req.body.totalcost,
    picture: req.body.picture,
    username: req.body.username,
  });
  newcart.save(function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("success ");
    }
    mongoose.connection.close();
  });
});

app.get("/api/fetchingcart", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    connectTimeoutMS: 30000,
    keepAlive: 1,
  });
  // console.log(req.query);
  CartModel.find({ username: req.query.uname }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      // console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});
app.get("/api/fetchcartbyitem", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  CartModel.find(
    { prodid: req.query.pid, username: req.query.un },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }
  );
});

app.put("/api/updatecartitem", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  // CartModel.updateOne({ _id: req.body.prodid}, { $set: { qty: req.body.newqty}}, function(err, data) {
  //         var updatecart=req.body;
  // for(let x=0;x<updatecart.length;x++)

  CartModel.updateOne(
    { prodid: req.body.pid, username: req.body.un },
    { $set: { qty: req.body.qty } },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send("Failed ");
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }
  );
});

app.delete("/api/deleteitem", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);

  CartModel.deleteOne({ _id: req.query.prodid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("failed! ");
    } else {
      console.log(data);
      res.send(data);
    }

    mongoose.connection.close();
  });
});

// checkout api

var CheckoutSchema = new mongoose.Schema(
  {
    username: String,
    billamt: Number,
    orderdt: Date,
    status: String,
    saddress: String,
    pmode: String,
    coname: String,
    cardno: String,
    holdername: String,
    cvv: String,
    exp: String,
  },
  { versionKey: false }
);

var checkoutmodel = mongoose.model("checkout", CheckoutSchema, "checkout");

app.post("/api/checkout", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.body);

  var orddt = new Date();

  var newcheckout = new checkoutmodel({
    username: req.body.username,
    billamt: req.body.billamt,
    orderdt: orddt,
    status: req.body.status,
    saddress: req.body.shipaddr,
    pmode: req.body.pmode,
    coname: req.body.coname,
    cardno: req.body.cardno,
    holdername: req.body.holdername,
    cvv: req.body.cvv,
    exp: req.body.exp,
  });

  newcheckout.save(function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });

      var mailoptions = {
        from:process.env.NODEMAILER_EMAIL,
        to: req.body.username,
        subject: " CheckOut Details",
        html:

          "Hello  " +
          req.body.name +
          "<br><br> Thanks for  Shopping with us. Click  On the link to check  the Status Of Your Products <a href='http://localhost:4200/orderhistory?uname=" +
          req.body.username +
          "'>Status Of Product </a><br>Regards <br>Littlebox.com",
      };
      transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
          console.log("Error sending mail" + error);
        } else {
          console.log("Mail send" + info.response);
        }
      });

      res.send("success ");
    }
    mongoose.connection.close();
  });
});

app.get("/api/getordernum", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  checkoutmodel
    .find({ username: req.query.un }, function (err, data) {
      if (err) {
        console.log(err);
        res.send("Failed ");
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    })
    .sort({ orderdt: -1 });
});

//update stock after the successful of order
app.put("/api/updatestock", function (req, res) {
  let updateresp;
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  var updatelist = req.body;

  for (let x = 0; x < updatelist.length; x++) {
    Productmodel.updateOne(
      { _id: updatelist[x].pid },
      { $inc: { Stock: -updatelist[x].qty } },
      function (err, data) {
        if (err) {
          updateresp = false;
          console.log(err);
        } else {
          updateresp = true;
          console.log(updateresp);
          console.log(data);
        }
      }
    );
  }
  console.log(updateresp);
  if (updateresp == true) {
    res.send("Successfully Updated ");
  } else {
    res.send("Updation Failed");
  }
});

// orderdetails api's
var orderprodsSchema = new mongoose.Schema(
  {
    orderid: String,
    pid: String,
    pname: String,
    prate: Number,
    qty: Number,
    tc: Number,
    ppic: String,
    username: String,
  },
  { versionKey: false }
);

var orderprodsmodel = mongoose.model(
  "orderproducts",
  orderprodsSchema,
  "orderproducts"
);

//insert order details for ordersuccess component
app.post("/api/orderitems", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  var neworder = req.body;
  // console.log(neworder);

  orderprodsmodel.insertMany(neworder, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
      res.send("Successfully inserted ");
      // res.send(neworder);
    }
  });
});

app.delete("/api/emptycart", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  CartModel.deleteMany({ username: req.query.un }, function (err, data) {
    if (err) {
      console.log(err);
      res.send("Failed ");
    } else {
      console.log(data);
      res.send("removed from cart successfully ");
    }
    mongoose.connection.close();
  });
});

app.get("/api/getuserorders", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  checkoutmodel
    .find({ username: req.query.un }, function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    })
    .sort({ orderdt: -1 });
});

app.get("/api/getorderprods", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  orderprodsmodel.find({ orderid: req.query.oid }, function (err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
    mongoose.connection.close();
  });
});

app.get("/api/getallorders", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  checkoutmodel
    .find(function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    })
    .sort({ orderdt: -1 });
});
app.get("/api/getallorders", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(req.query);
  checkoutmodel
    .find(function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    })
    .sort({ orderdt: -1 });
});

app.put("/api/updatetorderstatus", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  checkoutmodel.updateOne(
    { _id: req.body.oid },
    { $set: { status: req.body.nstatus } },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send("Failed ");
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }
  );
});

app.get("/api/fetchproductbyname", function (req, res) {
  mongoose.connect("mongodb://localhost/myprojdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  var pname = req.query.s;
  manageproduct.find(
    { pname: { $regex: ".*" + pname, $options: "i" } },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
        mongoose.connection.close();
      }
    }
  );
});

// search box header api

app.get("/api/fetchsearchprodbyname", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  var pname = req.query.s;
  Productmodel.find(
    { prodname: { $regex: ".*" + pname, $options: "i" } },
    function (err, data) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    }
  );
});

// schema
var ContactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    emailid: String,
    message: String,
    msgdate: String,
  },
  { versionKey: false }
);
var ContactModel = mongoose.model("contactus", ContactSchema, "contactus");

app.post("/api/contactus", function (req, res) {
  mongoose.connect(dbconfig.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  var msgdt = new Date();
  var newcontactus = new ContactModel({
    name: req.body.name,
    phone: req.body.phone,
    emailid: req.body.emailid,
    message: req.body.mess,
    msgdata: msgdt,
  });

  newcontactus.save(function (err) {
    if (err) {
      console.log(err);
      res.send("Error  while contacting , try again");
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      var mailoptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: "Message",
        html:
          "Name:- " +
          req.body.name +
          "<br>Phone:- " +
          req.body.phone +
          "<br>Email:- " +
          req.body.emailid +
          "<br>Message:- " +
          req.body.mess,
      };
      transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
          console.log("Error sending mail" + error);
        } else {
          console.log("Mail send" + info.response);
        }
      });
      res.send("Message sent Successfully");
    }
    mongoose.connection.close();
  });
});

app.listen(process.env.PORT, function (req, res) {
  console.log(`SERVER IS RUNNING AT PORT NO ${process.env.PORT}`);
});
