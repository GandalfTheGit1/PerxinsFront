import getEnvironment from '../config/environment';
import { mockUsers, mockServices, mockEvents, mockBusinessOffers, mockLikes, mockReservations, mockMessages, mockNotifications, mockPolls, createMockService, createMockEvent, initializeMockData, saveMockEntityData } from '../mockData.jsx';

// Initialize mock data when the service file is loaded
initializeMockData();

/**
 * Mock service implementation using localStorage persistence
 */
class MockService {
  constructor(entity) {
    this.entity = entity;
    this.env = getEnvironment();
    // Reference the globally mutable data array directly
    switch (entity) {
      case 'users': this.data = mockUsers; break;
      case 'services': this.data = mockServices; break;
      case 'events': this.data = mockEvents; break;
      case 'businessOffers': this.data = mockBusinessOffers; break;
      case 'likes': this.data = mockLikes; break;
      case 'reservations': this.data = mockReservations; break;
      case 'messages': this.data = mockMessages; break;
      case 'notifications': this.data = mockNotifications; break;
      case 'polls': this.data = mockPolls; break;
      default: this.data = []; break;
    }
  }

  loadData() {
    // Data is loaded via initializeMockData at startup
    return this.data;
  }

  saveData() {
    if (this.env.isDemo) {
      saveMockEntityData(this.entity, this.data);
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
    let newItem;
    const currentUserId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    if (this.entity === 'services') {
      newItem = createMockService(data, currentUserId);
      // Add the new service to the user's owned services
      const user = mockUsers.find(u => u._id === currentUserId);
      if (user) {
        user.servicesOwned.push(newItem._id);
        saveMockEntityData('users', mockUsers);
      }
      this.addNotification(currentUserId, `New service '${newItem.name}' created!`, newItem._id);
    } else if (this.entity === 'events') {
      newItem = createMockEvent(data, currentUserId);
      // Add the new event to the user's owned events
      const user = mockUsers.find(u => u._id === currentUserId);
      if (user) {
        user.eventsOwned.push(newItem._id);
        saveMockEntityData('users', mockUsers);
      }
      this.addNotification(currentUserId, `New event '${newItem.name}' created!`, newItem._id);
    } else if (this.entity === 'messages') {
      const user = mockUsers.find(u => u._id === data.userId); // Assuming userId is passed in data
      if (!user) throw new Error('User not found for comment');
      
      newItem = {
        _id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: data.userId,
        username: user.name,
        picture: user.profilePicture || '',
        messages: data.messages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Link message to parent entity (event or service)
      if (data.eventId) {
        const eventService = new MockService('events');
        const event = eventService.data.find(e => e._id === data.eventId);
        if (event) {
          event.messages.push(newItem._id);
          event.numberOfMessages = (event.numberOfMessages || 0) + 1;
          saveMockEntityData('events', eventService.data);
        }
      } else if (data.serviceId) {
        const serviceService = new MockService('services');
        const service = serviceService.data.find(s => s._id === data.serviceId);
        if (service) {
          service.messages.push(newItem._id);
          service.numberOfMessages = (service.numberOfMessages || 0) + 1;
          saveMockEntityData('services', serviceService.data);
        }
      }
      this.addNotification(user._id, `New comment posted by ${user.name}!`, newItem._id);
    } else {
      newItem = { ...data, _id: `mock_${this.entity}_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    this.data.unshift(newItem);
    this.saveData();
    return newItem;
  }

  async update(id, data) {
    await this.delay();
    const index = this.data.findIndex(item => item._id === id);
    if (index === -1) throw new Error(`${this.entity} not found`);
    
    if (this.entity === 'users') {
      const user = mockUsers.find(u => u._id === id);
      if (user) {
        Object.assign(user, data);
        user.updatedAt = new Date().toISOString();
        saveMockEntityData('users', mockUsers);
      }
    } else if (this.entity === 'services' || this.entity === 'events') {
      const item = this.data[index];
      Object.assign(item, data);
      item.updatedAt = new Date().toISOString();
      this.saveData(); // Save changes for services/events
    } else {
      this.data[index] = { ...this.data[index], ...data, updatedAt: new Date().toISOString() };
      this.saveData();
    }
    // Simulate cascading, e.g., update related offers
    return this.data[index];
  }

  async delete(id) {
    await this.delay();
    const index = this.data.findIndex(item => item._id === id);
    if (index === -1) throw new Error(`${this.entity} not found`);
    
    let itemToDelete = this.data[index];
    this.data.splice(index, 1);
    this.saveData();
    
    // Simulate cascading deletions
    if (this.entity === 'services') {
      this.deleteRelated('reservations', id);
      // Remove service from owner's servicesOwned
      const owner = mockUsers.find(u => u._id === itemToDelete.UserId);
      if (owner) {
        owner.servicesOwned = owner.servicesOwned.filter(serviceId => serviceId !== id);
        saveMockEntityData('users', mockUsers);
      }
      // Delete associated likes
      const likesService = new MockService('likes');
      likesService.data = likesService.data.filter(like => like.serviceId !== id);
      saveMockEntityData('likes', likesService.data);
      // Delete associated messages
      const messagesService = new MockService('messages');
      messagesService.data = messagesService.data.filter(message => message.serviceId !== id);
      saveMockEntityData('messages', messagesService.data);
      
    } else if (this.entity === 'events') {
      // Remove event from owner's eventsOwned
      const owner = mockUsers.find(u => u._id === itemToDelete.UserId);
      if (owner) {
        owner.eventsOwned = owner.eventsOwned.filter(eventId => eventId !== id);
        saveMockEntityData('users', mockUsers);
      }
      // Delete associated likes
      const likesService = new MockService('likes');
      likesService.data = likesService.data.filter(like => like.eventId !== id);
      saveMockEntityData('likes', likesService.data);
      // Delete associated messages
      const messagesService = new MockService('messages');
      messagesService.data = messagesService.data.filter(message => message.eventId !== id);
      saveMockEntityData('messages', messagesService.data);
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
    saveMockEntityData('notifications', notifService.data);
  }

  deleteRelated(entity, relatedId) {
    const relatedService = new MockService(entity);
    relatedService.data = relatedService.data.filter(item => item.serviceId !== relatedId && item.eventId !== relatedId);
    saveMockEntityData(entity, relatedService.data);
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
      saveMockEntityData(itemEntity, itemService.data);
      this.saveData();
      // Update user's givenLikes
      const user = mockUsers.find(u => u._id === userId);
      if (user) {
        user.givenLikes = user.givenLikes.filter(likeId => likeId !== itemId);
        saveMockEntityData('users', mockUsers);
      }
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
      saveMockEntityData(itemEntity, itemService.data);
      this.saveData();
      // Update user's givenLikes
      const user = mockUsers.find(u => u._id === userId);
      if (user) {
        user.givenLikes.push(itemId);
        saveMockEntityData('users', mockUsers);
      }
      this.addNotification(item.UserId, `${userId} liked your ${type}`, itemId);
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
    if (!liked) {
      // Remove from user's givenLikes
      const user = mockUsers.find(u => u._id === userId);
      if (user) {
        user.givenLikes = user.givenLikes.filter(likeId => likeId !== itemId);
        saveMockEntityData('users', mockUsers);
      }
    } else {
      // Add to user's givenLikes
      const user = mockUsers.find(u => u._id === userId);
      if (user) {
        user.givenLikes.push(itemId);
        saveMockEntityData('users', mockUsers);
      }
    }
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
    // Add to user's givenLikes
    const user = mockUsers.find(u => u._id === userId);
    if (user) {
      user.givenLikes.push(itemId);
      saveMockEntityData('users', mockUsers);
    }
  }
  item.numberOfLikes = numberOfLikes;
  itemService.saveData();
  likesService.saveData();
  // Add notification to owner
  const ownerId = item.UserId; // Using UserId consistently
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
    userId: service.UserId,
    type: 'share',
    message: `${userName} shared your service ${service.name}`,
    relatedId: serviceId,
    read: false,
    createdAt: new Date().toISOString(),
  };
  notificationsService.data.unshift(newNotif);
  saveMockEntityData('notifications', notificationsService.data);
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
    userId: event.UserId,
    type: 'share',
    message: `${userName} shared your event ${event.name}`,
    relatedId: eventId,
    read: false,
    createdAt: new Date().toISOString(),
  };
  notificationsService.data.unshift(newNotif);
  saveMockEntityData('notifications', notificationsService.data);
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
    saveMockEntityData('users', mockUsers);
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
    saveMockEntityData('users', mockUsers);
    return { accessToken, user, isNewUser };
  }
}

export const auth = new MockAuthService();