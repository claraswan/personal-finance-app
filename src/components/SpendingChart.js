import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

let foodAmount = 0;
let entertainmentAmount = 0;
let clothingAmount = 0;
let healthcareAmount = 0;
let rentAmount = 0;
let petCostsAmount = 0;
let otherAmount = 0;

const RADIAN = Math.PI / 180;
const COLORS = {'Food':'#465BCA', 'Entertainment':'#FF5497', 'Clothing':'#28b953', 'Healthcare':'#7e90ec', 'Rent':'#9D3171', 'Pet Cost':'#FFA05D', 'Other':'#1D2041'};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

export default function SpendingChart( { entries } ) {

  for (const entry of entries) {

    let value = Object.values(entry);

    if (value[2] === 'food') foodAmount += Number(value[3]);
    if (value[2] === 'entertainment') entertainmentAmount += Number(value[3]);
    if (value[2] === 'clothing') clothingAmount += Number(value[3]);
    if (value[2] === 'healthcare') healthcareAmount += Number(value[3]);
    if (value[2] === 'rent') rentAmount += Number(value[3]);
    if (value[2] === 'pet') petCostsAmount += Number(value[3]);
    if (value[2] === 'other') otherAmount += Number(value[3]);

  }

  const data = [
    { name: 'Food', value: foodAmount },
    { name: 'Entertainment', value: entertainmentAmount },
    { name: 'Clothing', value: clothingAmount },
    { name: 'Healthcare', value: healthcareAmount },
    { name: 'Rent', value: rentAmount },
    { name: 'Pet Cost', value: petCostsAmount },
    { name: 'Other', value: otherAmount },
  ];

  function handleColor(index) {
    const name = data[index].name;
    return COLORS[name];
  }

  return (
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={handleColor(index)} />
            ))}
          </Pie>
        </PieChart>
    
  )
}
