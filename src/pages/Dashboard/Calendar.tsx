const Calendar = () => {
  return (
    <div className="calendar-container">
      <div className="string-left"></div>
      <div className="string-right"></div>
      <div className="pin calendar-pin"></div>
      <div className="calendar">
        <div className="date-container">
          <div className="date-display">FRIDAY</div>
          <div className="date-display">0</div>
          <div className="date-display">6</div>
          <div className="date-display">JUNE</div>
        </div>
        <div className="image-container"></div>
        <div className="information">
          <h1 className="heading">My Cleaning Tasks:</h1>
          <div className="task-container">
            <div className="task">
              <label className="task-name" htmlFor="task1">
                TASK 1
              </label>
              <input type="checkbox" id="task1" name="task1" value="Task 1" />
            </div>
            <div className="task">
              <label className="task-name" htmlFor="task2">
                TASK 2
              </label>
              <input type="checkbox" id="task2" name="task2" value="Task 2" />
            </div>
          </div>

          <h1 className="heading">My Bills:</h1>
          <div className="task-container">
            <div className="task">
              <label className="task-name" htmlFor="bill1">
                BILL 1
              </label>
              <input type="checkbox" id="bill1" name="bill1" value="Bill 1" />
            </div>
            <div className="task">
              <label className="task-name" htmlFor="bill2">
                BILL 2
              </label>
              <input type="checkbox" id="bill2" name="bill2" value="Bill 2" />
            </div>
            <div className="task">
              <label className="task-name" htmlFor="bill3">
                BILL 3
              </label>
              <input type="checkbox" id="bill3" name="bill3" value="Bill 3" />
            </div>
          </div>

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
