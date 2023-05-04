export default {
	state: () => ({
		name: 'Maxime54',

	}),
	getters: {},
	mutations: {
		SET_NAME(state: any, payload: string) {
			state.name = payload;
		}
	},
	actions: {
		saveName({ commit }: any, data: any ) {
			commit('SET_NAME', data);
		}
	},
}