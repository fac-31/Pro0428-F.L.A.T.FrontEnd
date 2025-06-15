import { useEffect, useState } from 'react';
import { fetchHousePreferences } from '../../api/houseInfo';
import { HousePreferences } from '../../types/types.ts';

const Poster = () => {
  const [preferences, setPreferences] = useState<HousePreferences | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await fetchHousePreferences();
        setPreferences(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching house preferences:', err.message);
          setError('Failed to load house preferences.');
        } else {
          console.error('Unknown error fetching house preferences');
          setError('Failed to load house preferences.');
        }
      }
    };

    fetchPreferences();
  }, []);

  return (
    <div className="poster">
      <div className="pin top-left"></div>
      <div className="pin bottom-left"></div>
      <div className="pin bottom-right"></div>
      <div className="text-container">
        <h1 className="poster-title">HOUSE VIBES</h1>
        <p className="house-vibes-paragraph">This is how we want our house to operate:</p>

        {error && <p className="error-text">{error}</p>}

        {preferences?.house_preferences?.summary ? (
          <p className="house-summary">{preferences.house_preferences.summary}</p>
        ) : (
          <p>No preferences summary available.</p>
        )}
      </div>
    </div>
  );
};

export default Poster;
