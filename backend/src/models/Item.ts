import { BaseEntity } from './BaseEntity';

export class Item extends BaseEntity {
  constructor(
    public name: string,
    public category: string,
    public dateRemoved: Date,
    public notes?: string,
    public tags: string[] = [],
    id?: number
  ) {
    super(id);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      dateRemoved: this.dateRemoved,
      notes: this.notes,
      tags: this.tags.join(','),
    };
  }
}