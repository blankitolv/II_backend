import User from "../models/users.models.js";

class UserRepository {
  async findUserByEmail(email) {
    return User.findOne({ email }).lean();
  }

  async findUserById(id) {
    return User.findById(id).lean();
  }

  async createUser(user) {
    const userCreated = await User.create(user);
    return userCreated.toObject();
  }

  async updateUser(id, userData) {
    return User.findByIdAndUpdate(id, userData, { new: true }).lean();
  }
}

export default new UserRepository();
