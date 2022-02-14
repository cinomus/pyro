const isServer = typeof window === 'undefined';

const envAwareFetch = (url: string, options?: Record<string, unknown>) => {
  const fetchUrl =
    isServer && url.startsWith('/')
      ? `http://localhost:${process.env.PORT}${url}`
      : url;

  return fetch(fetchUrl, options).then((res) => res.json());
};

export { envAwareFetch as fetch };
