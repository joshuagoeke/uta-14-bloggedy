const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json'); //blog user stuff I make up
const postData = require('./postData.json'); //post stuff I make up (KEEP THIS ORDER!)
//require comments just like these ^

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); //never use in acutal production

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
console.log('----Users with dumb usernames in database----')
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
console.log('----Bla bla blogs barfed in database----')
  process.exit(0);
};

seedDatabase();
