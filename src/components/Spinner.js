import React from 'react';

export default function Spinner(props) {
  const radius = props.radius;
  return <div className="spinner" style={radius?{width:radius,height:radius}:{}}></div>;
}
