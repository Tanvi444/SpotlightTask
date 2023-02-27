const { default: Accounts } = require("../../frontend/src/component/Accounts.js");
const Account = require("../model/account_model.js");
const Features = require("../utils/feature.js");

exports.accountAdd = async (req,res,next)=>{
    const account = await Account.create( req.body);

    res.status(201).json({
        success:true,
        account
    })
}

exports.accountGet = async(req, res,next)=>{
    
    const account = await Account.find({managerId:req.query.managerId});

    res.status(201).json({
        success:true,
        account
    })
}



function compareValues(key, order ) {
    return function innerSort(a, b) {
      
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


exports.sortData = async(req,res,next)=>{
    const sortBasis= req.body.sortBasis;
    const order = req.body.order;
    const manId = req.body.managerId;


    let account =await Account.find({managerId:manId},{customers:1, _id:0})
    
    

let customer=[]

       account.map((aa)=>{
            
            aa.customers.map((a)=>{
              
               customer.push({
               customerId: a.customerId,
               firstName: a.firstName,
               lastName: a.lastName,
               picture : a.picture,
               birthDate: a.birthDate.toString().slice(4,15),
               gender: a.gender,
               businessUnit: a.businessUnit,
               churnRisk: a.churnRisk,
               openSales: a.openSales,
               revenueYTD: a.revenueYTD,
               costYTD: a.costYTD,
               bonusEligible: a.bonusEligible,
               meetingsYTD: a.meetingsYTD
            })
               
            })
       })
       
      customer.sort(compareValues(sortBasis, order))

    res.status(201).json({
        success:true,
        customer
    })

}

exports.AllmanagerId = async(req,res,next)=>{
     
  const AllmanagerId = await Account.find({}, {managerId:1, _id:0});


  res.status(201).json({
    success:true,
    AllmanagerId
})
  
}

