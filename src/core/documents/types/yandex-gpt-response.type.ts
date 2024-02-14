import { ApiProperty } from '@nestjs/swagger';

export class YandexGptResponse {
  result: {
    alternatives: ResponseMessage[];
    usage: usageType;
    modelVersion: string;
  };
}

export type usageType = {
  inputTextTokens: string;
  completionTokens: string;
  totalTokens: string;
};

export class AIMessage {
  @ApiProperty()
  role: 'system' | 'assistant' | 'user';

  @ApiProperty()
  text: string;
}

export class ResponseMessage {
  @ApiProperty()
  message: AIMessage;

  @ApiProperty()
  status: string;
}
