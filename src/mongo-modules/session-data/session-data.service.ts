import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema';

@Injectable()
export class SessionDataService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async createSession(sessionData: Partial<Session>): Promise<Session> {
    const newSession = new this.sessionModel(sessionData);
    return newSession.save();
  }

  async findSessionById(sessionId: string): Promise<Session | null> {
    return this.sessionModel.findOne({ sessionId }).exec();
  }

  async findBySessionId(sessionId: string): Promise<any | null> {
    const session = await this.sessionModel.findOne({ sessionId }).exec();
    return session;
  }

  async updateSession(sessionId: string, sessionData: Partial<Session>): Promise<Session | null> {
    return this.sessionModel
      .findOneAndUpdate({ sessionId }, sessionData, { new: true })
      .exec();
  }

  async endSession(sessionId: string): Promise<Session | null> {
    return this.sessionModel
      .findOneAndUpdate(
        { sessionId },
        { endTime: new Date(), isActive: false },
        { new: true }
      )
      .exec();
  }

  async getActiveSessions(): Promise<Session[]> {
    return this.sessionModel.find({ isActive: true }).exec();
  }

  async getUserSessions(userId: string): Promise<Session[]> {
    return this.sessionModel.find({ userId }).sort({ startTime: -1 }).exec();
  }

  async addSessionMetadata(sessionId: string, key: string, value: any): Promise<Session | null> {
    const session = await this.findSessionById(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    const metadata = session.metadata || {};
    metadata[key] = value;
    
    return this.updateSession(sessionId, { metadata });
  }
}
