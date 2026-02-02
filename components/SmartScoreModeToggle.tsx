import React from 'react';


// Define the props for the component
interface LogoProps {
  onClick: () => void;
}

export function SmartScoreModeToggle({ onClick }: LogoProps) {
  return (
    <label className="pt-16 pr-3 relative inline-flex items-center cursor-pointer h-[50px] max-[625px]:px-[10px]">
      <input type="checkbox" className="sr-only peer" aria-label="Switch for tims/nhl mode" onClick={onClick}/>
      <div className="w-[120px] h-[68px] bg-slate-300 rounded-full relative inline-flex items-center justify-around
      after:content-[''] after:bg-slate-900 after:w-[56px] after:h-[56px] after:rounded-full after:absolute
      after:bottom-[6px] after:left-[6px] peer-checked:after:translate-x-[52px] after:transition-transform after:duration-[.4s]
      dark:after:bg-slate-200 dark:bg-slate-400">
        <img src="/images/tim-hortons.png" className="w-12 h-12"/>
        <img src="/images/NHL.png" className="w-12 h-12"/>
      </div>
    </label>  
  );
}
