export interface Category {
  id: number;
  name: string;
}

export interface Goal {
  id: number;
  dailyGoal: number;
}

export interface LongTermGoal {
  id: number;
  description: string;
  targetCount: number;
  category: Category;
}

export interface DeclutterItem {
  createdAt: string | number | Date;
  id: number;
  name: string;
  quantity: number;
  dateRemoved: string;
  notes?: string;
  category: Category;
}
