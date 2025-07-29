import React, { useEffect, useState, useContext, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import type { DeclutterItem, LongTermGoal } from '../types';
import SearchBar from '../components/SearchBar';
import AddItemForm from '../components/AddItemForm';
import ItemTable from '../components/ItemTable';
import GoalSetter from '../components/GoalSetter';
import ProgressReport from '../components/ProgressReport';
import DailyTip from '../components/DailyTip';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [items, setItems] = useState<DeclutterItem[]>([]);
  const [filtered, setFiltered] = useState<DeclutterItem[]>([]);
  const [longTermGoals, setLongTermGoals] = useState<LongTermGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    console.log('🧪 Dashboard - current token from context:', token);
    console.log('🧪 Dashboard - axios auth header:', api.defaults.headers.common['Authorization']);

    try {
      const [itemsRes, goalsRes] = await Promise.all([
        api.get('/items'),
        api.get('/long-term-goals'),
      ]);

      console.log('📦 Items response:', itemsRes.data);
      console.log('🎯 Goals response:', goalsRes.data);

      setItems(itemsRes.data);
      setFiltered(itemsRes.data);
      setLongTermGoals(goalsRes.data);
    } catch (err: any) {
      console.error('Fetch error in Dashboard:', err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }, [logout, token]);

  useEffect(() => {
    if (!token) {
      console.warn('No token found, logging out.');
      logout();
      return;
    }
    fetchData();
  }, [token, logout, fetchData]);

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Navbar />
      <h1 className="text-2xl font-bold">Decluttered Dashboard</h1>

      <GoalSetter currentGoals={longTermGoals} onSaved={fetchData} />

      <ProgressReport items={items} longTermGoals={longTermGoals} />

      <SearchBar onSearch={q => {
        const l = q.toLowerCase();
        setFiltered(items.filter(i =>
          i.name.toLowerCase().includes(l) ||
          i.category.name.toLowerCase().includes(l)
        ));
      }} />

      <AddItemForm onItemAdded={fetchData} />
      <ItemTable data={filtered} />
      <DailyTip />
    </div>
  );
}
