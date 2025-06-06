/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * 🌴 Palmr. API
 * API documentation for Palmr file sharing system
 * OpenAPI spec version: 1.0.0
 */

export type ListUsers200Item = {
  /** User ID */
  id: string;
  /** User first name */
  firstName: string;
  /** User last name */
  lastName: string;
  /** User username */
  username: string;
  /** User email */
  email: string;
  /**
   * User profile image URL
   * @nullable
   */
  image: string | null;
  /** User is admin */
  isAdmin: boolean;
  /** User is active */
  isActive: boolean;
  /** User creation date */
  createdAt: string;
  /** User last update date */
  updatedAt: string;
};
