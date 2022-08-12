import axios from 'axios';
import React, { useState } from 'react';

const Form = ({
  itemList, setItemList, peopleList, setPeopleList,
}) => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [personName, setPersonName] = useState('');

  // when item input submit button is clicked, inputs are stored in state
  const handleItemSubmit = () => {
    if (item && price) {
      // the item inputs set as key value pairs in itemObj
      const itemObj = { item, price };
      // the current item is added to itemList, note use of spread operator here
      const items = [...itemList, itemObj];
      // item is saved in state here
      setItemList(items);
      // price and name of item are reset
      setItem('');
      setPrice('');
    } else {
      console.log('item not submitted');
    }
  };

  // When user clicks Submit on person it, store input in DB and state
  const handlePersonSubmit = () => {
    if (personName) {
      // backend post request with name of person, cost initially set to 0
      axios
        .post('/person', {
          name: personName,
          cost: 0,
        })
        .then((response) => {
          const { newPerson } = response.data;
          // person is added to list of people stored in state
          setPeopleList([...peopleList, newPerson]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('person not submitted');
    }
    // reset personName
    setPersonName('');
  };

  console.log('people list', peopleList);
  return (
    <>
      <div className="item-input">
        <h3>item input</h3>
        {/* item inputs allows item name and price to be added */}
        <div className="item-name">
          <label htmlFor="item">Item: </label>
          <input type="text" id="item" value={item} onChange={(event) => setItem(event.target.value)} />
        </div>
        <div className="item-price">
          <label htmlFor="price">Price: </label>
          <input type="number" step="0.01" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>
        <button type="submit" onClick={handleItemSubmit}>submit</button>
      </div>

      <div className="person-input">
        <h3>person input</h3>
        <div className="person-name">
          {/* name input allows person name to be added */}
          <label htmlFor="person">Name: </label>
          <input type="text" id="person" value={personName} onChange={(event) => setPersonName(event.target.value)} />
        </div>
        <button type="submit" onClick={handlePersonSubmit}>submit</button>
      </div>
    </>
  );
};

export default Form;
