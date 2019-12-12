import Redis from "ioredis";
import { Store } from "koa-session2";
import config from "./base";

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis({
      port: config.redis.port,
      host: config.redis.url,
      password: config.redis.password,
      db: config.redis.db,
      ttl: config.redis.ttl,
      family: 4
    });
  }

  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(
    session,
    { sid = this.getID(24), maxAge = config.redis.maxAge } = {},
    ctx
  ) {
    try {
      // Use redis set EX to automatically drop expired sessions
      console.log(`SESSION:${sid}`);
      await this.redis.set(
        `SESSION:${sid}`,
        JSON.stringify(session),
        "EX",
        maxAge / 1000
      );
    } catch (e) {
      console.log(e);
    }
    return sid;
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}

export default RedisStore;
