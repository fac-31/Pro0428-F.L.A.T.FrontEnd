import { supabase } from '../../supabaseClient';

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
};
