"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildAmortizationSchedule,
  formatMXN,
  type MortgageResult,
} from "@/lib/mortgage";

interface AmortizationTableProps {
  result: MortgageResult;
  previewMonths?: number;
}

export function AmortizationTable({
  result,
  previewMonths = 12,
}: AmortizationTableProps) {
  const [expanded, setExpanded] = useState(false);

  const schedule = buildAmortizationSchedule(
    result.loanAmount,
    result.annualRate,
    result.termYears
  );

  if (schedule.length === 0) return null;

  const visibleRows = expanded ? schedule : schedule.slice(0, previewMonths);

  return (
    <div className="bg-white rounded-2xl border border-neutral-light/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-neutral-light/20 transition-colors"
      >
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg">
            Tabla de amortización
          </h3>
          <p className="text-xs text-neutral-dark mt-1">
            {expanded
              ? `Mostrando ${schedule.length} mensualidades`
              : `Primeros ${Math.min(previewMonths, schedule.length)} meses`}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-primary shrink-0" />
        )}
      </button>

      <div className="overflow-x-auto border-t border-neutral-light/50">
        <table className="w-full min-w-[640px] text-xs">
          <thead>
            <tr className="bg-neutral-light/20 text-neutral-dark uppercase tracking-wider">
              <th className="text-left font-semibold px-4 py-3">Mes</th>
              <th className="text-right font-semibold px-4 py-3">Pago</th>
              <th className="text-right font-semibold px-4 py-3">Capital</th>
              <th className="text-right font-semibold px-4 py-3">Interés</th>
              <th className="text-right font-semibold px-4 py-3">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row.month}
                className={cn(
                  "border-t border-neutral-light/30",
                  row.month % 2 === 0 ? "bg-white" : "bg-background/60"
                )}
              >
                <td className="px-4 py-2.5 font-medium text-foreground">
                  {row.month}
                </td>
                <td className="px-4 py-2.5 text-right text-foreground">
                  {formatMXN(row.payment)}
                </td>
                <td className="px-4 py-2.5 text-right text-foreground">
                  {formatMXN(row.principal)}
                </td>
                <td className="px-4 py-2.5 text-right text-neutral-dark">
                  {formatMXN(row.interest)}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-foreground">
                  {formatMXN(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!expanded && schedule.length > previewMonths && (
        <div className="px-5 py-3 border-t border-neutral-light/50 text-xs text-neutral-dark">
          Quedan {schedule.length - previewMonths} mensualidades. Expande la tabla
          para ver el desglose completo.
        </div>
      )}
    </div>
  );
}
