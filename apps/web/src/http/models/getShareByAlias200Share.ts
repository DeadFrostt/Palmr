/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * 🌴 Palmr. API
 * API documentation for Palmr file sharing system
 * OpenAPI spec version: 1.0.0
 */
import type { GetShareByAlias200ShareAlias } from "./getShareByAlias200ShareAlias";
import type { GetShareByAlias200ShareFilesItem } from "./getShareByAlias200ShareFilesItem";
import type { GetShareByAlias200ShareRecipientsItem } from "./getShareByAlias200ShareRecipientsItem";
import type { GetShareByAlias200ShareSecurity } from "./getShareByAlias200ShareSecurity";

export type GetShareByAlias200Share = {
  /** The share ID */
  id: string;
  /**
   * The share name
   * @nullable
   */
  name: string | null;
  /**
   * The share description
   * @nullable
   */
  description: string | null;
  /**
   * The share expiration date
   * @nullable
   */
  expiration: string | null;
  /** The number of views */
  views: number;
  /** The share creation date */
  createdAt: string;
  /** The share update date */
  updatedAt: string;
  /** The creator ID */
  creatorId: string;
  security: GetShareByAlias200ShareSecurity;
  files: GetShareByAlias200ShareFilesItem[];
  recipients: GetShareByAlias200ShareRecipientsItem[];
  /** @nullable */
  alias: GetShareByAlias200ShareAlias;
};
