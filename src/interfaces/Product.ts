interface Product {
  availability: number; // How many tickets are overall available
  city: string; // City of the event
  companyId: string; // Id of the organizer
  country: string; // Country of the event
  dateActualFrom: null | Date; // When the event starts
  dateActualUntil: null | Date; // When the event ends
  dateCreated: Date; // When the event was created
  dateModified: Date; // When the event was modified
  datePublishFrom: Date; // When the event was published
  datePublishUntil: Date; // When the event will be unpublished
  dateSalesFrom: Date; // When the event sales start
  dateSalesUntil: Date; // When the event sales end
  description: string; // Description of the event (remember this is an object inside string)
  favoritedTimes: number; // How many times the event has been favorited
  hasFreeInventoryItems: boolean; // Does the event have free tickets
  hasInventoryItems: boolean; // Does the event have tickets
  id: string; // Id of the event
  ingress: string; // Ingress of the event (remember this is an object inside string)
  isActual: boolean; // TODO find out what this is
  isDeleted: boolean; // Is the event deleted (not sure if this is used)
  isFavorited: boolean; // Is the event favorited by current user
  isLong: boolean; // TODO find out what this is
  isPublic: boolean; // TODO find out what this is
  isPublished: boolean; // Is the event published
  latitude: null | number; // Latitude of the event
  longitude: null | number; // Longitude of the event
  maxPrice: null | Price; // Max price of the ticket
  maxTotalReservationsPerCheckout: null | number; // Max tickets per checkout this is very limiting how many tickets bot can reserve
  mediaFilename: null | string; // Filename of the event media
  minPrice: null | Price; // Min price of the ticket
  minTotalReservationsPerCheckout: null | number; // Min tickets per checkout
  name: string; // Name of the event
  place: string; // Place of the event
  postalCode: null | string; // Postal code of the event
  pricingInformation: null | string; // Todo find out what this is
  productType: number; // TODO find out what this is
  salesEnded: boolean; // Is the event sales ended
  salesOngoing: boolean; // Is the event sales ongoing
  salesPaused: boolean; // Is the event sales paused
  salesStarted: boolean; // Is the event sales started
  streetAddress: string; // Street address of the event
  time: number; //Server time
  timeUntilSalesStart: number; // Time until the event sales start
}

interface Productlight {
  id: string; // Id of the event
  productType: number; // Type of the event. E.g. 1 = event, 2 = products, 3 = membership
  companyName: string; // Name of the organizer
  companyMediaFilename: null | string; // Filename of the organizer media
  name: string; // Name of the event
  mediaFilename: null | string; // Filename of the event media
  place: string; // Place of the event
  dateSalesFrom: Date; // When the event sales start
  dateSalesUntil: Date; // When the event sales end
  dateActualFrom: null | Date; // When the event starts
  dateActualUntil: null | Date; // When the event ends
  datePublishFrom: Date; // When the event was published
  pricingInformation: null | string; // Todo find out what this is
  maxPrice: null | Price; // Max price of the ticket
  minPrice: null | Price; // Min price of the ticket
  hasFreeInventoryItems: boolean; // Does the event have free tickets
  hasInventoryItems: boolean; // Does the event have tickets
  dateCreated: Date; // When the event was created
  availability: number; // How many tickets are overall available
  isFavorited: boolean; // Is the event favorited by current user
  favoritedTimes: number; // How many times the event has been favorited
  isLong: boolean; // TODO find out what this is
  isActual: boolean; // TODO find out what this is
  salesEnded: boolean; // Is the event sales ended
  salesOngoing: boolean; // Is the event sales ongoing
  salesPaused: boolean; // Is the event sales paused
  salesStarted: boolean; // Is the event sales started
  time: number; //Server time
  timeUntilSalesStart: number; // Time until the event sales start
}

/**
 * Price of the ticket
 * Price in EUR (This is the only currency used as far as I know)
 */
interface Price {
  eur: number; // Price in EUR (This is the only currency used as far as I know)
}

export { Product, Price, Productlight };
