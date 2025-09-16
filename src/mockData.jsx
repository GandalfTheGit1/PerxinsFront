export let mockUsers = [
  {
    _id: 'user1',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    profilePicture: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=AS',
    bio: 'Passionate about events and new experiences. Always looking for the next adventure!',
    province: 'La Habana',
    township: 'Playa',
    musicalTastes: 'Pop',
    isOwner: true,
    role: 'owner',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-09-01T12:00:00Z',
    givenLikes: [],
    eventsOwned: [],
    servicesOwned: [],
    subscriptions: [],
    notifications: [],
    numberOfNotificationsUnseen: 0,
    notificationsSubscriptionForBrowser: {},
  },
  {
    _id: 'user2',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    profilePicture: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=BJ',
    bio: 'Service provider specializing in web development and digital marketing.',
    province: 'La Habana',
    township: 'Vedado',
    musicalTastes: 'Rock',
    isOwner: true,
    role: 'owner',
    createdAt: '2024-02-20T14:30:00Z',
    updatedAt: '2024-08-15T09:45:00Z',
    givenLikes: [],
    eventsOwned: [],
    servicesOwned: [],
    subscriptions: [],
    notifications: [],
    numberOfNotificationsUnseen: 0,
    notificationsSubscriptionForBrowser: {},
  },
  {
    _id: 'user3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    profilePicture: 'https://via.placeholder.com/150/008000/FFFFFF?text=CB',
    bio: 'Event organizer and music enthusiast. Bringing the best concerts to town!',
    province: 'La Habana',
    township: 'Centro Habana',
    musicalTastes: 'Jazz',
    isOwner: true,
    role: 'owner',
    createdAt: '2024-03-10T16:20:00Z',
    updatedAt: '2024-09-10T11:30:00Z',
    givenLikes: [],
    eventsOwned: [],
    servicesOwned: [],
    subscriptions: [],
    notifications: [],
    numberOfNotificationsUnseen: 0,
    notificationsSubscriptionForBrowser: {},
  },
  {
    _id: 'user4',
    name: 'Diana Wilson',
    email: 'diana.wilson@example.com',
    profilePicture: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=DW',
    bio: "Freelance photographer capturing life's moments.",
    province: 'Matanzas',
    township: 'Varadero',
    musicalTastes: 'Classical',
    isOwner: true,
    role: 'owner',
    createdAt: '2024-04-05T08:15:00Z',
    updatedAt: '2024-07-20T14:00:00Z',
    givenLikes: [],
    eventsOwned: [],
    servicesOwned: [],
    subscriptions: [],
    notifications: [],
    numberOfNotificationsUnseen: 0,
    notificationsSubscriptionForBrowser: {},
  },
  {
    _id: 'user5',
    name: 'Eve Davis',
    email: 'eve.davis@example.com',
    profilePicture: 'https://via.placeholder.com/150/FFD700/000000?text=ED',
    bio: 'Regular user enjoying local services and events.',
    province: 'La Habana',
    township: 'Miramar',
    musicalTastes: 'Hip Hop',
    isOwner: false,
    role: 'client',
    createdAt: '2024-05-12T13:45:00Z',
    updatedAt: '2024-09-12T17:20:00Z',
    givenLikes: [],
    eventsOwned: [],
    servicesOwned: [],
    subscriptions: [],
    notifications: [],
    numberOfNotificationsUnseen: 0,
    notificationsSubscriptionForBrowser: {},
  },
  {
    _id: 'user6',
    name: 'Admin User',
    email: 'admin@perxins.com',
    profilePicture: 'https://via.placeholder.com/150/000000/FFFFFF?text=AU',
    bio: 'Administrator with full access to manage users and content.',
    province: 'La Habana',
    township: 'Vedado',
    musicalTastes: 'All',
    isOwner: true,
    role: 'admin',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-09-15T10:00:00Z',
    givenLikes: [],
    eventsOwned: [],
    servicesOwned: [],
    subscriptions: [],
    notifications: [],
    numberOfNotificationsUnseen: 0,
    notificationsSubscriptionForBrowser: {},
  },
];

export const createMockUser = (email, username, isOwner = false, isAdmin = false) => ({
  _id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  name: username,
  email: email,
  profilePicture: `https://via.placeholder.com/150/CCCCCC/FFFFFF?text=${username.charAt(0).toUpperCase()}`,
  bio: 'Demo user bio.',
  province: 'La Habana',
  township: 'Playa',
  musicalTastes: 'None',
  isAuth: true,
  isOwner: isOwner,
  isAdmin: isAdmin,
  role: isAdmin ? 'admin' : (isOwner ? 'owner' : 'client'),
  actualProvince: 'La Habana',
  verificationCode: null,
  userPicture: '',
  password: 'password123', // Demo password
  recoveryToken: null,
  givenLikes: [],
  eventsOwned: [],
  servicesOwned: [],
  subscriptions: [],
  notifications: [],
  numberOfNotificationsUnseen: 0,
  notificationsSubscriptionForBrowser: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const createMockService = (data, userId) => ({
  _id: `service_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  name: data.name || 'New Demo Service',
  isPaying: data.isPaying || false,
  perxinsGift: data.perxinsGift || false,
  busRoutes: data.busRoutes || [],
  principalImage: data.principalImage || '/PenroseTriangle.png',
  township: data.township || 'Playa',
  secondaryImages: data.secondaryImages || [],
  type: data.type || 'Other', // Matches schema 'type'
  subscribers: data.subscribers || [],
  cover: data.cover || {
    ForMen: 0,
    ForWomen: 0,
    WorkingWithUs: 0,
    Regular: 0,
    ForFEU: 0,
  },
  exactDirection: {
    province: data.exactDirection?.province || 'La Habana',
    placeToSetEvent: data.exactDirection?.placeToSetEvent || 'Unknown Place',
    googleLink: data.exactDirection?.googleLink || 'https://maps.google.com/',
  },
  allowReservation: data.allowReservation || false,
  typeOfMusicPlayed: data.typeOfMusicPlayed || '',
  contact: data.contact || {
    phone: '',
    whatsApp: '',
    email: '',
    webSite: '',
    facebook: '',
    twitter: '',
    instagram: '',
  },
  serviceQualityRating: [],
  peopleServiceTreatmentRating: [],
  pricingServiceRating: [],
  avgServiceQualityRating: 0,
  avgPeopleServiceTreatmentRating: 0,
  avgPricingServiceRating: 0,
  time: data.time || {
    startDays: 'Monday',
    endDays: 'Friday',
    startHour: '09:00',
    exitHour: '17:00',
  },
  events: [],
  description: data.description || 'A new service created for demo purposes.',
  UserId: userId, // Assuming userId is the owner
  messages: [],
  createdAt: new Date().toISOString(),
  numberOfLikes: 0,
  numberOfShares: 0,
  numberOfViews: 0,
  numberOfSubscribers: 0,
  updatedAt: new Date().toISOString(),
});

export const createMockEvent = (data, userId) => ({
  _id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  name: data.name || 'New Demo Event',
  type: data.type || 'Other', // Matches schema 'type'
  subcategory: data.subcategory || 'General',
  township: data.township || 'Playa',
  isPaying: data.isPaying || false,
  perxinsGift: data.perxinsGift || false,
  cover: data.cover || {
    ForMen: 0,
    ForWomen: 0,
    WorkingWithUs: 0,
    Regular: 0,
    ForFEU: 0,
  },
  principalImage: data.principalImage || '/PenroseTriangle.png',
  typeOfMusicPlayed: data.typeOfMusicPlayed || '',
  time: data.time || {
    continuesEventsStartDay: null,
    continuesEventsEndDay: null,
    weekDays: null,
    eventsDays: null,
    startHour: '19:00',
    exitHour: '23:00',
  },
  contact: data.contact || {
    phone: '',
    email: '',
    whatsApp: '',
  },
  exactDirection: {
    province: data.exactDirection?.province || 'La Habana',
    placeToSetEvent: data.exactDirection?.placeToSetEvent || 'Unknown Place',
    googleLink: data.exactDirection?.googleLink || 'https://maps.google.com/',
  },
  movieType: data.movieType || '',
  reviewLink: data.reviewLink || '',
  description: data.description || 'A new event created for demo purposes.',
  UserId: userId, // Assuming userId is the organizer
  messages: [],
  createdAt: new Date().toISOString(),
  numberOfMessages: 0,
  numberOfLikes: 0,
  numberOfShares: 0,
  numberOfViews: 0,
  updatedAt: new Date().toISOString(),
});

const defaultMockServicesData = [
  {
    _id: 'service1',
    name: 'Web Development Services',
    description: 'Professional web development for small businesses and startups. From simple landing pages to complex e-commerce solutions.',
    category: 'WebDev',
    location: { province: 'La Habana', township: 'Vedado' }, // Old field, will be mapped
    price: 'Negotiable',
    images: ['/Bar AA.jpeg', '/Bar Invictus.jpeg'],
    secondaryImages: ['/Bar Invictus.jpeg'],
    principalImage: '/Bar AA.jpeg',
    ownerId: 'user2',
    events: [],
    numberOfLikes: 5,
    rating: 4.8, // Old field, will be mapped
    reviews: [
      { userId: 'user1', comment: 'Excellent service, very professional!', rating: 5, createdAt: '2024-06-01T10:00:00Z' },
      { userId: 'user3', comment: 'Delivered on time and exceeded expectations.', rating: 5, createdAt: '2024-07-15T14:30:00Z' },
      { userId: 'user5', comment: 'Great communication throughout the project.', rating: 4, createdAt: '2024-08-20T09:15:00Z' },
    ],
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-09-01T15:45:00Z',
  },
  {
    _id: 'service2',
    name: 'Graphic Design & Branding',
    description: 'Creative graphic design services for logos, branding, marketing materials, and social media content.',
    category: 'Design',
    location: { province: 'La Habana', township: 'Playa' }, // Old field, will be mapped
    price: '$50/hour',
    images: ['/Lord of The Rings - Cine Yara.jpg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Lord of The Rings - Cine Yara.jpg',
    ownerId: 'user1',
    events: [],
    numberOfLikes: 3,
    rating: 4.5, // Old field, will be mapped
    reviews: [
      { userId: 'user2', comment: 'Great eye for detail and very responsive.', rating: 4, createdAt: '2024-02-10T12:20:00Z' },
      { userId: 'user4', comment: 'Beautiful designs that captured our brand perfectly.', rating: 5, createdAt: '2024-05-05T16:00:00Z' },
    ],
    createdAt: '2024-02-15T09:30:00Z',
    updatedAt: '2024-08-10T13:20:00Z',
  },
  {
    _id: 'service3',
    name: 'Photography Sessions',
    description: 'Professional photography for portraits, events, and product shoots. Capturing your moments beautifully.',
    category: 'Photography',
    location: { province: 'Matanzas', township: 'Varadero' }, // Old field, will be mapped
    price: '$200/session',
    images: ['/Bar AA.jpeg', '/Lord of The Rings - Cine Yara.jpg'],
    secondaryImages: ['/Lord of The Rings - Cine Yara.jpg'],
    principalImage: '/Bar AA.jpeg',
    ownerId: 'user3',
    events: [],
    numberOfLikes: 8,
    rating: 4.9, // Old field, will be mapped
    reviews: [
      { userId: 'user1', comment: 'Amazing photos, highly recommend!', rating: 5, createdAt: '2024-03-20T10:45:00Z' },
      { userId: 'user2', comment: 'Very creative and fun to work with.', rating: 5, createdAt: '2024-04-12T14:10:00Z' },
      { userId: 'user5', comment: 'Captured everything perfectly for our event.', rating: 4, createdAt: '2024-06-25T11:30:00Z' },
    ],
    createdAt: '2024-03-01T15:00:00Z',
    updatedAt: '2024-09-05T18:00:00Z',
  },
  {
    _id: 'service4',
    name: 'Local Bar Services',
    description: 'Cozy bar offering cocktails and live music in a relaxed atmosphere.',
    category: 'Bar',
    location: { province: 'La Habana', township: 'Centro Habana' }, // Old field, will be mapped
    price: '$10/drink',
    images: ['/Bar Invictus.jpeg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Bar Invictus.jpeg',
    ownerId: 'user4',
    events: [],
    numberOfLikes: 12,
    rating: 4.2, // Old field, will be mapped
    reviews: [
      { userId: 'user3', comment: 'Great ambiance and drinks!', rating: 4, createdAt: '2024-07-01T20:00:00Z' },
      { userId: 'user5', comment: 'Live music was fantastic.', rating: 5, createdAt: '2024-08-10T21:30:00Z' },
    ],
    createdAt: '2024-04-10T19:00:00Z',
    updatedAt: '2024-09-12T22:15:00Z',
  },
  {
    _id: 'service5',
    name: 'Event Planning',
    description: 'Full-service event planning for weddings, parties, and corporate events.',
    category: 'EventPlanning',
    location: { province: 'La Habana', township: 'Miramar' }, // Old field, will be mapped
    price: '$500/event',
    images: ['/Bar AA.jpeg', '/Bar Invictus.jpeg'],
    secondaryImages: ['/Bar Invictus.jpeg'],
    principalImage: '/Bar AA.jpeg',
    ownerId: 'user5',
    events: [],
    numberOfLikes: 2,
    rating: 4.7, // Old field, will be mapped
    reviews: [
      { userId: 'user1', comment: 'Organized everything perfectly.', rating: 5, createdAt: '2024-05-15T13:00:00Z' },
    ],
    createdAt: '2024-05-01T10:30:00Z',
    updatedAt: '2024-07-30T16:45:00Z',
  },
  {
    _id: 'service6',
    name: 'Restaurant Catering',
    description: 'Delicious catering services for events and private parties.',
    category: 'Restaurant',
    location: { province: 'La Habana', township: 'Vedado' }, // Old field, will be mapped
    price: '$30/person',
    images: ['/Lord of The Rings - Cine Yara.jpg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Lord of The Rings - Cine Yara.jpg',
    ownerId: 'user2',
    events: [],
    numberOfLikes: 7,
    rating: 4.6, // Old field, will be mapped
    reviews: [
      { userId: 'user4', comment: 'Food was amazing!', rating: 5, createdAt: '2024-06-20T18:00:00Z' },
    ],
    createdAt: '2024-06-01T17:00:00Z',
    updatedAt: '2024-09-08T19:30:00Z',
  },
  {
    _id: 'service7',
    name: 'Music Lessons',
    description: 'Private music lessons for guitar, piano, and vocals.',
    category: 'Music',
    location: { province: 'Matanzas', township: 'Varadero' }, // Old field, will be mapped
    price: '$40/hour',
    images: ['/Bar AA.jpeg', '/Lord of The Rings - Cine Yara.jpg'],
    secondaryImages: ['/Lord of The Rings - Cine Yara.jpg'],
    principalImage: '/Bar AA.jpeg',
    ownerId: 'user3',
    events: [],
    numberOfLikes: 4,
    rating: 4.3, // Old field, will be mapped
    reviews: [
      { userId: 'user5', comment: 'Patient teacher, great progress.', rating: 4, createdAt: '2024-07-10T15:00:00Z' },
    ],
    createdAt: '2024-07-01T14:00:00Z',
    updatedAt: '2024-08-25T10:15:00Z',
  },
  {
    _id: 'service8',
    name: 'Fitness Training',
    description: 'Personal training sessions for all fitness levels.',
    category: 'Fitness',
    location: { province: 'La Habana', township: 'Playa' }, // Old field, will be mapped
    price: '$60/session',
    images: ['/Bar Invictus.jpeg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Bar Invictus.jpeg',
    ownerId: 'user1',
    events: [],
    numberOfLikes: 6,
    rating: 4.4, // Old field, will be mapped
    reviews: [
      { userId: 'user2', comment: 'Motivating and effective workouts.', rating: 4, createdAt: '2024-08-01T09:00:00Z' },
      { userId: 'user3', comment: 'Helped me reach my goals.', rating: 5, createdAt: '2024-09-01T12:30:00Z' },
    ],
    createdAt: '2024-08-01T08:00:00Z',
    updatedAt: '2024-09-13T11:00:00Z',
  },
];

export let mockServices = defaultMockServicesData.map(service => ({
  ...createMockService(service, service.ownerId),
  ...service,
  exactDirection: {
    province: service.location.province,
    placeToSetEvent: service.location.township,
    googleLink: service.exactDirection?.googleLink,
  },
  // Map old review structure to new serviceQualityRating and other ratings
  serviceQualityRating: service.reviews?.map(review => ({ userId: review.userId, rating: review.rating })) || [],
  peopleServiceTreatmentRating: service.reviews?.map(review => ({ userId: review.userId, rating: review.rating })) || [],
  pricingServiceRating: service.reviews?.map(review => ({ userId: review.userId, rating: review.rating })) || [],
  avgServiceQualityRating: service.rating || 0,
  avgPeopleServiceTreatmentRating: service.rating || 0,
  avgPricingServiceRating: service.rating || 0,
  // Ensure contact details are properly nested under contact
  contact: service.contact || {},
  UserId: service.ownerId, // Map ownerId to UserId
}));

const defaultMockEventsData = [
  {
    _id: 'event1',
    name: 'Summer Music Festival',
    description: 'An annual music festival featuring local and international artists across various genres. Food trucks, art installations, and good vibes!',
    date: '2025-08-15',
    time: '14:00',
    location: { province: 'La Habana', township: 'Playa', address: 'Central Park' }, // Old field, will be mapped
    category: 'Concert',
    typeOfMusicPlayed: 'Pop',
    price: '$75',
    images: ['/Bar Invictus.jpeg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Bar Invictus.jpeg',
    organizerId: 'user3',
    attendees: ['user1', 'user2', 'user5'],
    numberOfLikes: 15,
    rating: 4.9, // Old field, will be mapped
    reviews: [
      { userId: 'user1', comment: 'Best festival ever!', rating: 5, createdAt: '2024-08-20T16:00:00Z' },
    ],
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-09-14T10:00:00Z',
  },
  {
    _id: 'event2',
    name: 'Tech Innovators Conference',
    description: 'A two-day conference for tech enthusiasts, developers, and entrepreneurs. Featuring keynote speakers, workshops, and networking opportunities.',
    date: '2025-09-20',
    time: '09:00',
    location: { province: 'La Habana', township: 'Vedado', address: 'Convention Center' }, // Old field, will be mapped
    category: 'Conference',
    typeOfMusicPlayed: 'N/A',
    price: '$299',
    images: ['/Bar AA.jpeg', '/Bar Invictus.jpeg'],
    secondaryImages: ['/Bar Invictus.jpeg'],
    principalImage: '/Bar AA.jpeg',
    organizerId: 'user2',
    attendees: ['user1', 'user4'],
    numberOfLikes: 10,
    rating: 4.7, // Old field, will be mapped
    reviews: [
      { userId: 'user4', comment: 'Inspiring talks and great networking.', rating: 5, createdAt: '2024-09-25T13:30:00Z' },
    ],
    createdAt: '2024-02-05T11:30:00Z',
    updatedAt: '2024-09-10T14:45:00Z',
  },
  {
    _id: 'event3',
    name: 'Local Art Exhibition',
    description: 'Showcasing the works of emerging local artists. A diverse collection of paintings, sculptures, and digital art.',
    date: '2025-10-05',
    time: '18:00',
    location: { province: 'Matanzas', township: 'Varadero', address: 'Art Gallery Downtown' }, // Old field, will be mapped
    category: 'Exhibition',
    typeOfMusicPlayed: 'Jazz',
    price: 'Free',
    images: ['/Lord of The Rings - Cine Yara.jpg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Lord of The Rings - Cine Yara.jpg',
    organizerId: 'user1',
    attendees: ['user3', 'user5'],
    numberOfLikes: 7,
    rating: 4.6, // Old field, will be mapped
    reviews: [
      { userId: 'user5', comment: 'Incredible artwork on display.', rating: 5, createdAt: '2024-10-10T19:00:00Z' },
    ],
    createdAt: '2024-03-15T17:00:00Z',
    updatedAt: '2024-08-30T20:15:00Z',
  },
  {
    _id: 'event4',
    name: 'Beach Party',
    description: 'Fun beach party with DJ, games, and sunset views.',
    date: '2025-07-30',
    time: '18:00',
    location: { province: 'Matanzas', township: 'Varadero', address: 'Varadero Beach' }, // Old field, will be mapped
    category: 'Party',
    typeOfMusicPlayed: 'Hip Hop',
    price: '$20',
    images: ['/Bar AA.jpeg', '/Lord of The Rings - Cine Yara.jpg'],
    secondaryImages: ['/Lord of The Rings - Cine Yara.jpg'],
    principalImage: '/Bar AA.jpeg',
    organizerId: 'user4',
    attendees: ['user2', 'user5'],
    numberOfLikes: 9,
    rating: 4.4, // Old field, will be mapped
    reviews: [
      { userId: 'user2', comment: 'Awesome party atmosphere.', rating: 4, createdAt: '2024-08-05T21:00:00Z' },
    ],
    createdAt: '2024-04-20T18:30:00Z',
    updatedAt: '2024-09-11T22:00:00Z',
  },
  {
    _id: 'event5',
    name: 'Jazz Night',
    description: 'Live jazz performance in an intimate venue.',
    date: '2025-11-10',
    time: '20:00',
    location: { province: 'La Habana', township: 'Centro Habana', address: 'Jazz Club' }, // Old field, will be mapped
    category: 'Concert',
    typeOfMusicPlayed: 'Jazz',
    price: '$50',
    images: ['/Bar Invictus.jpeg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Bar Invictus.jpeg',
    organizerId: 'user3',
    attendees: ['user1'],
    numberOfLikes: 11,
    rating: 4.8, // Old field, will be mapped
    reviews: [],
    createdAt: '2024-05-10T19:45:00Z',
    updatedAt: '2024-09-13T20:30:00Z',
  },
  {
    _id: 'event6',
    name: 'Workshop: Digital Marketing',
    description: 'Hands-on workshop on digital marketing strategies.',
    date: '2025-12-05',
    time: '10:00',
    location: { province: 'La Habana', township: 'Miramar', address: 'Conference Room' }, // Old field, will be mapped
    category: 'Workshop',
    typeOfMusicPlayed: 'N/A',
    price: '$100',
    images: ['/Bar AA.jpeg', '/Bar Invictus.jpeg'],
    secondaryImages: ['/Bar Invictus.jpeg'],
    principalImage: '/Bar AA.jpeg',
    organizerId: 'user2',
    attendees: ['user1', 'user4'],
    numberOfLikes: 6,
    rating: 4.5, // Old field, will be mapped
    reviews: [
      { userId: 'user1', comment: 'Learned a lot!', rating: 5, createdAt: '2024-12-10T11:00:00Z' },
    ],
    createdAt: '2024-06-15T09:00:00Z',
    updatedAt: '2024-09-12T12:45:00Z',
  },
  {
    _id: 'event7',
    name: 'Noche de Cine Clásico',
    description: 'Proyección de películas clásicas en el Cine Yara, con debate posterior.',
    date: '2025-10-20',
    time: '19:00',
    location: { province: 'La Habana', township: 'Vedado', address: 'Cine Yara' }, // Old field, will be mapped
    category: 'Concert',
    typeOfMusicPlayed: 'N/A',
    price: '$10',
    images: ['/Lord of The Rings - Cine Yara.jpg', '/Star Wars - Cine Chaplin.jpg'],
    secondaryImages: ['/Star Wars - Cine Chaplin.jpg'],
    principalImage: '/Lord of The Rings - Cine Yara.jpg',
    organizerId: 'user3',
    attendees: ['user1', 'user5'],
    numberOfLikes: 8,
    rating: 4.7, // Old field, will be mapped
    reviews: [
      { userId: 'user1', comment: 'Gran selección de películas clásicas.', rating: 5, createdAt: '2024-10-25T20:00:00Z' },
    ],
    createdAt: '2024-09-15T15:00:00Z',
    updatedAt: '2024-09-15T16:00:00Z',
  },
];

export let mockEvents = defaultMockEventsData.map(event => ({
  ...createMockEvent(event, event.organizerId),
  ...event,
  // Map old location structure to new exactDirection
  exactDirection: {
    province: event.location.province,
    placeToSetEvent: event.location.address, // Assuming address maps to placeToSetEvent
    googleLink: event.exactDirection?.googleLink,
  },
  // Map old reviews to messages for now (adjust as needed if EventsMessages is for actual comments)
  messages: event.reviews?.map(review => ({
    userId: review.userId,
    username: mockUsers.find(u => u._id === review.userId)?.name || 'Unknown',
    picture: mockUsers.find(u => u._id === review.userId)?.profilePicture || '',
    messages: review.comment,
  })) || [],
  numberOfMessages: event.reviews?.length || 0,
  UserId: event.organizerId, // Map organizerId to UserId
}));

export let mockBusinessOffers = [
  {
    _id: 'offer1',
    name: 'Startup Web Package',
    description: 'Get your business online with a professional website, including 5 pages, SEO optimization, and 3 months of free maintenance.',
    serviceId: 'service1',
    discount: '20%',
    validUntil: '2025-12-31',
    createdAt: '2024-07-01T10:00:00Z',
    updatedAt: '2024-09-01T14:00:00Z',
  },
  {
    _id: 'offer2',
    name: 'Event Photography Bundle',
    description: 'Special package for event photography: 4 hours of coverage, 100 edited photos, and a personalized online gallery.',
    serviceId: 'service3',
    discount: '15%',
    validUntil: '2025-11-15',
    createdAt: '2024-08-05T15:30:00Z',
    updatedAt: '2024-09-10T16:20:00Z',
  },
  {
    _id: 'offer3',
    name: 'Design Starter Kit',
    description: 'Basic branding package with logo, business cards, and social media templates.',
    serviceId: 'service2',
    discount: '25%',
    validUntil: '2025-10-30',
    createdAt: '2024-06-20T12:45:00Z',
    updatedAt: '2024-08-25T13:30:00Z',
  },
  {
    _id: 'offer4',
    name: 'Bar Happy Hour Special',
    description: 'Discounted drinks during happy hour for groups.',
    serviceId: 'service4',
    discount: '30%',
    validUntil: '2025-09-30',
    createdAt: '2024-09-01T18:00:00Z',
    updatedAt: '2024-09-14T19:15:00Z',
  },
];

// New: Mock likes (many-to-many user-service/event)
export let mockLikes = [
  { _id: 'like1', userId: 'user1', serviceId: 'service1', liked: true, createdAt: '2024-08-01T10:00:00Z' },
  { _id: 'like2', userId: 'user2', serviceId: 'service3', liked: true, createdAt: '2024-08-05T14:30:00Z' },
  { _id: 'like3', userId: 'user5', eventId: 'event1', liked: true, createdAt: '2024-08-10T16:00:00Z' },
  { _id: 'like4', userId: 'user3', serviceId: 'service2', liked: true, createdAt: '2024-08-15T09:45:00Z' },
  { _id: 'like5', userId: 'user4', eventId: 'event2', liked: true, createdAt: '2024-08-20T11:20:00Z' },
  // More for realism
  { _id: 'like6', userId: 'user1', eventId: 'event3', liked: true, createdAt: '2024-09-01T13:00:00Z' },
  { _id: 'like7', userId: 'user5', serviceId: 'service6', liked: true, createdAt: '2024-09-05T17:30:00Z' },
  { _id: 'like8', userId: 'user2', eventId: 'event4', liked: true, createdAt: '2024-09-10T20:00:00Z' },
];

// New: Mock reservations (user-service/event relationship)
export let mockReservations = [
  {
    _id: 'res1',
    userId: 'user1',
    serviceId: 'service3',
    date: '2025-01-20',
    time: '14:00',
    status: 'confirmed',
    createdAt: '2024-12-01T10:30:00Z',
    updatedAt: '2024-12-05T12:00:00Z',
  },
  {
    _id: 'res2',
    userId: 'user5',
    eventId: 'event1',
    date: '2025-08-15',
    time: '14:00',
    status: 'confirmed',
    createdAt: '2025-07-01T15:45:00Z',
    updatedAt: '2025-07-10T16:30:00Z',
  },
  {
    _id: 'res3',
    userId: 'user2',
    serviceId: 'service1',
    date: '2025-02-10',
    time: '10:00',
    status: 'pending',
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2025-01-20T11:15:00Z',
  },
  // More
  {
    _id: 'res4',
    userId: 'user4',
    eventId: 'event2',
    date: '2025-09-20',
    time: '09:00',
    status: 'confirmed',
    createdAt: '2025-08-15T13:20:00Z',
    updatedAt: '2025-08-25T14:10:00Z',
  },
  {
    _id: 'res5',
    userId: 'user3',
    serviceId: 'service5',
    date: '2025-03-05',
    time: '16:00',
    status: 'confirmed',
    createdAt: '2025-02-01T18:00:00Z',
    updatedAt: '2025-02-10T19:45:00Z',
  },
];

// New: Mock messages as flat array with serviceId/eventId
export let mockMessages = [
  // Messages for service1
  { _id: 'msg1', serviceId: 'service1', fromUserId: 'user1', toUserId: 'user2', content: 'Interested in your web dev services. Can we discuss details?', timestamp: '2024-09-01T10:00:00Z' },
  { _id: 'msg2', serviceId: 'service1', fromUserId: 'user2', toUserId: 'user1', content: 'Sure, available for a call tomorrow?', timestamp: '2024-09-01T10:30:00Z' },
  // Messages for service3
  { _id: 'msg3', serviceId: 'service3', fromUserId: 'user5', toUserId: 'user3', content: 'How much for a family photo session?', timestamp: '2024-09-05T14:20:00Z' },
  { _id: 'msg4', serviceId: 'service3', fromUserId: 'user3', toUserId: 'user5', content: '$200 for 2 hours. Let me know the date.', timestamp: '2024-09-05T14:45:00Z' },
  // Messages for event1
  { _id: 'msg5', eventId: 'event1', fromUserId: 'user2', toUserId: 'user3', content: 'Tickets for the festival?', timestamp: '2024-09-10T11:00:00Z' },
  { _id: 'msg6', eventId: 'event1', fromUserId: 'user3', toUserId: 'user2', content: 'Available online, $75 each.', timestamp: '2024-09-10T11:15:00Z' },
  // Add more as needed for other services/events
];

// New: Mock notifications (per user)
export let mockNotifications = [
  {
    _id: 'notif1',
    userId: 'user1',
    type: 'like',
    relatedId: 'service1',
    message: 'Bob Johnson liked your service Web Development Services',
    read: false,
    createdAt: '2024-09-12T08:00:00Z',
  },
  {
    _id: 'notif2',
    userId: 'user3',
    type: 'reservation',
    relatedId: 'res1',
    message: 'New reservation for Photography Sessions',
    read: true,
    createdAt: '2024-09-13T09:30:00Z',
  },
  {
    _id: 'notif3',
    userId: 'user2',
    type: 'message',
    relatedId: 'msg1',
    message: 'New message from Alice Smith about Web Development Services',
    read: false,
    createdAt: '2024-09-14T10:15:00Z',
  },
  // More
  {
    _id: 'notif4',
    userId: 'user5',
    type: 'like',
    relatedId: 'event1',
    message: 'You received a like on Summer Music Festival',
    read: false,
    createdAt: '2024-09-14T12:00:00Z',
  },
  {
    _id: 'notif5',
    userId: 'user4',
    type: 'reservation',
    relatedId: 'res4',
    message: 'Reservation confirmed for Tech Innovators Conference',
    read: true,
    createdAt: '2024-09-14T15:45:00Z',
  },
];

// New: Mock polls (support feature)
export let mockPolls = [
  {
    _id: 'poll1',
    question: 'What type of events do you prefer?',
    options: ['Concerts', 'Conferences', 'Exhibitions', 'Parties'],
    votes: { 'Concerts': 15, 'Conferences': 8, 'Exhibitions': 5, 'Parties': 12 },
    createdAt: '2024-09-01T09:00:00Z',
    updatedAt: '2024-09-14T16:30:00Z',
  },
  {
    _id: 'poll2',
    question: 'Favorite music genre for bars?',
    options: ['Pop', 'Rock', 'Jazz', 'Hip Hop'],
    votes: { 'Pop': 10, 'Rock': 7, 'Jazz': 9, 'Hip Hop': 14 },
    createdAt: '2024-09-05T14:00:00Z',
    updatedAt: '2024-09-13T17:20:00Z',
  },
];

const initialMockData = {
  users: mockUsers,
  services: mockServices,
  events: mockEvents,
  businessOffers: mockBusinessOffers,
  likes: mockLikes,
  reservations: mockReservations,
  messages: mockMessages,
  notifications: mockNotifications,
  polls: mockPolls,
};

export const initializeMockData = () => {
  if (typeof window !== 'undefined') {
    // Helper to get default data, applying transformations if necessary
    const getTransformedDefaultData = (entityName) => {
      switch (entityName) {
        case 'services':
          return defaultMockServicesData.map(service => ({
            ...createMockService(service, service.ownerId),
            ...service,
            exactDirection: {
              province: service.location.province,
              placeToSetEvent: service.location.township,
              googleLink: service.exactDirection?.googleLink,
            },
            serviceQualityRating: service.reviews?.map(review => ({ userId: review.userId, rating: review.rating })) || [],
            peopleServiceTreatmentRating: service.reviews?.map(review => ({ userId: review.userId, rating: review.rating })) || [],
            pricingServiceRating: service.reviews?.map(review => ({ userId: review.userId, rating: review.rating })) || [],
            avgServiceQualityRating: service.rating || 0,
            avgPeopleServiceTreatmentRating: service.rating || 0,
            avgPricingServiceRating: service.rating || 0,
            contact: service.contact || {},
            UserId: service.ownerId,
          }));
        case 'events':
          return defaultMockEventsData.map(event => ({
            ...createMockEvent(event, event.organizerId),
            ...event,
            exactDirection: {
              province: event.location.province,
              placeToSetEvent: event.location.address,
              googleLink: event.exactDirection?.googleLink,
            },
            messages: event.reviews?.map(review => ({
              userId: review.userId,
              username: mockUsers.find(u => u._id === review.userId)?.name || 'Unknown',
              picture: mockUsers.find(u => u._id === review.userId)?.profilePicture || '',
              messages: review.comment,
            })) || [],
            numberOfMessages: event.reviews?.length || 0,
            UserId: event.organizerId,
          }));
        default:
          return initialMockData[entityName]; // For other entities, use direct initial data
      }
    };

    Object.keys(initialMockData).forEach(entityName => {
      const storedData = localStorage.getItem(`mock_${entityName}`);
      if (storedData) {
        switch (entityName) {
          case 'users': mockUsers = JSON.parse(storedData); break;
          case 'services': mockServices = JSON.parse(storedData); break;
          case 'events': mockEvents = JSON.parse(storedData); break;
          case 'businessOffers': mockBusinessOffers = JSON.parse(storedData); break;
          case 'likes': mockLikes = JSON.parse(storedData); break;
          case 'reservations': mockReservations = JSON.parse(storedData); break;
          case 'messages': mockMessages = JSON.parse(storedData); break;
          case 'notifications': mockNotifications = JSON.parse(storedData); break;
          case 'polls': mockPolls = JSON.parse(storedData); break;
          default: break;
        }
      } else {
        const dataToStore = getTransformedDefaultData(entityName);
        localStorage.setItem(`mock_${entityName}`, JSON.stringify(dataToStore));
        // Also update the globally mutable array for immediate use
        switch (entityName) {
          case 'users': mockUsers = dataToStore; break;
          case 'services': mockServices = dataToStore; break;
          case 'events': mockEvents = dataToStore; break;
          case 'businessOffers': mockBusinessOffers = dataToStore; break;
          case 'likes': mockLikes = dataToStore; break;
          case 'reservations': mockReservations = dataToStore; break;
          case 'messages': mockMessages = dataToStore; break;
          case 'notifications': mockNotifications = dataToStore; break;
          case 'polls': mockPolls = dataToStore; break;
          default: break;
        }
      }
    });
  }
};

export const saveMockEntityData = (entityName, data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`mock_${entityName}`, JSON.stringify(data));
    // Also update the globally mutable array
    switch (entityName) {
      case 'users': mockUsers = data; break;
      case 'services': mockServices = data; break;
      case 'events': mockEvents = data; break;
      case 'businessOffers': mockBusinessOffers = data; break;
      case 'likes': mockLikes = data; break;
      case 'reservations': mockReservations = data; break;
      case 'messages': mockMessages = data; break;
      case 'notifications': mockNotifications = data; break;
      case 'polls': mockPolls = data; break;
      default: break;
    }
  }
};