import React from 'react';

export default function Entry( { entry } ) {

  return (
    <tr className='journal__entry'>
        <td className='journal__entry--name'>{entry.name}</td>
        <td className='journal__entry--description'>{entry.description}</td>
        <td className='journal__entry--amount'>{entry.amount}</td>
    </tr>
  )
}