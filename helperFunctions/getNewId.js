const randomBytes = require("crypto").randomBytes;

function getNewId(type) {
  const newId = generateRandomString(type);
  if (!validateIdString(type, newId)) {
    return getNewId(type);
  }
  return newId;
}

function generateRandomString(type) {
  let idLength;
  switch (type) {
    case "wizard":
      idLength = 9;
      break;
    case "scenario":
      idLength = 10;
      break;
    case "campaign":
      idLength = 11;
      break;
    default:
      idLength = 9;
      break;
  }

  return randomBytes(idLength)
    .toString("base64")
    .slice(0, 9)
    .replace(/[^a-zA-Z0-9]/g, "");
}

function validateIdString(type, id) {
  // WIP, SQL validation to check if the id is unique and valid
  switch (type) {
    case "wizard":
      return id.length === 9;
    case 10:
      return id.length === 10;
    default:
      return id.length === 9;
  }
}

module.exports = getNewId;
