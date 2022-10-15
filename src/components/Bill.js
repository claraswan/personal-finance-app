import React, { useState } from 'react';

export default function Bill( { bill, toggleBill, deleteBill } ) {

  const [isActive, setActive] = useState("false");

  function handleToggle() {
    toggleBill(bill.id);
    setActive(!isActive);
  }

  function handleDelete() {
    deleteBill(bill.id);
  }

  return (
    <div className={`bill ${isActive ? "" : "done"}`}>
          <input className="checkbox" type="checkbox" checked={bill.paid} onChange={handleToggle}/>
          <div className='bill__name'>{bill.name}</div>
          <div className='bill__amount'>${bill.amount}</div>
          <div className="bill__x" onClick={handleDelete}>&times;</div>
    </div>
  )
}
