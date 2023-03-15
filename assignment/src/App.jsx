import { useState, useEffect } from "react";
import "./App.css";
import { USERS } from "./Data.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  //const [countryData, setCountryData] = useState({});
  let countryData = {};
  useEffect(() => {
    getCountry();
  }, []);
  let data = [];
  const getCountry = () => {
    USERS.forEach((user) => {
      if (!countryData[user.country]) countryData[user.country] = 1;
      else {
        countryData[user.country] += 1;
      }
    });
    Object.keys(countryData).forEach((country) => {
      data.push({ country: country, value: countryData[country] });
    });
  };

  return (
    <div className="App">
      <h1>Zethic: Assignment</h1>
      {/* <ResponsiveContainer width="1000px" height="1000px">
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
}

export default App;
