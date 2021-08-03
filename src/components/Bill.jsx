import React, { useState, useEffect } from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

//  ------ 2. separate components into different files

// item -> used to populate read-only div
// person -> populate the dropdown
const ItemList = ({ item, person, setPerson }) => {
  // We can pass itemIndex in the anonymous function
  // onChange is provided by the NPM library to take in value and event as parameters
  const PersonDropdown = ({ itemIndex }) => {
    // local state for options to keep track of updated people
    // Create options needed for react-multiselect library
    const [options, setOptions] = useState([]);

    // Initialize the options array so it represents only the changes in the persons array (from <app/>)
    useEffect(() => {
      const array = [];
      // personIndex is used to search & store amount
      person.forEach((personOption, personIndex) => {
        const personOptionObject = {};
        personOptionObject.label = personOption.name;
        personOptionObject.value = personIndex;
        array.push(personOptionObject);
      });
      setOptions(array);
    }, [person]);

    // We store the value selectedOptions as a local state so dropdown renders correctly
    // selectedOptions is an array of objects [ { label: sam, value: 0 }, ...]
    const [selectedOptions, setSelectedOptions] = useState([...options]);

    // on event.action => "select-option", "deselect-option"
    const onChange = (value, event, itemIndex) => {
      const { action } = event;
      const userOption = event.option;
      const userIndex = event.option.value;
      // userOption = {label:..., value:...}

      switch (action) {
        case 'select-option':
          // Modifies the dropdown
          setSelectedOptions([...selectedOptions, userOption]);

          // Modifies the person in <App/> parent
          // add the itemIndex to the person object's items array
          const addedIndexArray = [...person[userIndex].items, itemIndex];
          person[userIndex].items = addedIndexArray;
          setPerson(person);
          break;
        case 'deselect-option':
          // Modifies the dropdown
          console.log('user options', userOption);
          const remainingItemsArr = selectedOptions.filter(
            (nameOptionObject) => nameOptionObject.value !== userOption.value,
          );
          setSelectedOptions(remainingItemsArr);
          console.log('selected options', selectedOptions);
          console.log('remainingItemsArr', remainingItemsArr);

          // Modifies the person in <App/>
          const removedIndexArray = person[userIndex].items.filter(
            (currentItemIndex) => currentItemIndex !== itemIndex,
          );
          setPerson(removedIndexArray);

          break;
        default:
          break;
      }
    };

    return (
      <ReactMultiSelectCheckboxes
        options={options}
        // We use local state to store the selected checkbox items for each person
        value={selectedOptions}
        // setState={setSelectedOptions}
        onChange={(value, event) => { onChange(value, event, itemIndex); }}
      />
    );
  };

  return (
    item.map((hotpotItem, itemIndex) => (
      <div key={itemIndex}>
        <p>{hotpotItem.name}</p>
        <p>{hotpotItem.price}</p>
        <PersonDropdown itemIndex={itemIndex} />
        {/* We pass the index to line 22 -> 16 */}
      </div>
    )));
};

// view person + amount they amount owed
const PersonList = ({ person }) => (
  person.map((personOption, index) => (
    <div key={index}>
      <p>{personOption.name}</p>
      <p>{personOption.amount}</p>
    </div>
  ))
);

export default function Bill({ item, person, setPerson }) {
  const handleAddPerson = () => {
    console.log(person);
  };

  return (
    <div>
      <h1>Item List</h1>
      {/* This makes sure that there are items, persons inside the list before rendering dropdown */}
      {item.length > 0 && person.length > 0
      && (
      <div>
        <ItemList item={item} person={person} setPerson={setPerson} />
        <button type="button" onClick={handleAddPerson}>Save All</button>
      </div>
      )}

      <h1>Amount Owned Person List</h1>
      {person.length > 0 && <PersonList person={person} /> }

    </div>
  );
}

// -- Bill()
//     -- ItemList() -> Item + person dropdown
//           -- Each item name + item price
//           -- Person Dropdown -> person index, item index
//                --- [selectedOptions, setSelectedOptions]
//                 -> object => { personId: [ array of itemIds ] , 2: [ 101, 102, 103], ... }

// For amount each person owes -> item price / number of people (personSelected array)
// Associate that same amount to that person index
//
// onclose Prop -> setPerson state

//  -- Save Bill --
//                 -> calculations
//                 -> send name, amount to people database

//     -- PersonList() -> Person name + amount they
