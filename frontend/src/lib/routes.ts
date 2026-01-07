export const routes = {
  home: '/',
  about: '/about',
  productDetail: (id: number) => `/products/${id}`,
} as const;
