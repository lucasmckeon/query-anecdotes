import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdoteService } from './services/requests.js';
import { useContext } from 'react';
import { NotificationContext } from './components/NotificationContext.jsx';

const App = () => {
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdoteService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
  });
  const { dispatch } = useContext(NotificationContext);
  const handleVote = (anecdote) => {
    console.log('vote');
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: 'voted_anecdote', payload: anecdote.content });
    setTimeout(() => dispatch({ type: 'clear' }), 1000);
  };
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));
  if (result.isLoading) {
    return <div>Loading data...</div>;
  }
  if (result.isError) {
    return (
      <div>anecdote service not available due to problems in the server</div>
    );
  }
  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
