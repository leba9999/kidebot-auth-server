import { Document } from "mongoose";
import Category from "./Category";
import Company from "./Company";
import { Product } from "./Product";
import Variants from "./Variants";

/**
 * Event interface what the Kide.app API returns
 */
interface EventDocument extends Document {
  links: null; // Unknown TODO find out what this is
  model: Model; // Model of the event
}
/**
 * Event interface what the Kide.app API returns
 */
interface Event {
  links: null; // Unknown TODO find out what this is
  model: Model; // Model of the event
}

/**
 * Model of the event
 * Contains all the information about the event tickets, organizer, etc.
 */
interface Model {
  categories: Category[]; // Categories of the event.
  company: Company; // Company of the event
  isHakaRequired: boolean; // Is HAKA authentication required for the event
  product: Product; // Event itself
  variants: Variants[]; // Ticeket variants of the event
}

export { Event, EventDocument, Model };
