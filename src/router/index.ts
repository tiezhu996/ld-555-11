import { createBrowserRouter } from 'react-router-dom';
import { createElement } from 'react';
import { App } from '../App';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: createElement(App),
    children: routes,
  },
]);
