import { CustomQuestion } from '#src/core/proposals/types/content.type';

export class ProcessedContent {
  name: string;

  aboutCompanyAim: string;

  description: string;

  proposalAim?: string;

  proposalType: string;

  benefits: string;

  limitFactors?: string;

  customQuestions?: CustomQuestion[];
}

export enum ContentProperties {
  name = 'Название',

  description = 'Описанние заявки',

  aboutCompanyAim = 'Как ваш проект позволит достичь целей компании?',

  proposalAim = 'Цель проекта',

  department = 'Отдел',

  proposalType = 'Тип запроса',

  benefits = 'Какую выгоду несет реализация проекта в деньгах?',

  additionalDepartments = 'Какие смежные отделы затрагивает ваш проект/запрос?',

  customDepartment = 'Другие отделы, которые затрагивает ваш проект/запрос? ',

  limitFactors = 'Есть ли какие-то ограничивабщие факторы?',
}
