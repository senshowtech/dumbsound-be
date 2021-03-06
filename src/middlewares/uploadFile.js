const multer = require("multer");

exports.uploadFile = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp3)$/)
    ) {
      req.fileValidationError = {
        message: "file hanya boleh gambar atau music",
      };
      return cb(new Error("file hanya boleh gambar atau music"), false);
    }
    cb(null, true);
  };

  const sizeInMB = 10;
  const maxSize = sizeInMB * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "song", maxCount: 1 },
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.files && !err)
        return res.status(400).send({
          message: "Silahkan Pilih Gambar",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file size 10MB",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
