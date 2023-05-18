import Module from "vuex";
import { RootState } from "..";

export interface UserState {
	id: number,
	name: string,
}

export const UserModule: Module<UserState, RootState> = {
	state: () => ({
		name: 'Maxime53',
	}),
	getters: {
		
	},
	mutations: {
		SET_NAME(state: any, payload: string) {
			state.name = payload;
		}
	},
	actions: {
		saveName({ commit }: any, data: any ) {
			commit( UserModule.mutations.SET_NAME , data);
		}
	},
}

export default UserModule;