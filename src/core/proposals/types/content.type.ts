export class Content {
  proposalAim: string;

  department: number;

  proposalType: string;

  benefits: string;

  additionalDepartments: number[];

  customDepartment?: string;

  limitFactors: string;

  customQuestions?: customQuestion[];
}

export type customQuestion = { question: string; answer: string };
