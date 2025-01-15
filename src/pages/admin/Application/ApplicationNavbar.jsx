import React from 'react';

const ApplicationNavbar = ({ currentStep, setCurrentStep }) => {
  return (
    <div className='application-navbar'>
      <button onClick={() => setCurrentStep(1)}  className={currentStep === 1 ? 'active' : ''}>Application Registration</button>
      <button onClick={() => setCurrentStep(2)} className={currentStep === 2 ? 'active' : ''}>2023/24 Sfe</button>
      <button onClick={() => setCurrentStep(3)} className={currentStep === 3 ? 'active' : ''}>Section 1 </button>
      <button onClick={() => setCurrentStep(4)} className={currentStep === 4 ? 'active' : ''}>Section 2 </button>
      <button onClick={() => setCurrentStep(5)} className={currentStep === 5 ? 'active' : ''}>Section 3 </button>
    </div>
  );
};

export default ApplicationNavbar;