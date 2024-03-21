const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render('auth/login');
}

exports.postLogin = (req, res, next) => {
  const UserID = req.body.UserID; // Extract UserID from request body
  const password = req.body.password; // Extract password from request body

  console.log("UserID:", UserID); // Logging UserID for debugging

  User.getByUserID(UserID)
    .then(user => {
      if (!user[0][0]) {
        console.log("User not found");
        res.redirect('/login');
        return; // Added return to exit the function if user is not found
      }

      const storedPassword = user[0][0].password;
      console.log("Stored Password:", storedPassword);

      bcrypt.compare(password, storedPassword)
        .then(doMatch => {
          if (doMatch) {
            console.log("User and password match");
            req.session.isLoggedIn = true;
            req.session.userId = UserID;
            res.redirect('/');
          } else {
            console.log("Password does not match");
            res.redirect('/login');
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

}


exports.getSignUp = (req, res, next) => {
  console.log("get signup");
  res.render('auth/signup');
}



exports.SignUp = (req, res, next) => {
  const UserID = req.body.UserID;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const birthDate = req.body.birthDate;
  const Email = req.body.Email;
  const PhoneNumber = req.body.PhoneNumber;
  const password = req.body.password;
  const Street = req.body.Street;
  const City = req.body.City;
  const Country = req.body.Country;
  const Gender = req.body.Gender;
  User.getByUserID(UserID).then(user => {
    if (user[0][0]) {
      console.log("User ID already exists. Please choose a different User ID.");
      res.redirect('/signup');
    } else {
      console.log("User does not exist");
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          console.log(hashedPassword);
          const newUser = new User(UserID, FirstName, LastName, birthDate, Email, PhoneNumber, hashedPassword, Street, City, Country, Gender);
          newUser.save();
          req.session.isLoggedIn = true;
          req.session.userId = UserID;
          res.redirect('/');
        })
        .catch(err => console.log(err));
    }
  })
    .catch(err => console.log(err));

}