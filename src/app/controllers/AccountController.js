const User = require("../models/user");

const createToken = (userId) => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

  return token;
};

class AccountController {
  //[post] Sign Up    async signupPost(req, res, next) {
  async signUp(req, res, next) {
    const { name, email, password, image } = req.body;

    // create a new User object
    const newUser = new User({ name, email, password, image });

    // save the user to the database
    newUser
      .save()
      .then(() => {
        res.status(200).json({ message: "User registered successfully" });
      })
      .catch((err) => {
        console.log("Error registering user", err);
        res.status(500).json({ message: "Error registering the user!" });
      });
  }
  //[post] /login
  async signIn(req, res) {
    const { email, password } = req.body;

    //check if the email and password are provided
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email and the password are required" });
    }

    //check for that user in the database
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          //user not found
          return res.status(404).json({ message: "User not found" });
        }

        //compare the provided passwords with the password in the database
        if (user.password !== password) {
          return res.status(404).json({ message: "Invalid Password!" });
        }

        const token = createToken(user._id);
        res.status(200).json({ token });
      })
      .catch((error) => {
        console.log("error in finding the user", error);
        res.status(500).json({ message: "Internal server Error!" });
      });
  }
  //endpoint to access all the users except the user who's is currently logged in!
  userId(req, res, next) {
    const loggedInUserId = req.params.userId;

    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({ message: "Error retrieving users" });
      });
  }
  async friendRequest(req, res, next) {
    const { currentUserId, selectedUserId } = req.body;

    try {
      //update the recepient's friendRequestsArray!
      await User.findByIdAndUpdate(selectedUserId, {
        $push: { freindRequests: currentUserId },
      });

      //update the sender's sentFriendRequests array
      await User.findByIdAndUpdate(currentUserId, {
        $push: { sentFriendRequests: selectedUserId },
      });

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }
  async friendRequestById(req, res, next) {
    try {
      const { userId } = req.params;

      //fetch the user document based on the User id
      const user = await User.findById(userId)
        .populate("freindRequests", "name email image")
        .lean();

      const freindRequests = user.freindRequests;

      res.json(freindRequests);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  //[post] accept friend request
  async friendAccept(req, res, next) {
    try {
      const { senderId, recepientId } = req.body;

      //retrieve the documents of sender and the recipient
      const sender = await User.findById(senderId);
      const recepient = await User.findById(recepientId);

      sender.friends.push(recepientId);
      recepient.friends.push(senderId);

      recepient.freindRequests = recepient.freindRequests.filter(
        (request) => request.toString() !== senderId.toString()
      );

      sender.sentFriendRequests = sender.sentFriendRequests.filter(
        (request) => request.toString() !== recepientId.toString
      );

      await sender.save();
      await recepient.save();

      res.status(200).json({ message: "Friend Request accepted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  //[GET]  accept friend request
  async friendAcceptById(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate(
        "friends",
        "name email image"
      );
      const acceptedFriends = user.friends;
      res.json(acceptedFriends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async messages(req, res, next) {
    try {
      const { senderId, recepientId, messageType, messageText } = req.body;

      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        message: messageText,
        timestamp: new Date(),
        imageUrl: messageType === "image" ? req.file.path : null,
      });

      await newMessage.save();
      res.status(200).json({ message: "Message sent Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  ///endpoint to get the userDetails to design the chat Room header
  async usersId(req, res, next) {
    try {
      const { userId } = req.params;

      //fetch the user data from the user ID
      const recepientId = await User.findById(userId);

      res.json(recepientId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  //endpoint to fetch the messages between two users in the chatRoom
}
module.exports = new AccountController();
