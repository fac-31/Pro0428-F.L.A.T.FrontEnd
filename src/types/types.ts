export interface CleaningTask {
  cleaning_task_id: string;
  assigned_to_user?: string;
  house_id?: string;
  description: string;
  due_date?: string;
  task_complete?: boolean;
  created_at?: string;
}
export interface usersCleaningTask {
  cleaning_task_id: string;
  description: string;
  task_complete?: boolean;
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

interface PreferencesObject {
  details: string;
  summary: string;
  features: string[];
}

export interface HousePreferences {
  house_id: string;
  address: string;
  landlord_contact: Record<string, unknown> | null;
  house_preferences: PreferencesObject | null;
  created_at: string | null;
}

export interface HouseInfo {
  id: string;
}

export interface FridgeProps {
  houseInfo: HouseInfo;
}

export type Section = 'cleaning' | 'bills' | null;
export type SectionData = CleaningTask[] | Bills[] | null;

export interface testDBUser {
  user_id: string;
  preferences: Record<string, unknown>;
  email: string;
  name: string;
  created_at: string;
  house_id: string;
}

export interface testDbResponse {
  success: boolean;
  data: testDBUser[];
  message?: string;
}
