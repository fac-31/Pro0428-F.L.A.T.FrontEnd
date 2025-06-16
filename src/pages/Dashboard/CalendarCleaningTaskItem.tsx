import React from 'react';
import { usersCleaningTask } from '../../types/types.ts';
import styles from '../../styles/dashboard.module.css';

interface Props {
  userTask: usersCleaningTask;
  onToggle: (taskId: string, currentStatus: boolean) => void;
}

const CalendarCleaningTaskItem: React.FC<Props> = ({ userTask, onToggle }) => (
  <div className={styles.task}>
    <label className={styles.task_name} htmlFor={userTask.cleaning_task_id}>
      {userTask.description}
    </label>
    <input
      type="checkbox"
      id={userTask.cleaning_task_id}
      checked={userTask.task_complete ?? false}
      onChange={() => onToggle(userTask.cleaning_task_id, userTask.task_complete ?? false)}
    />
  </div>
);

export default CalendarCleaningTaskItem;
