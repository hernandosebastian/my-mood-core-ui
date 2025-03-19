export interface IApiService<C> {
  get: <T = unknown>(url: string, config?: C) => Promise<T>;
  post: <T = unknown, K = unknown>(
    url: string,
    body: K,
    config?: C
  ) => Promise<T>;
  patch: <T = unknown, K = unknown>(
    url: string,
    body: K,
    config?: C
  ) => Promise<T>;
  put: <T = unknown, K = unknown>(
    url: string,
    body: K,
    config?: C
  ) => Promise<T>;
  delete: <T = unknown>(url: string, config?: C) => Promise<T>;
  setAuthentication: (token: string) => void;
}
