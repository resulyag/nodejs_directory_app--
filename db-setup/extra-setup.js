function applyExtraSetup(sequelize) {
  const { User, DirectoryPerson, Phone } = sequelize.models;
  User.hasMany(DirectoryPerson);
  DirectoryPerson.belongsTo(User);

  DirectoryPerson.hasMany(Phone);
  Phone.belongsTo(DirectoryPerson);
}

module.exports = applyExtraSetup;
