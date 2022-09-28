import React, { useState, useRef, useEffect } from 'react';
import BillsList from './BillsList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'financeApp.bills';

function App() {

  const [bills, setBills] = useState([]);
  const billNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setBills(storedTodos);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bills))
  }, [bills])

  function handleAddBill(e) {
    const name = billNameRef.current.value;
    if (name === '') return;
    setBills(prevBills => {
      return [...prevBills, { id: uuidv4(), name: name, paid: false }]
    })
    billNameRef.current.value = null;
  }

  return (
    <>
      <BillsList bills={bills}/>
      <input ref={billNameRef} type="text"/>
      <button onClick={handleAddBill}>Add bill</button>
      <button>Clear paid bills</button>
      <div>0 left to pay</div>
    </>
  );

}

export default App;