/**
 * here we bootstrap the application and import everything, including scss
 */
import config from 'config';
import Vue from 'vue';
/// extentions


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'


import './libs/styles/index.scss';
import { store } from './libs/_store';
import { router } from './libs';
import App from './App';
import { configureFakeBackend } from './libs';

// partials
import Spinner from './libs/partials/progress-spinner';
import TopNav from './libs/partials/top-nav';
import TopTitle from './libs/partials/top-title';
import Footer from './libs/partials/footer';
import Toggle from './libs/partials/vue-toggle';
import SportsBooksTable from './pages/sportsbooks/sportsbook-table/sportsbook-table'

Vue.component('sportsbook-table', SportsBooksTable);
Vue.component('vue-toggle', Toggle);
Vue.component('spinner', Spinner);
Vue.component('top-nav', TopNav);
Vue.component('top-title', TopTitle);
Vue.component('footer-small', Footer);
// end

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
// setup fake backend
// configuration in webpack.comm.js
console.log('-- config');
console.log('-- ', JSON.stringify(config, false, 1));
console.log('-- END');
if (config.server === 'LOCAL_SERVER') configureFakeBackend();

const _v = new Vue({
	el: '#app',
	router,
	store,
	render: (h) => h(App),
	renderError(h, err) {
		return h('pre', { style: { color: 'red' } }, err.stack);
	}
});
