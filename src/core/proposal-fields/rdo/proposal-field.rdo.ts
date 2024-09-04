import { plainToInstance, Transform } from 'class-transformer';
import { FieldAnswerRdo } from '#src/core/field-answers/rdo/field-answer.rdo';

export class ProposalFieldRdo {
  id: number;

  label: string;

  name: string;

  placeholder?: string;

  type: string;

  inputType: string;

  columnName?: string;

  place: number;

  isRequired: boolean;

  isDisabled: boolean;

  @Transform(({ value }: { value: string }) =>
    value ? String(value).split(',') : undefined,
  )
  userAutoCompleteProperty?: string[];

  @Transform(({ value }) => plainToInstance(FieldAnswerRdo, value))
  answers?: FieldAnswerRdo[];
}
