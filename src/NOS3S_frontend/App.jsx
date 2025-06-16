import React, { useState } from 'react';
import StressSlider from './components/Biofeedback/StressSlider';
import './index.scss';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [biometrics, setBiometrics] = useState({
    hrv: '',
    age: '',
    height: '',
    weight: ''
  });

  const questions = [
    {
      type: "biometrics",
      title: "Biometric Data",
      question: "Please enter your health metrics:",
      fields: [
        { name: "hrv", label: "HRV (ms)", type: "number", min: 20, max: 200 },
        { name: "age", label: "Age (years)", type: "number", min: 18, max: 100 },
        { name: "height", label: "Height (cm)", type: "number", min: 140, max: 220 },
        { name: "weight", label: "Weight (kg)", type: "number", min: 40, max: 200 }
      ]
    },
    {
      type: "slider",
      title: "Environmental Stress",
      question: "How chaotic or orderly does your environment feel?",
      descriptors: [
        "Complete chaos (overwhelming)",
        "Disorganized",
        "Neutral",
        "Mostly orderly",
        "Perfectly orderly (controlled)"
      ]
    },
    {
      type: "slider", 
      title: "Body Awareness",
      question: "How connected do you feel to your body?",
      descriptors: [
        "Completely disconnected",
        "Somewhat numb",
        "Some awareness",
        "Clearly noticeable",
        "Highly attuned"
      ]
    }
  ];

  const allFieldsFilled = () => {
    return biometrics.hrv && biometrics.age && biometrics.height && biometrics.weight;
  };

  return (
    <div className="app">
      {currentStep === 0 ? (
        <div className="biometric-screen">
          <h1>{questions[0].title}</h1>
          <p>{questions[0].question}</p>
          
          <div className="input-fields">
            {questions[0].fields.map((field) => (
              <div key={field.name} className="input-group">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  min={field.min}
                  max={field.max}
                  value={biometrics[field.name]}
                  onChange={(e) => setBiometrics({
                    ...biometrics,
                    [field.name]: e.target.value
                  })}
                  placeholder={`${field.min}-${field.max}`}
                />
              </div>
            ))}
          </div>

          <button
            className={`submit-button ${allFieldsFilled() ? 'active' : 'disabled'}`}
            onClick={() => allFieldsFilled() && setCurrentStep(1)}
            disabled={!allFieldsFilled()}
          >
            Continue to Questions
          </button>
        </div>
      ) : (
        <StressSlider
          question={questions[currentStep].question}
          descriptors={questions[currentStep].descriptors}
          onComplete={() => setCurrentStep(currentStep + 1)}
        />
      )}
    </div>
  );
}
