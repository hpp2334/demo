import React from 'react';
import { Provider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import style from './app.module.css';

export function Main() {
  return (
    <>
      {renderRoutes(routes)}
    </>
  )
}

export function App({ store, Router }) {
  return (
    <div className={style.main}>
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    </div>
  )
}
