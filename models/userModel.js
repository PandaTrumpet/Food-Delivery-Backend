import mongose from "mongoose";
const userSchema = new mongose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false, versionKey: false }
);
const userModel = mongose.models.user || mongose.model("user", userSchema);
export default userModel;
