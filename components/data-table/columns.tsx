'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionColumnProps<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

export function createActionColumn<TData>(
  props: ActionColumnProps<TData>
): ColumnDef<TData> {
  return {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {props.onView && (
              <DropdownMenuItem onClick={() => props.onView?.(data)}>
                View details
              </DropdownMenuItem>
            )}
            {props.onEdit && (
              <DropdownMenuItem onClick={() => props.onEdit?.(data)}>
                Edit
              </DropdownMenuItem>
            )}
            {props.onDelete && (
              <DropdownMenuItem
                onClick={() => props.onDelete?.(data)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}