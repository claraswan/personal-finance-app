import React, { useState, useRef, useEffect } from 'react';
import BillsList from './BillsList';
import { v4 as uuidv4 } from 'uuid';
import './css/App.css';

const LOCAL_STORAGE_KEY = 'financeApp.bills';

function App() {

  const [bills, setBills] = useState([]);
  const billNameRef = useRef();
  const billAmountRef = useRef();

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedBills) {
      console.log('stored bills:', storedBills);
      setBills(storedBills);
    }
  }, [])

  useEffect(() => {
    if (bills.length !== 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bills))
    }
  }, [bills])

  function toggleBill(id) {
    const newBills = [...bills]; // in React you should never directly modify a state variable, always make a copy
    const bill = newBills.find(bill => bill.id === id);
    bill.paid = !bill.paid;
    setBills(newBills);
  }

  function handleAddBill(e) {
    const name = billNameRef.current.value;
    const amount = billAmountRef.current.value;
    if (name === '' || amount === '') return;
    setBills(prevBills => {
      return [...prevBills, { id: uuidv4(), name: name, amount: amount, paid: false }]
    })
    billNameRef.current.value = null;
    billAmountRef.current.value = null;
  }

  function deleteBill(id) {
    const newBills = [...bills]; 
    const bill = newBills.find(bill => bill.id === id);
    newBills.splice(newBills.indexOf(bill), 1);
    setBills(newBills);
  }

  function clearPaidBills(e) {
    const newBills = bills.filter(bill => !bill.paid);
    setBills(newBills);
  }

  let billAmount = 0;

  return (
    <>
      <BillsList bills={bills} toggleBill={toggleBill} deleteBill={deleteBill}/>
      <input ref={billNameRef} type="text" placeholder='Name of bill'/>
      <input ref={billAmountRef} type="text" placeholder='Amount'/>
      <button onClick={handleAddBill}>Add bill</button>
      <button onClick={clearPaidBills}>Clear paid bills</button>
      <div>{bills.filter(bill => !bill.paid).length} bills left to pay</div>
      <div>
        ${bills.filter(bill => !bill.paid)
        .forEach(bill => billAmount += Number(bill.amount))} 
        {billAmount} left to pay
      </div>
    </>
  );

}

export default App;