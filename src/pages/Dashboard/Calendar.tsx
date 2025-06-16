import { useEffect, useState, FormEvent } from 'react';
import { fetchSingleUserTask, addReview } from '../../api/houseInfo.ts';
import CalendarCleaningTaskList from './CalendarCleaningTaskList.tsx';
import { AxiosError } from 'axios';
import { usersCleaningTask } from '../../types/types.ts';

interface CalendarProps {
  userTaskData: usersCleaningTask[] | null;
  updateTasks: (taskId: string, newStatus: boolean) => Promise<void>;
}

const Calendar: React.FC<CalendarProps> = ({ userTaskData, updateTasks }) => {
  const [loading, setLoading] = useState(true);
  const [reviewFormData, setReviewFormData] = useState('');

  const today = new Date();
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];

  useEffect(() => {
    const load = async () => {
      try {
        await fetchSingleUserTask();
      } catch (e) {
        console.error('Error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleToggle = async (taskId: string, currentStatus: boolean) => {
    try {
      await updateTasks(taskId, !currentStatus);
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const dataToSend = {
        house_id: localStorage.getItem('house_id'),
        individual_survey_result: reviewFormData,
      };
      await addReview(dataToSend);
      setReviewFormData('');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Task/bill creation error:', error);
      } else {
        console.log('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="string-left" />
      <div className="string-right" />
      <div className="pin calendar-pin" />
      <div className="calendar">
        <div className="date-container">
          <div className="date-display">{days[today.getDay()]}</div>
          <div className="date-display">{today.getDate()}</div>
          <div className="date-display">{months[today.getMonth()]}</div>
        </div>

        <div
          className="image-container"
          style={{
            backgroundImage: `url(/calendar_photos/${months[today.getMonth()].toLowerCase()}.png)`,
          }}
        ></div>

        <div className="information">
          <h1 className="heading">My Cleaning Tasks:</h1>
          <CalendarCleaningTaskList
            userTaskData={userTaskData}
            loading={loading}
            onToggle={handleToggle}
          />

          <h1 className="heading">Review Submission:</h1>
          <form className="review-form" onSubmit={handleSubmit}>
            <textarea
              id="review"
              name="review"
              rows={4}
              value={reviewFormData}
              onChange={(e) => setReviewFormData(e.target.value)}
              required
            ></textarea>
            <input id="submit-review" type="submit" value="SUBMIT" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
