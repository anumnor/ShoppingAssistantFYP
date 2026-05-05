import Api, { API_BASE_URL, UPLOAD_BASE_URL } from '../services/api';

class ApiService {
  static baseUrl = API_BASE_URL;
  static uploadUrl = UPLOAD_BASE_URL;
  static request = Api.request;
  static login = Api.login;
  static signup = Api.signup;
  static getStores = Api.getStores;
  static getProducts = Api.getProducts;
  static getCart = Api.getCart;
  static addToCart = Api.addToCart;
  static removeCartItem = Api.removeCartItem;
  static placeOrder = Api.placeOrder;
}

export default ApiService;
