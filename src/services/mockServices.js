import getEnvironment from '../config/environment';
import { mockUsers, mockServices, mockEvents, mockBusinessOffers, mockLikes, mockReservations, mockMessages, mockNotifications, mockPolls } from '../mockData.jsx';

/**
 * Mock service implementation using localStorage persistence
 */
class MockService {
  constructor(entity) {
    this.entity = entity;
    this.env = getEnvironment();
    this.data = this.loadData();
  }

  loadData() {
    if (this.env.isDemo) {
      const stored = localStorage.getItem(`mock_${this.entity}`);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    // Default data based on entity
    switch (this.entity) {
      case 'users': return mockUsers;
      case 'services': return mockServices;
      case 'events': return mockEvents;
      case 'businessOffers': return mockBusinessOffers;
      case 'likes': return mockLikes;
      case 'reservations': return mockReservations;
      case 'messages': return mockMessages;
      case 'notifications': return mockNotifications;
      case 'polls': return mockPolls;
      default: return [];
    }
  }

  saveData() {
    if (this.env.isDemo) {
      localStorage.setItem(`mock_${this.entity}`, JSON.stringify(this.data));
    }
  }

  delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(query = {}) {
    await this.delay();
    // Simple query simulation
    let filtered = this.data;
    if (query.province) {
      filtered = filtered.filter(item => item.location?.province === query.province);
    }
    if (query.category) {
      filtered = filtered.filter(item => item.category === query.category);
    }
    // Add more query logic as needed
    return filtered;
  }

  async getById(id) {
    await this.delay();
    const item = this.data.find(item => item._id === id);
    if (!item) throw new Error(`${this.entity} not found`);
    return item;
  }

  async create(data) {
    await this.delay();
    const newItem = { ...data, _id: `mock_${this.entity}_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.data.unshift(newItem);
    this.saveData();
    // Simulate relationships, e.g., add notification
    if (this.entity === 'services') {
      this.addNotification('user2', 'New service created', newItem._id); // Owner notification
    }
    // Similar for other entities
    return newItem;
  }

  async update(id, data) {
    await this.delay();
    const index = this.data.findIndex(item => item._id === id);
    if (index === -1) throw new Error(`${this.entity} not found`);
    this.data[index] = { ...this.data[index], ...data, updatedAt: new Date().toISOString() };
    this.saveData();
    // Simulate cascading, e.g., update related offers
    if (this.entity === 'services' ) {
      // Update businessOffers if needed
    }
    return this.data[index];
  }

  async delete(id) {
    await this.delay();
    const index = this.data.findIndex(item => item._id === id);
    if (index === -1) throw new Error(`${this.entity} not found`);
    this.data.splice(index, 1);
    this.saveData();
    // Simulate cascading, e.g., delete related reservations
    if (this.entity === 'services') {
      this.deleteRelated('reservations', id);
    }
    return { success: true };
  }

  // Helper for relationships
  addNotification(userId, message, relatedId) {
    const newNotif = {
      _id: `notif_${Date.now()}`,
      userId,
      type: 'system',
      message,
      relatedId,
      read: false,
      createdAt: new Date().toISOString(),
    };
    // Append to notifications data
    const notifService = new MockService('notifications');
    notifService.data.unshift(newNotif);
    notifService.saveData();
  }

  deleteRelated(entity, relatedId) {
    const relatedService = new MockService(entity);
    relatedService.data = relatedService.data.filter(item => item.serviceId !== relatedId && item.eventId !== relatedId);
    relatedService.saveData();
  }

  // Like specific logic
  async toggleLike(userId, itemId, type) {
    await this.delay();
    let likes = this.data;
    let itemEntity = type === 'service' ? 'services' : 'events';
    const itemService = new MockService(itemEntity);
    const item = itemService.data.find(i => i._id === itemId);
    if (!item) throw new Error('Item not found');

    const existingLike = likes.find(l => l.userId === userId && (l.serviceId || l.eventId) === itemId);
    if (existingLike) {
      existingLike.liked = !existingLike.liked;
      if (!existingLike.liked) {
        item.numberOfLikes--;
      } else {
        item.numberOfLikes++;
      }
      itemService.saveData();
      this.saveData();
      return existingLike;
    } else {
      const newLike = {
        _id: `like_${Date.now()}`,
        userId,
        [type === 'service' ? 'serviceId' : 'eventId']: itemId,
        liked: true,
        createdAt: new Date().toISOString(),
      };
      likes.push(newLike);
      item.numberOfLikes++;
      itemService.saveData();
      this.saveData();
      this.addNotification(item.ownerId || item.organizerId, `${userId} liked your ${type}`, itemId);
      return newLike;
    }
  }
}

// Entity-specific instances
export const services = new MockService('services');
export const events = new MockService('events');
export const users = new MockService('users');
export const likes = new MockService('likes');
export const reservations = new MockService('reservations');
export const messages = new MockService('messages');
export const notifications = new MockService('notifications');
export const polls = new MockService('polls');
export const businessOffers = new MockService('businessOffers');

// Extend for specific methods, e.g., likes.toggleLike
likes.toggleLike = async (userId, itemId, type) => {
  const likesService = new MockService('likes');
  const itemEntity = type === 'service' ? 'services' : 'events';
  const itemService = new MockService(itemEntity);
  const item = await itemService.getById(itemId);
  await likesService.delay();
  const existingLike = likesService.data.find(l => l.userId === userId && (l.serviceId === itemId || l.eventId === itemId));
  let liked, numberOfLikes;
  if (existingLike) {
    existingLike.liked = !existingLike.liked;
    liked = existingLike.liked;
    numberOfLikes = liked ? item.numberOfLikes + 1 : item.numberOfLikes - 1;
  } else {
    const newLike = {
      _id: `like_${Date.now()}`,
      userId,
      [type === 'service' ? 'serviceId' : 'eventId']: itemId,
      liked: true,
      createdAt: new Date().toISOString(),
    };
    likesService.data.push(newLike);
    liked = true;
    numberOfLikes = item.numberOfLikes + 1;
    likesService.saveData();
  }
  item.numberOfLikes = numberOfLikes;
  itemService.saveData();
  likesService.saveData();
  // Add notification to owner
  const ownerId = item.ownerId || item.organizerId;
  if (liked && ownerId) {
    likesService.addNotification(ownerId, `${userId} liked your ${type}`, itemId);
  }
  console.log('Toggle like result:', { liked, numberOfLikes, itemId });
  return { liked, numberOfLikes };
};

// Share simulation (notify owner, no count)
services.share = async (serviceId, userId, userName) => {
  const serviceService = new MockService('services');
  await serviceService.delay(300);
  const service = await serviceService.getById(serviceId);
  const notificationsService = new MockService('notifications');
  const newNotif = {
    _id: `share_notif_${Date.now()}`,
    userId: service.ownerId,
    type: 'share',
    message: `${userName} shared your service ${service.name}`,
    relatedId: serviceId,
    read: false,
    createdAt: new Date().toISOString(),
  };
  notificationsService.data.unshift(newNotif);
  notificationsService.saveData();
  console.log('Share simulated for service:', serviceId);
  return { success: true, message: 'Shared successfully' };
};

events.share = async (eventId, userId, userName) => {
  const eventService = new MockService('events');
  await eventService.delay(300);
  const event = await eventService.getById(eventId);
  const notificationsService = new MockService('notifications');
  const newNotif = {
    _id: `share_notif_${Date.now()}`,
    userId: event.organizerId,
    type: 'share',
    message: `${userName} shared your event ${event.name}`,
    relatedId: eventId,
    read: false,
    createdAt: new Date().toISOString(),
  };
  notificationsService.data.unshift(newNotif);
  notificationsService.saveData();
  console.log('Share simulated for event:', eventId);
  return { success: true, message: 'Shared successfully' };
};

// Default
export default MockService;

// Mock Auth Service for demo authentication
class MockAuthService {
  constructor() {
    this.delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
  }

  async signin(data) {
    await this.delay();
    const { email } = data;
    // Find existing user or create new based on email
    let user = mockUsers.find(u => u.email === email);
    const isNewUser = !user;
    const selectedRole = data.role || 'client';
    if (isNewUser) {
      // Create new user from template, set role
      user = {
        ...mockUsers.find(u => u.role === selectedRole) || mockUsers[0],
        _id: `demo_user_${Date.now()}`,
        email,
        name: email.split('@')[0].replace(/\./g, ' ').replace(/_/g, ' '),
        role: selectedRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockUsers.push(user);
    } else {
      // For existing, override role for demo session
      user = { ...user, role: selectedRole };
    }
    const accessToken = `demo_access_token_${user._id}`;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('authUser', JSON.stringify(user));
    return { accessToken, user, isNewUser };
  }

  async googleSign(profileObj) {
    await this.delay(800);
    const { email, name, imageUrl } = profileObj;
    let user = mockUsers.find(u => u.email === email);
    const isNewUser = !user;
    const defaultRole = 'client';
    if (isNewUser) {
      user = {
        ...mockUsers.find(u => u.role === defaultRole) || mockUsers[0],
        _id: `demo_google_user_${Date.now()}`,
        email,
        name,
        profilePicture: imageUrl,
        role: defaultRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockUsers.push(user);
    } else {
      // For existing, keep original role for google
      user = { ...user };
    }
    const accessToken = `demo_google_token_${user._id}`;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('authUser', JSON.stringify(user));
    return { accessToken, user, isNewUser };
  }
}

export const auth = new MockAuthService();