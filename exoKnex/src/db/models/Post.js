import { Model } from "objection";
import UserModel from "./Users.js";

class PostModel extends Model {
  static tableName = "posts";

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
    };
  }
}

export default PostModel;
