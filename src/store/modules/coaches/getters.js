export default{
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        if(state.coaches && state.coaches.length > 0)
        {
            return true;
        }else{
            return false;
        }
    },
    isCoach(_,getters,_2,rootGetters){
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coach=>coach.id===userId);

    }
}