import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EventsMessages } from 'src/Events/messages/entities/messages.entity';

@Schema()
export class Events extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  subcategory: string;
  //No entra en direccion por temas de comodidad y organizacion
  //y de que toma menos para hacerlo todo
  @Prop({ type: String, required: true })
  township: string;

  @Prop({ type: Boolean, required: true, default: false })
  isPaying: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  perxinsGift: boolean;

  @Prop(
    raw({
      ForMen: { type: Number },
      ForWomen: { type: Number },
      WorkingWithUs: { type: Number },
      Regular: { type: Number },
      ForFEU: { type: Number },
    }),
  )
  cover: Record<string, any>;

  @Prop({ type: String })
  principalImage: string;

  @Prop({ type: String })
  typeOfMusicPlayed: string;

  @Prop(
    raw({
      continuesEventsStartDay: { type: Date },
      continuesEventsEndDay: { type: Date },
      //Los eventos que se repiten días fijos de la semana
      weekDays: { type: String },
      //Los eventos que se dan solamente un día.
      eventsDays: { type: String },
      //Estas son tan solo las horas a las que empiezan y terminan los eventos
      startHour: { type: String },
      exitHour: { type: String },
    }),
  )
  time: Record<string, any>;

  @Prop(
    raw({
      phone: { type: String },
      email: { type: String },
      whatsApp: { type: String },
    }),
  )
  contact: Record<string, any>;
  //{"exactDirection.googleLink": "https://www.google.com.co/maps/place/23+y+12,+Av.+23,+La+Habana/@23.1271764,-82.4027113,17z/data=!3m1!4b1!4m5!3m4!1s0x88cd7742bb51d02d:0x64d19bd49fad9e66!8m2!3d23.1271656!4d-82.4005649?hl=es"}
  @Prop(
    raw({
      province: { type: String, required: true },
      placeToSetEvent: { type: String, required: true },
      googleLink: { type: String },
    }),
  )
  exactDirection: Record<string | number, any>;

  //En caso de que sea Un cine
  @Prop({ type: String })
  movieType: string;

  @Prop({ type: String })
  reviewLink: string;
  //FIN

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId })
  UserId: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: EventsMessages.name }],
    default: [],
  })
  messages: Types.Array<EventsMessages>;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Number, default: 0 })
  numberOfMessages: number;

  @Prop({ type: Number, default: 0 })
  numberOfLikes: number;

  @Prop({ type: Number, default: 0 })
  numberOfShares: number;

  @Prop({ type: Number, default: 0 })
  numberOfViews: number;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Events } from './events.schema';
@Schema()
export class EventsPaying extends Document {
  @Prop({ type: String, required: true, unique: true })
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Events.name }], default: [] })
  eventsPaying: Types.Array<Events>;
}

export const EventsPayingSchema = SchemaFactory.createForClass(EventsPaying);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Events } from 'src/Events/events/schema/events.schema';

@Schema()
export class EventsLike extends Document {
  @Prop({ type: Types.ObjectId })
  associatedId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: String })
  typeOfLike: string;
}

export const EventsLikeSchema = SchemaFactory.createForClass(EventsLike);

import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EventsMessages extends Document {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String, required: true })
  messages: string;
}

export const MessagesSchema = SchemaFactory.createForClass(EventsMessages);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Services } from 'src/Services/services/schema/services.schema';
import { User } from 'src/user/entities/user.entity';
@Schema()
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: Services.name })
  associatedId: Services | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: User | Types.ObjectId;

  @Prop({ type: String })
  typeOfLike: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Messages extends Document {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String, required: true })
  messages: string;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);c

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Services } from './services.schema';
@Schema()
export class ServicesPaying extends Document {
  @Prop({ type: String, required: true, unique: true })
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Services.name }], default: [] })
  servicesPaying: Types.Array<Services>;
}

export const ServicesPayingSchema =
  SchemaFactory.createForClass(ServicesPaying);

  import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Messages } from 'src/Services/messages/entities/messages.entity';
import { WeekDays } from '../DTO/days.enum';
import { Events } from 'src/Events/events/schema/events.schema';
import { User } from 'src/user/entities/user.entity';
@Schema()
export class Services extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, required: true, default: false })
  isPaying: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  perxinsGift: boolean;

  @Prop({ type: Types.Array, required: true, default: [] })
  busRoutes: Types.Array<string>;

  @Prop({ type: String })
  principalImage: string;

  @Prop({ type: String, required: true })
  township: string;

  @Prop({ type: Types.Array, required: true, default: [] })
  secondaryImages: Types.Array<string>;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Types.Array, default: [], required: true })
  subscribers: Types.Array<Types.ObjectId>;

  @Prop(
    raw({
      ForMen: { type: Number },
      ForWomen: { type: Number },
      WorkingWithUs: { type: Number },
      Regular: { type: Number },
      ForFEU: { type: Number },
    }),
  )
  cover: Record<string, any>;

  @Prop(
    raw({
      province: { type: String },
      googleLink: { type: String },
    }),
  )
  exactDirection: Record<string | number, any>;

  @Prop({ type: Boolean, default: false })
  allowReservation: boolean;

  @Prop({ type: String, default: '' })
  typeOfMusicPlayed: string;

  @Prop(
    raw({
      phone: { type: String, default: '' },
      whatsApp: { type: String, default: '' },
      email: { type: String, default: '' },
      webSite: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    }),
  )
  contact: Record<string, any>;

  @Prop({
    type: [{ userId: Types.ObjectId, rating: Number }],
    default: [],
  })
  serviceQualityRating: {
    userId: Types.ObjectId;
    rating: number;
  }[];

  @Prop({
    type: [{ userId: Types.ObjectId, rating: Number }],
    default: [],
  })
  peopleServiceTreatmentRating: {
    userId: Types.ObjectId;
    rating: number;
  }[];

  @Prop({
    type: [{ userId: Types.ObjectId, rating: Number }],
    default: [],
  })
  pricingServiceRating: {
    userId: Types.ObjectId;
    rating: number;
  }[];

  @Prop({ type: Number, default: 0 })
  avgServiceQualityRating: number;

  @Prop({ type: Number, default: 0 })
  avgPeopleServiceTreatmentRating: number;

  @Prop({ type: Number, default: 0 })
  avgPricingServiceRating: number;

  @Prop(
    raw({
      startDays: { type: String, enum: WeekDays },
      endDays: { type: String, enum: WeekDays },
      startHour: { type: String },
      exitHour: { type: String },
    }),
  )
  time: Record<string, any>;

  @Prop({ type: [{ type: Types.ObjectId, ref: Events.name }], default: [] })
  events: Types.Array<Events>;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId })
  UserId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Messages.name }], default: [] })
  messages: Types.Array<Messages>;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Number, default: 0 })
  numberOfLikes: number;

  @Prop({ type: Number, default: 0 })
  numberOfShares: number;

  @Prop({ type: Number, default: 0 })
  numberOfViews: number;

  @Prop({ type: Number, default: 0 })
  numberOfSubscribers: number;
}

export const ServicesSchema = SchemaFactory.createForClass(Services);


import { Events } from 'src/Events/events/schema/events.schema';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Services } from 'src/Services/services/schema/services.schema';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: Boolean, required: true, default: false })
  isAuth: boolean;
  //TODO: Tener en cuenta que si no tiene más servicios, quitarlo de Owner
  @Prop({ type: Boolean, required: true, default: false })
  isOwner: boolean;

  @Prop({ type: Boolean, required: true })
  isAdmin: boolean;

  @Prop({ type: String, default: '' })
  musicalTastes: string;

  /* @Prop({ type: Boolean, default: false })
  hasNotificationsAllow: boolean; */

  @Prop({ type: String })
  actualProvince: string;

  @Prop({ type: Number })
  verificationCode: number;

  @Prop({ type: String, default: '' })
  userPicture: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  recoveryToken: string;

  @Prop({ type: [{ type: Types.ObjectId }] })
  givenLikes: Types.Array<string>;

  @Prop({ type: [{ type: Types.ObjectId, ref: Events.name }], default: [] })
  eventsOwned: Types.Array<Events>;

  @Prop({ type: [{ type: Types.ObjectId, ref: Services.name }], default: [] })
  servicesOwned: Types.Array<Services>;

  @Prop({ type: [{ type: Types.ObjectId, ref: Services.name }], default: [] })
  subscriptions: Types.Array<Services>;

  @Prop({ type: [{ type: Types.ObjectId, ref: Events.name, default: [] }] })
  notifications: Types.Array<Events>;

  @Prop({ type: Number, required: true, default: 0 })
  numberOfNotificationsUnseen: number;

  @Prop({ type: Object, default: {} })
  notificationsSubscriptionForBrowser: any;
}

export const UserSchema = SchemaFactory.createForClass(User);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema()
export class Support extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  voters: Types.Array<User>;

  @Prop({ type: String, required: true })
  suggestion: string;

  @Prop({ type: String, required: true })
  proposeDescription: string;
}

export const SupportSchema = SchemaFactory.createForClass(Support);