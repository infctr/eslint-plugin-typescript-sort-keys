/**
 * @fileoverview Sort interface keys
 * @author infctr
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');
const path = require('path');

const recommended = require('../config/recommended'); // eslint-disable-line node/no-unpublished-require

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
  rules: requireIndex(path.join(__dirname, 'rules')),

  configs: {
    recommended,
  },
};
