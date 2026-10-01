import multer from "multer";
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    const uniqusuffix =Date.now()+ '-' + Math.round (Math.random()* 1E9 )
    cb(null, file.filename + '-' + uniqusuffix)
      }
  
})
export const upload = multer({storage: storage  })