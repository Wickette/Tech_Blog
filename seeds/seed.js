const sequelize = require("../config/connection");
const User = require('../models/User')
const Thread = require('../models/Thread')
const Comment = require('../models/Comment')


const userData = require('./userData.json');
const threadData = require('./threadData.json');

console.log(User)

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
