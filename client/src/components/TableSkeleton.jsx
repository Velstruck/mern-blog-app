import React from 'react'
import { Skeleton } from './ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TableSkeleton = ({ columns, rows = 5 }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className={col.className}>
              <Skeleton className="h-4 w-[100px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(rows).fill(0).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex} className={col.className}>
                {col.type === 'image' ? (
                  <Skeleton className="h-10 w-10 rounded-full" />
                ) : col.type === 'actions' ? (
                  <div className="flex gap-3">
                    <Skeleton className="h-9 w-9" />
                    {col.doubleAction && <Skeleton className="h-9 w-9" />}
                  </div>
                ) : (
                  <Skeleton className={`h-4 ${col.skeletonWidth || 'w-[100px]'}`} />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableSkeleton
