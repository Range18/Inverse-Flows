import { customQuestion } from '#src/core/proposals/types/content.type';
import { GetDepartmentRdo } from '#src/core/departments/rdo/get-department.rdo';

export class ProcessedContent {
  proposalAim: string;

  department: Omit<GetDepartmentRdo, 'id'>;

  proposalType: string;

  benefits: string;

  additionalDepartments: Omit<GetDepartmentRdo, 'id'>[];

  customDepartment?: string;

  limitFactors: string;

  customQuestions?: customQuestion[];
}

export enum ContentProperties {
  proposalAim = 'Цель проекта',

  department = 'Отдел',

  proposalType = 'Тип запроса',

  benefits = 'Какую выгоду несет реализация проекта в деньгах?',

  additionalDepartments = 'Какие смежные отделы затрагивает ваш проект/запрос?',

  customDepartment = 'Другие отделы, которые затрагивает ваш проект/запрос? ',

  limitFactors = 'Есть ли какие-то ограничивабщие факторы?',
}
