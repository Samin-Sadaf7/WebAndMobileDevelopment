import Link from 'next/link';
import { quizes } from './quiz/data.js';

export default function Home() {
  return (
    <main>
      <div className='container'>
        <h1>Quiz App</h1>
        <ul>
          {quizes.map((quiz) => (
            <li key={quiz.id}>
              <Link href={`/quiz/${quiz.id}`}>
                <button>Start Quiz: {quiz.id}</button>
              </Link>
            </li>
          ))}
        </ul>
        <Link href='/quiz'>
          <h1>Wanna Create a Quiz?</h1>
          <button>Click here</button>
        </Link>
      </div>
    </main>
  );
}
