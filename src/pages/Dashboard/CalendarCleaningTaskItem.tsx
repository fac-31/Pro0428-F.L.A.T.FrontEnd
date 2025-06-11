import React from 'react';
import { usersCleaningTask } from '../../types/types.ts';

interface Props {
  task: usersCleaningTask;
  onToggle: (taskId: string, currentStatus: boolean) => void;
}

const CleaningTaskItem: React.FC<Props> = ({ task, onToggle }) => (
  <div className="task">
    <label className="task-name" htmlFor={task.cleaning_task_id}>
      {task.description}
    </label>
    <input
      type="checkbox"
      id={task.cleaning_task_id}
      checked={task.task_complete ?? false}
      onChange={() => onToggle(task.cleaning_task_id, task.task_complete ?? false)}
    />
  </div>
);

export default CleaningTaskItem;
