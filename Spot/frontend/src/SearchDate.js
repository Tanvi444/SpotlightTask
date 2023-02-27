import React, { useState } from 'react'
import './customer.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const SearchDate = () => {
    const [value, setValue] = useState(new Date());
    const [content, setContent] = useState([]);
    let fdate = value._d;
    const fetchdata = async () => {
        const result = await fetch("http://localhost:3000/orderbydate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fdate
            })
        }).then(async (result) => {
            return await result.json();
        })
            .then(async (data) => {
                setContent(data.ordershown);
            })
    }
    return (
        <div>
            <div className='date'>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            label="For mobile"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
            <div>
                <p className='btn' onClick={fetchdata}>Search</p>
                </div>
            <div className='content'>
            <div className='orders'>
                {console.log(content)}
            {content?  (content.map(b => {
                return (
                    <>
                        <div className='self'>
                            <div key={b._id}>Order id : {b.orderID}</div>
                            <div>Amount : {b.amount}</div>
                            <div> Date : {b.date}</div>
                        </div>
                    </>
                )
            })) :<h1>Search above to get data</h1>
            }
          
            </div>
            </div>
        </div>
    );
}
export default SearchDate;