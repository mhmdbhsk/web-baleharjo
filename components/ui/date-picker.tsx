'use client';
import React, { forwardRef, useCallback, useState } from 'react';
import { useTimescape, type Options } from 'timescape/react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
// @source: https://github.com/dan-lee/timescape?tab=readme-ov-file

const timePickerInputBase =
  'p-1 inline tabular-nums h-fit border-none outline-none select-none content-box caret-transparent rounded-sm min-w-8 text-center focus:bg-foreground/20 focus-visible:ring-0 focus-visible:outline-none';
const timePickerSeparatorBase = 'text-xs text-gray-400';

type DateFormat = 'days' | 'months' | 'years';
type TimeFormat = 'hours' | 'minutes' | 'seconds';

type DateTimeArray<T extends DateFormat | TimeFormat> = T[];
type DateTimeFormatDefaults = [
  DateTimeArray<DateFormat>,
  DateTimeArray<TimeFormat>,
];

const DEFAULTS = [
  ['days', 'months', 'years'],
  ['hours', 'minutes'],
] as DateTimeFormatDefaults;

const INPUT_PLACEHOLDERS: InputPlaceholders = {
  months: 'MM',
  days: 'DD',
  years: 'YYYY',
  hours: 'HH',
  minutes: 'MM',
  seconds: 'SS',
};

type TimescapeReturn = ReturnType<typeof useTimescape>;
type InputPlaceholders = Record<DateFormat | TimeFormat, string>;

/**
 * Date time picker Docs: {@link: https://shadcn-extension.vercel.app/docs/otp-input}
 */

const DatetimeGrid = forwardRef<
  HTMLDivElement,
  {
    format: DateTimeFormatDefaults;
    className?: string;
    timescape: Pick<TimescapeReturn, 'getRootProps' | 'getInputProps'>;
    placeholders: InputPlaceholders;
  }
>(
  (
    {
      format,
      className,
      timescape,
      placeholders,
    }: {
      format: DateTimeFormatDefaults;
      className?: string;
      timescape: Pick<TimescapeReturn, 'getRootProps' | 'getInputProps'>;
      placeholders: InputPlaceholders;
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'flex items-center w-fit p-1 border',
          className,
          'border-input rounded-md gap-1 selection:bg-transparent selection:text-foreground'
        )}
        {...timescape.getRootProps()}
        ref={ref}
      >
        {!!format?.length
          ? format.map((group, i) => (
              <React.Fragment key={i === 0 ? 'dates' : 'times'}>
                {!!group?.length
                  ? group.map((unit, j) => (
                      <React.Fragment key={unit}>
                        <Input
                          className={cn(
                            timePickerInputBase,
                            'min-w-8 bg-foreground/15',
                            {
                              'min-w-10': unit === 'years',
                            }
                          )}
                          {...timescape.getInputProps(unit)}
                          placeholder={placeholders[unit]}
                        />
                        {i === 0 && j < group.length - 1 ? (
                          // date separator
                          <span className={timePickerSeparatorBase}>/</span>
                        ) : (
                          j < group.length - 2 && (
                            // time separator
                            <span className={timePickerSeparatorBase}>:</span>
                          )
                        )}
                      </React.Fragment>
                    ))
                  : null}
                {format[1]?.length && !i ? (
                  <span
                    className={cn(
                      timePickerSeparatorBase,
                      'opacity-30 text-xl'
                    )}
                  >
                    |
                  </span>
                ) : null}
              </React.Fragment>
            ))
          : null}
      </div>
    );
  }
);

DatetimeGrid.displayName = 'DatetimeGrid';

interface DateTimeInput {
  value?: Date;
  format?: DateTimeFormatDefaults;
  placeholders?: InputPlaceholders;
  onChange?: Options['onChangeDate'];
  dtOptions?: Options;
  className?: string;
  disabled?: boolean;
}

export const DatetimePicker = forwardRef<HTMLDivElement, DateTimeInput>(
  (
    {
      value,
      format = DEFAULTS,
      placeholders,
      dtOptions,
      onChange,
      className,
      disabled,
    },
    ref
  ) => {
    const [currentDate, setCurrentDate] = useState<Date | undefined>(value);

    React.useEffect(() => {
      setCurrentDate(value);
    }, [value]);

    const handleDateChange = useCallback(
      (nextDate: Date | undefined) => {
        setCurrentDate(nextDate);
        onChange?.(nextDate);
      },
      [onChange]
    );

    const timescape = useTimescape({
      date: currentDate,
      onChangeDate: handleDateChange,
      disallowPartial: false,
      minDate: undefined,
      maxDate: undefined,
      hour12: false,
      digits: '2-digit',
      wheelControl: false,
    });

    return (
      <DatetimeGrid
        format={format}
        className={cn(className, disabled && 'opacity-50 pointer-events-none')}
        timescape={timescape}
        placeholders={placeholders ?? INPUT_PLACEHOLDERS}
        ref={ref}
      />
    );
  }
);

DatetimePicker.displayName = 'DatetimePicker';
