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
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/api/fetch-bill', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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

export const fetchTestDbData = async () => {
  const response = await fetch('http://localhost:5000/api/test-db');
  if (!response.ok) {
    throw new Error('Failed to fetch test DB data');
  }
  return response.json();
};
