import React from 'react';
import { CircularProgress } from '@mui/material';
import { HouseInfo, testDBUser } from '../../types/types';
import '../../styles/fridge-interior.css';

interface FridgeBottomProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: 'cleaning' | 'bills' | 'review' | null;
  data: HouseInfo | null;
  testDbData?: testDBUser[] | null;
  loading: boolean;
}

const FridgeBottom: React.FC<FridgeBottomProps> = ({
  isOpen,
  onToggle,
  activeSection,
  data,
  testDbData, // <- now used!
  loading,
}) => {
  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (!testDbData || testDbData.length === 0) {
      return <h1>No test DB data found.</h1>;
    }

    if (!data) {
      return <h1>No house info data found.</h1>;
    }

    switch (activeSection) {
      case 'cleaning':
        return (
          <>
            <div className="due-date-container">
              <p id="due">DUE:</p>
              <div className="due-date-display">SUNDAY</div>
              <div className="due-date-display">0</div>
              <div className="due-date-display">8</div>
              <div className="due-date-display">JUNE</div>
            </div>

            <h1 className="section-title">Active Cleaning Tasks:</h1>

            <div className="table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>TASK</th>
                    <th>ASSIGNEE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clean kitchen</td>
                    <td>{testDbData[0].name}</td>
                  </tr>
                  <tr>
                    <td>Clean bathroom</td>
                    <td>{testDbData[0].name}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <form className="add-task-form">
              <label id="task-name-label" htmlFor="task-name">
                TASK
              </label>
              <input id="task-name" type="text" />
              <label id="assignee-name-label" htmlFor="assignee-name">
                ASSIGNEE
              </label>
              <input id="assignee-name" type="text" />
              <input id="add-task-button" type="submit" value="ADD" />
            </form>
          </>
        );
      case 'bills':
        return (
          <>
            <div className="due-date-container">
              <p id="due">DUE:</p>
              <div className="due-date-display">SUNDAY</div>
              <div className="due-date-display">0</div>
              <div className="due-date-display">8</div>
              <div className="due-date-display">JUNE</div>
            </div>

            <h1 className="section-title">Active Bills:</h1>

            <div className="table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>BILL</th>
                    <th>ASSIGNEE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gas</td>
                    <td>{testDbData[0].name}</td>
                  </tr>
                  <tr>
                    <td>Water</td>
                    <td>{testDbData[0].name}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <form className="add-task-form">
              <label id="task-name-label" htmlFor="task-name">
                TASK
              </label>
              <input id="task-name" type="text" />
              <label id="assignee-name-label" htmlFor="assignee-name">
                ASSIGNEE
              </label>
              <input id="assignee-name" type="text" />
              <input id="add-task-button" type="submit" value="ADD" />
            </form>
          </>
        );
      case 'review':
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
        return null;
    }
  };

  return (
    <div className="fridge-bottom">
      <img id="fridge-interior-background" src="fridge.png" alt="Fridge Interior" />
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
