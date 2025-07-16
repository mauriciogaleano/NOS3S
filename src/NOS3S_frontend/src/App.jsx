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
  const [answers, setAnswers] = useState([]);

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
      title: "Environmental Stressor Load",
      question: "How chaotic or orderly does your current environment feel?",
      descriptors: [
        "Complete chaos (overwhelming)",
        "Somewhat chaotic",
        "Neutral",
        "Mostly orderly",
        "Perfectly orderly (controlled)"
      ]
    },
    {
      type: "slider", 
      title: "Somatic Awareness",
      question: "How connected do you feel to your body's physical signals right now?",
      descriptors: [
        "Completely disconnected",
        "Somewhat numb",
        "Some awareness",
        "Clearly noticeable",
        "Highly attuned"
      ]
    },
    {
      type: "slider",
      title: "Social Resonance",
      question: "How harmoniously are you interacting with others?",
      descriptors: [
        "Conflict/withdrawal",
        "Some tension",
        "Neutral",
        "Mostly harmonious",
        "Deep connection"
      ]
    },
    {
      type: "slider",
      title: "Cognitive Load",
      question: "How scattered or focused are your thoughts?",
      descriptors: [
        "Racing/overwhelmed",
        "Some distraction",
        "Some mental chatter",
        "Mostly focused",
        "Laser-focused"
      ]
    },
    {
      type: "slider",
      title: "Energy State",
      question: "How would you describe your energy quality?",
      descriptors: [
        "Drained/exhausted",
        "Some fatigue",
        "Neutral",
        "Mostly energized",
        "Effortless vitality"
      ]
    }
  ];

  const allFieldsFilled = () => {
    return biometrics.hrv && biometrics.age && biometrics.height && biometrics.weight;
  };

  const calculateStressLevel = () => {
    if (answers.length < 6) return "Incomplete assessment";
    
    const hrv = Number(answers[0].hrv);
    const questionResponses = answers.slice(1).map(a => Number(a));
    
    // Weighted calculation based on scientific literature
    const hrvScore = (hrv / 100) * 40; // 40% weight
    const envScore = (6 - questionResponses[0]) * 5; // Reverse scored
    const bodyScore = questionResponses[1] * 5;
    const socialScore = questionResponses[2] * 5;
    const cognitiveScore = (6 - questionResponses[3]) * 5; // Reverse scored
    const energyScore = questionResponses[4] * 5;
    
    const totalScore = Math.min(100, 
      hrvScore + envScore + bodyScore + socialScore + cognitiveScore + energyScore
    );
    
    if (totalScore >= 80) return "Optimal Resilience";
    if (totalScore >= 60) return "Moderate Stress";
    if (totalScore >= 40) return "High Stress";
    return "Autonomic Dysfunction";
  };

  const handleComplete = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const result = calculateStressLevel();
      alert(`Assessment Complete!\nYour Stress Level: ${result}`);
    }
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
            onClick={() => handleComplete(biometrics)}
            disabled={!allFieldsFilled()}
          >
            Continue to Questions
          </button>
        </div>
      ) : (
        <StressSlider
          question={questions[currentStep].question}
          descriptors={questions[currentStep].descriptors}
          onComplete={handleComplete}
          currentQuestion={currentStep}
          totalQuestions={questions.length - 1}
        />
      )}
    </div>
  );
}
