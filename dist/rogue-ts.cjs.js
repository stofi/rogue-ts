'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./rogue-ts.cjs.prod.js");
} else {
  module.exports = require("./rogue-ts.cjs.dev.js");
}
