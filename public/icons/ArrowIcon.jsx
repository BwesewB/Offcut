'use client';

export default function ArrowIcon({
  size = 24,
  color = 'var(--black)',
  rotation = 0, // degrees — default is "top-right"
  className = '',
  ...props
}) {
  const rotationValue =
    typeof rotation === 'number' ? `${rotation}deg` : rotation;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotationValue})`, transition: 'transform 0.3s ease' }}
      className={className}
      {...props}
    >
      <path
        d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"
        fill={color}
      />
    </svg>
  );
}
