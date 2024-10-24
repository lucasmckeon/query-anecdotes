import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newAnecdoteService } from '../services/requests.js';
import { useContext } from 'react';
import { NotificationContext } from './NotificationContext.jsx';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdoteService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: (error) => {
      console.log('E', error);
      dispatch({ type: 'error', payload: error.response.data.error });
      setTimeout(() => dispatch({ type: 'clear' }), 2000);
    },
  });
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    console.log('new anecdote');
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'created_anecdote', payload: content });
    setTimeout(() => dispatch({ type: 'clear' }), 1000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
