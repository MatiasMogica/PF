require("dotenv").config();
const app = require("./src/app.js");
const dbConnection = require("./src/db.js");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  dbConnection();
  console.log(`listen on port ${PORT}`);
});
