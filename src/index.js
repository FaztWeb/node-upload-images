const express = require('express');
const multer = require('multer');
const ejs = require('ejs');

const path = require('path');
const uuid = require('uuid/v4');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Multer Middlwares - Creates the folder if doesn't exists
// app.use(multer({dest: path.join(__dirname, 'public/uploads')}).single('image'));

// app.use(multer({
//     dest: path.join(__dirname, 'public/uploads'),
//     fileFilter: function (req, file, cb) {

//         var filetypes = /jpeg|jpg|png|gif/;
//         var mimetype = filetypes.test(file.mimetype);
//         var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("Error: File upload only supports the following filetypes - " + filetypes);
//     },
//     limits: {fileSize: 1000000},
// }).single('image'));

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'public/uploads'),
//     filename: (req, file, cb) => {
//         cb(null, uuid() + path.extname(file.originalname));
//     }
// });
// app.use(multer({storage}).single('image'));

// Routes
app.use(require('./routes/image.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});