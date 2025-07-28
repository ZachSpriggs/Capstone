import { useEffect, useState } from 'react';

const tips = [
  "Keep only items that serve a purpose or bring joy.",
  "Declutter one small area each day to build momentum.",
  "Donate clothing you haven’t worn in the past year.",
  "Use a timer: spend just 10 minutes decluttering daily.",
  "Apply the 'one in, one out' rule for new purchases.",
  "Organize items by category, not by room.",
  "Store seldom-used items out of sight to reduce visual clutter.",
  "Challenge yourself: remove one item per day for a month.",
  "Limit your 'sentimental' items to a single keepsake box.",
  "Take before-and-after photos to track your progress.",
  "Use clear bins so you can see what you own.",
  "Set specific decluttering goals for each week."
];

export default function DailyTip() {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % tips.length;
    setTip(tips[dayIndex]);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded shadow-lg max-w-xs">
      <h4 className="font-semibold mb-2">Tip of the Day</h4>
      <p className="text-sm">{tip}</p>
    </div>
  );
}
