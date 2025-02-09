'use client';

import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export function AreaSelectionForm() {
  const { control, watch } = useFormContext();
  const selectedRw = watch('rwId');

  const { data: rwList, isLoading: isLoadingRW } = useQuery({
    queryKey: ['rw'],
    queryFn: async () => {
      const res = await fetch('/api/rw');
      if (!res.ok) throw new Error('Failed to fetch RW list');
      return res.json();
    },
  });

  const { data: rtList, isLoading: isLoadingRT } = useQuery({
    queryKey: ['rt', selectedRw],
    queryFn: async () => {
      const res = await fetch(`/api/rt?rwId=${selectedRw}`);
      if (!res.ok) throw new Error('Failed to fetch RT list');
      return res.json();
    },
    enabled: !!selectedRw,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Pilih RT/RW</h3>
        <p className="text-sm text-muted-foreground">
          Pilih RT dan RW yang sesuai dengan wilayah Anda
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="rwId"
          rules={{ required: 'RW harus dipilih' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RW</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih RW" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingRW ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : rwList?.length === 0 ? (
                    <SelectItem value="" disabled>
                      Tidak ada RW tersedia
                    </SelectItem>
                  ) : (
                    rwList?.map((rw: any) => (
                      <SelectItem key={rw.id} value={rw.id}>
                        RW {rw.number} - {rw.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rtId"
          rules={{ required: 'RT harus dipilih' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RT</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedRw}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedRw ? 'Pilih RT' : 'Pilih RW terlebih dahulu'
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingRT ? (
                    <div className="flex items-center justify-center p-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : rtList?.length === 0 ? (
                    <SelectItem value="" disabled>
                      Tidak ada RT tersedia
                    </SelectItem>
                  ) : (
                    rtList?.map((rt: any) => (
                      <SelectItem key={rt.id} value={rt.id}>
                        RT {rt.number} - {rt.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
