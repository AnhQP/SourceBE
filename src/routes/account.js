const express = require("express");
const router = express.Router();

const accountController = require("../app/controllers/AccountController");
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signin", accountController.signIn);
router.post("/signup", accountController.signUp);
router.get("/users/:userId", accountController.userId);
router.post("/friend-request", accountController.friendRequest);
router.get("/friend-request/:userId", accountController.friendRequestById);
router.post("/friend-request/accept", accountController.friendAccept);
router.get("/accepted-friends/:userId", accountController.friendAcceptById);
router.post(
  "/messages",
  upload.single("imageFile"),
  accountController.messages
);
router.get("/user/:userId", accountController.usersId);
router.get;
router.post;
router.get;
router.get;
module.exports = router;
