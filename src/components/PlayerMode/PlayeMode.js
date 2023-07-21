import React from 'react'
import "./PlayerMode.css";
import { useParams } from 'react-router-dom';
export default function PlayeMode() {
  const {username}=useParams();
  const link=`/multi/${username}`
  return (
    <div className="modepage">
      <a href="/solo">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1>Play Solo</h1>
    </a>
    <a href={link}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1>Play With Friends</h1>
    </a>
    </div>
  )
}
