import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Category, LongTermGoal } from '../types';
import { Trash2 } from 'lucide-react';

interface GoalSetterProps {
  currentGoals: LongTermGoal[];
  onSaved: () => void;
}

export default function GoalSetter({ currentGoals, onSaved }: GoalSetterProps) {
  const [description, setDescription] = useState('');
  const [targetCount, setTargetCount] = useState(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get<Category[]>('/categories').then(res => setCategories(res.data));
  }, []);

  const handleSave = async () => {
    if (!description || !targetCount || !categoryId) return;

    try {
      await api.post('/long-term-goals', {
        description,
        targetCount,
        categoryId,
      });
      setDescription('');
      setTargetCount(1);
      setCategoryId(null);
      onSaved();
    } catch (err) {
      console.error('Error saving goal:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/long-term-goals/${id}`);
      onSaved();
    } catch (err) {
      console.error('Error deleting goal:', err);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-3">Set a New Long-Term Goal</h2>

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mt-2 p-2 border rounded"
        placeholder="Describe your goal..."
      />

      <p className="text-sm text-gray-600 mt-1">
        How many items would you like to get rid of?
      </p>
      <input
        type="number"
        min={1}
        value={targetCount}
        onChange={e => setTargetCount(Number(e.target.value))}
        className="w-full mt-2 p-2 border rounded"
        placeholder="Target count"
      />

      <select
        value={categoryId ?? ''}
        onChange={e => setCategoryId(Number(e.target.value))}
        className="w-full mt-2 p-2 border rounded"
      >
        <option value="" disabled>Select a category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <button
        onClick={handleSave}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Goal
      </button>

      <h3 className="mt-6 text-lg font-semibold">Your Current Goals</h3>
      {currentGoals.length === 0 && <p className="text-gray-600 italic">No goals set yet.</p>}

      <ul className="mt-2 space-y-2">
        {currentGoals.map(goal => (
          <li key={goal.id} className="p-3 border rounded bg-gray-50 flex justify-between items-start">
            <div>
              <p><strong>Description:</strong> {goal.description}</p>
              <p><strong>Target:</strong> {goal.targetCount}</p>
              <p><strong>Category:</strong> {goal.category.name}</p>
            </div>
            <button
              onClick={() => handleDelete(goal.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete goal"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
