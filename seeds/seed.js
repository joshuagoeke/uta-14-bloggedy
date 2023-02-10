const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json'); //blog user stuff I make up
const projectData = require('./projectData.json'); //blog stuff I make up (KEEP THIS ORDER!)
//require comments just like these ^

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); //never use in acutal production

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
