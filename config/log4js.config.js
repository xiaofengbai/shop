export default {
  appenders: {
    console: {
      type: "console"
    },
    everything: {
      type: "dateFile",
      filename: "logs/all-the-logs.log",
      pattern: ".yyyy-MM-dd-hh",
      compress: false
    },
    cheese: {
      type: "file",
      filename: "logs/cheese.log",
      maxLogSize: 10 * 1024 * 1024,
      backups: 5,
      compress: false,
      encoding: "utf-8",
      mode: 0o0640,
      flags: "w+"
    }
  },
  categories: {
    default: {
      appenders: ["console", "cheese", "everything"],
      level: "trace"
    }
  }
};
