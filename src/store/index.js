import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
            wss: null,
            clientId: null,
            isJumpTv: null,
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
        setJumpTv(state, isJumpTv) {
            state.isJumpTv = isJumpTv
        },
    }
});

export default store;
