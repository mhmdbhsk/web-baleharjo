export interface ApiResponse<T> {
  message: string;
  data?: T;
  error?: string;
  metadata?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}