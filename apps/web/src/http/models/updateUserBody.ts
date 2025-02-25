/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * 🌴 Palmr. API
 * API documentation for Palmr file sharing system
 * OpenAPI spec version: 1.0.0
 */

export type UpdateUserBody = {
  id: string;
  /** @minLength 1 */
  firstName?: string;
  /** @minLength 1 */
  lastName?: string;
  /** @minLength 3 */
  username?: string;
  email?: string;
  image?: string;
  /**
   * User password
   * @minLength 8
   */
  password?: string;
  isAdmin?: boolean;
};
