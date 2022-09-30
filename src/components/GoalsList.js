import React from 'react';
import Goal from './Goal';

export default function GoalsList( { goals } ) {
  return (
    goals.map(goal => {
        return <Goal key={goal.id} goal={goal} />
    })
  )
}