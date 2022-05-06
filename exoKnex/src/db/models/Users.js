import { Model } from "objection";

class UserModel extends Model {
  static tableName = "users";

  checkPassword(password) {
    const [passwordHash] = hashPassword(password, this.passwordSalt);

    return passwordHash === this.passwordHash;
  }
  static findValidUsersByEmail(email) {
    return UserModel.query().findOne({ email }).whereNull("suspendedAt");
  }
}

export default UserModel;
