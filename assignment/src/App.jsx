import { useState, useEffect } from "react";
import "./App.css";
import { USERS, data } from "./Data.js";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { List } from "react-virtualized";

function App() {
  let vehiclesArray = []
  let manufacturerArray = []
  let vehicleFrequency = {}
  let vehicleAgeFrequency = {}
  let vehicleData = []
  // let filteredVehicles = []
  // let manufacturerSet = []
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [age, setAge] = useState(25)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState(null)
  const [manufacturerSet, setManufacturerSet] = useState([])
  const [userDetails, setUserDetails] = useState()
  const [maker, setMaker] = useState('')
  const [vehicleValues, setVehicleValues] = useState()
  const [vehicleAgeValues, setVehicleAgeValues] = useState()

  useEffect(() => {
    USERS.forEach((user) => {
      const { vehicle } = user;
      const { manufacturer } = vehicle
      vehiclesArray.push(vehicle)
      manufacturerArray.push(manufacturer)
    })
    const temp = new Set(manufacturerArray)
    setManufacturerSet(new Set(manufacturerArray))
    setMaker(Array.from(temp)[0])
  }, [])

  const getPieData = () => {
    const filteredByAge = USERS.filter((user) =>
      user.age <= age && user.age > age - 5
    )
    const filterByCarMaker = filteredByAge?.filter(user => user.vehicle.manufacturer === maker)
    let temp = []
    filterByCarMaker.forEach(user => temp.push(user.vehicle))
    setFilteredVehicles(temp)
    setFilteredUsers(filterByCarMaker)


    temp.forEach((vehicle) => {
      if (!vehicleFrequency[vehicle.model]) vehicleFrequency[vehicle.model] = 1;
      else {
        vehicleFrequency[vehicle.model] += 1;
      }
    });
    temp.forEach((vehicle) => {
      if (!vehicleAgeFrequency[vehicle.carAge]) vehicleAgeFrequency[vehicle.carAge] = 1;
      else {
        vehicleAgeFrequency[vehicle.carAge] += 1;
      }
    });
    const vehicleAgeData = []
    Object.keys(vehicleFrequency).forEach((vehicle) => {
      vehicleData.push({ name: vehicle, value: vehicleFrequency[vehicle] });
    });
    Object.keys(vehicleAgeFrequency).forEach((vehicle) => {
      vehicleAgeData.push({ name: vehicle, value: vehicleAgeFrequency[vehicle] });
    });
    setVehicleValues(vehicleData)
    setVehicleAgeValues(vehicleAgeData)

  }

  return (
    <>
      <div className="App" style={{ display: 'flex' }}>

        <div className="sidebar" style={{ width: '250px', height: '100vh', borderRight: '1px solid gray', position: 'fixed', zIndex: '100', backgroundColor: '#142035' }}>
          <h3 style={{ textAlign: 'center' }}>List of Users:</h3>
          <hr style={{ backgroundColor: 'gray', height: '1px', border: 'none', width: '80%' }} />
          <List
            width={250}
            height={550}
            rowHeight={50}
            rowCount={USERS.length}
            rowRenderer={({ index, style, parent }) => {
              const user = USERS[index]
              return <div key={user.userId} style={style}>
                <h5 className="mont" onClick={() => {
                  setShowUserDetails(true)
                  setUserDetails(user)
                }} style={{ marginLeft: '15px', cursor: 'pointer' }}>{index + 1}. {user.name}</h5>
              </div>
            }}
          />
        </div>
        {userDetails && <div className="right-sidebar" style={{ width: '250px', height: '100vh', borderRight: '1px solid gray', position: 'fixed', zIndex: '100', backgroundColor: '#142035', top: '0', right: '0', display: showUserDetails ? 'block' : 'none' }}>
          <div className="header" style={{ height: '5%', padding: '7px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => { setShowUserDetails(false) }}>X</span>
            <span>User Details</span>
          </div>
          <div style={{ height: '95%', padding: '10px' }}>
            <img src={userDetails.avatar} alt="" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', borderRadius: '100px' }} />
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{userDetails.name}</h3>
            {/* <div style={{ display: 'flex', alignItems: '', flexDirection: 'column' }}> */}

            <h6>Username:    {userDetails.username}</h6>
            <h6>Sex:    {userDetails.sex}</h6>
            <h6>Age:    {userDetails.age}</h6>
            <h6>Occupation:    {userDetails.occupation}</h6>
            <h6>Phone:    {userDetails.phone}</h6>
            <h6>Country:    {userDetails.country}</h6>
            <h6>Vehicle:    {userDetails.vehicle.manufacturer + " " + userDetails.vehicle.model}</h6>
            {/* </div> */}
          </div>
        </div>}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '250px' }}>
          <h1 >Zethic: Assignment</h1>
          <h2 style={{ textDecoration: 'underline' }}>Country vs No. Of People</h2>
          <div style={{ width: '100%', height: '60vh' }}>
            <ResponsiveContainer width="90%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip itemStyle={{ color: '#000000' }} />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <h2 style={{ textDecoration: 'underline' }}>Vehicle Statistics</h2>
          <div className="input-1" style={{ margin: '1  5px' }}>
            <span style={{ margin: '10px' }}>Select Age Group</span>
            <select name="age" value={age} onChange={(e) => { setAge(e.target.value) }}>
              <option value="25">20-25</option>
              <option value="30">25-30</option>
              <option value="35">30-35</option>
              <option value="40">35-40</option>
              <option value="45">40-45</option>
            </select>
          </div>
          <div className="input-2">
            <span style={{ margin: '10px' }}>Select Car Maker</span>
            {Array.from(manufacturerSet).length > 0 && <select name="maker" value={maker} onChange={(e) => { setMaker(e.target.value) }}>
              {Array.from(manufacturerSet)?.map(make => {
                return <option key={make} value={make}>{make}</option>
              })}
            </select>}
          </div>
          <button style={{ margin: "15px" }} onClick={getPieData}>Show Demographics</button>
          {vehicleValues && <div className="pieContainer" style={{ width: '35vw', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h3>{maker}: Models</h3>
            <ResponsiveContainer width="100%" height="100%">
              {/* <h2>Hello</h2> */}
              <PieChart width={400} height={400}>
                <Tooltip itemStyle={{ color: '#000000' }} />
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={vehicleValues}
                  cx={200}
                  cy={200}

                  outerRadius={160}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>}
          {vehicleAgeValues && <div className="pieContainer" style={{ width: '35vw', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h3>Car Age Demographics</h3>
            <ResponsiveContainer width="100%" height="100%">
              {/* <h2>Hello</h2> */}
              <PieChart width={400} height={400}>
                <Tooltip itemStyle={{ color: '#000000' }} />
                <Pie
                  dataKey="value"
                  isAnimationActive={true}
                  data={vehicleAgeValues}
                  cx={200}
                  cy={200}

                  outerRadius={160}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>}
        </div>
      </div>
    </>
  );
}

export default App;
