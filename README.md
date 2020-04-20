## BESTBETS Application

#### - [ Developed by Eaglex ](http://eaglex.net)

#### Overview
The application displays list of recommended casino websites, by listing score.
It is build with Vue/Vuex 2, data flow is handled by Vuex Store, it is staged through fake bakend server to simulate REST/GET. 
* Website is production ready
* Live REST/GET option ready 
* Integrated with Vuex smart table
* Code is eslinted
* Mobile responsive
* Custom Google search query for `reviews`
* Custom text display on mobile layout, using RegExp

##### Deadline
* Project build in 4 days.

#### Stack
- ES6, MVC, Vue/Vuex 2, Bootstrap Vue, Bootstrap, Webpack, Mock-backend, SCSS, eslint

#### BESTBET Live Demo
- Live demo is hosted on heroku node.js, you may have to loggin again:

```
access:
https://mysterious-brushlands-37485.herokuapp.com/login
login: eaglex
password: eaglex
## _Server has a timeout limit_
```

#### Start/install application
```
$/ npm install
$/ npm start # will run dev server and open browser
$/ npm run build # will optimize all files for production
# you may need to install/ rebuild node-sass,
# if problems refer "engines": { < in package.json, remove it and try again.
```

##### Requirements
```
$/ npm install webpack -g
$/ npm install -g vue-cli # not too sure if required
```

- (optional) install `eslint` for VSC Recommended

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

#### REST/API
- there is option for `REAL` api switch in webpack configuration, when it becomes available
- to enable go to `webpack\config.js` > set `useServerInDev = "REAL"`, then run `npm start`.

##### mock-fake-backend
- to enable go to `webpack\config.js` > set `useServerInDev = "LOCAL"`, then run `npm start`.

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

#### TODO 
- add load more on action click
- add better support for CSS3 on cross browser, add `Compass`

#### Bugs
- let me know.

#### Thank you
