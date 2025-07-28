import { Item } from '../src/models/Item';
import { validateItemInput } from '../src/utils/validation';

describe('Item model & validation', () => {
  it('toObject outputs correct shape', () => {
    const date = new Date('2025-01-01T00:00:00Z');
    const item = new Item('Book','Education',date,'Notes',['tag1','tag2'],1);
    expect(item.toObject()).toEqual({ id: 1, name: 'Book', category: 'Education', dateRemoved: date, notes: 'Notes', tags: 'tag1,tag2' });
  });

  it('validateItemInput accepts valid', () => {
    expect(validateItemInput({ name:'A',category:'B',dateRemoved:'2025-01-01T00:00:00Z' })).toBe(true);
  });
});