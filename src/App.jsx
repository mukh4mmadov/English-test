import React, { useState, useEffect } from "react";

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const initialQuestions = [
  {
    question: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Child"],
    answer: "Children",
  },
  {
    question: "What is the past tense of 'go'?",
    options: ["Goes", "Gone", "Went", "Going"],
    answer: "Went",
  },
  {
    question: "Which word is an adjective?",
    options: ["Run", "Beautiful", "Quickly", "Friendship"],
    answer: "Beautiful",
  },
  {
    question: "What is the synonym of 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Scared"],
    answer: "Joyful",
  },
  {
    question: "Choose the correct article: '___ apple'",
    options: ["A", "An", "The", "None"],
    answer: "An",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "She don't like it.",
      "She doesn't like it.",
      "She no like it.",
      "She didn't likes it.",
    ],
    answer: "She doesn't like it.",
  },
  {
    question: "What does 'library' mean?",
    options: [
      "A place to read books",
      "A place to sleep",
      "A place to eat",
      "A place to exercise",
    ],
    answer: "A place to read books",
  },
  {
    question: "What is the opposite of 'big'?",
    options: ["Large", "Small", "Tiny", "Wide"],
    answer: "Small",
  },
  {
    question: "Choose the correct preposition: 'I am good ___ math.'",
    options: ["In", "At", "On", "With"],
    answer: "At",
  },
  {
    question: "Which sentence is in present continuous?",
    options: ["I am eating.", "I ate.", "I eat.", "I will eat."],
    answer: "I am eating.",
  },
  {
    question: "What is the meaning of 'quickly'?",
    options: ["Slowly", "Fast", "Carefully", "Easily"],
    answer: "Fast",
  },
  {
    question: "What is the opposite of 'love'?",
    options: ["Hate", "Like", "Adore", "Admire"],
    answer: "Hate",
  },
  {
    question: "Which is correct?",
    options: [
      "He is a engineer.",
      "He is an engineer.",
      "He is the engineer.",
      "He is engineer.",
    ],
    answer: "He is an engineer.",
  },
  {
    question: "What is 'they're' a contraction of?",
    options: ["They were", "They are", "They will", "They is"],
    answer: "They are",
  },
  {
    question: "What is the past tense of 'eat'?",
    options: ["Eat", "Eaten", "Ate", "Eating"],
    answer: "Ate",
  },
  {
    question: "What is the antonym of 'strong'?",
    options: ["Weak", "Tough", "Hard", "Firm"],
    answer: "Weak",
  },
  {
    question: "What is the meaning of 'often'?",
    options: ["Always", "Rarely", "Frequently", "Never"],
    answer: "Frequently",
  },
  {
    question: "Choose the correct sentence:",
    options: [
      "There is a lot of furnitures.",
      "There are many furniture.",
      "There is a lot of furniture.",
      "There are many furnitures.",
    ],
    answer: "There is a lot of furniture.",
  },
  {
    question: "Which is correct?",
    options: [
      "I have seen him yesterday.",
      "I saw him yesterday.",
      "I have saw him yesterday.",
      "I seen him yesterday.",
    ],
    answer: "I saw him yesterday.",
  },
  {
    question: "What is 'you're' a contraction of?",
    options: ["You were", "You are", "You will", "You is"],
    answer: "You are",
  },
  {
    question: "What is the past tense of 'swim'?",
    options: ["Swim", "Swam", "Swum", "Swimming"],
    answer: "Swam",
  },
  {
    question: "What is the synonym of 'difficult'?",
    options: ["Easy", "Hard", "Simple", "Effortless"],
    answer: "Hard",
  },
  {
    question: "Choose the correct spelling:",
    options: ["Definately", "Definitely", "Defenetly", "Definitly"],
    answer: "Definitely",
  },
  {
    question: "What is the plural of 'tooth'?",
    options: ["Tooths", "Teeth", "Toothes", "Tooth"],
    answer: "Teeth",
  },
  {
    question: "What is the superlative form of 'good'?",
    options: ["Better", "Best", "Gooder", "Most Good"],
    answer: "Best",
  },
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const shuffledQuestions = shuffle([...initialQuestions]);
    setQuestions(shuffledQuestions.slice(0, 25)); // Limit to 25 questions
    setUserAnswers(Array(25).fill(""));
  }, []);

  const handleOptionChange = (index, option) => {
    if (result) return;
    const newAnswers = [...userAnswers];
    newAnswers[index] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (userAnswers.includes("")) {
      alert("Javoblarni bilish uchun avval barcha testlarni ishlang");
      return;
    }

    const correctAnswers = questions.map((q, index) => ({
      ...q,
      userAnswer: userAnswers[index],
      isCorrect: q.answer === userAnswers[index],
    }));

    setResult(correctAnswers);
  };

  const handleRefresh = () => {
    setResult(null);
    const shuffledQuestions = shuffle([...initialQuestions]);
    setQuestions(shuffledQuestions.slice(0, 25));
    setUserAnswers(Array(25).fill(""));
  };

  const calculateLevel = (score) => {
    if (score <= 6) return "A1 (Beginner)";
    if (score <= 12) return "A2 (Elementary)";
    if (score <= 18) return "B1 (Intermediate)";
    return "B2 (Upper-Intermediate)";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">English Level Test</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium mb-2">
              {index + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-2 ${
                    result &&
                    (q.answer === option
                      ? "text-green-600"
                      : userAnswers[index] === option && "text-red-600")
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    disabled={!!result}
                    className="form-radio h-5 w-5"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={handleRefresh}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>
        {result && (
          <div className="mt-6">
            <p className="font-medium mb-2">
              Your score: {result.filter((r) => r.isCorrect).length} /{" "}
              {questions.length}
            </p>
            <p className="text-lg font-bold">
              Your English Level:{" "}
              {calculateLevel(result.filter((r) => r.isCorrect).length)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
