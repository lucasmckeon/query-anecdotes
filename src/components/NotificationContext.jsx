import { createContext, useReducer } from 'react';
const NotificationContext = createContext(null);

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'created_anecdote': {
      return `created anecdote: ${action.payload}`;
    }
    case 'voted_anecdote': {
      return `voted anecdote: ${action.payload}`;
    }
    case 'error': {
      return action.payload;
    }
    case 'clear': {
      return null;
    }
  }
};

const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);
  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
