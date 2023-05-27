import mongoose from "mongoose";
import { Event } from "../../interfaces/Event";

const eventModel = new mongoose.Schema<Event>({
  links: null, // Unknown TODO find out what this is
  model: {
    categories: [
      {
        dateCreated: Date, // When the category was created
        dateModified: Date, // When the category was modified
        id: String, // Id of the category
        isFilterable: Boolean, // Is the category filterable
        isPublic: Boolean, // Is the category public
        name: String, // Name of the category (remember this is an object inside string)
        nameResourceKey: String, // Name of the category in resource key
        orderingNumber: Number, // TODO find out what this is
        parentCategoryId: String, // Parent category id
        productTypes: [Number], // Product types of the category
        type: Number, // TODO find out what this is
      },
    ], // Categories of the event.
    company: {
      city: String, // City of the organizer
      country: String, // Country of the organizer
      dateCreated: Date, // When the organizer was created
      dateModified: Date, // When the organizer was modified
      description: String, // Description of the organizer (remember this is an object inside string)
      email: String, // Email of the organizer
      favoritedTimes: Number, // How many times the organizer has been favorited
      id: String, // Id of the organizer
      ingress: String, // Ingress of the organizer (remember this is an object inside string)
      isFavorited: Boolean, // Is the organizer favorited by current user
      latitude: Number, // Latitude of the organizer
      longitude: Number, // Longitude of the organizer
      mediaFilename: String, // Filename of the organizer media
      name: String, // Name of the organizer
      organizationType: Number, // TODO find out what this is
      phone: String, // Phone number of the organizer
      postalCode: String, // Postal code of the organizer
      productCount: Number, // TODO find out what this is
      streetAddress: String, // Street address of the organizer
      url: String, // URL of the organizer e.g. website, facebook page, etc.
    }, // Company of the event
    isHakaRequired: Boolean, // Is HAKA authentication required for the event
    product: {
      availability: Number, // How many tickets are overall available
      city: String, // City of the event
      companyId: String, // Id of the organizer
      country: String, // Country of the event
      dateActualFrom: Date, // TODO find out what this is exactly
      dateActualUntil: Date, // TODO find out what this is exactly
      dateCreated: Date, // When the event was created
      dateModified: Date, // When the event was modified
      datePublishFrom: Date, // When the event was published
      datePublishUntil: Date, // When the event was unpublished
      dateSalesFrom: Date, // When the event sales start
      dateSalesUntil: Date, // When the event sales end
      description: String, // Description of the event (remember this is an object inside string)
      favoritedTimes: Number, // How many times the event has been favorited
      hasFreeInventoryItems: Boolean, // Does the event have free tickets
      hasInventoryItems: Boolean, // Does the event have tickets
      id: String, // Id of the event
      ingress: String, // Ingress of the event (remember this is an object inside string)
      isActual: Boolean, // TODO find out what this is
      isDeleted: Boolean, // Is the event deleted (not sure if this is used)
      isFavorited: Boolean, // Is the event favorited by current user
      isLong: Boolean, // TODO find out what this is
      isPublic: Boolean, // Is the event public
      isPublished: Boolean, // Is the event published
      latitude: Number, // Latitude of the event
      longitude: Number, // Longitude of the event
      maxPrice: {
        eur: Number, // Max price of the ticket in EUR
      }, // Max price of the ticket
      maxTotalReservationsPerCheckout: Number, // Max tickets per checkout
      mediaFilename: String, // Filename of the event media
      minPrice: {
        eur: Number, // Min price of the ticket in EUR
      }, // Min price of the ticket
      minTotalReservationsPerCheckout: Number, // Min tickets per checkout
      name: String, // Name of the event
      place: String, // Place of the event
      postalCode: String, // Postal code of the event
      pricingInformation: String, // Todo find out what this is
      productType: Number, // TODO find out what this is
      salesEnded: Boolean, // Is the event sales ended
      salesOngoing: Boolean, // Is the event sales ongoing
      salesPaused: Boolean, // Is the event sales paused
      salesStarted: Boolean, // Is the event sales started
      streetAddress: String, // Street address of the event
      time: Number, // Time of the event
      timeUntilSalesStart: Number, // Time until the event sales start
    }, // Event itself
    variants: [
      {
        accessControlMemberships: [
          {
            canBeActivatedExternally: Boolean, // Unknown TODO find out what this is exactly
            description: String, // Description of the membership (remember this is an object inside string)
            form: String, // Form of the membership (remember this is an object inside string)
            grantedBy: null, // Companies that have granted this membership
            id: String, // Membership ID
            isDisabled: Boolean, // Is the membership disabled
            isInitiallyDisabled: Boolean, // Is the membership initially disabled
            mediaFilename: String, // Media filename of the membership (No idea why meybe left from product)
            name: String, // Name of the membership
          },
        ], // Required memberships for this ticket
        availability: Number, // How many tickets are left
        contentsMemberships: null, // Unknown type TODO find out what this is
        currencyCode: String, // EUR or what currency the ticket is sold in
        dateActualFrom: Date, // TODO find out what this is exactly
        dateActualUntil: Date, // TODO find out what this is exactly
        dateCreated: Date, // When the ticket/event was created
        dateModified: Date, // When the ticket was last modified
        dateSalesFrom: Date, // When the ticket sales start
        dateSalesUntil: Date, // When the ticket sales end
        description: String, // Description of the ticket (remember this is an object inside string)
        favoritedTimes: Number, // How many times the ticket has been favorited
        id: String, // Ticket ID
        ingress: String, // Ingress of the organizer (remember this is an object inside string)
        inventoryId: String, // Inventory ID of the ticket (used for reserving ticket not ticket ID)
        isProductVariantActive: Boolean, // Is the ticket variant active
        isProductVariantHakaAuthenticationRequired: Boolean, // Is HAKA authentication required for this ticket
        isProductVariantMarkedAsOutOfStock: Boolean, // Is the ticket marked as out of stock
        isProductVariantTransferable: Boolean, // Is the ticket transferable to another user
        isProductVariantVisible: Boolean, // Is the ticket visible (There can be hidden tickets)
        linkedProductVariants: null, // Unknown type TODO find out what this is
        mediaFilename: String, // Media filename of the ticket (No idea why meybe left from product)
        name: String, // Name of the ticket
        notesInstructions: String, // Notes and instructions of the ticket
        pricePerItem: Number, // Price per ticket
        productId: String, // Product ID of the ticket
        productType: Number, // Product type of the ticket
        productVariantMaximumItemQuantityPerUser: Number, // Maximum amount of tickets that can be bought/owned per user (Very limiting factor!)
        productVariantMaximumReservableQuantity: Number, // Maximum amount of tickets that can be reserved per user
        productVariantMinimumReservableQuantity: Number, // Minimum amount of tickets that can be reserved per user
        requiredInventoryIdReservations: null, // Unknown type TODO find out what this is
        salesEnded: Boolean, // Has the ticket sales ended
        salesOngoing: Boolean, // Are the ticket sales ongoing
        salesStarted: Boolean, // Have the ticket sales started
        vat: Number, // VAT of the ticket
      },
    ], // Ticeket variants of the event
  }, // Model of the event
});

// Duplicate the ID field.
eventModel.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
eventModel.set("toJSON", {
  virtuals: true,
});

export default mongoose.model<Event>("events", eventModel);
