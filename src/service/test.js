import mongo from "../../config/mongo";
const testQuery = async (name, age) => {
  return mongo
    .getDB()
    .collection("shopping")
    .insertOne({ name, age }, (err, result) => {
      if (!err) {
        return result;
      }
    });
};
export default {
  testQuery
};
