import {
  usersCleaningTask,
  CleaningTask,
  CleaningTaskFormData,
  Bills,
  BillFormData,
  ReviewFormData,
  Review,
  HouseInfo,
  HouseRule,
  HousePreferences,
  HousePreferencesResponse,
} from 'types/types';

export const fetchCleaningTasks = async (): Promise<CleaningTask[]> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/api/fetch-cleaning', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('/api/houses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch house info');

  const json = await res.json();

  if (!json.success)
    throw new Error('Failed to fetch house info: ' + (json.message || 'Unknown error'));

  return json.data as HouseInfo;
};

export const fetchSingleUserTask = async (): Promise<usersCleaningTask[]> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/api/fetch-cleaning-user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch cleaning tasks: ${res.status} ${errorText}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(`Failed to fetch tasks: ${json.message || 'Unknown error'}`);
  }

  return json.data as usersCleaningTask[];
};

export const updateTaskStatus = async (taskId: string, taskComplete: boolean): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/api/update-cleaning-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cleaning_task_id: taskId,
      task_complete: taskComplete,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || 'Failed to update task status');
  }
};

export const addCleaningTask = async (cleaningTaskData: CleaningTaskFormData): Promise<void> => {
  const res = await fetch('http://localhost:5000/api/create-cleaning', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cleaningTaskData),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || 'Failed to add new cleaning task.');
  }
};

export const addBill = async (billData: BillFormData): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/api/create-bill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(billData),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || 'Failed to add new bill.');
  }
};

export const addReview = async (reviewData: ReviewFormData): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/contentedness/create-contentedness', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || 'Failed to add new review.');
  }
};

export const fetchHousePreferences = async (): Promise<HousePreferencesResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/api/houses/house-preferences', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch house preferences');

  const json = await res.json();

  if (!json.success)
    throw new Error('Failed to fetch house preferences: ' + (json.message || 'Unknown error'));

  return {
    data: json.data as HousePreferences,
    rules: json.rules as HouseRule[],
  };
};

export const fetchReview = async (): Promise<Review> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await fetch('http://localhost:5000/contentedness/fetch-contentedness', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch review data');

  const json = await res.json();

  if (!json.success)
    throw new Error('Failed to fetch review data: ' + (json.message || 'Unknown error'));

  return json.data as Review;
};
