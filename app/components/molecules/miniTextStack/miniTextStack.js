"use client";

export default function MiniTextStack({
    grayText = "",
    blackText = "",
}) {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h4>{grayText}</h4>
      <h4 style={{color: "var(--black)"}}>{blackText}</h4>
    </div>
  )
}  