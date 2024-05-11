const express = require("express");
const app = express();
const db = require("./config/db");
const morgan = require("morgan");
const route = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//connect to mongodb
db.connect();
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(passport.initialize());
//Follow a server status
// app.use(morgan("combined"));
//Router
route(app);
//PORT
const PORT = process.env.PORT || 3000;
//Listen at
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
