const sequelize = require("../config/connection");
const { User, Thread } = require("../models");

const userData = require('./userData.json');
const threadData = require('./threadData.json');

console.log(userData)

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const thread of threadData) {
    await Thread.create({
      ...thread,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
