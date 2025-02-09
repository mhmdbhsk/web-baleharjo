'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, activeStep, onStepClick }: StepsProps) {
  return (
    <div className="relative">
      <div
        className="absolute top-5 left-1 right-1 h-0.5 bg-gray-200"
        style={{
          width: 'calc(100% - 2rem)',
          margin: '0 1rem',
        }}
      >
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      <ol className="relative flex w-full justify-around">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isCurrent = index === activeStep;

          return (
            <li
              key={step.title}
              className="flex flex-col items-center"
              onClick={() => onStepClick?.(index)}
            >
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors duration-500',
                  {
                    'cursor-pointer': index < activeStep,
                    'border-primary': isCompleted || isCurrent,
                    'border-gray-300': !isCompleted && !isCurrent,
                    'bg-primary text-white': isCompleted,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span
                    className={cn('text-sm font-semibold', {
                      'text-primary': isCurrent,
                      'text-gray-500': !isCurrent,
                    })}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span
                  className={cn('text-sm font-medium', {
                    'text-primary': isCompleted || isCurrent,
                    'text-gray-500': !isCompleted && !isCurrent,
                  })}
                >
                  {step.title}
                </span>
                <span className="text-xs text-gray-500 text-center">
                  {step.description}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
