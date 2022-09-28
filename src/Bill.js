import React from 'react';

export default function Bill( { bill, toggleBill, deleteBill } ) {

  function handleToggle() {
    toggleBill(bill.id);
  }

  function handleDelete() {
    deleteBill(bill.id);
  }

  return (
    <div>
        <label>
            <input type="checkbox" checked={bill.paid} onChange={handleToggle}/>
            {bill.name}
            <button onClick={handleDelete}>X</button>
        </label>
    </div>
  )
}
