import React, { useState, useRef, useEffect } from 'react';
import BillsList from './BillsList';
import GoalsList from './GoalsList';
import { v4 as uuidv4 } from 'uuid';
import './css/App.css';

const LOCAL_STORAGE_KEY = 'financeApp.bills';

function App() {

  const [bills, setBills] = useState([]); // in react you can never directly modify state. The state 'bills' can ONLY be modified using its setter function.
  const billNameRef = useRef();
  const billAmountRef = useRef();
  const [goals, setGoals] = useState([]); 
  const goalNameRef = useRef();
  const goalDescRef = useRef();

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
    const key = e.key;
    if (name === '' || amount === '') return;
    if (key === 'Enter') {
      setBills(prevBills => {
        return [...prevBills, { id: uuidv4(), name: name, amount: amount, paid: false }]
      })
      billNameRef.current.value = null;
      billAmountRef.current.value = null;
    }
  }

  function handleAddGoal(e) {
    const name = goalNameRef.current.value;
    const description = goalDescRef.current.value;
    const key = e.key;
    if (name === '' || description === '') return;
    if (key === 'Enter') {
      setGoals(prevGoals => {
        return [...prevGoals, { id: uuidv4(), name: name, description: description }]
      })
      goalNameRef.current.value = null;
      goalDescRef.current.value = null;
    }
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
      <div className="header box">
        <h1>Welcome back, Clara</h1>
      </div>

      <div className="box">
        <h2 className="box__title">Your Bills</h2>
        
        <div className='search'>
          <input ref={billNameRef} type="text" placeholder='Name of bill'/>
          <input ref={billAmountRef} type="text" placeholder='Amount' onKeyUp={(e) => handleAddBill(e)} />
        </div>
      
        <BillsList bills={bills} toggleBill={toggleBill} deleteBill={deleteBill}/>
        <div>{bills.filter(bill => !bill.paid).length} unpaid bills</div>
        <div>
          ${bills.filter(bill => !bill.paid)
          .forEach(bill => billAmount += Number(bill.amount))} 
          {billAmount} left to pay this month
        </div>
        <button onClick={clearPaidBills}>Clear paid bills</button>

      </div>

      <div className="box">
        <h2 className="box__title">Your Spending This Month</h2>
        

      </div>

      <div className="box">
        <h2 className="box__title">Financial Goals</h2>
        
        <GoalsList goals={goals}/>
        <div className='search'>
          <input ref={goalNameRef} type="text" placeholder='Name of goal'/>
          <input ref={goalDescRef} type="text" placeholder='Description' onKeyUp={(e) => handleAddGoal(e)} />
        </div>
      </div>
    </>
  );

}

export default App;