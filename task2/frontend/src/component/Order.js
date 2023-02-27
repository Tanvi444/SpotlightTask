import React, { useState } from 'react'

const Order = () => {

    
    const[date, setDate] = useState("")
    const[orders, setOrders] = useState([])

    const handle = (e)=>{
      setDate( e.target.value);
      
    }
    const fetchdata=async()=>{
    const res = await fetch("http://localhost:3000/order",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
      
             date
            
          })
         
      })

      const result =await res.json();
      
      setOrders(result.order)
       
    }

  return (
    <div>
      

    <form method='post'>
  <label for="orderdate" style={{fontSize:'20px'}}>Order date </label>
  <br/>
  <div className='search-date'>
  <input type="date" id="orderdate" name="orderdate" value={date} onChange={handle}/>
  <div  onClick={fetchdata}>
        <div>search</div>
        </div>
        </div>
</form>
{/* {console.log(orders.length)} */}
{ orders.length>0 ? <div style={{fontSize:'20px'}}>Orders are :-
</div> :''
}
{ orders.length==0 ? <div style={{fontSize:'15px',fontWeight:'bold'}}>No orders are here for this date </div> :"" }
<div className='orders'>
    <br/>
                {(orders.map(a=>{
                   return(
                   <>
                   <div  key={a._id}>order id is {a.orderID}</div>
                   <div>amount is {a.amount}</div>
                   <div> date is {a.date}</div>
                   <br/>
                   </>
                   )
                }))}
               
                </div>
         
             
         
      
    

    </div>
  )
}

export default Order
