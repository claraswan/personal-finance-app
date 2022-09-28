import React from 'react'

export default function Bill( {bill} ) {
  return (
    <div>
        <label>
            <input type="checkbox" checked={bill.paid} />
            {bill.name}
        </label>
        
    </div>
  )
}
