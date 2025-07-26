const db = require("../config/db");

async function insertUsers(users) {
  const query = `
    INSERT INTO users (name, age, address, additional_info)
    VALUES ($1, $2, $3, $4)
  `;

  for (const user of users) {
    await db.query(query, [
      user.name,
      user.age,
      user.address || null,
      user.additional_info || null
    ]);
  }
}

async function calculateAgeDistribution() {
  const res = await db.query("SELECT age FROM users");

  const groups = { "<20": 0, "20-40": 0, "40-60": 0, ">60": 0 };
  const total = res.rows.length;

  res.rows.forEach(({ age }) => {
    if (age < 20) groups["<20"]++;
    else if (age <= 40) groups["20-40"]++;
    else if (age <= 60) groups["40-60"]++;
    else groups[">60"]++;
  });

  for (const [group, count] of Object.entries(groups)) {
    console.log(`${group} - ${(count / total * 100).toFixed(2)}%`);
  }
}

module.exports = { insertUsers, calculateAgeDistribution };