import { CustomQuestion } from '#src/core/proposals/types/content.type';

export class ProcessedContent {
  name: string;

  aboutCompanyAim: string;

  description: string;

  proposalAim?: string;

  proposalType: string;

  limitFactors?: string;

  customQuestions?: CustomQuestion[];
}

export enum ContentProperties {
  name = 'Название',

  description = 'Описанние заявки',

  aboutCompanyAim = 'Какая цель предложенного проекта?',

  proposalAim = 'Цель проекта',

  department = 'Отдел',

  proposalType = 'Тип запроса',

  additionalDepartments = 'Какие смежные отделы затрагивает ваш проект/запрос?',

  customDepartment = 'Другие отделы, которые затрагивает ваш проект/запрос? ',

  limitFactors = 'Есть ли какие-то ограничивабщие факторы?',
}
