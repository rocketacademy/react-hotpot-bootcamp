import React, { useState } from 'react';
import BillNameForm from './components/BillNameForm.jsx';
import Form from './components/Form.jsx';
import Bill from './components/Bill.jsx';

export default function App() {
  // The data the rest of the sibling components need is the bill id, not the bill name
  // We only show this form when the user hasn't created a bill
  const [billId, setBillId] = useState(null);
  // person, item is an array of objects
  // each person = { name: , amount: , items: [ 0, 1, 2 ] }
  // each item = { name: , price: , }
  const [person, setPerson] = useState([]);
  const [item, setItem] = useState([]);

  // Send all the info to the database
  const handleSaveBill = () => {
    console.log(person);
  };

  return (
    <div>
      {/* Display BillNameForm when there is no bill */}
      {!billId && (
        <BillNameForm setBillId={setBillId} />
      )}

      {/* If bill id exists,
      (null is the initial state) then we can create that condition to show form & bill */}
      {billId && (
        <div>
          <Form person={person} setPerson={setPerson} item={item} setItem={setItem} />
          <Bill item={item} person={person} setPerson={setPerson} />
        </div>
      )}
      <button type="button" onClick={handleSaveBill}>Save Bill</button>
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
