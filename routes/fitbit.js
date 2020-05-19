/* eslint-disable guard-for-in */
const express = require('express');
const Request = require('request');
require('dotenv').config();

const router = express.Router();

const HeartRateUrl = (userId, date, period, range) => {
  /*
user_id ===> user_id or '-' for currently logged in user
date => either yyyy-MM-dd or today.
period => 1d, 7d, 30d, 1w, 1m.
range => d:day, w:week, m:month
 */
  return `https://api.fitbit.com/1/user/${userId}/activities/heart/date/${date}/${period}${range}.json`;
};

const fitbit = {
  scope: ['profile', 'heartrate', 'sleep'],
  redirectUrl: `${process.env.HOST}/redirect`,
  prompt: 'none',
  state: '',
  response_type: 'code',
};

const credentials = {
  client: {
    id: `${process.env.FITBIT_CREDENTIAL_ID}`,
    secret: `${process.env.FITBIT_CREDENTIAL_SECRET}`,
  },
  auth: {
    tokenHost: 'https://api.fitbit.com',
    tokenPath: 'oauth2/token',
    revokePath: 'oauth2/revoke',
    authorizeHost: 'https://www.fitbit.com',
    authorizePath: 'oauth2/authorize',
  },
};

const oauth2 = require('simple-oauth2').create(credentials);

function getAuthorizeUrl(scope, redirectUrl, prompt, state) {
  return oauth2.authorizationCode.authorizeURL({
    scope,
    redirect_uri: redirectUrl,
    prompt,
    state,
  });
}
function mergeHeaders(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return headers;
}

router.get('/authorize', (req, res) => {
  res.redirect(getAuthorizeUrl(fitbit.scope, fitbit.redirectUrl));
});

router.get('/redirect', async (req, res) => {
  // console.log(req.query.code);
  // console.log(req.session);
  try {
    const result = await oauth2.authorizationCode.getToken({
      code: req.query.code,
      redirect_uri: fitbit.redirectUrl,
    });

    const renderObject = {
      out_range_min: '',
      out_range_max: '',
      peak_max: '',
      peak_min: '',
      cardio_min: '',
      cardio_max: '',
      fat_min: '',
      fat_max: '',
      name: true,
    };

    await Request(
      {
        url: HeartRateUrl(result.user_id, 'today', '1', 'd'),
        method: 'GET',
        headers: mergeHeaders(result.access_token),
        json: true,
      },
      (error, response, body) => {
        Object.keys(body).forEach((key) => {
          body[key].forEach((heart) => {
            console.log(heart.value);
            heart.value.heartRateZones.forEach((reading) => {
              if (reading.name === 'Out of Range') {
                renderObject.out_range_max = reading.max.toString();
                renderObject.out_range_min = reading.min.toString();
              }
              if (reading.name === 'Cardio') {
                renderObject.cardio_max = reading.max.toString();
                renderObject.cardio_min = reading.min.toString();
              }
              if (reading.name === 'Fat Burn') {
                renderObject.fat_max = reading.max.toString();
                renderObject.fat_min = reading.min.toString();
              }
              if (reading.name === 'Peak') {
                renderObject.peak_max = reading.max.toString();
                renderObject.peak_min = reading.min.toString();
              }
            });
          });
        });
        res.render('dashboard', renderObject);
      },
    );
    // console.log(response);
  } catch (error) {
    console.log('Error');
  }
});

module.exports = router;
