export interface CleaningTask {
  cleaning_task_id: string;
  assigned_to_user?: string;
  house_id?: string;
  description: string;
  due_date?: string;
  task_complete?: boolean;
  created_at?: string;
}

export interface Bills {
  bill_id: string;
  house_id: string;
  bill_type: string;
  bill_amount: string;
  due_date?: string;
  created_by_user: string;
  paid?: boolean;
  billing_period_start?: string;
  billing_period_end?: string;
  created_at?: string;
  active: boolean;
}

export interface HouseInfo {
  id: string;
}

export interface FridgeProps {
  houseInfo: HouseInfo;
}

export type Section = 'cleaning' | 'bills' | null;
export type SectionData = CleaningTask[] | Bills[] | null;
