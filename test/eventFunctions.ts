import request from "supertest";
import expect from "expect";
import ErrorResponse from "../src/interfaces/Responses/ErrorResponse";
import { Event } from "../src/interfaces/Event";

const postRandomEvent = (
  url: string | Function,
  token: string
): Promise<Event> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get("/api/v1/mockup/generate")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const event = response.body as Event;
          expect(event).toHaveProperty("links");
          expect(event).toHaveProperty("model");
          expect(event?.model).toHaveProperty("categories");
          expect(event?.model).toHaveProperty("company");
          expect(event?.model).toHaveProperty("product");
          expect(event?.model?.product).toHaveProperty("availability");
          resolve(event);
        }
      });
  });
};

const deleteRandomEvent = (
  url: string | Function,
  token: string,
  id: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/products/${id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const event = response.body as ErrorResponse;
          expect(event).toHaveProperty("message");
          resolve(event);
        }
      });
  });
};

export { postRandomEvent, deleteRandomEvent };
