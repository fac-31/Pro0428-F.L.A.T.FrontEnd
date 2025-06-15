import { useEffect, useState } from 'react';
import { fetchSingleUserTask } from '../../api/houseInfo.ts';
import { updateTaskStatus } from '../../api/houseInfo.ts';
import CalendarCleaningTaskList from './CalendarCleaningTaskList.tsx';
import { usersCleaningTask } from '../../types/types.ts';

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
