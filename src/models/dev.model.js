const mongoose = require('mongoose');
const { lbcTeamsEnum } = require('../config/lbcTeams');

const devSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    nom: {
      type: String,
    },
    team: {
      type: String,
      enum: lbcTeamsEnum,
    },
  },
  { id: false },
);

/**
 * @typedef Dev
 */
const Dev = mongoose.model('Dev', devSchema);

module.exports = Dev;
