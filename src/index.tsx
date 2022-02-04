import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.scss'

import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function updateApp(registration: ServiceWorkerRegistration) {
  registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
  window.location.reload()
}

serviceWorkerRegistration.register({
  onUpdate: updateApp
})