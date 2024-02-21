export class UpdateProposalDto {
  category?: number;
  content?: string;
  name?: string;

  constructor(category?: number, content?: string, name?: string) {
    this.name = name;
    this.content = content;
    this.category = category;
  }
}
