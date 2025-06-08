import React from 'react';
import Calendar from './Calendar';
import Fridge from './Fridge';
import Poster from './Poster';

const HouseDashboard = () => {
  return (
    <div className="kitchen">
      <Poster />
      <Fridge />
      <Calendar />
    </div>
  );
};

export default HouseDashboard;
