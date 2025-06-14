import { useEffect, useState } from 'react';
import { fetchHousePreferences } from '../../api/houseInfo';
import { HouseRule, HousePreferencesResponse } from '../../types/types';

const Poster = () => {
  const [rules, setRules] = useState<HouseRule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response: HousePreferencesResponse = await fetchHousePreferences();
        setRules(response.rules);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching house preferences:', err.message);
          setError('Failed to load house rules.');
        } else {
          console.error('Unknown error fetching house preferences');
          setError('Failed to load house rules.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  if (loading) return <p>Loading house rules...</p>;

  if (error) return <p className="error-text">{error}</p>;

  if (rules.length === 0) return <p>No house rules available.</p>;

  return (
    <div className="poster">
      <div className="pin top-left"></div>
      <div className="pin bottom-left"></div>
      <div className="pin bottom-right"></div>
      <div className="text-container">
        <h1 className="poster-title">HOUSE RULES</h1>
        <ul className="house-rules-list">
          {rules.map((rule, idx) => (
            <li key={idx}>
              <strong>{rule.title}:</strong> {rule.rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Poster;
