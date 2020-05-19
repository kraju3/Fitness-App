const express = require('express');
const { check, validationResult } = require('express-validator');
// const userDao = require('../models/users_dao');
const bcrypt = require('bcrypt');
const axios = require('axios').default;
const Meals = require('../models/meals');

const saltingLevels = 11;
const router = express.Router();
const User = require('../models/users');
const Session = require('../models/sessions');
require('dotenv').config();

// console.log(process.env.API_KEY);
/* GET home page. */
router.get('/', (req, res) => {
  res.render('registration');
});

// eslint-disable-next-line prettier/prettier
router.get('/diet',(req,res_)=>{
  // console.log(`SESSION ID ${req.session.userid}`);
  Meals.findOne({ _id: req.session.userid })
    .exec()
    .then(async (res) => {
      // document exists
      if (res !== null) {
        const renderObject = {
          mon_breakfast_name: res.week.monday.meals[0].title,
          mon_breakfast_url: res.week.monday.meals[0].sourceUrl,
          mon_lunch_name: res.week.monday.meals[1].title,
          mon_lunch_url: res.week.monday.meals[1].sourceUrl,
          mon_dinner_name: res.week.monday.meals[2].title,
          mon_dinner_url: res.week.monday.meals[2].sourceUrl,
          tue_breakfast_name: res.week.tuesday.meals[0].title,
          tue_breakfast_url: res.week.tuesday.meals[0].sourceUrl,
          tue_lunch_name: res.week.tuesday.meals[1].title,
          tue_lunch_url: res.week.tuesday.meals[1].sourceUrl,
          tue_dinner_name: res.week.tuesday.meals[2].title,
          tue_dinner_url: res.week.tuesday.meals[2].sourceUrl,
          wed_breakfast_name: res.week.wednesday.meals[0].title,
          wed_breakfast_url: res.week.wednesday.meals[0].sourceUrl,
          wed_lunch_name: res.week.wednesday.meals[1].title,
          wed_lunch_url: res.week.wednesday.meals[1].sourceUrl,
          wed_dinner_name: res.week.wednesday.meals[2].title,
          wed_dinner_url: res.week.wednesday.meals[2].sourceUrl,
          thurs_breakfast_name: res.week.thursday.meals[0].title,
          thurs_breakfast_url: res.week.thursday.meals[0].sourceUrl,
          thurs_lunch_name: res.week.thursday.meals[1].title,
          thurs_lunch_url: res.week.thursday.meals[1].sourceUrl,
          thurs_dinner_name: res.week.thursday.meals[2].title,
          thurs_dinner_url: res.week.thursday.meals[2].sourceUrl,
          fri_breakfast_name: res.week.friday.meals[0].title,
          fri_breakfast_url: res.week.friday.meals[0].sourceUrl,
          fri_lunch_name: res.week.friday.meals[1].title,
          fri_lunch_url: res.week.friday.meals[1].sourceUrl,
          fri_dinner_name: res.week.friday.meals[2].title,
          fri_dinner_url: res.week.friday.meals[2].sourceUrl,
          sat_breakfast_name: res.week.saturday.meals[0].title,
          sat_breakfast_url: res.week.saturday.meals[0].sourceUrl,
          sat_lunch_name: res.week.saturday.meals[1].title,
          sat_lunch_url: res.week.saturday.meals[1].sourceUrl,
          sat_dinner_name: res.week.saturday.meals[2].title,
          sat_dinner_url: res.week.saturday.meals[2].sourceUrl,
          sun_breakfast_name: res.week.sunday.meals[0].title,
          sun_breakfast_url: res.week.sunday.meals[0].sourceUrl,
          sun_lunch_name: res.week.sunday.meals[1].title,
          sun_lunch_url: res.week.sunday.meals[1].sourceUrl,
          sun_dinner_name: res.week.sunday.meals[2].title,
          sun_dinner_url: res.week.sunday.meals[2].sourceUrl,
          mon_calories: res.week.monday.nutrients.calories,
          mon_protein: res.week.monday.nutrients.protein,
          mon_fat: res.week.monday.nutrients.fat,
          mon_carbs: res.week.monday.nutrients.carbohydrates,
          tue_calories: res.week.tuesday.nutrients.calories,
          tue_protein: res.week.tuesday.nutrients.protein,
          tue_fat: res.week.tuesday.nutrients.fat,
          tue_carbs: res.week.tuesday.nutrients.carbohydrates,
          wed_calories: res.week.wednesday.nutrients.calories,
          wed_protein: res.week.wednesday.nutrients.protein,
          wed_fat: res.week.wednesday.nutrients.fat,
          wed_carbs: res.week.wednesday.nutrients.carbohydrates,
          thurs_calories: res.week.thursday.nutrients.calories,
          thurs_protein: res.week.thursday.nutrients.protein,
          thurs_fat: res.week.thursday.nutrients.fat,
          thurs_carbs: res.week.thursday.nutrients.carbohydrates,
          fri_calories: res.week.friday.nutrients.calories,
          fri_protein: res.week.friday.nutrients.protein,
          fri_fat: res.week.friday.nutrients.fat,
          fri_carbs: res.week.friday.nutrients.carbohydrates,
          sat_calories: res.week.saturday.nutrients.calories,
          sat_protein: res.week.saturday.nutrients.protein,
          sat_fat: res.week.saturday.nutrients.fat,
          sat_carbs: res.week.saturday.nutrients.carbohydrates,
          sun_calories: res.week.sunday.nutrients.calories,
          sun_protein: res.week.sunday.nutrients.protein,
          sun_fat: res.week.sunday.nutrients.fat,
          sun_carbs: res.week.sunday.nutrients.carbohydrates,
        };
        res_.render('diet', renderObject);
      } else {
        res_.render('diet');
      }
    });
});
// eslint-disable-next-line no-unused-vars
router.post('/mealplan', (req, res_) => {
  axios
    .get(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.API_KEY}&timeFrame=week&targetCalories=${req.body.calories}&diet=${req.body.diet}`,
    )
    .then((res) => {
      const renderObject = {
        mon_breakfast_name: res.data.week.monday.meals[0].title,
        mon_breakfast_url: res.data.week.monday.meals[0].sourceUrl,
        mon_lunch_name: res.data.week.monday.meals[1].title,
        mon_lunch_url: res.data.week.monday.meals[1].sourceUrl,
        mon_dinner_name: res.data.week.monday.meals[2].title,
        mon_dinner_url: res.data.week.monday.meals[2].sourceUrl,
        tue_breakfast_name: res.data.week.tuesday.meals[0].title,
        tue_breakfast_url: res.data.week.tuesday.meals[0].sourceUrl,
        tue_lunch_name: res.data.week.tuesday.meals[1].title,
        tue_lunch_url: res.data.week.tuesday.meals[1].sourceUrl,
        tue_dinner_name: res.data.week.tuesday.meals[2].title,
        tue_dinner_url: res.data.week.tuesday.meals[2].sourceUrl,
        wed_breakfast_name: res.data.week.wednesday.meals[0].title,
        wed_breakfast_url: res.data.week.wednesday.meals[0].sourceUrl,
        wed_lunch_name: res.data.week.wednesday.meals[1].title,
        wed_lunch_url: res.data.week.wednesday.meals[1].sourceUrl,
        wed_dinner_name: res.data.week.wednesday.meals[2].title,
        wed_dinner_url: res.data.week.wednesday.meals[2].sourceUrl,
        thurs_breakfast_name: res.data.week.thursday.meals[0].title,
        thurs_breakfast_url: res.data.week.thursday.meals[0].sourceUrl,
        thurs_lunch_name: res.data.week.thursday.meals[1].title,
        thurs_lunch_url: res.data.week.thursday.meals[1].sourceUrl,
        thurs_dinner_name: res.data.week.thursday.meals[2].title,
        thurs_dinner_url: res.data.week.thursday.meals[2].sourceUrl,
        fri_breakfast_name: res.data.week.friday.meals[0].title,
        fri_breakfast_url: res.data.week.friday.meals[0].sourceUrl,
        fri_lunch_name: res.data.week.friday.meals[1].title,
        fri_lunch_url: res.data.week.friday.meals[1].sourceUrl,
        fri_dinner_name: res.data.week.friday.meals[2].title,
        fri_dinner_url: res.data.week.friday.meals[2].sourceUrl,
        sat_breakfast_name: res.data.week.saturday.meals[0].title,
        sat_breakfast_url: res.data.week.saturday.meals[0].sourceUrl,
        sat_lunch_name: res.data.week.saturday.meals[1].title,
        sat_lunch_url: res.data.week.saturday.meals[1].sourceUrl,
        sat_dinner_name: res.data.week.saturday.meals[2].title,
        sat_dinner_url: res.data.week.saturday.meals[2].sourceUrl,
        sun_breakfast_name: res.data.week.sunday.meals[0].title,
        sun_breakfast_url: res.data.week.sunday.meals[0].sourceUrl,
        sun_lunch_name: res.data.week.sunday.meals[1].title,
        sun_lunch_url: res.data.week.sunday.meals[1].sourceUrl,
        sun_dinner_name: res.data.week.sunday.meals[2].title,
        sun_dinner_url: res.data.week.sunday.meals[2].sourceUrl,
        mon_calories: res.data.week.monday.nutrients.calories,
        mon_protein: res.data.week.monday.nutrients.protein,
        mon_fat: res.data.week.monday.nutrients.fat,
        mon_carbs: res.data.week.monday.nutrients.carbohydrates,
        tue_calories: res.data.week.tuesday.nutrients.calories,
        tue_protein: res.data.week.tuesday.nutrients.protein,
        tue_fat: res.data.week.tuesday.nutrients.fat,
        tue_carbs: res.data.week.tuesday.nutrients.carbohydrates,
        wed_calories: res.data.week.wednesday.nutrients.calories,
        wed_protein: res.data.week.wednesday.nutrients.protein,
        wed_fat: res.data.week.wednesday.nutrients.fat,
        wed_carbs: res.data.week.wednesday.nutrients.carbohydrates,
        thurs_calories: res.data.week.thursday.nutrients.calories,
        thurs_protein: res.data.week.thursday.nutrients.protein,
        thurs_fat: res.data.week.thursday.nutrients.fat,
        thurs_carbs: res.data.week.thursday.nutrients.carbohydrates,
        fri_calories: res.data.week.friday.nutrients.calories,
        fri_protein: res.data.week.friday.nutrients.protein,
        fri_fat: res.data.week.friday.nutrients.fat,
        fri_carbs: res.data.week.friday.nutrients.carbohydrates,
        sat_calories: res.data.week.saturday.nutrients.calories,
        sat_protein: res.data.week.saturday.nutrients.protein,
        sat_fat: res.data.week.saturday.nutrients.fat,
        sat_carbs: res.data.week.saturday.nutrients.carbohydrates,
        sun_calories: res.data.week.sunday.nutrients.calories,
        sun_protein: res.data.week.sunday.nutrients.protein,
        sun_fat: res.data.week.sunday.nutrients.fat,
        sun_carbs: res.data.week.sunday.nutrients.carbohydrates,
      };
      Meals.findOne({ _id: req.session.userid })
        .exec()
        .then(async (doc) => {
          // document exists
          if (doc !== null) {
            await Meals.updateOne(
              { _id: req.session.userid },
              {
                week: {
                  monday: res.data.week.monday,
                  tuesday: res.data.week.tuesday,
                  wednesday: res.data.week.wednesday,
                  thursday: res.data.week.thursday,
                  friday: res.data.week.friday,
                  saturday: res.data.week.saturday,
                  sunday: res.data.week.sunday,
                },
              },
            );
          } else {
            new Meals({
              _id: req.session.userid,
              week: {
                monday: res.data.week.monday,
                tuesday: res.data.week.tuesday,
                wednesday: res.data.week.wednesday,
                thursday: res.data.week.thursday,
                friday: res.data.week.friday,
                saturday: res.data.week.saturday,
                sunday: res.data.week.sunday,
              },
            }).save();
          }
        });
      res_.render('diet', renderObject);
    });
});

router.get('/home', (req, res) => {
  res.render('dashboard');
});

const sendDashboard = (res) => {
  res.render('dashboard');
};

const registerError = (res, msg) => {
  res.render('registration', msg);
};

const HashPassword = async (req, res, saltRound) => {
  await bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
    // console.log(hash);
    // add user to database
    // console.log(req.body.firstname);
    req.session.loggedin = true;
    req.session.userid = req.body.email;

    new User({
      _id: req.body.username,
      _email: req.body.email,
      name: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
      password: {
        current: hash,
      },
    }).save();

    new Session({
      _id: req.body.email,
      session: req.session,
    }).save();

    // session
    // req.session.username = req.body.username;
    sendDashboard(res);
  });
};

const validateUser = (req, res) => {
  User.findOne({ _email: req.body.email })
    .exec()
    .then(async (doc) => {
      // document exists
      if (doc !== null) {
        // console.log(doc);
        const hash = doc.password.current;
        const value = await bcrypt.compare(req.body.password, hash);
        // console.log(value);
        if (value) {
          const id = req.body.email;
          req.session.userid = id;
          req.session.loggedin = true;
          await Session.updateOne(
            { _id: req.session.userid },
            { session: req.session },
          );
          sendDashboard(res);
        } else {
          res.render('registration', { emailError2: 'Password is incorrect' });
        }
      } else {
        res.render('registration', { emailError2: 'Email is incorrect' });
      }
    });
};

const parseError = (errors) => {
  const msg = {
    userNameError: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    emailError2: '',
    passwordError2: '',
  };
  errors.forEach((elem) => {
    if (elem.param === 'username') {
      msg.userNameError = elem.msg;
    }
    if (elem.param === 'firstname') {
      msg.firstNameError = elem.msg;
    }
    if (elem.param === 'lastname') {
      msg.lastNameError = elem.msg;
    }
    if (elem.param === 'email') {
      msg.emailError = elem.msg;
      msg.emailError2 = elem.msg;
    }
    if (elem.param === 'password') {
      msg.passwordError = elem.msg;
      msg.passwordError2 = elem.msg;
    }
  });
  return msg;
};

router.post(
  '/register',
  [
    check('username')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Please provide a username'),
    check('firstname')
      .not()
      .isEmpty()
      .trim()
      .withMessage('Please provide your firstname'),
    check('lastname')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Please provide your lastname'),
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    check('password')
      .isLength({ min: 1 })
      .withMessage('Please provide a password.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // console.log(req.body);

    // sanitize and validate input
    if (!errors.isEmpty()) {
      // console.log(errors);
      const errMsg = parseError(errors.array());
      registerError(res, errMsg);
    } else {
      // console.log(req.body);
      let userNameExist = false;
      let emailExist = false;
      const userExec = User.findById({ _id: req.body.username }).exec();
      userExec.then(() => {
        // console.log(`document from db: ${doc}`);
        // eslint-disable-next-line no-empty
        const emailExec = User.findOne({ _email: req.body.email }).exec();
        emailExec.then((doc2) => {
          // console.log(`document from db2: ${doc2}`);
          if (doc2 !== null) {
            emailExist = true;
            // eslint-disable-next-line no-underscore-dangle
            const username = doc2._id;
            if (username === req.body.username) {
              userNameExist = true;
            }
          }
          const errMsg = parseError(errors.array());
          if (userNameExist) {
            errMsg.userNameError = `Username ${req.body.username} already taken`;
          }
          if (emailExist) {
            errMsg.emailError = `Email ${req.body.email} already taken`;
          }
          if (userNameExist || emailExist) {
            registerError(res, errMsg);
          } else {
            HashPassword(req, res, saltingLevels);
          }
        });
      });
    }
  },
);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    check('password')
      .isLength({ min: 1 })
      .withMessage('Please provide a password.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // console.log(req.body);

    // sanitize and validate input
    if (!errors.isEmpty()) {
      // console.log(errors);
      const errMsg = parseError(errors.array());
      registerError(res, {
        emailError2: errMsg.emailError2,
        passwordError2: errMsg.passwordError2,
      });
    } else {
      validateUser(req, res);
    }
  },
);

router.post('/logout', async (req, res) => {
  if (req.session.loggedin === true) {
    // eslint-disable-next-line no-unused-expressions
    req.session.loggedin = false;
    await Session.updateOne(
      { _id: req.session.userid },
      { session: req.session },
    );
    res.render('registration');
  } else {
    res.status(200).send('<p> You are not logged in </p>');
  }
});

module.exports = router;
