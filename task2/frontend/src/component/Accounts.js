import React, { useEffect, useState } from "react";
import Toggle from "./Toogle"
import Pagination from "./Pagination";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Accounts = ( ) => {
  
  var arr=[]
  var a=[]
  let length_array;

  const [managerId, setManagerId] = useState("");

  // which field are you sorting:-
  const [sortBasis, setSortBasis]= useState("");

  // the order (asc, desc):-
  const [order, setOrder] = useState("");
 
  // All manager ids:-
  const [managerIdS, setManagerIdS] = useState([]);

  // All data of customers:-
  const [customersData, setCustomersData] = useState([])

  //for arrows(order):-
  const [tick, setTick] = useState(0);
  
// For toggles:-

  const [first, setFirst] = useState(true)
  const [last, setLast] = useState(true)
  const [birth, setBirth] = useState(true)
  const [pic , setPic] = useState(true)
  const [gender, setGender] = useState(true)
  const [buisness,setBuisness] = useState(true)
  const [churn, setChurn] = useState(true)
  const [open, setOpen] = useState(true)
  const [revenue, setRevenue] = useState(true)
  const [cost, setCost] = useState(true)
  const [bonus, setBonus] = useState(true)
  const[meeting, setMeeting] = useState(true)
  const [custon, setCuston] = useState(true)


// Pagination
 const [currentPage, setCurrentPage] = useState(1)
 const [rowsPerPage] = useState(4)
 const paginate = pageNumber => setCurrentPage(pageNumber);

 //manager id fetch function:-
  const fetchManagerid = async () => {
    await fetch("http://localhost:3000/all_managerId")
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        setManagerIdS(data.AllmanagerId);
      });
  };


  // Customer data fetch function
  const fetchCustomers = async ()=>{

    const res = await fetch("http://localhost:3000/",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
      
             managerId,
             sortBasis,
             order
            
          })  
      })
      const result =await res.json(); 
      setCustomersData(result.customer)
  }


  const indexOfLastrow = currentPage*rowsPerPage;

  const indexOfFirstrow= indexOfLastrow-rowsPerPage;

  const currentRows = customersData.slice(indexOfFirstrow,indexOfLastrow)


  const myfunction =()=>{
    currentRows.map((item,j)=>{
      for(let i=0; i<=12; i++){
        if(i==0 &&custon==true){
          a.push(item.customerId)
          
        }
        if(i==1 &&first==true){
          a.push(item.firstName)
        }
        if(i==2 &&last==true){
          a.push(item.lastName)
        }
        if(i==3 &&pic==true){
          a.push(item.picture)
        }
        if(i==4 &&birth==true){
          a.push(item.birthDate)
        }
        if(i==5 &&gender==true){
          a.push(item.gender)
        }
        if(i==6 &&buisness==true){
          a.push(item.businessUnit)
        }
        if(i==7 &&churn==true){
          a.push(item.churnRisk)
        }
        if(i==8 &&open==true){
          a.push(item.openSales)
        }
        if(i==9 &&revenue==true){
          a.push(item.revenueYTD)
        }
        if(i==10 &&cost==true){
          a.push(item.costYTD)
        }
        if(i==11 &&bonus==true){
          a.push(item.bonusEligible)
        }
        if(i==12 &&meeting==true){
          a.push(item.meetingsYTD)
        }
      }
      if(j==0){
        length_array=a.length
       
      }
      
     
    })
 
  }



  const downloadPdf = () => {


   myfunction()
    for(let i=0; i<=12; i++){
      if(i==0 &&custon==true){
        arr.push('Customer Id')
        
      }
      if(i==1 &&first==true){
        arr.push('First Name')
      }
      if(i==2 &&last==true){
        arr.push('Last Name')
      }
      if(i==3 &&pic==true){
        arr.push('Picture')
      }
      if(i==4 &&birth==true){
        arr.push('Birth Date')
      }
      if(i==5 &&gender==true){
        arr.push('Gender')
      }
      if(i==6 &&buisness==true){
        arr.push('Buisness Unit')
      }
      if(i==7 &&churn==true){
        arr.push('Churn Risk')
      }
      if(i==8 &&open==true){
        arr.push('Open Sales')
      }
      if(i==9 &&revenue==true){
        arr.push('Revenue YTD')
      }
      if(i==10 &&cost==true){
        arr.push('Cost YTD')
      }
      if(i==11 &&bonus==true){
        arr.push('Bonus Eligible')
      }
      if(i==12 &&meeting==true){
        arr.push('Meetings YTD')
      }

    }
    const doc = new jsPDF({
      orientation: "landscape",
      
    })
    
    doc.setFontSize(20);
    doc.setFont('times', 'normal',400)
    doc.text(`Customer Data For Manager Id (${managerId})`, 90, 20)
    doc.autoTable({
      theme: "grid",
      head:[arr],
      body: [a.slice(0,length_array), a.slice(length_array, 2*length_array +1), a.slice(2*length_array , 3*length_array+2),a.slice(3*length_array, 4*length_array+3)]
        
       
      ,
      margin: { top: 30 }
    })
    doc.save('table.pdf')
    arr=[]
  }



  useEffect(() => {
    fetchManagerid();
    fetchCustomers();

   

  }, [managerId,order,sortBasis]);
  return (
    <div>
      <select
        name="managerId"
        className="mangid-dropdown"
        value={managerId}
        onChange={(e) => {
          setManagerId(e.target.value);
        }}
      >
        <option value="">Manager ID</option>
        {managerIdS.map((m, i) => {
          return <option key={i}>{m.managerId}</option>;
        })}
      </select>

      <div  className="download-pdf" onClick={downloadPdf}>Download Pdf</div>

      <br/>
      <br/>
      <div className="toggles" >
        
        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setCuston}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Customer Id</h3>
        </div>
        <div style={{display: "flex",alignItems:'center'}}>
          <span  >

        <Toggle setOn={setFirst}/>
          </span>
       
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>First Name</h3>
        </div>
      
        <div style={{display: "flex",alignItems:'center'}}>
          <span>
          <Toggle setOn={setLast}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Last Name</h3>
        </div>


        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setPic}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Picture</h3>
        </div>

        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setBirth}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Birth Date</h3>
        </div>

        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setGender}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Gender</h3>
        </div>

        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setBuisness}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Buisness Unit</h3>
        </div>

        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setChurn}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Churn Risk</h3>
        </div>

        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setOpen}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Open Sales</h3>
        </div>
        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setRevenue}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Revenue YTD</h3>
        </div>

        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setCost}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Cost YTD</h3>
        </div>
        <div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setBonus}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Bonus Eligible</h3>
        </div><div style={{display: "flex",alignItems:'center'}}>
          <span >
          <Toggle setOn={setMeeting}/>
          </span>
        
        
        <h3 style={{margin:0,marginLeft:'0.5rem'}}>Meetings YTD</h3>
        </div>

      </div>
      <br />
      <br />

      <table>
        <tr>
          {( custon==true)&&  <th>Customer ID 
            <div style={{marginTop:'10px'}}>
              {(order!=="desc" || tick!==1 ) && <span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("customerId");
                setOrder("desc")
                setTick(1)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              { (order!=="asc" || tick!==2) &&
                <span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("customerId");
                setOrder("asc")
                setTick(2)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
              </div> </th>
}
         {  ( first===true) && <th>First name

          <div style={{marginTop:'10px'}}>
              { (order!=="desc" || tick!==3) && <span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("firstName");
                setOrder("desc")
                setTick(3)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              { (order!=="asc" || tick!==4) &&
                <span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("firstName");
                setOrder("asc")
                setTick(4)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
             
              </div>
          </th>
}
          
          { ( last==true ) &&
            <th>Last Name

          <div style={{marginTop:'10px'}}>
              {(order!=="desc" || tick!==5) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("lastName");
                setOrder("desc")
                setTick(5)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==6) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("lastName");
                setOrder("asc")
                setTick(6)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
             
              </div>

          </th>
}
{   ( pic==true) &&
          <th>Picture

          </th>
}
         { ( birth==true ) &&
          <th>Birth Date

          <div style={{marginTop:'10px'}}>
              { (order!=="desc" || tick!==7) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("birthDate");
                setOrder("desc")
                setTick(7)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==8) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("birthDate");
                setOrder("asc")
                setTick(8)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
              </div>
          </th>
}
          {  ( gender==true) &&
            <th>Gender</th>
          }

          { ( buisness==true) &&
          <th>Buisness Unit

          <div style={{marginTop:'10px'}}>
              {(order!=="desc" || tick!==9) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("businessUnit");
                setOrder("desc")
                setTick(9)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==10) &&
                <span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("businessUnit");
                setOrder("asc")
                setTick(10)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
              </div>

          </th>
}

{ ( churn==true ) &&
          <th>Churn Risk

          <div style={{marginTop:'10px'}}>
              { (order!=="desc" || tick!==11) && <span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("churnRisk");
                setOrder("desc")
                setTick(11)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==12) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("churnRisk");
                setOrder("asc")
                setTick(12)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
              </div>
          </th>
}

{ ( open==true ) &&
          <th>Open Sales
          <div style={{marginTop:'10px'}}>
              {
                (order!=="asc" || tick!==13) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("openSales");
                setOrder("desc")
                setTick(13)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==14) &&
                <span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("openSales");
                setOrder("asc")
                setTick(14)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
              </div>
          </th>
}

{ ( revenue==true ) &&
          <th>Revenue YTD

          <div style={{marginTop:'10px'}}>
              {(order!=="asc" || tick!==15) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("revenueYTD");
                setOrder("desc")
                setTick(15)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              { (order!=="asc" || tick!==16) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("revenueYTD");
                setOrder("asc")
                setTick(16)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
              </div>

          </th>
}

{ ( cost==true) &&
          <th>Cost YTD

          <div style={{marginTop:'10px'}}>
              {(order!=="desc" || tick!==17) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("firstName");
                setOrder("desc")
                setTick(17)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==18) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("firstName");
                setOrder("asc")
                setTick(18)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
             
              </div>
          </th>
}

{( bonus==true) &&
          <th>Bonus Eligible

          <div style={{marginTop:'10px'}}>
              {(order!=="desc" || tick!==19) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("bonusEligible");
                setOrder("desc")
                setTick(19)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==20) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("bonusEligible");
                setOrder("asc")
                setTick(20)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
             
              </div>
          </th>
}

{( meeting==true ) &&
          <th>Meetings YTD

          <div style={{marginTop:'10px'}}>
              {(order!=="desc" || tick!==21) &&<span style={{margin:'0 10px', cursor:'pointer'}} onClick={()=>{
                setSortBasis("meetingsYTD");
                setOrder("desc")
                setTick(21)
              }}>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              </span>}
              {(order!=="asc" || tick!==22) &&<span style={{cursor:'pointer'}} onClick={()=>{
                setSortBasis("meetingsYTD");
                setOrder("asc")
                setTick(22)
              }}>
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </span>
}
             
              </div>
          </th>
}

        </tr>

        {currentRows &&
        currentRows.map((customer,i)=>{
        
          return (
            <tr>
            {( custon==true)&&
            <td>{customer.customerId}</td>
        }
            { ( first==true ) &&
              <td>{customer.firstName}</td>
            }
            
            {( last==true ) &&
              <td>{customer.lastName}</td>
            }
            
            { ( pic==true ) &&
              <td>{customer.picture}</td>
            }
            
            { ( birth==true ) &&
              <td>{customer.birthDate}</td>
          }
            
            {  ( gender==true ) &&
              <td>{customer.gender}</td>
            } 

            {   ( buisness==true ) &&
            <td>{customer.businessUnit}</td>
        }

        {  ( churn==true ) &&
            <td>{customer.churnRisk}</td>
        }

        {  ( open==true ) &&
            <td>{customer.openSales}</td>
        }

        {   ( revenue==true ) &&
            <td>{customer.revenueYTD}</td>
        }

{ ( cost==true) &&
            <td>{customer.costYTD}</td>
      }

      { ( bonus==true) &&
            <td>{customer.bonusEligible}</td>
      }

      { ( meeting==true) &&
            <td>{customer.meetingsYTD}</td>
      }
            </tr>
          )
        })
}
      </table>
     <Pagination rowsPerPage={rowsPerPage} totalRows={customersData.length} paginate={paginate} currentPage={currentPage} managerId={managerId}/>
    </div>
  );
};

export default Accounts;
