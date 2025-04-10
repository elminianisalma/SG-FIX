
interface Question {
    id: string;
    text: string;
    type: "text" | "textarea" | "radio" | "select" | "file";
    placeholder?: string;
    options?: string[];
}
interface IncidentQuestionsProps {
    questions: Question[];
    answers: { [key: string]: string };
    onAnswerChange: (id: string, value: string) => void;
}

const IncidentQuestions = ({ questions, answers, onAnswerChange }: IncidentQuestionsProps) => {
    return (
        <>
            {questions.map((question, index) => {
                const selectedEnv = answers["environment"];
                const isHigh = question.id === "severity" && (answers[question.id] === "High");
                const disableHigh = isHigh && (selectedEnv === "Dev" || selectedEnv === "HF");

                return (
                    <div key={question.id} className="bg-white p-6 rounded-xl shadow border mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            {`Question ${index + 1}: ${question.text}`}
                        </h3>

                        {question.type === "select" && (
                            <select
                                defaultValue=""
                                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option disabled value="">Select an option</option>
                                {question.options?.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}

                        {question.type === "radio" && (
                            <div className="flex flex-wrap gap-4 mt-2">
                                {question.options?.map((option) => {
                                    const isSelected = answers[question.id] === option;
                                    const disable = question.id === "severity" && option === "High" && (selectedEnv === "Dev" || selectedEnv === "HF");

                                    return (
                                        <label
                                            key={option}
                                            className={`flex items-center justify-center px-5 py-2 rounded-lg border text-sm cursor-pointer transition-all
                      ${disable ? "opacity-40 cursor-not-allowed" :
                                                isSelected ? "bg-red-100 text-red-800 border-red-300" :
                                                    "bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                                        >
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option}
                                                disabled={disable}
                                                className="hidden"
                                                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                                            />
                                            {option}
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        {question.type === "text" && (
                            <input
                                type="text"
                                placeholder={question.placeholder}
                                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2"
                            />
                        )}

                        {question.type === "textarea" && (
                            <textarea
                                rows={4}
                                placeholder={question.placeholder}
                                value={answers[question.id] || ""}
                                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2"
                            />
                        )}

                        {question.type === "file" && (
                            <input
                                type="file"
                                multiple
                                className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2"
                            />
                        )}

                        {question.id === "severity" && (selectedEnv === "Dev" || selectedEnv === "HF") && (
                            <p className="text-sm text-red-500 mt-2">
                                ⚠️ High severity is disabled for Dev or HF environment.
                            </p>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default IncidentQuestions;
