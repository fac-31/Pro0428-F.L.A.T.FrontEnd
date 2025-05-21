import { supabase } from '../supabaseClient.ts';

export const fetchCleaningTasks = async (householdId: string) => {
  const { data, error } = await supabase
    .from('cleaning_tasks')
    .select('*')
    .eq('household_id', householdId);

  if (error) throw error;
  return data;
};

export const fetchBills = async (householdId: string) => {
  const { data, error } = await supabase
    .from('bills')
    .select('*')
    .eq('household_id', householdId);

  if (error) throw error;
  return data;
};

export const fetchReviews = async (householdId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('household_id', householdId);

  if (error) throw error;
  return data;
};
