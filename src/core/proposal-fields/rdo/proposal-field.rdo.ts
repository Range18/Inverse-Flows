import { plainToInstance, Transform } from 'class-transformer';
import { FieldAnswerRdo } from '#src/core/field-answers/rdo/field-answer.rdo';

export class ProposalFieldRdo {
  id: number;

  label: string;

  name: string;

  placeholder?: string;

  type: string;

  isRequired: boolean;

  isDisabled: boolean;

  @Transform(({ value }: { value: string }) => String(value).split(','))
  userAutoCompleteProperty?: string[];

  @Transform(({ value }) => plainToInstance(FieldAnswerRdo, value))
  answers?: FieldAnswerRdo[];
}
