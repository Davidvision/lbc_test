const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Dev } = require('../models');
const { lbcTeams } = require('../config/lbcTeams');
const ApiError = require('../utils/ApiError');

const newFireFighter = catchAsync(async (req, res) => {
  const today = new Date().getDay();
  if (today === 0 || today === 6) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Today is not a working day !');
  }
  const sortedDevs = await Dev.aggregate([
    {
      $match: {
        team: lbcTeams.coreQualité,
      },
    },
    { $sort: { nom: 1 } },
  ]);
  if (!sortedDevs[today - 1]) {
    throw new Error('An error occured, no firefighter available today...');
  }
  res.send({ firefighterName: sortedDevs[today - 1].nom });
});

module.exports = {
  newFireFighter,
};
