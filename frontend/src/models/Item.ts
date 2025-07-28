export class BaseModel {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getId(): string {
    return this.id;
  }
}

export class Item extends BaseModel {
  name: string;
  category: string;
  notes: string;
  dateRemoved: string;

  constructor(id: string, name: string, category: string, notes: string, dateRemoved: string) {
    super(id);
    this.name = name;
    this.category = category;
    this.notes = notes;
    this.dateRemoved = dateRemoved;
  }

  getSummary(): string {
    return `${this.name} (${this.category}) - Removed: ${this.dateRemoved}`;
  }
}