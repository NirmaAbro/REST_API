const express = require("express");

const parseBody = express.urlencoded({ extended: false });
const parseJson = express.json();

module.exports = { parseBody, parseJson };
