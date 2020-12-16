const fs = require('fs');

function getDataFromDatabase(file) {
    const data = fs.readFileSync(__dirname + `/../database/${file}`).toString();
    return data ? JSON.parse(data) : [];
}; 

function setDataFromDatabase(file, data) {
    fs.writeFileSync(__dirname + `/../database/${file}`, JSON.stringify(data, null, 4));
};

module.exports = { getDataFromDatabase, setDataFromDatabase };