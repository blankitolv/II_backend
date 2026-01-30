import User from "../models/users.models.js";

class UserRepository {
  // [repository] retorna un usuario por su email
  async findUserByEmail(email) {
    return User.findOne({ email }).lean();
  }

  // [repository] retorna un usuario por su id
  async findUserById(id) {
    return User.findById(id).lean();
  }

  // [repository] crea un usuario
  async createUser(user) {
    const userCreated = await User.create(user);
    return userCreated.toObject();
  }

  // [repository] actualiza un usuario
  async updateUser(id, userData) {
    return User.findByIdAndUpdate(id, userData, { new: true }).lean();
  }
}

export default new UserRepository();
