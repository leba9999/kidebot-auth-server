import mongoose from "mongoose";
import { Event } from "../../interfaces/Event";

const eventModel = new mongoose.Schema<Event>({
  links: {
    type: String,
    default: null,
  },
  model: {
    categories: [
      {
        dateCreated: Date,
        dateModified: Date,
        id: String,
        isFilterable: Boolean,
        isPublic: Boolean,
        name: String,
        nameResourceKey: String,
        orderingNumber: Number,
        parentCategoryId: String,
        productTypes: [Number],
        type: {
          type: Number,
        },
      },
    ],
    company: {
      city: String,
      country: String,
      dateCreated: Date,
      dateModified: Date,
      description: String,
      email: String,
      favoritedTimes: Number,
      id: String,
      ingress: String,
      isFavorited: Boolean,
      latitude: Number,
      longitude: Number,
      mediaFilename: String,
      name: String,
      organizationType: Number,
      phone: String,
      postalCode: String,
      productCount: Number,
      streetAddress: String,
      url: String,
    },
    isHakaRequired: Boolean,
    product: {
      availability: Number,
      city: String,
      companyId: String,
      country: String,
      dateActualFrom: Date,
      dateActualUntil: Date,
      dateCreated: Date,
      dateModified: Date,
      datePublishFrom: Date,
      datePublishUntil: Date,
      dateSalesFrom: Date,
      dateSalesUntil: Date,
      description: String,
      favoritedTimes: Number,
      hasFreeInventoryItems: Boolean,
      hasInventoryItems: Boolean,
      id: String,
      ingress: String,
      isActual: Boolean,
      isDeleted: Boolean,
      isFavorited: Boolean,
      isLong: Boolean,
      isPublic: Boolean,
      isPublished: Boolean,
      latitude: Number,
      longitude: Number,
      maxPrice: {
        eur: Number,
      },
      maxTotalReservationsPerCheckout: Number,
      mediaFilename: String,
      minPrice: {
        eur: Number,
      },
      minTotalReservationsPerCheckout: Number,
      name: String,
      place: String,
      postalCode: String,
      pricingInformation: String,
      productType: Number,
      salesEnded: Boolean,
      salesOngoing: Boolean,
      salesPaused: Boolean,
      salesStarted: Boolean,
      streetAddress: String,
      time: Number,
      timeUntilSalesStart: Number,
    },
    variants: [
      {
        accessControlMemberships: [
          {
            canBeActivatedExternally: Boolean,
            description: String,
            form: String,
            grantedBy: {
              type: String,
              default: null,
            },
            id: String,
            isDisabled: Boolean,
            isInitiallyDisabled: Boolean,
            mediaFilename: String,
            name: String,
          },
        ],
        availability: Number,
        contentsMemberships: [
          {
            type: String,
            default: null,
          },
        ],
        currencyCode: String,
        dateActualFrom: Date,
        dateActualUntil: Date,
        dateCreated: Date,
        dateModified: Date,
        dateSalesFrom: Date,
        dateSalesUntil: Date,
        description: String,
        favoritedTimes: Number,
        id: String,
        ingress: String,
        inventoryId: String,
        isProductVariantActive: Boolean,
        isProductVariantHakaAuthenticationRequired: Boolean,
        isProductVariantMarkedAsOutOfStock: Boolean,
        isProductVariantTransferable: Boolean,
        linkedProductVariants: [
          {
            type: String,
            default: null,
          },
        ],
        mediaFilename: String,
        name: String,
        notesInstructions: String,
        pricePerItem: Number,
        productId: String,
        productType: Number,
        productVariantMaximumItemQuantityPerUser: Number,
        productVariantMaximumReservableQuantity: Number,
        productVariantMinimumReservableQuantity: Number,
        requiredInventoryIdReservations: [
          {
            type: String,
            default: null,
          },
        ],
        salesEnded: Boolean,
        salesOngoing: Boolean,
        salesStarted: Boolean,
        vat: Number,
      },
    ],
  },
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
