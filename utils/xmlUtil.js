const { promisify } = require('util');
const { parseString } = require('xml2js');
const parser = promisify(parseString);

const parseXml = xml => parser(xml).then(res => res);

module.exports = { parseXml };
