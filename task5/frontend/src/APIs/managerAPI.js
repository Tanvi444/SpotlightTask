import axios from "axios";
import {
  Action_SetData,
  Action_SetManager,
  Action_SetPage,
  Action_SetRecords,
  Action_SetTotalPages,
} from "../context/TablePageContext/TableActions";

// This File might seem like it shouldn't exist when we can make the api calls right from the component themselves
// 😅 I know, but for making an API request and handling it properly, the code may become longer than we expect and the UI components might end up doing more than they need to
// Also In future we might be making different API requests to this manager endpoint, so all types of requests can be fetched from here,

// const BASE_URL = "http://localhost:3001/api/manager";

const BASE_URL = "http://localhost:3001/graphql"

export const getCustomers = async (managerId, dispatch) => {
  const records = 4;
  var result;
  try {
    const response = await fetch(`${BASE_URL}`,{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          query:`
        query Query($managerId: Int) {
          getManagerById(managerId: $managerId) {
            customerData {
              birthDate
              bonusEligible
              businessUnit
              churnRisk
              costYTD
              customerId
              firstName
              gender
              lastName
              meetingsYTD
              openSales
              picture
              revenueYTD
            }
          }
        }        
        `,
        variables:{
          managerId:managerId
        },
      })
    }).then(async (data) => {
      // Console log our return data
       result =await data.json()
      console.log(result)
  });
    
    // I'm dispatching a function here and passing the Action_SetData as the argument which itself takes one argument that is the customer data
    // The Action_SetData function will return an anonymous function to the reducer of tableContext which when called will simply return the new State for the whole page
    dispatch(Action_SetData(result.data.getManagerById));
    dispatch(
      Action_SetTotalPages(
        Math.ceil(result.data.getManagerById.customerData.length / records)
      )
    );
    dispatch(Action_SetRecords(records));
    dispatch(Action_SetManager(managerId));
  } catch (error) {
    console.log("error in API fetching : " + error.message);
  }
};
