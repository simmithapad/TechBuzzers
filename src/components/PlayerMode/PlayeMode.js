import React from 'react'
import "./PlayerMode.css";
export default function PlayeMode() {
  return (
    <div className="modepage">
      <a href="/solo">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1>Play Solo</h1>
    </a>
    <a href="/">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1>Play With Friends</h1>
    </a>
    </div>
  )
}
