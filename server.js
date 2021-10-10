const express = require('express');
const multer = require('multer');
const path = require('path');
const imageSchema = require("./model");
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();

var localFilename;

app.use(express.static('public'));

app.get('/', (req, res) => {
  imageSchema.find()
    .then((data) => {
      res.json(data);
    })
});

//  path.extname('index.html')
//app.use('/uploads', express.static(__dirname +'/uploads'));


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     localFilename = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png';
//     cb(null, localFilename);
//   }
// })

//var base64str = base64_encode('C:\Users\hp\Desktop\myFile.jpeg');
//console.log(base64str);

//function base64_encode(file) {
//  return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
//}

//  var upload = multer({ storage: storage })
// app.post('/upload', upload.single('image'), async(req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next("hey error")
//   }


//     const imagepost= new model({
//       image: file.path
//     })
//     const savedimage= await imagepost.save()
//     res.json(savedimage)

// })
// function base64_encode(file) {
//   var bitmap = fs.readFileSync(file);
//   return Buffer.from(bitmap).toString('base64');
// }
//ar base64str = base64_encode('uploads/image-1626839061159-128991794.png');
//fs.writeFileSync('./aa',base64str);
//console.log(base64str);

app.get('/image/:id/:index', (req, res) => {
  const id = req.params.id;
  const index = req.params.index;
  res.setHeader('content-type', 'image/jpg')
  imageSchema.findById(id)
    .then(result => {
      const buffer = Buffer.from(result.image[index], 'base64');
      fs.writeFileSync('images/out.jpg', buffer);
      res.sendFile('images/out.jpg', { root: __dirname });
    })
})

// app.post("/", upload.single('image'), (req, res, next) => {
//   const user = new imageSchema({
//     name: req.body.name,
//     contact: req.body.contact,
//     image: base64str
//   });
//   user.save().then(result => {
//     console.log(result);
//     res.status(201).json({
//       message: "Created user successfully",
//       createdUser: {
//         name: result.name,
//         contact: result.contact,
//         image: result.image
//         // request: {
//           // type: 'GET',
//           // url: "http://localhost:3000/upload/"
//         // }
//       }
//     })
//   })
// });

const dbURI = 'mongodb+srv://aadi:aadi123@test.w07kh.mongodb.net/genera?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => app.listen(3000)) // listen to requests only after dB is connected
  .catch((err) => console.log(err));
