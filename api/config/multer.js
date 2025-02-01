import multer from 'multer'

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

function fileFilter(req, file, cb) {
    const allowedFiles = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg', 'image/webp']
    if (!allowedFiles.includes(file.mimetype)) {
        cb(new Error('Only images are allowed'),false)
    } else {
        cb(null, true)
    }
   
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload;