import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Journal from './Journal';

console.log('journal amounts: ', Journal)

const data = [
  { name: 'Food', value: 400 },
  { name: 'Entertainment', value: 300 },
  { name: 'Clothing', value: 300 },
  { name: 'Healthcare', value: 200 },
  { name: 'Rent', value: 700 },
  { name: 'Pet Cost', value: 100 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#465BCA', '#00C49F', '#FFBB28', '#FF8042'];

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
  return (
        <PieChart width={400} height={400}>
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
