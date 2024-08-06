export default {
  async addRequest(context, data) {
    const payload = {
      userEmail: data.email,
      message: data.message,
    };

    const response = await fetch(
      `https://vue-coach-finder-cb75a-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();

    if(!response.ok)
    {
        throw new Error(responseData.message || 'Failed to send request');        
    }

    payload.id = responseData.name;
    payload.coachId =data.coachId;

    context.commit('addRequest', payload);
  },

 async fetchRequests(context){

    const userId = context.rootGetters.userId;

    const response = await fetch(
        `https://vue-coach-finder-cb75a-default-rtdb.firebaseio.com/requests/${userId}.json`,
        {
          method: 'GET'
        }
      );
  
      const responseData = await response.json();
  
      if(!response.ok)
      {
          throw new Error(responseData.message || 'Failed to send request');        
      }

     const requests = [];

     for(const key in responseData){
        const request = {
            id:key,
            coachId:userId,
            userEmail:responseData[key].userEmail,
            message: responseData[key].message
        }

        requests.push(request);
     }
  
  
      context.commit('loadRequests', requests);
  }
};
