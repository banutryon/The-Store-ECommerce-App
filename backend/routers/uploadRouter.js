import multer from "multer";
import express from "express";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { isAuth } from "../utils.js";
import config from "../config.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${Date.now()}.jpeg` ||
				`${Date.now()}.jpg` ||
				`${Date.now()}.png` ||
				`${Date.now()}.svg`
		);
	},
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`);
});

aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY_ID,
	secretAccessKey: config.AWS_SECRET_ACCESS_KE,
});

const s3 = new aws.S3();
const storageS3 = multerS3({
	s3,
	bucket: "thestore-bucket",
	acl: "public-read",
	contentType: multerS3.AUTO_CONTENT_TYPE,
	key(req, file, cb) {
		cb(null, file.originalname);
	},
});
const uploadS3 = multer({ storage: storageS3 });
uploadRouter.post("/s3", uploadS3.single("image"), (req, res) => {
	res.send(req.file.location);
});
export default uploadRouter;
