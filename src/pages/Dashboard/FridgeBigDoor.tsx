import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CircularProgress } from '@mui/material';
import { HouseInfo, Bills, CleaningTask, Review } from '../../types/types';
import { addCleaningTask, addBill } from '../../api/houseInfo';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import styles from '../../styles/fridge-interior.module.css';

interface FridgeBottomProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  cleaningData?: CleaningTask[] | null;
  billsData?: Bills[] | null;
  review?: Review | null;
  onNewTaskAdded: (section: string) => Promise<void>;
  loading: boolean;
}

interface taskFormData {
  description: string;
  assigned_to_user: string;
  due_date: string;
}

interface billFormData {
  bill_type: string;
  bill_amount: string;
  due_date: string;
}

const FridgeBottom: React.FC<FridgeBottomProps> = ({
  isOpen,
  onToggle,
  activeSection,
  cleaningData,
  billsData,
  review,
  onNewTaskAdded,
  loading,
}) => {
  const [taskFormData, setTaskFormData] = useState<taskFormData>({
    description: '',
    assigned_to_user: '',
    due_date: '',
  });

  const [billFormData, setBillFormData] = useState<billFormData>({
    bill_type: '',
    bill_amount: '',
    due_date: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (activeSection === 'cleaning') {
      setTaskFormData((prev) => ({ ...prev, [name]: value }));
    } else if (activeSection === 'bills') {
      setBillFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (activeSection === 'cleaning') {
        const dataToSend = {
          assigned_to_user: taskFormData.assigned_to_user,
          house_id: localStorage.getItem('house_id'),
          description: taskFormData.description,
          due_date: taskFormData.due_date,
        };
        await addCleaningTask(dataToSend);
        onNewTaskAdded(activeSection);
        setTaskFormData({
          description: '',
          assigned_to_user: '',
          due_date: '',
        });
      } else if (activeSection === 'bills') {
        const dataToSend = {
          house_id: localStorage.getItem('house_id'),
          bill_type: billFormData.bill_type,
          bill_amount: billFormData.bill_amount,
          due_date: billFormData.due_date,
        };
        await addBill(dataToSend);
        onNewTaskAdded(activeSection);
        setBillFormData({
          bill_type: '',
          bill_amount: '',
          due_date: '',
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Task/bill creation error:', error);
      } else {
        console.log('An unexpected error occurred.');
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    switch (activeSection) {
      case 'cleaning':
        if (!cleaningData || cleaningData.length === 0) {
          return <h1>No cleaning data found.</h1>;
        }
        return (
          <>
            <h1 className={styles.section_title}>Active Cleaning Tasks:</h1>

            <div className={styles.table_container}>
              <table className={styles.task_table}>
                <thead>
                  <tr>
                    <th>TASK</th>
                    <th>ASSIGNEE</th>
                    <th>DUE DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {cleaningData.map((task, index) => (
                    <tr key={task.cleaning_task_id || index}>
                      <td>{task.description}</td>
                      <td>{task.assigned_to_user}</td>
                      <td>{new Date(task.due_date).toLocaleDateString()}</td>
                      <td className={styles.task_complete_column}>
                        {task.task_complete ? '✓' : '✕'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form className={styles.add_task_form} onSubmit={handleSubmit}>
              <label id="task-name-label" htmlFor="task-name">
                TASK
              </label>
              <input
                id="task-name"
                type="text"
                name="description"
                value={taskFormData.description}
                onChange={handleChange}
                required
              />
              <label id="assignee-name-label" htmlFor="assignee-name">
                ASSIGNEE
              </label>
              <input
                id="assignee-name"
                type="text"
                name="assigned_to_user"
                value={taskFormData.assigned_to_user}
                onChange={handleChange}
                required
              />
              <label id="task-due-date-label" htmlFor="task-due-date">
                DUE DATE
              </label>
              <input
                id="task-due-date"
                type="date"
                name="due_date"
                value={taskFormData.due_date}
                onChange={handleChange}
                required
              />
              <input id="add-task-button" type="submit" value="ADD" />
            </form>
          </>
        );
      case 'bills':
        if (!billsData || billsData.length === 0) {
          return <h1>No bills available.</h1>;
        }
        return (
          <>
            <h1 className={styles.section_title}>Active Bills:</h1>

            <div className={styles.table_container}>
              <table className={styles.task_table}>
                <thead>
                  <tr>
                    <th>BILL</th>
                    <th>AMOUNT (£)</th>
                    <th>DUE DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {billsData.map((bill) => (
                    <tr key={bill.bill_id}>
                      <td>{bill.bill_type}</td>
                      <td>{bill.bill_amount}</td>
                      <td>
                        {bill.due_date ? new Date(bill.due_date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className={styles.task_complete_column}>{bill.paid ? '✓' : '✕'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form className={styles.add_task_form} onSubmit={handleSubmit}>
              <label id="bill-type-label" htmlFor="task-type">
                BILL
              </label>
              <input
                id="bill-type"
                type="text"
                name="bill_type"
                value={billFormData.bill_type}
                onChange={handleChange}
                required
              />
              <label id="bill-amount-label" htmlFor="bill-amount">
                AMOUNT (£)
              </label>
              <input
                id="bill-amount"
                type="text"
                name="bill_amount"
                value={billFormData.bill_amount}
                onChange={handleChange}
                required
              />
              <label id="bill-due-date-label" htmlFor="bill-due-date">
                DUE DATE
              </label>
              <input
                id="bill-due-date"
                type="date"
                name="due_date"
                value={billFormData.due_date}
                onChange={handleChange}
                required
              />
              <input id="add-task-button" type="submit" value="ADD" />
            </form>
          </>
        );

      case 'review':
        if (!review) {
          return <h1>No house info data found.</h1>;
        }

        console.log(review);

        return (
          <>
            <h1 id="review-title" className={styles.section_title}>
              LAST WEEK'S REVIEW:
            </h1>

            <div id="working" className={styles.appraisal}>
              <h2>WHAT'S WORKING?</h2>
              <p>{review[0].individual_survey_result}</p>
            </div>

            <div id="not-working" className={styles.appraisal}>
              <h2>WHAT'S NOT WORKING?</h2>
              <p>{review[0].individual_survey_result}</p>
            </div>

            <div className={styles.happiness}>
              <h2>HAPPINESS UPDATE:</h2>
              <p>{review[0].individual_survey_result}</p>
            </div>

            <div className={styles.thermometer_container}>
              <div className={styles.thermometer_top}></div>
              <div className={styles.thermometer_bottom}></div>
              <img className={styles.thermometer} src="thermometer2.png" alt="thermometer" />
              <div className={styles.mercury}></div>
              <p className={styles.emoji_container}>&#128513;</p>
            </div>
          </>
        );

      default:
        return <h1>Select a section to view data.</h1>;
    }
  };

  return (
    <div className={styles.fridge_bottom}>
      <div className={styles.fridge_interior} style={{ opacity: isOpen ? 1 : 0, zIndex: 0 }}>
        {renderContent()}
      </div>

      <div
        className={styles.fridge_door}
        onClick={onToggle}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transformOrigin: '100% 50%',
          transition: 'transform 1s',
          transform: isOpen ? 'rotateY(100deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <div className={styles.border_top}></div>
        <div className={classNames(styles.door_handle, styles.bottom)}></div>
        <div className={styles.border_bottom}></div>
      </div>
    </div>
  );
};

export default FridgeBottom;
