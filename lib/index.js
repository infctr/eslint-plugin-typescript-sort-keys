/**
 * @fileoverview Sort interface keys
 * @author infctr
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');
const path = require('path');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(path.join(__dirname, 'rules'));
