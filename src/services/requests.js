import axios from 'axios';
const basePath = '/anecdotes';
const getAnecdotes = async () => {
  const response = await axios.get(basePath);
  return response.data;
};

const newAnecdoteService = async (anecdote) => {
  const response = await axios.post(basePath, anecdote);
  return response.data;
};

const updateAnecdoteService = async (anecdote) => {
  const response = await axios.put(`${basePath}/${anecdote.id}`, anecdote);
  return response.data;
};

export { getAnecdotes, newAnecdoteService, updateAnecdoteService };
