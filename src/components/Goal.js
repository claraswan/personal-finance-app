import React from 'react';
import ProgressBar from './ProgressBar';

export default function Goal( { goal } ) {

  return (
    <div className="goal">
        <h3 className="goal__name">{goal.name}</h3>
        <div className="goal__description">{goal.description}</div>
        <ProgressBar />
    </div>
  )
}