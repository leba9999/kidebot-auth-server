import request from "supertest";
import expect from "expect";
import { TestUser } from "../src/interfaces/User";
import LoginResponse from "../src/interfaces/Responses/LoginResponse";

const postUser = (
  url: string | Function,
  user: TestUser,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation CreateUser($user: UserInput!) {
              createUser(user: $user) {
                id
                createdAt
                admin
                kideId
                username
              }
            }`,
        variables: {
          user: {
            username: user.username,
            kideId: user.kideId,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.createUser;
          expect(userData).toHaveProperty("id");
          expect(userData.username).toBe(user.username);
          expect(userData.kideId).toBe(user.kideId);
          expect(userData.admin).toBe(false);
          resolve(userData);
        }
      });
  });
};
const postAdmin = (
  url: string | Function,
  user: TestUser,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation CreateUser($user: UserInput!) {
              createUser(user: $user) {
                id
                createdAt
                admin
                kideId
                username
              }
            }`,
        variables: {
          user: {
            username: user.username,
            kideId: user.kideId,
            admin: user.admin,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.createUser;
          console.log(response.body);
          expect(userData).toHaveProperty("id");
          expect(userData.username).toBe(user.username);
          expect(userData.kideId).toBe(user.kideId);
          expect(userData.admin).toBe(true);
          resolve(userData);
        }
      });
  });
};
const postAsUserAdmin = (
  url: string | Function,
  user: TestUser,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation CreateUser($user: UserInput!) {
              createUser(user: $user) {
                id
                createdAt
                admin
                kideId
                username
              }
            }`,
        variables: {
          user: {
            username: user.username,
            kideId: user.kideId,
            admin: user.admin,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.createUser;
          console.log(response.body);
          expect(userData).toBe(null);
          resolve(userData);
        }
      });
  });
};

const loginUser = (
  url: string | Function,
  user: TestUser
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/api/v1/auth/token")
      .set("Content-type", "application/json")
      .send({
        kideId: user.kideId,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body;
          console.log(response.body);
          expect(userData).toHaveProperty("message");
          expect(userData).toHaveProperty("token");
          expect(userData).toHaveProperty("user");
          expect(userData.user).toHaveProperty("id");
          resolve(response.body);
        }
      });
  });
};
export { postUser, loginUser, postAdmin, postAsUserAdmin };
