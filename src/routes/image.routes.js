const { Router } = require('express'); 

const router = new Router();

const path = require('path');
const multer = require('multer');
const fs = require('fs');

// RENDER FORM UPLOAD
router.get('/images/upload', (req, res) => {
    res.render('index');
});

// UPLOAD V1 - general Middlware
// router.post('/images/upload', (req, res) => {
//     console.log(req.file);
//     res.send('received');
// });

// UPLOAD V2 - pre execution of a function
// saving with its original name
// router.post('/images/upload', multer({
//     dest: path.join(__dirname, '../public/uploads'),
// }).single('image'), (req, res, next) => {
//     console.log(req.file);
//     const ext = path.extname(req.file.originalname).toLocaleLowerCase();
//     fs.rename(req.file.path, `./src/public/uploads/${req.file.originalname}`, () => {
//         res.send('received');
//     });
// });

// UPLOAD V3- using general middleware
// router.post('/images/upload', (req, res) => {
//     res.send('uploaded');
// });

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');

router.post('/images/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
});

router.get('/images', (req, res) => {});


module.exports = router;