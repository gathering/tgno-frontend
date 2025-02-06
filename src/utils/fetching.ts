interface TypedFetch<T> extends Response {
  json(): Promise<T>;
}

export const typedFetch = <T>(
  request: RequestInfo,
  init?: RequestInit | undefined,
): Promise<TypedFetch<T>> => {
  return fetch(request, init);
};
