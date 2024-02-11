export class YandexGptResponse {
  result: {
    alternatives: AImessage[];
    usage: usageType;
    modelVersion: string;
  };
}

export type usageType = {
  inputTextTokens: string;
  completionTokens: string;
  totalTokens: string;
};

export class AImessage {
  message: { role: 'system' | 'assistant' | 'user'; text: string };
  status: string;
}
