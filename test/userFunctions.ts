import request from "supertest";
import expect from "expect";
import { TestUser } from "../src/interfaces/User";
import LoginResponse from "../src/interfaces/Responses/LoginResponse";
import ErrorResponse from "../src/interfaces/Responses/ErrorResponse";

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
          expect(userData).toHaveProperty("message");
          expect(userData).toHaveProperty("token");
          expect(userData).toHaveProperty("user");
          expect(userData.user).toHaveProperty("id");
          resolve(userData);
        }
      });
  });
};
const getUsers = (url: string | Function): Promise<TestUser[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .send({
        query: `query Users {
            users {
              id
              kideId
              username
              createdAt
              admin
            }
          }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users = response.body.data.users;
          expect(users).toBeInstanceOf(Array);
          expect(users[0]).toHaveProperty("id");
          expect(users[0]).toHaveProperty("username");
          expect(users[0]).toHaveProperty("kideId");
          expect(users[0]).toHaveProperty("admin");
          resolve(users);
        }
      });
  });
};
const getUser = (url: string | Function, user: TestUser): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .send({
        query: `query UserById($userByIdId: ID!) {
          userById(id: $userByIdId) {
            id
            username
            kideId
            createdAt
            admin
          }
        }`,
        variables: {
          userByIdId: user.id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.userById;
          expect(userData).toHaveProperty("id");
          expect(userData).toHaveProperty("username");
          expect(userData).toHaveProperty("kideId");
          expect(userData).toHaveProperty("admin");
          expect(userData.username).toBe(user.username);
          resolve(userData);
        }
      });
  });
};
const editUser = (
  url: string | Function,
  user: TestUser,
  updatetedUser: TestUser,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation UpdateUser($user: UserModify!, $updateUserId: ID!) {
          updateUser(user: $user, id: $updateUserId) {
            id
            kideId
            username
            admin
          }
        }`,
        variables: {
          updateUserId: user.id,
          user: {
            username: updatetedUser.username,
            kideId: updatetedUser.kideId,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toBe(null);
          resolve(userData);
        }
      });
  });
};
const adminEditUser = (
  url: string | Function,
  user: TestUser,
  updatetedUser: TestUser,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation UpdateUser($user: UserModify!, $updateUserId: ID!) {
          updateUser(user: $user, id: $updateUserId) {
            id
            kideId
            username
            admin
          }
        }`,
        variables: {
          updateUserId: user.id,
          user: {
            username: updatetedUser.username,
            kideId: updatetedUser.kideId,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toHaveProperty("id");
          expect(userData).toHaveProperty("username");
          expect(userData).toHaveProperty("kideId");
          expect(userData).toHaveProperty("admin");
          expect(userData.username).toBe(updatetedUser.username);
          expect(userData.username).not.toBe(user.username);
          resolve(userData);
        }
      });
  });
};
const adminEditAdmin = (
  url: string | Function,
  user: TestUser,
  updatetedUser: TestUser,
  token: string
): Promise<TestUser> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: `mutation UpdateUser($user: UserModify!, $updateUserId: ID!) {
          updateUser(user: $user, id: $updateUserId) {
            id
            kideId
            username
            admin
          }
        }`,
        variables: {
          updateUserId: user.id,
          user: {
            username: updatetedUser.username,
            kideId: updatetedUser.kideId,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toHaveProperty("id");
          expect(userData).toHaveProperty("username");
          expect(userData).toHaveProperty("kideId");
          expect(userData).toHaveProperty("admin");
          expect(userData.username).toBe(updatetedUser.username);
          expect(userData.username).not.toBe(user.username);
          resolve(userData);
        }
      });
  });
};
const deleteUser = (
  url: string | Function,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Authorization", "Bearer " + token)
      .send({
        query: `mutation DeleteUser {
            deleteUser {
              id
              createdAt
              admin
              kideId
              username
            }
          }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.deleteUser;
          expect(userData).toHaveProperty("id");
          expect(userData).toHaveProperty("username");
          resolve(response.body.data.deleteUser);
        }
      });
  });
};
const adminDeleteUser = (
  url: string | Function,
  user: TestUser,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/graphql")
      .set("Authorization", "Bearer " + token)
      .send({
        query: `mutation AdminDeleteUser($adminDeleteUserId: ID!) {
            adminDeleteUser(id: $adminDeleteUserId) {
              admin
              createdAt
              id
              kideId
              username
            }
          }`,
        variables: {
          adminDeleteUserId: user.id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.adminDeleteUser;
          expect(userData.id).toBe(user.id);
          resolve(userData);
        }
      });
  });
};
const loginBrute = (
  url: string | Function,
  user: TestUser
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post("/api/v1/auth/token")
      .set("Content-type", "application/json")
      .send({
        kideId: user.kideId,
      })
      .expect(429, (err, response) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
};

export {
  postUser,
  loginUser,
  postAdmin,
  postAsUserAdmin,
  getUsers,
  getUser,
  editUser,
  adminEditUser,
  adminEditAdmin,
  deleteUser,
  adminDeleteUser,
  loginBrute,
};
