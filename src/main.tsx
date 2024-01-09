import React from 'react';
import ReactDOM from 'react-dom/client';

import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TanStackProvider } from './plugins/TanStackProvider.tsx';
import { router } from './router/router.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanStackProvider>
      <NextUIProvider>
        <main className='dark text-foreground bg-background'>
          <RouterProvider router={router} />
        </main>
        <ReactQueryDevtools initialIsOpen={false}/>
      </NextUIProvider>
    </TanStackProvider>
  </React.StrictMode>
);
