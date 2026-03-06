"use client";

export default function MiniTextStack({
    grayText = "",
    blackText = "",
    paddingBottom = false,
}) {
  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
      <p style={{ color: "var(--gray)", paddingBottom: paddingBottom ? "var(--gap)" : 0, }}>{grayText}</p>
      <p className="pBold">{blackText}</p>
    </div>
  )
}  