import React from 'react';
import { usersCleaningTask } from '../../types/types.ts';
import CalendarCleaningTaskItem from './CalendarCleaningTaskItem.tsx';

interface Props {
  userTaskData: usersCleaningTask[] | null;
  onToggle: (taskId: string, currentStatus: boolean) => Promise<void>;
  loading: boolean;
}

const CalendarCleaningTaskList: React.FC<Props> = ({ userTaskData, onToggle, loading }) => {
  if (loading) return <p>Loading tasks...</p>;
  if (!userTaskData || userTaskData.length === 0) return <p>No cleaning tasks assigned.</p>;

  return (
    <div className="task-container">
      {userTaskData.map((task) => (
        <CalendarCleaningTaskItem key={task.cleaning_task_id} userTask={task} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default CalendarCleaningTaskList;
