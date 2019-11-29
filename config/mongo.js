import { MongoClient } from "mongodb";
import config from "./base";
let MongoManager = {
  base: null
};

class MongonDB {
  initBase = () => {
    if (MongoManager.base) {
      return MongoManager.base;
    }
    MongoClient.connect(
      config.db.url,
      {
        useNewUrlParser: true
      },
      this.onDBcnnected
    );
  };
  onDBcnnected = (err, db) => {
    if (err) {
      console.log("connect err:" + err);
      db.close();
      return;
    }
    MongoManager.base = db;
  };
  getDB = () => {
    return MongoManager.base.db(config.db.baseDBName);
  };
}
export default new MongonDB();
