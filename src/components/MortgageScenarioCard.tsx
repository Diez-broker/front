"use client";

import { cn } from "@/lib/utils";
import {
  formatMXN,
  formatPercent,
  type MortgageScenario,
} from "@/lib/mortgage";

interface MortgageScenarioCardProps {
  scenario: MortgageScenario;
  highlighted?: boolean;
  onSelect?: () => void;
}

export function MortgageScenarioCard({
  scenario,
  highlighted = false,
  onSelect,
}: MortgageScenarioCardProps) {
  const { result } = scenario;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-2xl border p-5 md:p-6 transition-all",
        highlighted
          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
          : "border-neutral-light/60 bg-white hover:border-primary/30 hover:bg-primary/[0.02]",
        onSelect && "cursor-pointer"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {scenario.label}
          </p>
          <p className="text-xs text-neutral-dark mt-1">
            Tasa sugerida {formatPercent(scenario.suggestedAnnualRate)}
          </p>
        </div>
        <span className="text-xs font-semibold text-neutral-dark bg-neutral-light/40 px-2.5 py-1 rounded-full">
          {formatPercent(result.downPaymentPercent, 0)} enganche
        </span>
      </div>

      <p className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1">
        {formatMXN(result.monthlyPayment)}
        <span className="text-sm font-sans font-medium text-neutral-dark ml-1">
          / mes
        </span>
      </p>

      <dl className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-light/50 text-xs">
        <div>
          <dt className="text-neutral-dark">Crédito</dt>
          <dd className="font-semibold text-foreground mt-0.5">
            {formatMXN(result.loanAmount)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-dark">Enganche</dt>
          <dd className="font-semibold text-foreground mt-0.5">
            {formatMXN(result.downPaymentAmount)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-dark">Intereses totales</dt>
          <dd className="font-semibold text-foreground mt-0.5">
            {formatMXN(result.totalInterest)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-dark">Total a pagar</dt>
          <dd className="font-semibold text-foreground mt-0.5">
            {formatMXN(result.totalPayment)}
          </dd>
        </div>
      </dl>
    </button>
  );
}
