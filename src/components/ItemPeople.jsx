import React, { useState } from 'react';

const ItemPeople = ({ item, peopleList, setPeopleList }) => {
  const [personSelected, setPersonSelected] = useState();
  const [payList, setPayList] = useState([]);

  const handlePersonChange = (event) => {
    setPersonSelected(event.target.value);
  };

  // Add person to list of people who selected a particular item when user clicks Add Person
  const addPerson = () => {
    // Add new person to pay list
    const updatedPayList = [...payList, personSelected];
    // Calculate new per person cost for this item based on updated pay list
    const prevPerPersonCost = updatedPayList.length === 1
      ? 0 : Number(item.price) / (updatedPayList.length - 1);
    const updatedPerPersonCost = Number(item.price) / updatedPayList.length;

    // Create new people list to trigger re-render when we update people list in parent component
    const updatedPeopleList = [...peopleList];

    // Update each person's amount based on updated per person cost
    updatedPeopleList.forEach((person) => {
      if (updatedPayList.includes(person.name)) {
        // If person was already on pay list, subtract previous per person cost
        if (payList.includes(person.name)) {
          person.amount -= prevPerPersonCost;
        }
        // Add the updated per person cost to the person's total amount due
        person.amount += updatedPerPersonCost;
      }
    });

    // Update people list state in parent component to update people list in sibling components
    setPeopleList(updatedPeopleList);

    // Update local pay list state to reflect the new person added
    setPayList(updatedPayList);
  };

  return (
    <div className="item-people-container">
      <div className="item-details">
        <h3>{item.item}</h3>
        <h3>
          $
          {item.price}
        </h3>
      </div>
      <div className="item-people-select">
        <select onChange={handlePersonChange}>
          <option>Select a person</option>
          {peopleList.map((person) => (
            <option>
              {person.name}
            </option>
          ))}
        </select>
      </div>
      <div className="item-button-container">
        <button type="submit" className="item-submit-button" onClick={addPerson}>Add Person</button>
      </div>
      <div className="item-result">
        <ul>
          {payList.map((person) => (
            <li>{person}</li>
          ))}
        </ul>
      </div>
      <div className="cost-per-person">
        {payList.length > 0 && (
        <>
          <h3>Cost per person: </h3>
          <h3>{item.price / payList.length}</h3>
        </>
        )}
      </div>
    </div>
  );
};

export default ItemPeople;
