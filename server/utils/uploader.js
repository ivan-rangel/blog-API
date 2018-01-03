const multer = require('multer');
const dateformat = require('dateformat')
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './profile_imgs/');
    },
    filename: (request, file, callback) => {
        let lastDotIndex = file.originalname.lastIndexOf(".");
        let name = file.originalname.slice(0, lastDotIndex)
        let extension = file.originalname.slice(lastDotIndex)
        let newName = `${name}-${dateformat(new Date(), 'isoDateTime')}${extension}`
        callback(null, newName)
    }
});

const uploader = multer({ storage: storage }).single('profile');

module.exports.uploader = uploader;