'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FormControl } from './ui/form';

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DateTimePicker24h({
  value,
  onChange,
  disabled,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && value) {
      const newDate = new Date(selectedDate);
      newDate.setHours(value.getHours());
      newDate.setMinutes(value.getMinutes());
      onChange?.(newDate);
    } else if (selectedDate) {
      onChange?.(selectedDate);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', timeValue: string) => {
    const newDate = new Date(value || new Date());
    if (type === 'hour') {
      newDate.setHours(parseInt(timeValue));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(timeValue));
    }
    onChange?.(newDate);
  };

  return (
    <FormControl>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, 'dd/MM/yyyy HH:mm')
            ) : (
              <span>DD/MM/YYYY HH:mm</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              initialFocus
              disabled={disabled}
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value && value.getHours() === hour ? 'default' : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('hour', hour.toString())}
                      disabled={disabled}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        value && value.getMinutes() === minute
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange('minute', minute.toString())
                      }
                      disabled={disabled}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}
