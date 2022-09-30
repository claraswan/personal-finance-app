import React from 'react';

export default function Bill( { bill, toggleBill, deleteBill } ) {

  function handleToggle() {
    toggleBill(bill.id);
  }

  function handleDelete() {
    deleteBill(bill.id);
  }

  return (
    <div className='bill'>
        <label>
            <input className="checkbox" type="checkbox" checked={bill.paid} onChange={handleToggle}/>
            <div className='bill__name'>{bill.name}</div>
            <div className='bill__amount'>${bill.amount}</div>
            <button className="bill__x" onClick={handleDelete}>x</button>
        </label>
    </div>
  )
}
