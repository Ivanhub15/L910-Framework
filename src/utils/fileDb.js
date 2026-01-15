const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  const fullPath = path.resolve(filePath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(data);
}

function writeJson(filePath, data) {
  const fullPath = path.resolve(filePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

module.exports = {
  readJson,
  writeJson,
};
