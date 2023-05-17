import app from "./app";
import mongoConnect from "./utils/db";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
(async () => {
  try {
    console.log(`Connecting to DB: ${process.env.DATABASE_URL}`);
    await mongoConnect();
    console.log("DB connected successfully");
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.log("Server error", (error as Error).message);
  }
})();
