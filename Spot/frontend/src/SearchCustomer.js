import React, { useState, useEffect } from 'react'
import './App.css'
import './customer.css'

const SearchCustomer = () => {
    let ran = "";
    let flag = 1;
    const [field, setField] = useState("");
    const [cust, setCust] = useState([]);
    const fetchData = async () => {
        await fetch(`http://localhost:3000/getall`)
        .then(async(res) => {return await res.json()})
        .then(async(data )=> {
            setCust(data.all); 
            console.log(data.all)          
        })    
    }
    const handleChange = async (e) => {
        flag = 0;
        ran = e.target.value;
        setField(ran);
        await fetch(`http://localhost:3000/search`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ran
                })
            }
        ).then(async (res) => { return await res.json() })
            .then(async (data) => {
                setCust(data.user);
            })
    }
    // useEffect(() => {
    //     fetchData();
    //   },[])
    return (
        <div className='main'>
            <div className='searchbar'>
                <input type="text" name="firstName" value={field} onChange={handleChange} />
            </div>
            <div className='content'>
                <div>
            {cust ?
                (cust.map((a, j) => {
                return( <>
                            <>

                                <div className='order' key={a._id}> {j + 1}.    Orders of {a.firstName} {a.lastName}
                                </div>
                                <br />
                                <div className='orders'>
                                    {(a.orders.map(b => {
                                        return (
                                            <div className='self'>
                                                <div key={b._id}>Order id : {b.orderID}</div>
                                                <div>Amount : {b.amount}</div>
                                                <div> Date : {b.date}</div>
                                            </div>
                                        )
                                    }))}</div>
                            </>
                    </>
                )
                })) : <h1>Search above to get data</h1>
            }
            </div>
            </div>
        </div>
    )
}

export default SearchCustomer;