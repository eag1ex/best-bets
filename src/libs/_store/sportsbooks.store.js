/**
 * {invoiceStoreModule}
 * This is the Vuex.Store module which imports our invoice/api serice so we can later.
 * 
 * // mutations
 * these are our commit/s you may call them notifications, uppon each action we can then
 * access this.$store.subscribe(...)
 * 
 * The module is declared in `/_store/index.js` for export
 */

import { SportsBooksService } from '../_services';
const sportsbooks = JSON.parse(localStorage.getItem('sportsbooks'));
const state = sportsbooks ? { status: { loggedIn: true }, sportsbooks } : { status: {}, sportsbooks: null };

const actions = {
	getAll({ dispatch, commit }) {
		commit('getAllRequest');
		SportsBooksService.getAll().then(
			(sportsbooks) => commit('getAllSuccess', sportsbooks),
			(error) => {
				commit('getAllFailure', error);
				//		dispatch('alert/error', error, { root: true });
			}
		);
	}
};

const mutations = {
	getAllRequest(state) {
		state.all = { loading: true };
	},
	getAllSuccess(state, sportsbooks) {
		state.all = { sportsbooks };
	},

	getAllFailure(state, error) {
		state.all = { error };
	},

};

export const sportsBooksAction = {
	namespaced: true,
	state,
	actions,
	mutations
};
