/**
 * Organizer of the event
 */
interface Company {
  city: string; // City of the organizer
  country: string; // Country of the organizer
  dateCreated: Date; // When the organizer was created
  dateModified: Date; // When the organizer was modified
  description: string; // Description of the organizer (remember this is an object inside string)
  email: string; // Email of the organizer
  favoritedTimes: number; // How many times the organizer has been favorited
  id: string; // Id of the organizer
  ingress: string; // Ingress of the organizer (remember this is an object inside string)
  isFavorited: boolean; // Is the organizer favorited by current user
  latitude: number; // Latitude of the organizer
  longitude: number; // Longitude of the organizer
  mediaFilename: string; // Filename of the organizer media
  name: string; // Name of the organizer
  organizationType: number; // TODO find out what this is
  phone: string; // Phone number of the organizer
  postalCode: string; // Postal code of the organizer
  productCount: number; // TODO find out what this is
  streetAddress: string; // Street address of the organizer
  url: string; // URL of the organizer e.g. website, facebook page, etc.
}

export default Company;
