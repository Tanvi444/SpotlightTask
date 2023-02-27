import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import DropDown from "../components/DropDown/DropDown";
import "../components/CSS/style.css"


const Manager = () => {
  const [open, setOpen] = useState(false);
  // selecting the current id to show as label
  const [currentId, setCurrentId] = useState({ label: "Select  Manager" });

  const [data, setData] = useState([])

  const ManagerIds = [
    {
      label: "Emily",
      value: "Emily",
    },
    {
      label: "Samantha",
      value: "Samantha",
    },
    {
      label: "Jonathan",
      value: "Jonathan",
    },
    {
      label: "Quinn",
      value: "Quinn",
    },
    {
      label: "Madeline",
      value: "Madeline",
    },
    {
      label: "Nova",
      value: "Nova",
    },
    {
      label: "Liam",
      value: "Liam",
    },
    {
      label: "Julia",
      value: "Julia",
    },
    {
      label: "Kayden",
      value: "Kayden",
    },
    {
      label: "Silas",
      value: "Silas",
    },
  ];

  var result;

  const fetchOneManager = async(name) => {
   
    const response = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
                query Query($name: String) {
                    getManagerByName(Name: $name) {
                      customerData {
                        customerId
                        costYTD
                        revenueYTD
                        firstName
                        churnRisk
                        openSales
                      }
                      managerId
                      firstName
                    }
                  }   
              `,
        variables: {
          name: name,
        },
      }),
    }).then(async(data) => {
      // Console log our return data
      result = await data.json();
     setData(result.data.getManagerByName)
      result.data.getManagerByName.customerData.map((data, ind)=>{
        console.log(data)

      })
    });
  };

  const managerIdSelectHandler = (data, name) => {
    
    setCurrentId(data);
    setOpen(false);
    fetchOneManager(name);
  };

  return (
    <div style={{marginTop:"50px"}}>
      <div style={{display:'flex',justifyContent:'center'}}>
      <DropDown dropDownLabel={currentId.label} closeOnSelect={true}>
        {ManagerIds.map((data) => (
          <div
            onClick={() =>
                
                managerIdSelectHandler(data, data.value)
                }
            key={data.value}
          >
            {data.label}
          </div>
        ))}
       
      </DropDown>
      </div>
      <div>
        {data.customerData?
        (<table className="table">
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
            
            { data.customerData?
            
                
                
                    data.customerData.map((d,i)=>{

                       return(<>
                        
                       
                       {
                        d.churnRisk>1 && d.openSales>5 ? 
                      <tr>
                       <td>{data.managerId}</td>
                <td>{data.firstName}</td>
                          <td>{d.customerId}</td>
                        <td>{d.firstName}</td>
                        <td>{d.costYTD}</td>
                        <td>{d.revenueYTD}</td>

                        
                        </tr>
                      :''}
                      </>
                       
                      )
                      
                       
                    })
              
             :''}
          </tbody>
        </table>):
        <h2 style={{display:'flex', justifyContent:'center', marginTop:'40px'}}>Select Manager to access table</h2>
}
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
