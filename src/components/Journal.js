import React, { useEffect }  from 'react';
import Entry from './Entry';

export default function Journal( { entries } ) {

  let foodAmount = 0;
  let entertainmentAmount = 0;
  let clothingAmount = 0;
  let healthcareAmount = 0;
  let rentAmount = 0;
  let petCostsAmount = 0;
  let otherAmount = 0;
  const amounts = [foodAmount, 
    entertainmentAmount, 
    clothingAmount, 
    healthcareAmount,
    rentAmount,
    petCostsAmount,
    otherAmount]

  useEffect(() => {

    if (entries.length !== 0) {
      for (let entry of entries) {
        if (entry.description === 'food') {
          foodAmount += Number(entry.amount);
        } else if (entry.description === 'entertainment') {
          entertainmentAmount += Number(entry.amount);
        } else if (entry.description === 'clothing') {
          clothingAmount += Number(entry.amount);
        } else if (entry.description === 'healthcare') {
          healthcareAmount += Number(entry.amount);
        } else if (entry.description === 'rent') {
          rentAmount += Number(entry.amount);
        } else if (entry.description === 'pet costs') {
          petCostsAmount += Number(entry.amount);
        } else if (entry.description === 'other') {
          otherAmount += Number(entry.amount);
        }
      }
    }
  }, [entries])

  return (
    {amounts},

    <table className="journal">
      <thead>
          <tr className='journal__entry--headers'>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
      </thead>
      <tbody>
        {entries.map(entry => {
            return <Entry key={entry.id} entry={entry} />
        })}
      </tbody>
    </table>
  )
}