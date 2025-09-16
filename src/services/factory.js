import getEnvironment from '../config/environment';
import * as RealServices from './realServices';
import * as MockServices from './mockServices';

/**
 * Service interface (JSDoc for type safety)
 * @interface
 * @property {function} getAll - Fetch all items with optional query
 * @property {function} getById - Fetch item by ID
 * @property {function} create - Create new item
 * @property {function} update - Update existing item
 * @property {function} delete - Delete item
 */

/**
 * Factory to create service instances based on environment
 * @param {string} entity - Entity name (e.g., 'services', 'events')
 * @returns {Object} Service instance with CRUD methods
 */
const createService = (entity) => {
  const env = getEnvironment();
  if (entity === 'auth') {
    return env.isDemo ? MockServices.auth : RealServices.auth;
  }
  if (env.isDemo) {
    if (MockServices[entity]) {
      return MockServices[entity];
    } else {
      return new MockService(entity);
    }
  }
  if (RealServices[entity]) {
    return RealServices[entity];
  } else {
    return new RealService(entity);
  }
};

export default createService;