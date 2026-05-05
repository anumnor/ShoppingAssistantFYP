export const API_HOST = '192.168.31.213';
export const API_PORT = '5000';
export const API_BASE_URL = `http://${API_HOST}:${API_PORT}/api`;
export const UPLOAD_BASE_URL = API_BASE_URL.replace('/api', '/uploads');

const buildQuery = (params = {}) => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
};

const createNetworkError = (error) => {
  if (error?.message === 'Network request failed' || error instanceof TypeError) {
    return new Error(
      `Cannot reach API server at ${API_BASE_URL}. Make sure the backend is running on port ${API_PORT} and your Android device is on the same network.`
    );
  }

  return error;
};

const parseResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('API returned an invalid response');
  }
};

const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const result = await parseResponse(response);

    if (!response.ok || result.status === false) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  } catch (error) {
    throw createNetworkError(error);
  }
};

const Api = {
  baseUrl: API_BASE_URL,
  uploadUrl: UPLOAD_BASE_URL,
  request,

  login: (Email, Password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ Email, Password }),
  }),

  signup: ({ Name, Phone, Email, Password }) => request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ Name, Phone, Email, Password }),
  }),

  getStores: () => request('/store/allstores'),
  getProducts: (storeName) => request(`/products${buildQuery({ storeName })}`),
  getCart: () => request('/cart'),

  addToCart: ({ id, quantity, price }) => request('/cart', {
    method: 'POST',
    body: JSON.stringify({ ProductID: id, Quantity: quantity, Price: parseFloat(price) || 0 }),
  }),

  removeCartItem: (cartId) => request(`/cart/${cartId}`, {
    method: 'DELETE',
  }),

  placeOrder: () => request('/orders', {
    method: 'POST',
    body: JSON.stringify({ PaymentStatus: 'Pending' }),
  }),
};

export default Api;
