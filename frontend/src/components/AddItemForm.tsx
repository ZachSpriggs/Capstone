import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Category } from '../types';

export default function AddItemForm({ onItemAdded }: { onItemAdded(): void }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | 'new' | null>(null);
  const [newCat, setNewCat] = useState('');

  useEffect(() => {
    api.get<Category[]>('/categories').then(r => setCategories(r.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalCatId: number | null = null;

    if (categoryId === 'new' && newCat.trim()) {
      const resp = await api.post<Category>('/categories', { name: newCat.trim() });
      finalCatId = resp.data.id;
      setCategories(c => [...c, resp.data]);
    } else if (typeof categoryId === 'number') {
      finalCatId = categoryId;
    }

    await api.post('/items', { name, quantity, categoryId: finalCatId });
    setName(''); setQuantity(1); setCategoryId(null); setNewCat('');
    onItemAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
      <input
        type="text" placeholder="Item name"
        value={name} onChange={e => setName(e.target.value)}
        className="flex-1 border p-2 rounded"
        required
      />

      <input
        type="number" min={1}
        value={quantity} onChange={e => setQuantity(+e.target.value)}
        className="w-20 border p-2 rounded"
        required
      />

      <select
        value={categoryId ?? ''}
        onChange={e => setCategoryId(
          e.target.value === 'new'
            ? 'new'
            : Number(e.target.value) || null
        )}
        className="border p-2 rounded"
        required
      >
        <option value="" disabled>Select category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
        <option value="new">+ Add new…</option>
      </select>

      {categoryId === 'new' && (
        <input
          type="text" placeholder="New category"
          value={newCat} onChange={e => setNewCat(e.target.value)}
          className="border p-2 rounded"
          required
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </form>
  );
}
