import { useState } from "react";
import { useQuestions } from "../hooks/useQuestions";
import { useTime } from "../hooks/useTime";

const Question = () => {
    const [title, setTitle] = useState("");
    const [success,setSuccess]=useState("");
    const { error,question, setQuestion, answer, setAnswer, options, setOptions, questions, addQuestion,option, setOption } = useQuestions();
    const {hours,setHours,minutes,setMinutes,seconds,setSeconds}=useTime();

    const addQuiz = (e) => {
        e.preventDefault();
        let quizes = JSON.parse(localStorage.getItem("quiz"));
        if (!quizes) {
            quizes = [];
        }
        quizes.push({ title, questions,time:{
            hours,
            minutes,
            seconds
        } });
        localStorage.setItem("quiz", JSON.stringify(quizes));
        setSuccess("Quiz Added Successfully");
    }

    return (
        <div style={{display: "flex", width: "100%", marginBottom: "20px"}}>
            <div style={{width: "50%"}}>
                <h1 style={{marginTop: "20px", fontSize: "24px", fontWeight: "bold"}}>Create Quiz</h1>
                <label style={{marginTop: "10px", fontWeight: "bold"}}>Quiz Title</label>
                <input style={{width: "100%", padding: "5px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px"}} type="text" placeholder="Enter Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                {error !== "" && (<div style={{backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "10px"}}>{error}</div>)}
                <div style={{marginTop: "10px", fontWeight: "bold"}}>Time For Quiz</div>
                <div style={{display: "flex", marginTop: "5px"}}>
                    <label style={{fontWeight: "bold", marginRight: "5px"}}>HH</label>
                    <input style={{width: "25%", padding: "5px", border: "1px solid #ccc", borderRadius: "5px", marginRight: "5px"}} type="number" placeholder="HH" value={hours} onChange={(e)=>setHours(e.target.value>=0?Number(e.target.value):0)}/>
                    <label style={{fontWeight: "bold", marginRight: "5px"}}>MM</label>
                    <input style={{width: "25%", padding: "5px", border: "1px solid #ccc", borderRadius: "5px", marginRight: "5px"}} type="number" placeholder="MM"  value={minutes} onChange={(e)=>setMinutes(e.target.value>=0?Number(e.target.value):0)}/>
                    <label style={{fontWeight: "bold", marginRight: "5px"}}>SS</label>
                    <input style={{width: "25%", padding: "5px", border: "1px solid #ccc", borderRadius: "5px"}} type="number" placeholder="SS"  value={seconds} onChange={(e)=>setSeconds(e.target.value>=0?Number(e.target.value):0)}/>
                </div>
                <label style={{marginTop: "10px", fontWeight: "bold"}}>Question</label>
                <input style={{width: "100%", padding: "5px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px"}} type="text" placeholder="Enter Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
                <div style={{marginTop: "10px"}}>
                    <label style={{fontWeight: "bold"}}>Option: </label>
                    <input style={{width: "100%", padding: "5px", border: "1px solid #ccc", borderRadius: "5px", marginBottom: "10px"}} value={option} onChange={(e) => setOption(e.target.value)} />
                    <button style={{backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px", border: "none", cursor: "pointer"}} onClick={() => {
                        setOptions([...options, option]);
                        setOption("");
                    }}>+ Add Option</button>
                </div>
                <div>
                    <p style={{marginTop: "10px", fontWeight: "bold"}}>Answer</p>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input type="radio" id={index} name="answer" value={option} onChange={(e) => setAnswer(e.target.value)} />
                            <label htmlFor={index}>{option}</label>
                        </div>
                    ))}
                </div>
                <div style={{marginTop: "10px"}}>
                    <button style={{backgroundColor: "blue", color: "white", padding: "5px", borderRadius: "5px", border: "none", cursor: "pointer"}} onClick={addQuestion}>Add Question</button>
                </div>
            </div>
            <div style={{marginLeft: "20px", width: "50%"}}>
                <div>
                    <h1 style={{marginTop: "20px", fontSize: "24px", fontWeight: "bold"}}>Questions</h1>
                    {success!=="" && (<div style={{backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px", marginBottom: "10px"}}>{success}</div>)}
                    {title!=="" && (<h1 style={{fontSize: "20px", fontWeight: "bold", textDecoration: "underline"}}>{title}</h1>)}
                    <h1 style={{fontSize: "18px", fontWeight: "bold", marginBottom: "10px"}}>Time: {hours>9?hours:`${0}${hours}`}:{minutes>9?minutes:`${0}${minutes}`}:{seconds>9?seconds:`${0}${seconds}`}</h1>
                    {questions.length > 0 && (
                        <div style={{marginTop: "10px"}}>
                            {questions.map((question, index) => (
                                <div key={index} style={{marginBottom: "10px"}}>
                                    <h1 style={{fontSize: "18px", fontWeight: "bold"}}>{index+1}. {question.question}</h1>
                                    <ol style={{marginLeft: "20px"}}>
                                        {question.options.map((option, index) => (
                                            <li key={index}>{String.fromCharCode(65+index)}. {option}</li>
                                        ))}
                                    </ol>
                                    <h2 style={{fontSize: "16px", fontWeight: "bold", backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px"}}>Answer: {question.answer}</h2>
                                </div>
                            ))}

                        </div>)}
                    {questions.length > 0 && (<button style={{backgroundColor: "blue", color: "white", padding: "5px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px"}} onClick={addQuiz}>Add Quiz</button>)}
                </div>
            </div>
        </div>
    );
}

export default Question;
