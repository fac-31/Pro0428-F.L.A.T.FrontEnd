import React from 'react';
import { usersCleaningTask } from '../../types/types.ts';
import styles from '../../styles/dashboard.module.css';

interface Props {
  userTask: usersCleaningTask;
  onToggle: (taskId: string, currentStatus: boolean) => void;
}

const CalendarCleaningTaskItem: React.FC<Props> = ({ userTask, onToggle }) => (
  <div className="task">
    <label className="task-name" htmlFor={userTask.cleaning_task_id}>
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
