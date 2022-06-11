import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { QueryClientProvider } from 'react-query'
import { getClient } from './queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Gnb } from './pages/gnb';

export const App = () => {
  const element = useRoutes(routes);
  const queryClient = getClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <Gnb />
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App