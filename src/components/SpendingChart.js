import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Journal from './Journal';

console.log('journal amounts: ', Journal);

// const data = [
//   { name: 'Food', value: 0 },
//   { name: 'Entertainment', value: amounts.entertainmentAmount },
//   { name: 'Clothing', value: amounts.clothingAmount },
//   { name: 'Healthcare', value: amounts.healthcareAmount },
//   { name: 'Rent', value: amounts.rentAmount },
//   { name: 'Pet Cost', value: amounts.petCostsAmount },
//   { name: 'Other', value: amounts.otherAmount },
// ];

const data = [
  { name: 'Food', value: 200 },
  { name: 'Entertainment', value: 100 },
  { name: 'Clothing', value: 50 },
  { name: 'Healthcare', value: 120 },
  { name: 'Rent', value: 600 },
  { name: 'Pet Cost', value: 80 },
  { name: 'Other', value: 60 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#465BCA', '#FF5497', '#FFA05D', '#9D3171'];

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

export default function SpendingChart() {

  // useEffect(() => {
  //   console.log('journal changed');
  // }, [Journal]);

  return (
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    
  )
}
