const fs = require("fs");

function deepSet(obj, path, value) {
  const keys = path.split(".");
  keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) acc[key] = value;
    else acc[key] = acc[key] || {};
    return acc[key];
  }, obj);
}

function parseCSV(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  const [headerLine, ...lines] = data.trim().split("\n");
  const headers = headerLine.split(",").map(h => h.trim());

  return lines.map(line => {
    const cols = line.split(",").map(c => c.trim());
    const obj = {};
    headers.forEach((header, i) => deepSet(obj, header, cols[i]));

    const name = `${obj.name.firstName}${obj.name.lastName}`;
    const age = parseInt(obj.age, 10);
    const address = obj.address || null;

    const { name: _, age: __, address: ___, ...additional_info } = obj;

    return { name, age, address, additional_info };
  });
}

module.exports = parseCSV;