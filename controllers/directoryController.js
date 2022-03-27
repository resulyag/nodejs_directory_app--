const db = require("../models");
const { Op } = require("sequelize");


const Directory = db.DirectoryPerson;
const Phone = db.Phone;
const User = db.User;



const add = async (req, res) => {
  let directoryToAdd = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    corparation: req.body.corparation,
    UserId: req.user.id,
  };

  const directoryResult = await Directory.create(directoryToAdd);

  let phoneListToAdd = req.body.phoneList.map((v) => ({
    DirectoryPersonId: directoryResult.id,
    phone: v,
  }));

  const phoneListResult = await Phone.bulkCreate(phoneListToAdd);

  res.status(200).send({
    id: directoryResult.id,
    ...directoryToAdd,
    phoneList: phoneListResult,
  });
};



const getAll = async (req, res) => {
  let directories = await Directory.findAll({
    include: Phone,
    where: {
      UserId: {
        [Op.eq]: req.user.id,
      },
    },
  });
  res.status(200).send(directories);
};

const getAllbyFilter = async (req, res) => {
  var filterValue = req.params.filter;
  console.log("\nreq.params.filter\n" + req.params.filter);
  let directories = await Directory.findAll({
    include: Phone,
    where: {
      UserId: {
        [Op.eq]: req.user.id,
      },
      [Op.or]: [
        {
          firstName: {
            [Op.like]: "%" + filterValue + "%",
          },
        },
        {
          lastName: {
            [Op.like]: "%" + filterValue + "%",
          },
        },
        {
          corparation: {
            [Op.like]: "%" + filterValue + "%",
          },
        },
        {
          phone: {
            [Op.like]: "%" + filterValue + "%",
          }
        },
        {
          [Op.and]: [
            {
              firstName: {
                [Op.like]: "%" + filterValue + "%",
              },
            },
            {
              lastName: {
                [Op.like]: "%" + filterValue + "%",
              },
            }
          ],
        }
      ],
    },
  });
  res.status(200).send(directories);
};

const deleteById = async (req, res) => {
  let delId = req.params.id;
  console.log("id " + delId);
  let directory = await Directory.destroy({
    include: Phone,
    where: {
      id: {
        [Op.eq]: delId,
      },
    }
  });
  let phone = await Phone.destroy({
    where: {
      DirectoryPersonId: {
        [Op.eq]: delId,
      },
    }
  });

  res.status(200).send("directory is deleted!");

};

const updateById = async (req, res) => {
  let updId = req.params.id;
  const { firstName, lastName, corparation } = req.body;


  let result = await Directory.update({
    firstName: firstName,
    lastName: lastName,
    corparation: corparation
  },
    {
      where: {
        id: {
          [Op.eq]: updId,
        },
      },
    });

  let phone = await Phone.destroy({
    where: {
      DirectoryPersonId: {
        [Op.eq]: updId,
      },
    }
  });


  let phoneListToUpdate = req.body.phoneList.map((v) => ({
    DirectoryPersonId: updId,
    phone: v,
  }));


  const phoneListResult = await Phone.bulkCreate(phoneListToUpdate, {
    where: {
      DirectoryPersonId: {
        [Op.eq]: updId,
      },
    },
  });

  let data = await Directory.findAll({
    include: Phone,
    where: {
      id: {
        [Op.eq]: updId,
      },
    },
  });


  res.status(200).send({
    id: updId,
    data,
  });
};

module.exports = {
  add,
  getAll,
  getAllbyFilter,
  deleteById,
  updateById,
};
