import mongo from "../config/mongo";
const testQuery = async () => {
  return mongo.getDB.insertOne({ name: "曹頔" }, (err, result) => {
    if (!err) {
      return result;
    }
  });
};
export default {
  testQuery
};
