import { useEffect, useState } from "react";

const Clock = ({ initialTime, submitted, setTimeTaken, submitQuiz }) => {
    const [time, setTime] = useState({ ...initialTime });

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = () => {
        const { hours, minutes, seconds } = time;
        if (seconds > 0) {
            setTime({ ...time, seconds: seconds - 1 });
        } else if (minutes > 0) {
            setTime({ ...time, seconds: 59, minutes: minutes - 1 });
        } else if (hours > 0) {
            setTime({ ...time, seconds: 59, minutes: 59, hours: hours - 1 });
        } else {
            submitQuiz();
            clearInterval(timerID);
        }
        setTimeTaken(time);
    };

    return (
        <div>
            <h2 style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}>
                Timer: {time.hours < 10 ? "0" + time.hours : time.hours}:
                {time.minutes < 10 ? "0" + time.minutes : time.minutes}:
                {time.seconds < 10 ? "0" + time.seconds : time.seconds}
            </h2>
        </div>
    );
};

export default Clock;
