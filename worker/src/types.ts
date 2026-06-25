export interface R2ObjectInfo {
  key: string;
  size: number;
  lastModified: string;
  isFolder: boolean;
  etag?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ListFilesResponse {
  files: R2ObjectInfo[];
  prefix: string;
  truncated: boolean;
}

export interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}