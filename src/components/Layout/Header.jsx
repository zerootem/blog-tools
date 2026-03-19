import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle'; // استيراد المكون الجديد

export default function Header({ title }) {
  return (
    <header className="sticky top-0 bg-background/50 z-50 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between gap-4 px-5 py-2.5 min-h-14 max-w-5xl mx-auto">
        <Link className="flex items-center justify-center shrink-0 gap-3" to="/">
          <img 
            src="https://blogger.googleusercontent.com/img/a/AVvXsEi02L-jWoMFkqnhAGNFIWHuxZjhqGqozHElvDjsiwl8sBUVkhRaPLEtoblngC2WeG2_ETGKdL_IbAduh-UBc3DwO49QgfHW49m6t3xFmHFkweiXWHj4JJjlEulSkJwynImQEbuhQZkG5BZA0BendV7VwaXexLEW1x66nLbPHZkGKb3tTdoaWM5G6kRws18=s350"
            alt="Modweeb Logo"
            className="h-8 w-auto"
          />
          <span className="text-lg font-medium">{title}</span>
        </Link>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
