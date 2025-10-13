'use client';

export default function ArrowIcon({
  size = '8rem',
  color = 'var(--black)',
  rotation = 0,
}) {
  const rotationValue =
    typeof rotation === 'number' ? `${rotation}deg` : rotation;

  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="5 5 14 14"
        width={size}
        height={size}
        fill="none"
        style={{
            transform: `rotate(${rotationValue})`,
            transition: 'transform 0.3s ease',
            display: 'block',
            // border: '1px solid red',
        }}
    >
    <path
        d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"
        fill={color}
    />
    </svg>

  );
}
