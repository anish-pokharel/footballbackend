const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  fixture: {
    type: String,
    required: true,
  },
  selection: {
    type: String,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  odds: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]*$/.test(v); // pattern validator for odds
      },
      message: 'Odds must be a valid number',
    },
  },
});

module.exports = mongoose.model('Match', MatchSchema);
