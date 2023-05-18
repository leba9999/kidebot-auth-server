import mongoose from "mongoose";
import app from "../src/app";
import { getNotFound } from "./testFunctions";
import LoginResponse from "../src/interfaces/Responses/LoginResponse";
import { TestUser } from "../src/interfaces/User";
import {
  loginUser,
  postAdmin,
  postAsUserAdmin,
  postUser,
} from "./userFunctions";

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
  let user1Data: LoginResponse;
  let user2Data: LoginResponse;
  let admin1Data: LoginResponse;
  let admin2Data: LoginResponse;

  const testUser1: TestUser = {
    username: "testuser1",
    kideId: "123456789",
    admin: false,
  };
  const testUser2: TestUser = {
    username: "testuser2",
    kideId: "987654321",
    admin: false,
  };
  const admin1: TestUser = {
    kideId: "a13e4838-2d86-40b6-9eb1-6f66350681e3",
  };
  const admin2: TestUser = {
    username: "testadmin2",
    kideId: "012345678",
    admin: true,
  };
  const admin3: TestUser = {
    username: "testadmin3",
    kideId: "0123456789",
    admin: true,
  };

  it("should login admin", async () => {
    admin1Data = await loginUser(app, admin1);
  });

  it("should create a first user", async () => {
    await postUser(app, testUser1, admin1Data.token);
  });

  it("should create a second admin", async () => {
    await postAdmin(app, admin2, admin1Data.token);
  });

  it("should login second admin", async () => {
    admin2Data = await loginUser(app, admin2);
  });

  it("should create a second user using second admin", async () => {
    await postUser(app, testUser2, admin2Data.token);
  });

  it("should create a third admin using second admin", async () => {
    await postAdmin(app, admin3, admin2Data.token);
  });

  it("should login user", async () => {
    user1Data = await loginUser(app, testUser1);
  });

  it("should login second user", async () => {
    user2Data = await loginUser(app, testUser2);
  });

  it("should not create a new user", async () => {
    await postAsUserAdmin(
      app,
      {
        username: "testuser3",
        kideId: "123142124412412142412421142412",
        admin: true,
      },
      user1Data.token
    );
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
