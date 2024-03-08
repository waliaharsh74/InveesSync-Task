import { useEffect, useState } from 'react'
import {convertToWords} from './miscellaneous/numberToWords'
import './Home.css'

import QRScanner from './QRScanner';

const Home=()=>{

    const [capture,setCapture]=useState(false);
    const [loc,setLoc]=useState(' ');
    const [quantity,setQuantity]=useState(1);
    const [selectedOption, setSelectedOption] = useState('Snickers Chocolate Diwali Special');
    const [quantityInWords, setQuantityInWords] = useState('');
    const [unit, setUnit] = useState('pcs');
    const [options,setOptions]=useState([])
    const [toasterMessage, setToasterMessage] = useState('');
    const [showErrorToaster, setErrorShowToaster] = useState(false);
    const [showSuccssToaster, setSuccessToaster] = useState(false);

    
    const updateLoc = (newLoc) => {
        setLoc(newLoc);
        setCapture(false);
    };

    const handleQuantityChange = (event) => {
        if(event.target.value>=0 && event.target.value<10000){
            setQuantity(event.target.value)
            setQuantityInWords(convertToWords(event.target.value));
        }      
    }

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    
        const selectedOptionObject = options.find(option => option.item_name === selectedValue);
        if (selectedOptionObject) {
            setUnit(selectedOptionObject.unit);
        }
    };
    


    const handleSubmit = async (event) => {
        event.preventDefault();

      

        // Prepare the data to be sent
        const formData = {
            item_name: selectedOption,
            unit: unit,
            quantity: quantity,
            loc: loc
           
        };

          const selectedItem = options.find(option => option.item_name === selectedOption);
    if (!selectedItem) {
       
        console.error('Selected item not found');
        return;
    }

    if (!selectedItem.allowed_locations.includes(loc)) {
        // Location not allowed for the selected item
        // alert('Location not allowed for the selected item')
        setToasterMessage('Location not allowed for the selected item');
        setErrorShowToaster(true);
        setTimeout(() => {
                setErrorShowToaster(false);
            }, 3000);
        
        console.error('Location not allowed for the selected item');
        
        return;
    }

        try {
            const response = await fetch('https://api-staging.inveesync.in/test/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {


                throw new Error('Failed to submit data');
            }

            // Handle successful submission
            setSuccessToaster(true);
            setToasterMessage('Data submitted successfully');
        
        setTimeout(() => {
                setSuccessToaster(false);
            }, 3000);
            console.log('Data submitted successfully');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

   

    
    const fetchoptions=async()=>{
        try {
        const response = await fetch('https://api-staging.inveesync.in/test/get-items');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
    }
    useEffect(fetchoptions,[])


    

    return (
    <>
        <form action="submit" onSubmit={handleSubmit}>
            <div className='item-data'>
                    <label>Select Item: </label>
          <select className='select-item' value={selectedOption}  onChange={handleOptionChange} required >
            {options.map((item,key)=>{

                return <option  key={key} value={item.item_name}>{item.item_name}</option>
                
            }

            )}
      
         </select>

         <label>Unit: </label> 
         <input type="text" className='unit-val' value={unit}  readOnly  required />
            </div>


        <div className="quantity">

         <label>Quantity: </label> 
         <input type="number" value={quantity} onChange={handleQuantityChange} required />
         {quantityInWords}
        </div>
        
      
      


      
             
      <button type="submit"  className="submit-button"> Submit</button>
      

        </form>

      {showErrorToaster && (
    <div className="error-toaster" >
        {toasterMessage}
    </div>
)}
      {showSuccssToaster && (
    <div className="success-toaster" >
        {toasterMessage}
    </div>

)}
<div className='location'>

        <button  onClick={()=>{setCapture(true)}}>Destination Location</button>    
        <input type="text" value={loc}  readOnly required/>
        <div className='qr'>

        {capture &&<QRScanner  updateLoc={updateLoc} />}
        {capture &&<button onClick={()=>setCapture(false)}>Close Qr</button>}
        </div>

        </div>

      
        
    </>
  )
}
export default Home