import Link from "next/link";
import { useEffect, useState } from "react";

const QuizQuestions = () => {
    const [quizes,setQuizes]=useState([]);
    const [results,setResults]=useState([]);

    useEffect(()=>{
        const quizes=JSON.parse(localStorage.getItem("quiz"));
        const results=JSON.parse(localStorage.getItem("results"));
        setQuizes(quizes);
        setResults(results);
    },[])
    
    return ( 
        <div>
            {quizes.length>0 && quizes.map((quiz,index)=>(
                <div key={index} style={{marginTop: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px", padding: "10px"}}>
                    <Link href={`/take/${index}`}>
                        <h1 style={{fontSize: "20px", fontWeight: "bold"}}>{quiz.title}</h1>
                    </Link>
                    <div style={{marginLeft: "20px", display: "flex"}}>
                        Results: 
                        {results && results[index] ? (
                            <div style={{marginLeft: "10px", display: "flex"}}>
                                <div style={{backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px", marginRight: "10px"}}>
                                    {results[index].score}/{quiz.questions.length}
                                </div>
                                Time Taken: 
                                <div style={{backgroundColor: "green", color: "white", padding: "5px", borderRadius: "5px", marginLeft: "10px"}}>
                                    {results[index].timeTaken.hours}:{results[index].timeTaken.minutes}:{results[index].timeTaken.seconds}
                                </div>
                            </div>
                        ) : (
                            <div style={{backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px", marginLeft: "10px"}}>
                                Not Given
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default QuizQuestions;
