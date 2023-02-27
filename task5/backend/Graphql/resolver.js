const Manager = require("../model/accountModel")
const resolvers ={
    Query:{
        getAllCustomer: async ()=>{
            const Managers = await Manager.find()
            return Managers
       },

       getManagerById: async (_p,args,_c,_i)=>{
            const {managerId} = args
            const manager=  await Manager.findOne(
                { managerId: managerId },
                { customerData: 1, dashboardData: 1 }
              );
            
              return manager;
       },

       getManagerByName: async(_p,args,_c,_i)=>{
        const {Name} = args
        const manager = await Manager.findOne({firstName:Name});
        return manager;
       }
    }
}

module.exports = resolvers