import { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode; 
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  text,
  children,
  position = 'top',
}: TooltipProps) {
  
  let tooltipPositionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
  if (position === 'bottom') {
    tooltipPositionClasses = 'top-full left-1/2 -translate-x-1/2 mt-2';
  } else if (position === 'left') {
    tooltipPositionClasses = 'top-1/2 right-full -translate-y-1/2 mr-2';
  } else if (position === 'right') {
    tooltipPositionClasses = 'top-1/2 left-full -translate-y-1/2 ml-2';
  }
  
  return (
    <div className="relative group inline-block">
      {children}
      
      <div
        className={`
          absolute 
          ${tooltipPositionClasses}
          px-2 py-1 
          bg-gray-800 text-white text-sm rounded 
          opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible
          transition-opacity duration-200
          whitespace-nowrap
        `}
      >
        {text}
      </div>
    </div>
  );
}
