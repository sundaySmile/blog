import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <div>
		<h2>Hello everyone</h2>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
