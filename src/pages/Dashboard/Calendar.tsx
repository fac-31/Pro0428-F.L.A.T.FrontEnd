import { useEffect, useState, FormEvent } from 'react';
import { fetchSingleUserTask, addReview } from '../../api/houseInfo.ts';
import CalendarCleaningTaskList from './CalendarCleaningTaskList.tsx';
import { AxiosError } from 'axios';
import { usersCleaningTask } from '../../types/types.ts';
import classNames from 'classnames';
import styles from '../../styles/dashboard.module.css';

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
    <div className={styles.calendar_container}>
      <div className={styles.string_left} />
      <div className={styles.string_right} />
      <div className={classNames(styles.pin, styles.calendar_pin)} />
      <div className={styles.calendar}>
        <div className={styles.date_container}>
          <div className={styles.date_display}>{days[today.getDay()]}</div>
          <div className={styles.date_display}>{today.getDate()}</div>
          <div className={styles.date_display}>{months[today.getMonth()]}</div>
        </div>

        <div
          className={styles.image_container}
          style={{
            backgroundImage: `url(/calendar_photos/${months[today.getMonth()].toLowerCase()}.png)`,
          }}
        ></div>

        <div className="information">
          <h1 className="heading">My Cleaning Tasks:</h1>
          <CalendarCleaningTaskList tasks={tasks} loading={loading} onToggle={handleToggle} />

          <h1 className="heading">Review Submission:</h1>
          <form className="review-form">
            <textarea id="review" name="review" rows={4}></textarea>
            <input id="submit-review" type="submit" value="SUBMIT" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
