import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
            wss: null,
            clientId: null,
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setWebsocket(state, wss) {
            state.wss = wss
        },
        setClientId(state, clientId) {
            state.clientId = clientId
        },
    }
});

export default store;
