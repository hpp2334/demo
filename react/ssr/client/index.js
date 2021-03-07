import { App } from './app';
import ReactDOM from 'react-dom';
import React from 'react';
import { createClientStore } from './store/createStore';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

loadableReady(() => {
  ReactDOM.hydrate(<App store={createClientStore()} Router={BrowserRouter} />, document.getElementById('root'));
});