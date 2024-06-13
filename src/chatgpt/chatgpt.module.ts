import { Module } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatgptService],
  controllers: [ChatController],
})
export class ChatModule {}
