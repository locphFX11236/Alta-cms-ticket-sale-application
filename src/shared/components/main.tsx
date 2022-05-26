import React from 'react';
import '../assets/css/main.css';

const MainView: React.FC = () => {
  return (
    <div className='main'>
        <div className='main-right'>menu</div>
        <div className='main-left'>
            <div>header</div>
            <div>content</div>
        </div>
    </div>
  );
};

export default MainView;