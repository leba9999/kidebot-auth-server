/**
 * Membership which is required to buy the ticket if there are any
 */
interface AccessControlMemberships {
  canBeActivatedExternally: boolean; // Unknown TODO find out what this is exactly
  description: string; // Description of the membership (remember this is an object inside string)
  form: string; // Form of the membership (remember this is an object inside string)
  grantedBy: unknown[]; // Companies that have granted this membership
  id: string; // Membership ID
  isDisabled: boolean; // Is the membership disabled
  isInitiallyDisabled: boolean; // Is the membership initially disabled
  mediaFilename: string; // Media filename of the membership (No idea why meybe left from product)
  name: string; // Name of the membership
}

export default AccessControlMemberships;
