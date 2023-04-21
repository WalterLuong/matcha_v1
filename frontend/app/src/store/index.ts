
import Vuex, { StoreOptions } from 'vuex';

export interface RootState {
    version: string;
}

const store: StoreOptions<RootState> = {
	state: {
		nb_click: 0 as number,
	},
	getters: {
	},
	mutations: {
		incrementClick(state: any){
			state.nb_click++;
		},
	},
	actions: {
	},
	modules: {
	}
};

export default new Vuex.Store<RootState>(store);