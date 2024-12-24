import React, { useState, useEffect } from "react";

// Shuffle function to randomize the order of questions
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const initialQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    answer: "Shakespeare",
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    answer: "Portuguese",
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    answer: "Da Vinci",
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["90", "100", "110", "120"],
    answer: "100",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Cheetah"],
    answer: "Lion",
  },
  {
    question: "Which continent has the most countries?",
    options: ["Asia", "Africa", "Europe", "South America"],
    answer: "Africa",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    answer: "Au",
  },
  {
    question: "Which year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    answer: "1945",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Graphite"],
    answer: "Diamond",
  },
  {
    question: "Who discovered gravity?",
    options: ["Einstein", "Newton", "Galileo", "Tesla"],
    answer: "Newton",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
    answer: "Carbon dioxide",
  },
  {
    question: "Who painted 'Starry Night'?",
    options: ["Monet", "Van Gogh", "Picasso", "Rembrandt"],
    answer: "Van Gogh",
  },
  {
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arctic", "Gobi", "Kalahari"],
    answer: "Sahara",
  },
  {
    question: "Which is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    answer: "Vatican City",
  },
  {
    question: "Who is known as the father of computers?",
    options: [
      "Charles Babbage",
      "Alan Turing",
      "Ada Lovelace",
      "John von Neumann",
    ],
    answer: "Charles Babbage",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado",
  },
  {
    question: "Which planet has the most moons?",
    options: ["Mars", "Jupiter", "Saturn", "Uranus"],
    answer: "Saturn",
  },
  {
    question: "What is the smallest unit of life?",
    options: ["Atom", "Cell", "Molecule", "Organ"],
    answer: "Cell",
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
  },
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    const shuffledQuestions = shuffle([...initialQuestions]);
    setQuestions(shuffledQuestions);
    setUserAnswers(Array(shuffledQuestions.length).fill(""));
  }, []);

  const handleOptionChange = (index, option) => {
    if (result) return; // Prevent changing answers after submitting
    const newAnswers = [...userAnswers];
    newAnswers[index] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (userAnswers.includes("")) {
      alert("Please answer all questions before submitting.");
      setSubmitDisabled(true); // Disable submit button until all answers are given
      return;
    }

    const correctAnswers = questions.filter(
      (q, index) => q.answer === userAnswers[index]
    );
    const score = correctAnswers.length;

    let level = "";
    if (score <= 8) level = "A1";
    else if (score <= 14) level = "A2";
    else if (score <= 20) level = "B1";
    else level = "B2";

    setResult({ score, level });
  };

  const handleRefresh = () => {
    const shuffledQuestions = shuffle([...initialQuestions]);
    setQuestions(shuffledQuestions);
    setUserAnswers(Array(shuffledQuestions.length).fill(""));
    setResult(null);
    setSubmitDisabled(false); // Enable submit button after refresh
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
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="form-radio h-5 w-5 text-blue-600"
                    disabled={!!result} // Disable after submit
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
            disabled={submitDisabled || userAnswers.includes("")} // Disable if some answers are missing or already submitted
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
          <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
            <p>
              Your score: {result.score} / {questions.length}
            </p>
            <p>Your level: {result.level}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
