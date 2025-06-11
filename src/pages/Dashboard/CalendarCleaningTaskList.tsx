import React from 'react';
import { usersCleaningTask } from '../../types/types.ts';
import CalendarCleaningTaskItem from './CalendarCleaningTaskItem.tsx';

interface Props {
  tasks: usersCleaningTask[];
  onToggle: (taskId: string, currentStatus: boolean) => void;
  loading: boolean;
}

const CalendarCleaningTaskList: React.FC<Props> = ({ tasks, onToggle, loading }) => {
  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No cleaning tasks assigned.</p>;

  return (
    <div className="task-container">
      {tasks.map((task) => (
        <CalendarCleaningTaskItem key={task.cleaning_task_id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default CalendarCleaningTaskList;
