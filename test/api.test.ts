import mongoose from "mongoose";
import app from "../src/app";
import { getNotFound } from "./testFunctions";

describe("Testing graphql api", () => {
  beforeAll(async () => {
    console.log("Conneting to Database: ", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it("responds with a not found message", async () => {
    await getNotFound(app);
  });
  /*
  // test brute force protectiom
  test("Brute force attack simulation", async () => {
    const maxAttempts = 20;
    const mockUser: UserTest = {
      user_name: "Test User " + randomstring.generate(7),
      email: randomstring.generate(9) + "@user.fi",
      password: "notthepassword",
    };

    try {
      // Call the mock login function until the maximum number of attempts is reached
      for (let i = 0; i < maxAttempts; i++) {
        const result = await loginBrute(app, mockUser);
        if (result) throw new Error("Brute force attack unsuccessful");
      }

      // If the while loop completes successfully, the test fails
      throw new Error("Brute force attack succeeded");
    } catch (error) {
      console.log(error);
      // If the login function throws an error, the test passes
      expect((error as Error).message).toBe("Brute force attack unsuccessful");
    }
  }, 15000);
  */
});
