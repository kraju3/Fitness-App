const assert = require('assert');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const mongoose = require('mongoose');
const app = require('../app');
// const UserModel = require('../models/users_dao');
require('dotenv').config();
// const UserModel = require('../models/users_dao');

const PORT = 3000;

axiosCookieJarSupport(axios);

describe('MeFit Fitness App', async () => {
  let server = {};
  let client = {};
  let client2 = {};

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `http://localhost:${PORT}/`;
  axios.defaults.validateStatus = () => true;

  /* Utility functions used given by Professor Kannich
   */
  // Deterministic (for testing) Math.random replacement
  // https://gist.github.com/mathiasbynens/5670917

  const psrand = (() => {
    let seed = 0xaabbccd;
    return () => {
      /* eslint-disable no-bitwise */
      // Robert Jenkins’ 32 bit integer hash function
      seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
      seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
      seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
      seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
      seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
      seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
      return (seed & 0xfffffff) / 0x10000000;
      /* eslint-enable no-bitwise */
    };
  })();

  // https://gist.github.com/6174/6062387#gistcomment-2915959
  function getRandomString(length) {
    let s = '';
    do {
      s += psrand()
        .toString(36)
        .substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
  }
  async function createUser(axiosClient) {
    const newUser = {
      username: getRandomString(10),
      email: `${getRandomString(6)}@uic.edu`,
      firstname: getRandomString(10),
      lastname: getRandomString(10),
      password: getRandomString(10),
    };
    const result = await axiosClient.post('/register', newUser);
    return { newUser, result };
  }
  before(async () => {
    server = app.listen(PORT);
    mongoose.connect(
      `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/TestDb`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        else console.log('Test db in connection');
      },
    );
  });

  beforeEach(async () => {
    client = axios.create();
    client2 = axios.create();

    client.defaults.jar = new tough.CookieJar();
    // const testUri = `${process.env.DB_TEST}`;
    // mongoose.connect(testUri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // });
    // console.log('Test Db in use');
    // console.log('Reached here');
  });
  after(async () => {
    mongoose.connection.db.dropCollection('users');
    mongoose.connection.db.dropCollection('sessions');
    await mongoose.disconnect();
    await server.close();
  });
  describe('sanity', async () => {
    // it('should not let you access an admin page');
    it('should successfully direct you to the home page', async () => {
      const result = await client.get('/');
      assert.strictEqual(result.status, 200);
    });
    it("shouldn't direct you to a page that do not exist", async () => {
      const result = await client.get('dontexist');
      assert.strictEqual(result.status, 404);
    });
  });

  describe('home page', async () => {
    it('should be able to have a dashboard', async () => {
      await createUser(client);
      const result = await client.get('/home');
      assert(result.data.includes('Connect Fitbit'));
    });
  });

  describe('authentication', async () => {
    describe('Registration', async () => {
      it('should not allow you to register without providing necessary information', async () => {
        const result = await client.post('/register', {
          username: getRandomString(10),
        });
        assert(result.data.includes('Please provide your firstname'));
        assert(result.data.includes('Please provide your lastname'));
        assert(result.data.includes('Please provide a valid email'));
        assert(result.data.includes('Please provide a password'));
      });
      it('should not allow duplicate usernames', async () => {
        const { newUser } = await createUser(client);
        const response = {
          username: newUser.username,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          password: newUser.password,
        };
        const secondClient = await client2.post('/register', response);
        // await UserModel.deleteUser(newUser.username)
        // console.log(secondClient.data);
        assert(
          secondClient.data.includes(
            `Username ${response.username} already taken`,
          ),
        );
      });
      it('should not register if no information is given', async () => {
        const result = await client.post('/register', { firstname: 'Peter' });
        // console.log(result);
        assert(result.data.includes('Please provide a username'));
      });
      it('should check if the email already exists', async () => {
        const { newUser } = await createUser(client);
        const seconduser = {
          username: getRandomString(10),
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          password: newUser.password,
        };
        // console.log(seconduser);
        // console.log(newUser);
        const secondClient = await client2.post('/register', seconduser);
        // await UserModel.deleteUser(newUser.username);
        // console.log(secondClient.data);
        assert(
          secondClient.data.includes(`Email ${newUser.email} already taken`),
        );
      });
      it('should provide a password', async () => {
        // const { newUser, result } = await createUser(client);
        const secondResponse = await client2.post('/register', {
          username: getRandomString(10),
          email: `${getRandomString(6)}@uic.edu`,
          firtname: 'Namaste',
          lastname: 'Fail',
          password: '',
        });
        // await UserModel.deleteUser(newUser.username);
        // assert(result.data.includes(`${newUser.username}`));
        assert(secondResponse.data.includes('Please provide a password'));
      });
      it('should enable you to register successfully', async () => {
        const { result } = await createUser(client);
        // console.log(result);
        assert(result.data.includes('Home'));
        // assert(result.data.includes(`${newUser.username}`));
        assert.strictEqual(result.status, 200);

        await client.post('/logout');
        // await UserModel.deleteUser(newUser.username);
      });
    });
    describe('Login', async () => {
      it('should not let you log in if your fields are empty', async () => {
        const response2 = await client.post('/login');
        assert(response2.data.includes('Please provide a password'));
        assert(response2.data.includes('Please provide a valid email'));
      });
      it('should not let you log in if only email is provided', async () => {
        const response2 = await client.post('/login', {
          email: 'kat456@uic.edu',
        });
        assert(response2.data.includes('Please provide a password'));
      });
      it('should not let you log in if only password is incorrect', async () => {
        const { newUser } = await createUser(client);
        const response2 = await client2.post('/login', {
          email: newUser.email,
          password: `${newUser.password}45678`,
        });
        assert(response2.data.includes('Password is incorrect'));
      });
      it('should not let you log in if only email is incorrect', async () => {
        const { newUser } = await createUser(client);
        const response2 = await client2.post('/login', {
          email: `lol${newUser.email}`,
          password: `${newUser.password}45678`,
        });
        assert(response2.data.includes('Email is incorrect'));
      });
      it('should successfully let you log in if you are registered and provided the right credentials', async () => {
        const { newUser } = await createUser(client);
        const response2 = await client2.post('/login', {
          email: newUser.email,
          password: newUser.password,
        });
        assert(response2.data.includes('Home'));
        assert.strictEqual(response2.status, 200);
      });
    });

    describe('Logout', async () => {
      // eslint-disable-next-line no-unused-vars
      let userinfo;
      beforeEach(async () => {
        userinfo = await createUser(client);
      });
      it('shows the login screen after submitting the logout form', async () => {
        // console.log(userinfo.result);
        const data = await client.post('/logout');
        assert(
          data.data.includes(
            'Please fill in the following information to register/login',
          ),
        );
      });
      it('shows an error message if you are not logged in and then try to log out ', async () => {
        // Nconsole.log(userinfo.result);
        const data = await client2.post('/logout');
        // console.log(data.data);
        assert(data.data.includes('You are not logged in'));
      });
    });
  });
  describe('Spoonacular API working properly', async () => {
    let checkresponse;
    // let checkresponse2;
    let newUser;
    before(async () => {
      newUser = {
        username: getRandomString(10),
        email: `${getRandomString(6)}@uic.edu`,
        firstname: getRandomString(10),
        lastname: getRandomString(10),
        password: getRandomString(10),
      };
    });
    it("shouldn't give you a diet if you havent created one", async () => {
      await client.post('/register', newUser);
      const response1 = await client.get('/diet');
      checkresponse = response1.data;
      assert(response1.data.includes('Breakfast'));
      assert(response1.data.includes('Current Meal'));
      await client.post('/logout');
    });
    it('should give you a diet if you request it', async () => {
      await client.post('/login', {
        email: newUser.email,
        password: newUser.password,
      });
      const response = await client.post('/mealplan', {
        diet: 'whole30',
        calories: 2000,
      });
      // checkresponse2 = response.data;
      assert(response.data.includes('Breakfast'));
      assert(response.data.includes('Dinner'));
      assert(response.data.includes('Lunch'));
      assert(response.data.includes('Calories'));
      assert.notEqual(response.data, checkresponse);
      await createUser(client);
      const result = await client.get('/diet');
      assert.notEqual(result.data, response.data);
    });
    // eslint-disable-next-line max-len
    // it('after a user log in he should have that diet if there is one', async () => {
    //   // eslint-disable-next-line no-unused-vars
    //   const response = await client.post('/login', {
    //     email: userinfo.newUser.email,
    //     password: userinfo.newUser.password,
    //   });
    //   const response2 = await client.get('/diet');
    //   assert.equal(response2.data, checkresponse2);
    // });
  });
  describe('Fitbit Api', async () => {
    it('should redirect you to fitbit login page', async () => {
      await createUser(client);
      const response2 = await client.get('/authorize');

      assert(response2.data.includes('Login transfer'));
    });
  });

  // describe('Google Map API working for nearest gyms', async () => {
  //   it('should return the nearest gyms given your location');
  //   it('should return the nearest gym given your zip code');
  // });
});
