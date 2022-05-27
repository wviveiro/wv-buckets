export interface FetchError {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

export type FetchResult = FetchError;
