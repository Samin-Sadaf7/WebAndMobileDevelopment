import QuestionAnswer from "@/app/components/answer";

const QuizPage = ({ params }) => {
    const { id } = params;
    return (
        <div>
            <QuestionAnswer id={id}/>
        </div>
    );
}

export default QuizPage;