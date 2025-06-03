import { CleaningTask, Bills, HouseInfo } from 'types/types';

export const fetchCleaningTasks = async (): Promise<CleaningTask[]> => {
  const res = await fetch('/api/cleaning-tasks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch cleaning tasks');

  const json = await res.json();

  if (!json.success)
    throw new Error('Failed to fetch cleaning tasks: ' + (json.message || 'Unknown error'));

  return json.data as CleaningTask[];
};

export const fetchBills = async (): Promise<Bills[]> => {
  const res = await fetch('/api/bills', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch bills');

  const json = await res.json();

  if (!json.success) throw new Error('Failed to fetch bills: ' + (json.message || 'Unknown error'));

  return json.data as Bills[];
};

export const fetchHouseInfo = async (): Promise<HouseInfo> => {
  const res = await fetch('/api/houses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch house info');

  const json = await res.json();

  if (!json.success)
    throw new Error('Failed to fetch house info: ' + (json.message || 'Unknown error'));

  return json.data as HouseInfo;
};

