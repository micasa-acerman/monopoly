import { IUserModel, User } from "../models/user";

class UsersService {
  async getAll(): Promise<IUserModel[]> {
    const user = (await User.find(null, "-_id -__v").lean()) as IUserModel[];
    return user;
  }

  async getById(id: number): Promise<IUserModel> {
    const user = (await User.findOne(
      { id: id },
      "-_id -__v"
    ).lean()) as IUserModel;
    return user;
  }

  async getByEmail(email: string): Promise<IUserModel> {
    const user = (await User.findOne(
      {
        email,
      },
      "-_id -__v"
    ).lean()) as IUserModel;
    return user;
  }

  async create(data: IUserModel): Promise<IUserModel> {
    const user = new User(data);
    const doc = (await user.save()) as IUserModel;
    return doc;
  }
}

export default new UsersService();
