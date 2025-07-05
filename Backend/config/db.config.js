module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "shuttle.com",
  dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  // HOST: "sql12.freemysqlhosting.net",
  // USER: "sql12623375",
  // PASSWORD: "BkzU1MZvjP",
  // DB: "sql12623375",
  // dialect: "mysql",