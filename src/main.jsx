import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { NotificationProvider } from './components/NotificationContext.jsx';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </QueryClientProvider>
);
