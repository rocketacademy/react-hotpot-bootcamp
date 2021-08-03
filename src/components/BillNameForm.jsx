import React, { useState } from 'react';
import axios from 'axios';

export default function BillNameForm({ setBillId }) {
  // We can store the billName at this form level, because all we need is the bill id
  const [billName, setBillName] = useState('');

  // Takes current bill name from the form
  const handleBillName = (e) => {
    setBillName(e.target.value);
  };

  // Sending the bill name to the database
  const createBillName = () => {
    axios.post('/create-bill', { billName }).then((result) => {
      const { billId } = result.data;
      // Sets the bill Id for the rest of the App() to be used
      setBillId(billId);
    });
  };

  return (
    <div>
      <h1>Create Bill</h1>
      <input type="text" value={billName} onChange={handleBillName} placeholder="Bill Name" />
      <button type="button" onClick={createBillName}>Submit</button>
    </div>
  );
}

/*
App() -> parent
States that need to be stored in parent
- bill, person, item

-- BillNameForm() -> Bill name (data that needs to be passed into ItemForm)

-- Form()
    -- ItemForm() -> Item name, item price
    -- PersonForm() -> person name

-- Bill()
    -- ItemList() -> Item + person dropdown
    -- PersonList() -> Person name + amount they

-- <button> Save bill

Data to send to database
- bill name + bill total
- person name + amount owe

*/
