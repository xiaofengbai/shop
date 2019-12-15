import config from "./base";
import Redis from "koa-redis";

class RedisStore {
  constructor() {
    this.redis = Redis({
      port: config.redis.port,
      host: config.redis.host,
      password: config.redis.password,
      db: config.redis.db,
      family: 4
    });
  }

  async get(sid) {
    console.log(`get session ${sid}`);
    return await this.redis.get(sid);
  }

  async set(sid, sess, dfttl) {
    const ttl = dfttl ? dfttl : config.redis.ttl;
    try {
      console.log(`set session ${sid} ttl= ${ttl}`);
      await this.redis.set(sid, sess, ttl);
    } catch (e) {
      console.log(e);
    }
    return sid;
  }

  async destroy(sid) {
    console.log(`destroy session sid=${sid}`);
    return await this.redis.destroy(sid);
  }
}

export default RedisStore;
