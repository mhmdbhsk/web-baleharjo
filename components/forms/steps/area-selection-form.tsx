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

export function AreaSelectionForm() {
  const { control, watch } = useFormContext();
  const selectedRt = watch('rtId');

  const { data: rtList } = useQuery({
    queryKey: ['users', 'rt'],
    queryFn: async () => {
      const res = await fetch('/api/users/area?role=RT');
      if (!res.ok) throw new Error('Failed to fetch RT list');
      return res.json();
    },
  });

  const { data: rwList } = useQuery({
    queryKey: ['users', 'rw', selectedRt],
    queryFn: async () => {
      const rt = rtList?.find((r: any) => r.id === selectedRt);
      if (!rt) return [];
      const res = await fetch(`/api/users/area?role=RW&areaRt=${rt.areaRt}`);
      if (!res.ok) throw new Error('Failed to fetch RW list');
      return res.json();
    },
    enabled: !!selectedRt && !!rtList,
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
          name="rtId"
          rules={{ required: 'RT harus dipilih' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RT</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih RT" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rtList?.map((rt: any) => (
                    <SelectItem key={rt.id} value={rt.id}>
                      {rt.name} - RT {rt.areaRt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="rwId"
          rules={{ required: 'RW harus dipilih' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>RW</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedRt}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedRt ? 'Pilih RW' : 'Pilih RT terlebih dahulu'
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rwList?.map((rw: any) => (
                    <SelectItem key={rw.id} value={rw.id}>
                      {rw.name} - RW {rw.areaRw}
                    </SelectItem>
                  ))}
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
