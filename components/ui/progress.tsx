<<<<<<< HEAD
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
=======
'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
>>>>>>> d4ae87e

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
<<<<<<< HEAD
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
=======
      'relative h-2 w-full overflow-hidden  bg-primary/20',
>>>>>>> d4ae87e
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
<<<<<<< HEAD
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
=======
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
>>>>>>> d4ae87e
