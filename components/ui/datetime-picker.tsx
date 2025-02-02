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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FormControl } from '@/components/ui/form';

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [time, setTime] = React.useState('00:00');
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setTime(
        `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
      );
    }
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours), parseInt(minutes));
      setSelectedDate(date);
      onChange?.(date);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (selectedDate) {
      const [hours, minutes] = newTime.split(':');
      const newDate = new Date(selectedDate.getTime());
      newDate.setHours(parseInt(hours), parseInt(minutes));
      setSelectedDate(newDate);
      onChange?.(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
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
              format(value, 'dd MMMM yyyy, HH:mm')
            ) : (
              <span>Pick a date and time</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex items-start" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={disabled}
          initialFocus
        />
        <Select
          value={time}
          onValueChange={handleTimeChange}
          disabled={disabled}
        >
          <SelectTrigger className="font-normal focus:ring-0 w-[120px] my-4 mr-2">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent className="h-[300px]">
            <ScrollArea className="h-[300px]">
              {Array.from({ length: 96 }).map((_, i) => {
                const hour = Math.floor(i / 4)
                  .toString()
                  .padStart(2, '0');
                const minute = ((i % 4) * 15).toString().padStart(2, '0');
                const timeValue = `${hour}:${minute}`;
                return (
                  <SelectItem key={i} value={timeValue}>
                    {timeValue}
                  </SelectItem>
                );
              })}
            </ScrollArea>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
