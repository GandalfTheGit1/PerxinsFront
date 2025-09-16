import axios from 'axios';
import getEnvironment from '../config/environment';

/**
 * Real API service implementation using Axios
 */
class RealService {
  constructor(entity) {
    this.entity = entity;
    this.baseUrl = `${getEnvironment().apiBaseUrl}/${entity}`;
    this.token = localStorage.getItem('accessToken');
  }

  getHeaders() {
    return {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }

  async getAll(query = {}) {
    try {
      const params = new URLSearchParams(query);
      const response = await axios.get(this.baseUrl, { params, ...this.getHeaders() });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.entity}:`, error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`, this.getHeaders());
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.entity} by ID:`, error);
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await axios.post(this.baseUrl, data, this.getHeaders());
      return response.data;
    } catch (error) {
      console.error(`Error creating ${this.entity}:`, error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await axios.patch(`${this.baseUrl}/${id}`, { id, updateDTO: data }, this.getHeaders());
      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.entity}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, this.getHeaders());
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${this.entity}:`, error);
      throw error;
    }
  }
}

// Entity-specific services
export const services = new RealService('services');
export const events = new RealService('events');
export const users = new RealService('users');
export const likes = new RealService('likes');
export const reservations = new RealService('reservations');
export const messages = new RealService('messages');
export const notifications = new RealService('notifications');
export const polls = new RealService('polls');
export const businessOffers = new RealService('businessOffers');

// Default for other entities
export default RealService;

// Real Auth Service for production authentication
class RealAuthService {
  constructor() {
    this.baseUrl = getEnvironment().apiBaseUrl;
  }

  getHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
  }

  async signin(data) {
    try {
      const response = await axios.post(`${this.baseUrl}/user/signin`, data, this.getHeaders());
      const { accessToken, user } = response.data;
      const isNewUser = false; // Backend determines
      return { accessToken, user, isNewUser };
    } catch (error) {
      console.error('Auth signin error:', error);
      throw error;
    }
  }

  async googleSign(profileObj) {
    try {
      const response = await axios.post(`${this.baseUrl}/user/googleSign`, profileObj, this.getHeaders());
      const { accessToken, user, isNewUser } = response.data;
      return { accessToken, user, isNewUser };
    } catch (error) {
      console.error('Auth googleSign error:', error);
      throw error;
    }
  }
}

export const auth = new RealAuthService();