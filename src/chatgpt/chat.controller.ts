import { Controller, Post, Body } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post('send-message')
  async sendMessageToThread(
    @Body('threadId') threadId: string,
    @Body('content') content: string,
  ): Promise<any> {
    return this.chatgptService.sendMessageToThread(threadId, content);
  }

  @Post('run-assistant')
  async runAssistant(@Body('threadId') threadId: string): Promise<any> {
    return this.chatgptService.runAssistant(threadId);
  }

  @Post('retrieve-messages')
  async retrieveResponse(@Body('threadId') threadId: string): Promise<any> {
    return this.chatgptService.retrieveResponse(threadId);
  }

  @Post('create-thread')
  async createThread(): Promise<any> {
    return this.chatgptService.createThread();
  }
}
