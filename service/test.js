import mongo from "../config/mongo";
const testQuery = async () => {
  return mongo
    .getDB()
    .collection("shopping")
    .insertOne({ name: "曹頔" }, (err, result) => {
      if (!err) {
        return result;
      }
    });
};
export default {
  testQuery
};
