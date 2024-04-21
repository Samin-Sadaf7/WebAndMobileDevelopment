"use client";


import { useEffect, useState } from "react";
import Timer from "./timer";

const Answer = ({ id }) => {
    const [quiz,setQuiz]=useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState(null);
    useEffect(()=>{
        const quiz = JSON.parse(localStorage.getItem("quiz"))[id];
        setSelectedAnswers(Array(quiz.questions.length).fill(null));
        setQuiz(quiz);
    },[])
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [time,setTime]=useState({hours:0,minutes:0,seconds:0});
    const [timeTaken, setTimeTaken] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [progress, setProgress] = useState(0);

    useEffect(()=>{
        if(selectedAnswers){
            const selected = selectedAnswers.filter(answer => answer === null);
            setProgress((quiz.questions.length-selected.length) / quiz.questions.length * 100);
        }
    },[selectedAnswers,quiz])

    const handleAnswerChange = (index, value) => {
        let newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[index] = value;
        setSelectedAnswers(newSelectedAnswers);
    };

    const submitQuiz = () => {
        setSubmitted(true);
        setTimeTaken(time);
        const correctAnswers = quiz.questions.map(question => question.answer);
        let score = 0;
        for (let i = 0; i < correctAnswers.length; i++) {
            if (selectedAnswers[i] === correctAnswers[i]) {
                score++;
            }
        }
        setScore(score);
        let results = JSON.parse(localStorage.getItem("results"));
        if (!results) {
            results = Array(quiz.questions.length).fill(null);
        }
        results[id] = { score, timeTaken, selectedAnswers };
        localStorage.setItem("results", JSON.stringify(results));
    };

    if(quiz){
        return (
            <div style={{marginTop: "20px", marginBottom: "20px"}}>
                <Timer setTimeTaken={setTimeTaken} initialTime={quiz.time} submitted={submitted} submitQuiz={submitQuiz}/>
    
                <div style={{width: "100%", backgroundColor: "white", borderRadius: "20px", height: "5px"}}>
                    <div style={{backgroundColor: "blue", borderRadius: "20px", height: "5px", width:`${progress}%`}}></div>
                </div>
    
                {submitted && (<div style={{marginTop: "10px", marginBottom: "10px", padding: "8px", borderRadius: "5px", fontWeight: "bold", backgroundColor: "green", color: "white", border: "1px solid darkgreen"}}>Score: {score}/{quiz.questions.length} Time Taken: {`${timeTaken.hours}:${timeTaken.minutes}:${timeTaken.seconds}`}</div>)}
                <ul>
                    {quiz.questions.map((question, index) => (
                        <div key={index} style={{marginTop: "10px", marginBottom: "10px"}}>
                            <h2 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "10px"}}>
                                {index + 1}{") "}{question.question}
                            </h2>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input
                                        type="radio"
                                        id={`${index}-${optionIndex}`}
                                        name={`answer-${index}`}
                                        value={option}
                                        checked={selectedAnswers[index] === option}
                                        onChange={() => handleAnswerChange(index, option)}
                                        disabled={submitted}
                                        style={{marginTop: "5px", marginLeft: "10px", marginBottom: "10px"}}
                                    />
                                    <label htmlFor={`${index}-${optionIndex}`} style={{marginLeft: "10px"}}>{option}</label>
                                </div>
                            ))}
                            {submitted && (
                                <div key={index} style={{marginTop: "20px", marginBottom: "20px"}}>
                                    {selectedAnswers[index] === question.answer
                                        ? (<span style={{backgroundColor: "green", borderRadius: "5px", padding: "8px", color: "white"}}>Correct !</span>)
                                        : (<span style={{backgroundColor: "red", borderRadius: "5px", padding: "8px", color: "white"}}>Wrong! Answer is {question.answer}</span>)}
                                </div>
                            )}
                        </div>
                    ))}
                </ul>
                <button
                    onClick={submitQuiz}
                    style={{backgroundColor: "blue", color: "white", fontWeight: "bold", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer"}}
                >
                    Submit Quiz
                </button>
            </div>
        );
    }
    else{
        return null;
    }
};

export default Answer;
