export default {
    requests(state){   // (state,getters,rootState,rootGetters)
        // const coachId = rootGetters.userId;
        // return state.requests.filter(req=>req.coachId ===coachId);

        return state.requests;
    },
    hasRequests(_,getters){
        return getters.requests && getters.requests.length > 0;
    }
}