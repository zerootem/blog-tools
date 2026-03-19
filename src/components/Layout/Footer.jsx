import React from 'react';
import { GithubIcon, MailIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';

export default function Footer() {
  return (
    <TooltipProvider>
      <footer className="py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-y-2 px-4 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-2 text-center">
            <span className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة.</span>
            <Separator orientation="vertical" className="hidden h-4! sm:block" />
            <p className="text-muted-foreground text-sm">
              صُنع بكل حب من قِبل{' '}
              <a href="https://modweeb.com" className="text-foreground" target="_blank" rel="noopener noreferrer">
                مود ويب
              </a>
              !
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {[
              { label: 'Github', link: 'https://github.com/modweeb', icon: GithubIcon },
              { label: 'Email', link: 'mailto:info@modweeb.com', icon: MailIcon },
            ].map(({ label, link, icon: Icon }) => (
              <li key={`${label}:${link}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild>
                      <a href={link}>
                        <span className="sr-only">{label}</span>
                        <Icon className="size-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </TooltipProvider>
  );
}
