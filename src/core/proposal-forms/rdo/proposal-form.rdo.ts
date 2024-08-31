import { plainToInstance, Transform } from 'class-transformer';
import { ProposalFieldRdo } from '#src/core/proposal-fields/rdo/proposal-field.rdo';

export class ProposalFormRdo {
  id: number;

  title: string;

  subTitle?: string;

  description?: string;

  @Transform(({ value }) => plainToInstance(ProposalFieldRdo, value))
  fields?: ProposalFieldRdo[];
}
