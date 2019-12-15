import config from "./base";
import Redis from "koa-redis";

class RedisStore {
  constructor(dconfig = {}) {
    this.redis = Redis({
      port: config.redis.port,
      host: config.redis.host,
      password: config.redis.password,
      db: config.redis.db,
      family: 4
    });
    this.dconfig = dconfig;
  }

  async get(sid) {
    console.log(`get session ${sid}`);
    return await this.redis.get(sid);
  }

  async set(sid, sess, dfttl) {
    console.log(1111, this.dconfig);
    const ttl =
      this.dconfig && this.dconfig.ttl
        ? this.dconfig.ttl
        : config.redis.ttl
        ? config.redis.ttl
        : dfttl;
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
