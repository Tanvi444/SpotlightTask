import React , {useState} from 'react'
import '../App.css'

const Customer = () => {

    const [customers, setCustomers]= useState([])
    const[inp, setInp] = useState("");
    let name, value;
    let d;
    const handleInput = async(e)=>{
        
        name=e.target.name;
        value=e.target.value;
        setInp(value);
       
        
        await  fetch(`http://localhost:3000/get?firstName=${value}`).then((res)=>{
            return res.json();
      }).then(async(data)=>{
        d= data.customer
        
    })
    
    if(value!==""){

        setCustomers( d)
    }else{
        setCustomers( [])
    }
    
   
    }


    const cut = ()=>{
        setInp("")
        setCustomers([])
    }
  return (
    <div  className='search-customer'>
        <div className='search-box'>
            <div >
        <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      <input type="text" name="firstName" value={inp} onChange={handleInput} />
      {inp!==""&&<div onClick={cut}><i class="fa fa-times" aria-hidden="true"></i></div> }

      </div>
       
      
       { customers?
        (customers.map((k,i)=>{
            return(
                <>
           <div className='order' key={k._id}> {i+1}.    Orders of {k.firstName} {k.lastName}
           </div>
           <br/>
            <div className='orders'>
                {(k.orders.map(a=>{
                   return(
                   <>
                   <div  key={a._id}>order id is {a.orderID}</div>
                   <div>amount is {a.amount}</div>
                   <div> date is {a.date}</div>
                   <br/>
                   </>
                   )
                }))}</div>
          </> )
             
           })):''
       }
      
    </div>
  )
}

export default Customer
