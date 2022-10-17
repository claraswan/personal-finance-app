import React, { useState, useRef, useEffect } from 'react';
import BillsList from './components/BillsList';
import GoalsList from './components/GoalsList';
import Header from './components/Header';
import Footer from './components/Footer';
import Journal from './components/Journal';
import SpendingChart from './components/SpendingChart';
import AssetsList from './components/AssetsList';
import { v4 as uuidv4 } from 'uuid';
import plus from './assets/plus.svg';
import './css/App.css';
import axios from "axios";

const LOCAL_STORAGE_KEY = 'financeApp.bills';

export default function App() {

  const [bills, setBills] = useState([]); // in react you can never directly modify state. The state 'bills' can ONLY be modified using its setter function.
  const [goals, setGoals] = useState([]); 
  const [entries, setEntries] = useState([]); 
  const [assets, setAssets] = useState([]); 
  const billNameRef = useRef();
  const billAmountRef = useRef();
  const goalNameRef = useRef();
  const goalDescRef = useRef();
  const entryNameRef = useRef();
  const entryDescRef = useRef();
  const entryAmountRef = useRef();
  const addNew = useRef();
  const assetSymbolRef = useRef();
  const assetAmountRef = useRef();

  const searchBars = document.getElementsByClassName('search');
  for (const searchBar of searchBars) {
    searchBar.style.opacity = 0;
  }

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
    
    e.preventDefault();
    const name = billNameRef.current.value;
    const amount = billAmountRef.current.value;

    if (name === '' || amount === '') return;

    if (e.key === 'Enter') {
      setBills(prevBills => {
        return [...prevBills, { id: uuidv4(), name: name, amount: amount, paid: false }]
      })
      billNameRef.current.value = null;
      billAmountRef.current.value = null;
    }

  }

  function handleAddGoal(e) {

    console.log('handleAddGoal');
    e.preventDefault();
    const name = goalNameRef.current.value;
    const description = goalDescRef.current.value;

    if (name === '' || description === '') return;

    if (e.key === 'Enter') {
      setGoals(prevGoals => {
        return [...prevGoals, { id: uuidv4(), name: name, description: description }]
      })
      goalNameRef.current.value = null;
      goalDescRef.current.value = null;
    }

  }

  function handleAddEntry(e) {

    e.preventDefault();
    const name = entryNameRef.current.value;
    const description = entryDescRef.current.value;
    const amount = entryAmountRef.current.value;

    if (name === '' || description === '' || amount === '') return;

    if (e.key === 'Enter') {

      setEntries(prevEntries => {
        return [...prevEntries, { id: uuidv4(), name: name, description: description, amount: amount }]
      })
      entryNameRef.current.value = null;
      entryDescRef.current.value = null;
      entryAmountRef.current.value = null;
    }
  }

  function handleAddAsset(e) {
    
    e.preventDefault();
    
    const symbol = assetSymbolRef.current.value.toUpperCase();
    const shareAmount = assetAmountRef.current.value.toUpperCase();

    if (symbol === '' || shareAmount === '') return;

    if (e.key === 'Enter') {

      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=977E45DL04JEWK4C`).then((res) => {
  
      const metaData = res.data["Meta Data"];
      let timeSeriesData = res.data["Time Series (Daily)"];
      let mostRecentData = Object.entries(timeSeriesData)[0];
      let price = mostRecentData[1]["4. close"];
      let assetValue = (price * shareAmount).toFixed(2);
      let date = metaData["3. Last Refreshed"];

      console.log(date);

      setAssets(prevAssets => {
        return [...prevAssets, { id: uuidv4(), symbol: symbol, amount: assetValue, date: date}]
      })
  
      }).catch((err) => {
          console.log(err);
      });

      assetSymbolRef.current.value = null;
      assetAmountRef.current.value = null;
    }

  }

  function addNewBill(e) {
    for (const searchBar of searchBars) {
      if (searchBar.parentElement === e.currentTarget.parentElement.parentElement) {
        searchBar.style.opacity = 1;
      }
    }
  }

  function addNewEntry(e) {
    for (const searchBar of searchBars) {
      if (searchBar.parentElement === e.currentTarget.parentElement.parentElement) {
        searchBar.style.opacity = 1;
      }
    }
  }

  function addNewGoal(e) {
    for (const searchBar of searchBars) {
      if (searchBar.parentElement === e.currentTarget.parentElement.parentElement) {
        searchBar.style.opacity = 1;
      }
    }
  }

  function addNewAsset(e) {
    for (const searchBar of searchBars) {
      if (searchBar.parentElement === e.currentTarget.parentElement.parentElement) {
        searchBar.style.opacity = 1;
      }
    }
  }

  function deleteBill(id) {
    const newBills = [...bills]; 
    const bill = newBills.find(bill => bill.id === id);
    newBills.splice(newBills.indexOf(bill), 1);
    setBills(newBills);
  }

  function deleteAsset(id) {
    const newAssets = [...assets]; 
    const asset = newAssets.find(asset => asset.id === id);
    newAssets.splice(newAssets.indexOf(asset), 1);
    setAssets(newAssets);
  }

  function clearPaidBills(e) {
    const newBills = bills.filter(bill => !bill.paid);
    setBills(newBills);
  }

  let billAmount = 0;
  let assetAmount = 0;

  return (
    <>
      <Header />

      <div className='box billsBox'>
        <h2 className='box__title'>Your Monthly Bills</h2>

        <div className='stats'>
          <div><span className='stats__num'>{bills.filter(bill => !bill.paid).length}</span> unpaid bills</div>
          <div>$<span className='stats__num'>
            {bills.filter(bill => !bill.paid)
            .forEach(bill => billAmount += Number(bill.amount))} 
            {billAmount}</span> left to pay this month
          </div>
        </div>
        <div className='billsList'>
          <BillsList bills={bills} toggleBill={toggleBill} deleteBill={deleteBill}/>
          <div className='bill addNew' ref={addNew} onClick={addNewBill}><img src={plus} alt='plus sign icon'></img></div>
        </div>
        
        <div className='search' ref={searchBars} >
          <input className='search__input' ref={billNameRef} type='text' placeholder='Name of bill'/>
          <input className='amount search__input' ref={billAmountRef} type='text' placeholder='Amount' onKeyUp={(e) => handleAddBill(e)} />
        </div>

        <button className='btn' onClick={clearPaidBills}>Clear paid bills</button>

      </div>

      <div className='box journalBox'>
        <h2 className='box__title'>Your Spending This Month</h2>
        <div className='box__content'>
          <Journal entries={entries}/>
          <SpendingChart className="spendingChart" entries={entries} />
          <div className='entry addNew' onClick={addNewEntry}><img src={plus} alt='plus sign icon'></img></div>
        </div>
    
        <div className='search' ref={searchBars}>
          <input className='search__input' ref={entryNameRef} type='text' placeholder='Title'/>
          <select className='search__input' ref={entryDescRef} name='types'>
            <option value='food'>Food</option>
            <option value='entertainment'>Entertainment</option>
            <option value='clothing'>Clothing</option>
            <option value='healthcare'>Healthcare</option>
            <option value='rent'>Rent</option>
            <option value='pet'>Pet cost</option>
            <option value='other'>Other</option>
          </select>
          <input className='amount search__input' ref={entryAmountRef} type='text' placeholder='Amount' onKeyUp={(e) => handleAddEntry(e)} />
        </div>

      </div>

      <div className='box goalsBox'>
        <h2 className='box__title'>Financial Goals</h2>
        <div className='goalsList'>
          <GoalsList goals={goals}/>
          <div className='goal addNew' onClick={addNewGoal}><img src={plus} alt='plus sign icon'></img></div>
        </div>
        <div className='search' ref={searchBars}>
          <input className='search__input' ref={goalNameRef} type='text' placeholder='Name of goal' />
          <input className='search__input' ref={goalDescRef} type='text' placeholder='Description' onKeyUp={(e) => handleAddGoal(e)} />
        </div>
      </div>

      <div className='box assetsBox'>
        <h2 className='box__title'>Assets</h2>
        <div className='stats'>
          <div>$<span className='stats__num'>
            {assets.forEach(asset => assetAmount += Number(asset.amount))} 
            {assetAmount}</span> total assets
          </div>
        </div>
        <div className='assetsList'>
          <AssetsList assets={assets} deleteAsset={deleteAsset}/>
          <div className='asset addNew' onClick={addNewAsset}><img src={plus} alt='plus sign icon'></img></div>
        </div>
        <div className='search' ref={searchBars}>
          <input className='search__input' ref={assetSymbolRef} type='text' placeholder='Symbol' />
          <input className='amount search__input' ref={assetAmountRef} type='text' placeholder='# of shares' onKeyUp={(e) => handleAddAsset(e)} />
        </div>

      </div>

      <Footer />

    </>
  );

}