import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import UserModel, { User } from "../models/User";
import environment from "../configs";
const authController = {
  login: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const { address } = req.body;
      let user = await UserModel.findOne({ address });
      if (!user) return res.status(400).send({ error: "User does not exist." });
      const payload = {
        user: {
          address: user.address,
        },
      };
      jwt.sign(payload, environment.secretKey, (err, token) => {
        if (err) throw err;
        res.send({ token, user });
      });
    } catch (error: any) {
      return res.status(500).send({ msg: "Server Error", error });
    }
  },

  register: async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const { address, name } = req.body;
      let user = await UserModel.findOne({ address });
      if (user) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Wallet Address already exists." }] });
      }
      const avatarUrl = "get from metadata";
      user = new UserModel({
        name,
        address,
        balance: 0,
        avatarUrl,
      });

      await user.save();
      const payload = {
        user: {
          adddress: user.address,
        },
      };
      jwt.sign(payload, environment.secretKey, (err, token) => {
        if (err) throw err;
        res.send({ token, user });
      });
    } catch (e: any) {
      return res.status(500).send({ msg: "Server Error", error: e });
    }
  },

  users: async (req: any, res: any) => {
    const result: any = (await UserModel.find()) as User[];
    res.send(result);
  },
};

export const authValidation = {
  login: [check("address", "Connect your wallet").not().isEmpty()],
  register: [
    check("address", "Connect your wallet").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
  ],
};
export default authController;
