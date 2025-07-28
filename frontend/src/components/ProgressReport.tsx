import type { DeclutterItem, LongTermGoal } from '../types';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  items: DeclutterItem[];
  longTermGoals: LongTermGoal[];
};

export default function ProgressReport({ items, longTermGoals }: Props) {
  if (!longTermGoals || longTermGoals.length === 0) {
    return <p className="text-gray-600 italic">No goals set.</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">📊 Progress Report</h2>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Category</th>
            <th className="border px-3 py-2">Qty Removed</th>
            <th className="border px-3 py-2">Target</th>
            <th className="border px-3 py-2">% Complete</th>
            <th className="border px-3 py-2">Last Removed</th>
          </tr>
        </thead>
        <tbody>
          {longTermGoals.map(goal => {
            const matchingItems = items.filter(i => i.category.id === goal.category.id);
            const totalQty = matchingItems.reduce((sum, item) => sum + item.quantity, 0);
            const percent = goal.targetCount
              ? Math.min(100, Math.round((totalQty / goal.targetCount) * 100))
              : 0;
            const lastRemoved = matchingItems
              .map(i => new Date(i.dateRemoved))
              .sort((a, b) => b.getTime() - a.getTime())[0];

            return (
              <tr key={goal.id}>
                <td className="border px-3 py-2">{goal.category.name}</td>
                <td className="border px-3 py-2 text-center">{totalQty}</td>
                <td className="border px-3 py-2 text-center">{goal.targetCount}</td>
                <td className="border px-3 py-2 text-center">{percent}%</td>
                <td className="border px-3 py-2 text-center">
                  {lastRemoved ? formatDistanceToNow(lastRemoved, { addSuffix: true }) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
