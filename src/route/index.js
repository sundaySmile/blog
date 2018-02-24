import React from 'react';
import {
	Route,
	Link
} from 'react-router-dom';
import Home from '../pages/Home.js';
import About from '../pages/About.js';

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)
export const routes = [
	{
		path: "/",
		exact: true,
		topbar: "",
		main: Home,
		name: 'Home'
	},
	{
		path: "/about",
		exact: false,
		topbar: "",
		main: About,
		name: '公司概况'
	},
	{
		path: "/topics",
		exact: false,
		topbar: "",
		main: Topics,
		name: '产品介绍',
		routes: [

		]
	}
]
