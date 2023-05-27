import AccessControlMemberships from "./AccessControlMemberships";

/**
 * Ticket variants of the event
 */
interface Variants {
  accessControlMemberships: AccessControlMemberships[]; // Required memberships for this ticket
  availability: number; // How many tickets are left
  contentsMemberships: unknown[]; // Unknown type TODO find out what this is
  currencyCode: string; // EUR or what currency the ticket is sold in
  dateActualFrom: null | Date; // TODO find out what this is exactly
  dateActualUntil: null | Date; // TODO find out what this is exactly
  dateCreated: null | Date; // When the ticket/event was created
  dateModified: null | Date; // When the ticket was last modified
  dateSalesFrom: null | Date; // When the ticket sales start
  dateSalesUntil: null | Date; // When the ticket sales end
  description: string; // Description of the ticket (remember this is an object inside string)
  favoritedTimes: number; // How many times the ticket has been favorited
  id: string; // Ticket ID
  ingress: string; // Ingress of the variant (remember this is an object inside string)
  inventoryId: string; // Inventory ID of the ticket (used for reserving ticket not ticket ID)
  isProductVariantActive: boolean; // Is the ticket variant active
  isProductVariantHakaAuthenticationRequired: boolean; // Is HAKA authentication required for this ticket
  isProductVariantMarkedAsOutOfStock: boolean; // Is the ticket marked as out of stock
  isProductVariantTransferable: boolean; // Is the ticket transferable to another user
  isProductVariantVisible: boolean; // Is the ticket visible (There can be hidden tickets)
  linkedProductVariants: unknown[]; // Unknown type TODO find out what this is
  mediaFilename: null | string; // Media filename of the ticket
  name: string; // Name of the ticket
  notesInstructions: string; // Notes and instructions of the ticket (unkonwn use)
  pricePerItem: number | null | undefined; // Price per ticket
  productId: string; // Product ID of the ticket
  productType: number; // Product type of the ticket
  productVariantMaximumItemQuantityPerUser: number; // Maximum amount of tickets that can be bought/owned per variant
  productVariantMaximumReservableQuantity: number; // Maximum amount of tickets that can be reserved per user
  productVariantMinimumReservableQuantity: number; // Minimum amount of tickets that can be reserved per user
  requiredInventoryIdReservations: unknown[]; // Unknown type TODO find out what this is
  salesEnded: null | boolean; // Has the ticket sales ended
  salesOngoing: null | boolean; // Are the ticket sales ongoing
  salesStarted: null | boolean; // Have the ticket sales started
  vat: number; // VAT of the ticket
}

export default Variants;
