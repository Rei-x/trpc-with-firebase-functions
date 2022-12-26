import { useState } from 'react';
import { trpc } from '../utils/trpc';

const IndexPage = () => {
  const questions = trpc.getQuestion.useQuery();

  const addQuestion = trpc.createQuestion.useMutation({
    onSuccess: () => {
      questions.refetch();
    },
  });
  const [text, setText] = useState('');
  return (
    <>
      <h1>Questions</h1>
      <ul>
        {questions.data?.questions.map((question) => (
          <li key={question.text}>{question.text}</li>
        ))}
      </ul>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          addQuestion.mutate({ text });
          setText('');
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default IndexPage;
