import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const Upwork_Icon: React.FC<IconProps> = ({ className = "w-10 h-10", size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c0 1.506-1.224 2.73-2.73 2.73s-2.73-1.224-2.73-2.73V3.492H0v7.112c0 2.946 2.397 5.344 5.344 5.344 2.947 0 5.344-2.398 5.344-5.344v-.706c.452 1.194 1.058 2.436 1.81 3.585l-1.61 7.545h2.67l1.196-5.604c1.132.72 2.455 1.157 3.807 1.157 3.965 0 7.191-3.226 7.191-7.191 0-3.966-3.226-7.192-7.191-7.192z" />
  </svg>
);

export const Fiverr_Icon: React.FC<IconProps> = ({ className = "w-10 h-10", size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#1DBF73" />
    <path
      d="M15.8 7.8h-1.6c-.9 0-1.2.4-1.2 1.2v1h2.6v2h-2.6v5.2H10.6V12H9.2v-2h1.4V8.9c0-1.9 1.1-3 3.1-3h2.1v1.9z"
      fill="white"
    />
    <circle cx="17.2" cy="16.2" r="1.1" fill="white" />
  </svg>
);

export const Freelancer_Icon: React.FC<IconProps> = ({ className = "w-10 h-10", size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.092 2.502L9.429 8.293l4.757 3.125-7.798 1.488 4.792 5.176 1.765 3.416 4.394-4.285 4.318-12.875-7.653-1.836zm-8.87 8.01L0 12.84l4.24 2.827 5.093-.996L5.222 10.512z" />
  </svg>
);

export const PeoplePerHour_Icon: React.FC<IconProps> = ({ className = "w-10 h-10", size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#FF6600" />
    <path
      d="M8.2 6.8h5c2.4 0 4 1.4 4 3.5 0 2.2-1.7 3.6-4 3.6h-2.7v4.3H8.2V6.8zm2.3 5h2.5c1.1 0 1.8-.6 1.8-1.5 0-1-.7-1.4-1.8-1.4h-2.5v2.9z"
      fill="white"
    />
  </svg>
);

export const Truelancer_Icon: React.FC<IconProps> = ({ className = "w-10 h-10", size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#2B7DE9" />
    <path d="M5.8 7.5h12.4v2.6h-4.8v7.4h-2.8v-7.4H5.8V7.5z" fill="white" />
    <path d="M14.6 13.2l3.4-3.4v4.8l-3.4 3.4v-4.8z" fill="#00E699" />
  </svg>
);
