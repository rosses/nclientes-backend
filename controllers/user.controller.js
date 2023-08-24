const { User, Profile, UserModel } = require("../db");
// const { search } = require("../routes/user.route");

/**
 * @api {get} /v1/user/ Get all users list
 * @apiGroup User
 * @apiName GetAllUsers
 *
 * @apiHeader {String} token JWT token geneated from /login
 *
 * @apiParam {Number} skip Offset useful for pagination
 * @apiParam {Number} limit No of entries to fetch
 */
async function getAll(req, res) {
  // const offset = +req.query.skip ? +req.query.skip : 0;
  // const limit = +req.query.limit ? +req.query.limit : 10;
  const users = await UserModel.findAll();
  res.send({
    data: users,
  });
}

/**
 * @api {post} /v1/user/ Create new user
 * @apiGroup User
 * @apiName CreateNewUser
 *
 * @apiHeader {String} token JWT token geneated from /login
 *
 * @apiParam {String} username User for access
 * @apiParam {String} name User Name
 * @apiParam {String} password Password encoded by bcrypt
 * @apiParam {String} sapCode SAP "NroCliente" Code
 * @apiParam {Date} lastAccess Date of last call api
 * @apiParam {Number} profileId Profile and permissions
 */

async function create(req, res) {
  const user = await UserModel.create({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password2,
    sapCode: req.body.sapCode,
    lastAccess: new Date(),
    profileId: 1,
  });
  res.send({
    data: {
      userId: user.userId,
    },
  });
}

async function getMe(req, res) {
  if (req.user) {
    res.send(req.user);
  } else {
    res.setStatus(400).send({ success: false });
  }
}

async function addUser(req, res) {
  const searchUser = await UserModel.findOne({
    where: { userId: req.body.id },
  });
  if (searchUser) {
    searchUser.username = req.body.username;
    searchUser.name = req.body.name;
    searchUser.password = req.body.password;
    searchUser.email = req.body.email;
    searchUser.sapCode = req.body.sapCode;
    searchUser.profileId = req.body.profileId;
    searchUser.save();
    res.send({
      data: {
        userId: searchUser.userId,
      },
    });
  } else {
    const user = await UserModel.create({
      username: req.body.username,
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      sapCode: req.body.sapCode,
      lastAccess: new Date(),
      profileId: req.body.profileId,
    });
    res.send({
      data: {
        userId: user.userId,
      },
    });
  }
}

async function deleteUser(req, res) {
  const user = await UserModel.findOne({ where: { userId: req.body.data } });
  user.destroy();
  res.send({
    ok: true,
  });
}

async function viewUser(req, res) {
  const user = await UserModel.findOne({ where: { userId: req.params.id } });
  res.send({
    data: {
      user,
    },
  });
}

async function getDistributor(req, res) {
  const users = await UserModel.findAll({ where: { profileId: 1 } });
  res.send({
    data: users,
  });
}

module.exports = {
  getAll,
  getMe,
  create,
  addUser,
  deleteUser,
  viewUser,
  getDistributor,
};
