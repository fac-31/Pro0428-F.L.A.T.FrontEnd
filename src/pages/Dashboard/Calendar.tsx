import { useEffect, useState } from 'react';
import { fetchSingleUserTask } from '../../api/houseInfo.ts';
import { updateTaskStatus } from '../../api/houseInfo.ts';
import CalendarCleaningTaskList from './CalendarCleaningTaskList.tsx';
import { usersCleaningTask } from '../../types/types.ts';
import classNames from 'classnames';
import styles from '../../styles/dashboard.module.css';

const Calendar = () => {
  const [tasks, setTasks] = useState<usersCleaningTask[]>([]);
  const [loading, setLoading] = useState(true);

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
        const data = await fetchSingleUserTask();
        setTasks(data);
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
      await updateTaskStatus(taskId, !currentStatus);
      setTasks((prev) =>
        prev.map((task) =>
          task.cleaning_task_id === taskId ? { ...task, task_complete: !currentStatus } : task
        )
      );
    } catch (e) {
      console.error('Failed to update status:', e);
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

        <div className={styles.information}>
          <h1 className={styles.heading}>My Cleaning Tasks:</h1>
          <CalendarCleaningTaskList tasks={tasks} loading={loading} onToggle={handleToggle} />

          <h1 className={styles.heading}>Review Submission:</h1>
          <form className={styles.review_form}>
            <textarea id="review" name="review" rows={4}></textarea>
            <input id="submit-review" type="submit" value="SUBMIT" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
