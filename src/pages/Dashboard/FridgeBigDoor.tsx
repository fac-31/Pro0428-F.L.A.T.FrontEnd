import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CircularProgress } from '@mui/material';
import { HouseInfo, Bills, CleaningTask } from '../../types/types';
import '../../styles/fridge-interior.css';

interface FridgeBottomProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  cleaningData?: CleaningTask[] | null;
  billsData?: Bills[] | null;
  loading: boolean;
}

interface taskFormData {
  type: string;
  assigned_to_user: string;
  due_date: string;
}

interface billFormData {
  type: string;
  amount: string;
  due_date: string;
}

const FridgeBottom: React.FC<FridgeBottomProps> = ({
  isOpen,
  onToggle,
  activeSection,
  data,
  cleaningData,
  billsData,
  loading,
}) => {
  const [taskFormData, setTaskFormData] = useState<taskFormData>({
    type: '',
    assigned_to_user: '',
    due_date: '',
  });

  const [billFormData, setBillFormData] = useState<billFormData>({
    type: '',
    amount: '',
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
            <h1 className="section-title">Active Cleaning Tasks:</h1>

            <div className="table-container">
              <table className="task-table">
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
                      <td className="task-complete-column">{task.task_complete ? '✓' : '✕'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form className="add-task-form" onSubmit={handleSubmit}>
              <label id="task-name-label" htmlFor="task-name">
                TASK
              </label>
              <input
                id="task-name"
                type="text"
                name="type"
                value={taskFormData.type}
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
            <h1 className="section-title">Active Bills:</h1>

            <div className="table-container">
              <table className="task-table">
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
                      <td className="task-complete-column">{bill.paid ? '✓' : '✕'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form className="add-task-form" onSubmit={handleSubmit}>
              <label id="bill-type-label" htmlFor="task-type">
                BILL
              </label>
              <input
                id="bill-type"
                type="text"
                name="type"
                value={billFormData.type}
                onChange={handleChange}
                required
              />
              <label id="bill-amount-label" htmlFor="bill-amount">
                AMOUNT (£)
              </label>
              <input
                id="bill-amount"
                type="text"
                name="amount"
                value={billFormData.amount}
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
        if (!data) {
          return <h1>No house info data found.</h1>;
        }
        return (
          <>
            <h1 id="review-title" className="section-title">
              LAST WEEK'S REVIEW:
            </h1>

            <div id="working" className="appraisal">
              <h2>WHAT'S WORKING?</h2>
              <p>
                This, that and the other. This, that and the other. This, that and the other. This,
                that and the other.
              </p>
            </div>

            <div id="not-working" className="appraisal">
              <h2>WHAT'S NOT WORKING?</h2>
              <p>This, that and the other.</p>
            </div>

            <div className="happiness">
              <h2>HAPPINESS UPDATE:</h2>
              <p>Overall, we're super happy!</p>
            </div>

            <div className="thermometer-container">
              <div className="thermometer-top"></div>
              <div className="thermometer-bottom"></div>
              <img className="thermometer" src="thermometer2.png" alt="thermometer" />
              <div className="mercury"></div>
              <p className="emoji-container">&#128513;</p>
            </div>
          </>
        );

      default:
        return <h1>Select a section to view data.</h1>;
    }
  };

  return (
    <div className="fridge-bottom">
      <div className="fridge-interior" style={{ opacity: isOpen ? 1 : 0, zIndex: 0 }}>
        {renderContent()}
      </div>

      <div
        className="fridge-door"
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
        <div className="border-top"></div>
        <div className="door-handle bottom"></div>
        <div className="border-bottom"></div>
      </div>
    </div>
  );
};

export default FridgeBottom;
