export class UpdateProposalDto {
  category?: number;
  content?: string;
  name?: string;
  status?: number;

  constructor(
    category?: number,
    content?: string,
    name?: string,
    status?: number,
  ) {
    this.name = name;
    this.content = content;
    this.category = category;
    this.status = status;
  }
}
