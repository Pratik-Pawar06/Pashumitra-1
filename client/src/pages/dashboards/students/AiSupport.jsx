import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/Auth";

// Define all tools and their question sets
export const tools = {
  PHQ9: {
    name: "Patient Health Questionnaire-9",
    short: "PHQ9",
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless...",
      "Thoughts that you would be better off dead or of hurting yourself in some way",
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, val) => sum + Number(val), 0);
      let risk = "low";
      if (total >= 5 && total <= 9) risk = "moderate";
      else if (total >= 10) risk = "high";
      return { total, risk };
    },
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },

  PHQ9Teens: {
    name: "PHQ-9 Modified for Teens",
    short: "PHQ9Teens",
    questions: [
      "Feeling down, depressed, irritable, or hopeless?",
      "Little interest or pleasure in doing things?",
      "Trouble falling asleep, staying asleep, or sleeping too much?",
      "Poor appetite, weight loss, or overeating?",
      "Feeling tired, or having little energy?",
      "Feeling bad about yourself – or feeling that you are a failure, or that you have let yourself or your family down?",
      "Trouble concentrating on things like school work, reading, or watching TV?",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite – being so fidgety or restless?",
      "Thoughts that you would be better off dead, or of hurting yourself in some way?",
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, val) => sum + Number(val), 0);
      let severity = "Minimal";
      if (total >= 5 && total <= 9) severity = "Mild";
      else if (total >= 10 && total <= 14) severity = "Moderate";
      else if (total >= 15 && total <= 19) severity = "Moderately severe";
      else if (total >= 20) severity = "Severe";
      return { total, severity };
    },

    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },

  DASS21: {
    name: "Depression Anxiety Stress Scale - 21 Items",
    short: "DASS21",
    questions: [
      "I found it hard to wind down",
      "I was aware of dryness of my mouth",
      "I couldn’t seem to experience any positive feeling at all",
      "I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)",
      "I found it difficult to work up the initiative to do things",
      "I tended to over-react to situations",
      "I experienced trembling (e.g. in the hands)",
      "I felt that I was using a lot of nervous energy",
      "I was worried about situations in which I might panic and make a fool of myself",
      "I felt that I had nothing to look forward to",
      "I found myself getting agitated",
      "I found it difficult to relax",
      "I felt down-hearted and blue",
      "I was intolerant of anything that kept me from getting on with what I was doing",
      "I felt I was close to panic",
      "I was unable to become enthusiastic about anything",
      "I felt I wasn’t worth much as a person",
      "I felt that I was rather touchy",
      "I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)",
      "I felt scared without any good reason",
      "I felt that life was meaningless",
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, val) => sum + Number(val), 0) * 2; // Multiply by 2 as per instructions
      return { total };
    },
    options: [
      "Did not apply to me at all",
      "Applied to me to some degree, or some of the time",
      "Applied to me to a considerable degree or a good part of time",
      "Applied to me very much or most of the time",
    ],
  },

  GAD7: {
    name: "GAD-7 Anxiety",
    short: "GAD7",
    questions: [
      "Feeling nervous, anxious, or on edge?",
      "Not being able to stop or control worrying?",
      "Worrying too much about different things?",
      "Trouble relaxing?",
      "Being so restless that it is hard to sit still?",
      "Becoming easily annoyed or irritable?",
      "Feeling afraid as if something awful might happen?",
    ],
    scoring: (answers) => {
      const total = answers.reduce((sum, val) => sum + Number(val), 0);
      let risk = "Minimal";
      if (total >= 5 && total <= 9) risk = "Mild";
      else if (total >= 10 && total <= 14) risk = "Moderate";
      else if (total >= 15) risk = "Severe";
      return { total, risk };
    },
    options: [
      "Not at all",
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },
};

export default function AiSupport() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(null);

  const [mode, setMode] = useState("chat");
  const [selectedTool, setSelectedTool] = useState("PHQ9");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Array(tools[selectedTool].questions.length).fill(null)
  );

  // Handle changing the tool
  const handleSelectTool = (toolKey) => {
    setSelectedTool(toolKey);
    setAnswers(Array(tools[toolKey].questions.length).fill(null));
    setCurrentIndex(0);
    setMode("assessment");
  };

  const handleSubmit = async () => {
    const { total, risk } = tools[selectedTool].scoring(answers);
    const payload = {
      userId: user.id,
      tool: selectedTool,
      answers,
      score: total,
      risk: risk,
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/test-results/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (res.ok) {
        setSubmittedResult({ tool: selectedTool, score: total, risk });
        setMode("assessment"); // Stay on assessment view
      } else {
        alert(data.message || "Failed to submit test. Please try again.");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const questions = tools[selectedTool].questions;
  const options = tools[selectedTool].options;

  return (
    <div className="col-span-2 bg-white rounded-xl shadow p-5 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">
        Chat with MindWell Assistant
      </h3>

      {/* Full scrollable area without width limit */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Mode toggle */}
        <div className="flex flex-col space-y-2 mb-4">
          <button
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            onClick={() => setMode("chat")}
          >
            Talk with me (AI chat)
          </button>
          <button
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            onClick={() => setMode("assessment")}
          >
            Take a mental health assessment
          </button>
        </div>

        {/* Chat View */}
        {mode === "chat" && (
          <>
            <div className="bg-blue-50 p-4 rounded-lg w-full">
              <p className="font-semibold text-blue-700">MindWell Assistant</p>
              <p className="text-gray-700">Here to support you</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg w-full">
              <p className="text-gray-800">
                Hello! I'm here to support you today. How can I help?
              </p>
            </div>
          </>
        )}

        {/* Assessment View */}
        {mode === "assessment" && (
          <div className="bg-white p-4 rounded-lg shadow w-full">
            <h3 className="text-lg font-semibold mb-4">
              {tools[selectedTool].name}
            </h3>

            {/* Tool Selector */}
            <div className="flex space-x-2 mb-4">
              {Object.keys(tools).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSelectTool(key)}
                  className={`px-3 py-1 rounded-lg ${
                    selectedTool === key
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {tools[key].short}
                </button>
              ))}
            </div>

            {/* Show result if test is submitted */}
            {submittedResult ? (
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-lg">Your Last Test Result</h4>
                <p>
                  <strong>Tool:</strong> {submittedResult.tool}
                </p>
                <p>
                  <strong>Score:</strong> {submittedResult.score}
                </p>
                <p>
                  <strong>Risk Level:</strong> {submittedResult.risk}
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4">{questions[currentIndex]}</p>

                {/* Options */}
                <div className="flex flex-col gap-2 mb-4 w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      {options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{
                            delay: idx * 0.1,
                            type: "spring",
                            stiffness: 300,
                          }}
                          className={`p-2 rounded-lg border m-1 w-full text-left font-medium shadow-sm transition-colors duration-200 ${
                            answers[currentIndex] === idx
                              ? "bg-blue-500 text-white shadow-lg"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                          onClick={() => {
                            const newAnswers = [...answers];
                            newAnswers[currentIndex] = idx;
                            setAnswers(newAnswers);
                          }}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() =>
                      setCurrentIndex(Math.max(currentIndex - 1, 0))
                    }
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </button>

                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : currentIndex < questions.length - 1 ? (
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setCurrentIndex(currentIndex + 1)}
                      disabled={answers[currentIndex] === null}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={handleSubmit}
                      disabled={answers[currentIndex] === null}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
