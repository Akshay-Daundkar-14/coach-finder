export default {
    requests(state,_,_2,rootGetters){   // (state,getters,rootState,rootGetters)
        const coachId = rootGetters.userId;
        return state.requests.filter(req=>req.coachId ===coachId);
    },
    hasRequests(_,getters){
        return getters.requests && getters.requests.length > 0;
    }
}