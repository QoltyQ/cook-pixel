// assistant.service.ts

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatgptService {
  private openai;
  private assistantId = process.env.OPENAI_ASSISTANT_ID;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessageToThread(threadId: string, content: string): Promise<any> {
    try {
      return await this.openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content,
      });
    } catch (error) {
      throw error;
    }
  }

  async runAssistant(threadId: string): Promise<any> {
    try {
      return await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: this.assistantId,
      });
    } catch (error) {
      throw error;
    }
  }

  async retrieveResponse(threadId: string): Promise<any> {
    try {
      return await this.openai.beta.threads.messages.list(threadId);
    } catch (error) {
      throw error;
    }
  }

  async createThread(): Promise<any> {
    try {
      return await this.openai.beta.threads.create();
    } catch (error) {
      throw error;
    }
  }
}
