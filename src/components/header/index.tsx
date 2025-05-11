"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { setTheme } = useTheme();

  return (
    <header
      role="banner"
      className="border-2 mt-4 h-20 flex items-center justify-between px-2 rounded-xl drop-shadow-xl bg-accent"
    >
      <h3 className="font-semibold">Carlos Jr.</h3>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="toggle-theme" variant="outline" size="icon">
            <Sun
              data-testid="sun-icon"
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              data-testid="moon-icon"
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem data-testid="theme-light" onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem data-testid="theme-dark" onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem data-testid="theme-system" onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
