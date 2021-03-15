const UserController = require("../model/UserModel");

module.exports = {
  add: async (req, res) => {
    const user = new UserController(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send({
        err: error.toString(),
        status: 400,
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await UserController.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ token });
    } catch (error) {
      res.status(401).send({
        message: "Unable to login, contact support!",
        status: 401,
        err: error,
      });
    }
  },

  getHome: async (req, res) => {
    try {
      res.status(200).send({ message: "OK!" });
    } catch (error) {
      res.status(500).send({
        message: "Server error",
        err: error.toString(),
        status: 500,
      });
    }
  },

  searchUsers: async (req, res) => {
    try {
      const { query } = req.body;
      const user = await UserController.findOne({ email: query });

      res.status(200).send({
        user,
      });
    } catch (error) {
      res.status(404).send({
        message: "No users found",
        status: 404,
      });
    }
  },

  editMe: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({
        error: "Invalid updates!",
      });
    }

    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.sendStatus(405).send({
        message: "Not allowed!",
        err: error.toString(),
        status: 405,
      });
    }
  },
};
