import { OutputUser } from "../User";
import MessageResponse from "./MessageResponse";

export default interface LoginResponse extends MessageResponse {
  token: string;
  user: OutputUser;
}
