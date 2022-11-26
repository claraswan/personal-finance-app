import React from 'react';

export default function Entry( { entry } ) {

  function handleColor() {
    if (entry.description === 'food') return 'blue';
    if (entry.description === 'entertainment') return 'pink';
    if (entry.description === 'clothing') return 'green';
    if (entry.description === 'healthcare') return 'blue-light';
    if (entry.description === 'rent') return 'dark-pink';
    if (entry.description === 'pet') return 'orange';
    if (entry.description === 'other') return 'dark-blue';
  }

  return (
    <tr className='journal__entry'>
        <td className='journal__entry--name'>{entry.name}</td>
        <td className={`journal__entry--description ${handleColor()}`} >{entry.description}</td>
        <td className='journal__entry--amount'>${entry.amount}</td>
    </tr>
  )
}