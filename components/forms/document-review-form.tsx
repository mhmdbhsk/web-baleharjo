'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  comment: z.string().min(1, 'Komentar harus diisi'),
  status: z.enum(['APPROVED', 'REJECTED']),
});

export type DocumentReviewFormValues = z.infer<typeof formSchema>;

interface DocumentReviewFormProps {
  onSubmit: (values: DocumentReviewFormValues) => void;
  isLoading?: boolean;
}

export function DocumentReviewForm({
  onSubmit,
  isLoading,
}: DocumentReviewFormProps) {
  const form = useForm<DocumentReviewFormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komentar</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan komentar" {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="destructive"
            disabled={isLoading}
            onClick={() =>
              form.handleSubmit((values) =>
                onSubmit({ ...values, status: 'REJECTED' })
              )
            }
          >
            Tolak
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={() =>
              form.handleSubmit((values) =>
                onSubmit({ ...values, status: 'APPROVED' })
              )
            }
          >
            Terima
          </Button>
        </div>
      </form>
    </Form>
  );
}
