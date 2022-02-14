import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop({ type: mongoose.SchemaTypes.Mixed })
  payloads: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ name: 1, type: -1 });
