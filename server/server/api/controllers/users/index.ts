import { Request, Response, NextFunction, response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";
import UsersService from "../../services/users.service";
import l from "../../../common/logger";
import jwt from 'jsonwebtoken'

export class UsersController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UsersService.getByEmail(email);
      if (!user) return res.status(404).json({ email: "User not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (isMatch) {
        const payload = { id: user.id, name: user.email};
        const token = await jwt.sign(payload,'secret',{expiresIn: 3600})
        return res.json({ success: true, token: token });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    } catch (e) {
      next(e);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email,password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ email: "User with email exists" });
      }
      const salt = await bcrypt.getSalt('$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa');
      const newUser = new User({
        email,
        password: await bcrypt.hash(password, salt),
      });
      return res.status(201).json(await newUser.save());
    } catch (e) {
      next(e);
    }
  }
}

export default new UsersController();
