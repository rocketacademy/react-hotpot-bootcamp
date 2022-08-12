import React from 'react';
import axios from 'axios';

// the form which allows users to create a bill
const BillForm = ({ billName, setBillName, setNewBill }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(billName);
    if (billName) {
      console.log('billName exists!!');
      axios
        .post('/bill', {
          name: billName,
        })
        .then((response) => {
          console.log(response.data);
          setNewBill(response.data.newBill);
        })
        .catch((error) => console.log(error));
    } else {
      console.log('nothing entered');
    }
  };

  return (
    <div className="create-bill-container">
      <h2 className="create-bill-header">Create Bill</h2>
      <div className="create-bill">
        <form className="create-bill-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bill">Name of bill :   </label>
            <input
              type="text"
              name="bill"
              id="bill"
              value={billName}
              onChange={(event) => {
                setBillName(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
          >
            Add bill !
          </button>
        </form>
      </div>
    </div>
  );
};

export default BillForm;
