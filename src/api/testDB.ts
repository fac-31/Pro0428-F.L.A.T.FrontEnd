import { testDBUser, testDbResponse } from "types/types";

export const fetchTestDbInfo = async (): Promise<testDBUser[]> => {
  const res = await fetch('http://localhost:5000/api/test-db', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch test DB');

  const json: testDbResponse = await res.json();

  if (!json.success) throw new Error('Failed to fetch test DB: ' + (json.message || 'Unknown error'));

  return json.data;
};