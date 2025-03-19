export interface IHTTPRequestService<C = unknown> {
  get: <T>(url: string, config?: C) => Promise<T>;
  post: <T, K = unknown>(url: string, body: K, config?: C) => Promise<T>;
  patch: <T, K = unknown>(url: string, body: K, config?: C) => Promise<T>;
  put: <T, K = unknown>(url: string, body: K, config?: C) => Promise<T>;
  delete: <T>(url: string, config?: C) => Promise<T>;
  setAuthentication: (token: string) => void;
}
