import React from 'react';
import Entry from './Entry';

export default function Journal( { entries } ) {
  return (
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