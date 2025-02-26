import { IconProps } from "@/domain/interfaces";

export const LinkIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15_96)">
        <rect width="24" height="24" fill="white" />
        <path
          d="M16.2427 12L19.0711 9.17159C19.0711 9.17159 20.4853 7.75737 18.364 5.63606C16.2427 3.51475 14.8285 4.92895 14.8285 4.92895C14.8285 4.92895 12.7071 7.05027 11.2929 8.46448C9.87873 9.87869 9.87873 11.2929 10.5858 12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.75745 12L4.92902 14.8284C4.92902 14.8284 3.5148 16.2426 5.63613 18.364C7.75745 20.4853 9.17166 19.0711 9.17166 19.0711C9.17166 19.0711 10.9394 17.3033 12.3536 15.8891C13.7679 14.4749 14.1214 12.7071 13.4143 12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_15_96">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
