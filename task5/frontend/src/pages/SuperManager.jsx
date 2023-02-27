import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../components/CSS/style.css"



const Manager = () => {

  // selecting the current id to show as label

  const [data, setData] = useState([])

  var result;

  const fetchOneManager = async() => {
   
    const response = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query Query {
            getAllCustomer {
              managerId
              firstName
              customerData {
                costYTD
                customerId
                firstName
                revenueYTD
                churnRisk
                openSales
              }
            }
          }          
              `,
        
      }),
    }).then(async(data) => {
      // Console log our return data
      result = await data.json();
     setData(result.data.getAllCustomer)

    });
  };

  useEffect(()=>{
    
    fetchOneManager()
  },[])
  return (
    <div>
      
      <div style={{marginTop:"50px"}}>
        <table className="table">
          <thead>
            <tr>
              <th>Manager ID</th>
              <th>First Name (Manager) </th>
              <th>Customer ID</th>
              <th>First Name (Customer)</th>
              <th>CostYID</th>
              <th>RevenueYID</th>
            </tr>
          </thead>

          <tbody>
            {console.log(data)}
            { data?
                 data.map((t,i)=>{

                 
                  return(
                      t.customerData.map((d,i)=>{

                       return(<>
                        {
                         d.churnRisk>1 && d.openSales>5 ?

                       <tr>
                       <td>{t.managerId}</td>
                <td>{t.firstName}</td>
                          <td>{d.customerId}</td>
                        <td>{d.firstName}</td>
                        <td>{d.costYTD}</td>
                        <td>{d.revenueYTD}</td>
                        </tr>
                      :''}
                       </>
                       )
                      
                    })
                  )
              
                }):''}
                
                
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BackButton = styled.div`
  background-color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 10px;
`;

export default Manager;
