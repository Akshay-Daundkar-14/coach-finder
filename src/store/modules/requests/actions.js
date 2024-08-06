

export default{
    addRequest(context,data){
        const payload = {
            id:new Date().toISOString(),
            coachId:data.coachId,
            userEmail:data.email,
            message : data.message
        }
        context.commit("addRequest",payload);
    }
}