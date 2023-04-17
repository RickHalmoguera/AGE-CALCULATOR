import { useState, useRef } from "react"
import arrow from './assets/images/icon-arrow.svg'

import './css/App.css'

function App() {
  const [day, setDay] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [ageDays, setAgeDays] = useState()
  const [ageMonth, setAgeMonth] = useState()
  const [ageYear, setAgeYear] = useState()

  const dayRef = useRef()
  const dayErrorRef = useRef()
  const dayLabel = useRef()
  const monthRef = useRef()
  const monthErrorRef = useRef()
  const monthLabel = useRef()
  const yearRef = useRef()
  const yearErrorRef = useRef()
  const yearLabel = useRef()

  const getDate = (ref) =>{
    dayErrorRef.current.classList.add('hidden')
    dayLabel.current.style.color = "hsl(0, 1%, 44%)"
    monthErrorRef.current.classList.add('hidden')
    monthLabel.current.style.color = "hsl(0, 1%, 44%)"
    yearErrorRef.current.classList.add('hidden')
    yearLabel.current.style.color = "hsl(0, 1%, 44%)"
     
    if (ref.current.name === "day"){
      if(ref.current.value < 0 || ref.current.value >=31){
        dayErrorRef.current.classList.remove('hidden')
        dayLabel.current.style.color = "red"
      }else{
        setDay(dayRef.current.value)
      }
    }else if(ref.current.name === "month"){
      if(ref.current.value< 0 || ref.current.value >=12){
        monthErrorRef.current.classList.remove('hidden')
        monthLabel.current.style.color = "red"
      }else{
        setMonth(monthRef.current.value)
      }
    }else if(ref.current.name === "year"){
      const year = new Date().getFullYear()
      if(ref.current.value > year){ 
        yearErrorRef.current.classList.remove('hidden')
        yearLabel.current.style.color = "red"
      }else{
        setYear(yearRef.current.value)
      }
    }

  }

  const getAge = ()=>{
    const today = new Date()
    const userDate = new Date(`${year}-${month}-${day}`)
    const timeDifference = today - userDate
    const millisecondsPerDay = 24 * 60 * 60 * 1000
    setAgeYear(Math.floor(timeDifference / (365 * millisecondsPerDay)))
    setAgeMonth(Math.floor((timeDifference % (365 * millisecondsPerDay)) / (30 * millisecondsPerDay)))
    setAgeDays(Math.floor((timeDifference % (30 * millisecondsPerDay)) / millisecondsPerDay))

  }

  return (
    <div className="container">
    <div className="date">
      <label htmlFor="day" ref={dayLabel}>
      <p className="date__tag">day</p>
        <input className="date__input" onChange={()=>getDate(dayRef)} type="number" name="day" ref={dayRef} />
        <span ref={dayErrorRef} className="hidden">must be a valid day</span>
      </label>
      <label htmlFor="month" ref={monthLabel}>
        <p className="date__tag">month</p> 
          <input className="date__input" onChange={()=>getDate(monthRef)} type="number" name="month" ref={monthRef} />
          <span ref={monthErrorRef} className="hidden">must be a valid month</span>
        </label>
      <label htmlFor="year" ref={yearLabel}>
        <p className="date__tag">year</p>
          <input className="date__input" onChange={()=>getDate(yearRef)}  type="number" name="year"  ref={yearRef}/>
          <span ref={yearErrorRef} className="hidden">must be in the past</span>
        </label>
    </div>
      <div className="divider">
        <hr />
        <button className="button" onClick={getAge}>
          <img src={arrow} alt="arrow" />
        </button>
      </div>

      <p className="answer"><span className="answer__number">{ageYear ?  ageYear : '--'}</span> years</p>
      <p className="answer"><span className="answer__number">{ageMonth ? ageMonth : '--'}</span> months</p>
      <p className="answer"><span className="answer__number">{ageDays ?  ageDays: '--'}</span> days</p>
    </div>
  )
}

export default App