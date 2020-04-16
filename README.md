## BESTBET Application

#### - [ Developed by Eaglex ](http://eaglex.net)

#### Overview

-

#### Stack

- ES6, MVC, Vue.js v2 with Vuex, bootstrap-vue, Lodash, Webpack, Mock-backend

#### BESTBET Live Demo

- Live demo is hosted on heroku node.js. _Server has a timeout limit_, you may have to loggin again:

```
access:
https://...
login: BESTBET
password: BESTBET

```

#### Start/install application

```
$/ npm install
$/ npm start # will run dev server and open browser
$/ npm run build # will optimize all files for production
# you may need to install/ rebuild node-sass,
# if problems refer to "engines": { < in package.json or remove it and try again.
```

##### Requirements

```
$/ npm install webpack -g
$/ npm install -g vue-cli # not too sure if required
```

- install `eslint` for VSC

#### Webpack

- There are 4 files common, development, production, and config.

```
externals: {
// this is injected into the application dynamicly, and api/base can be changed per build environment.
// global app config object
	config: JSON.stringify({
			apiUrl: API_BASE(),
			server: SERVER(),
			NODE_ENV: process.env.NODE_ENV
	})
},
```

#### RESt/API

- you can switch base api, to use either `LOCAL or REAL` in development environment.

##### mock-fake-backend

- to enable go to `webpack\config.js` > set `useServerInDev = "LOCAL"`, then run `npm start`.

##### LIVE-API

- to enable go to `webpack\config.js` > set `useServerInDev = "REAL"`, then run `npm start`.

#### Hierarchy

- Application structure
  **vue module components:** `/pages`
  **services:** `/libs/_services/**`
  **vue store module:** `/libs/_store/`
  **mock data:** `/libs/mock-data` < _initial data for api/fake-backend.js_
  **fake-backend api:** `/libs/fake-backend.js`
  **/\/index.js:** `every libs service/module has index.js for export`
  **main ./index.js:** `root of application where all modules and plugins are imported in to.`
  **./libs/router.js:** `all components are imported to this file`
  **./libs/styles** `all style/css plugins are maintained here and exported via index.scss, except for some of independant styles of components.`

#### TESTS

- Tested on lates Chrome and Firefox

#### Bugs

#### Thank you
