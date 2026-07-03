"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calculator, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MEXICAN_STATES,
  MORTGAGE_DISCLAIMER,
  MORTGAGE_LIMITS,
  buildComparisonScenarios,
  buildSimulationMessage,
  calculateMortgage,
  clampMortgageInput,
  formatMXN,
  formatPercent,
  type MortgageTermYears,
} from "@/lib/mortgage";
import { MortgageScenarioCard } from "./MortgageScenarioCard";
import { AmortizationTable } from "./AmortizationTable";
import { MortgageWhatsAppCta } from "./MortgageWhatsAppCta";
import { FadeUp } from "./animations/Reveal";

interface MortgageCalculatorProps {
  compact?: boolean;
  initialPropertyValue?: number;
  initialState?: string;
  propertyTitle?: string;
  propertyId?: string;
  showHeader?: boolean;
  showAmortization?: boolean;
  showDisclaimer?: boolean;
  showCta?: boolean;
  className?: string;
}

function parseInitialValue(value?: number, searchParam?: string | null): number {
  if (value && value > 0) return value;
  if (searchParam) {
    const parsed = Number(searchParam);
    if (!Number.isNaN(parsed) && parsed > 0) return parsed;
  }
  return MORTGAGE_LIMITS.defaultPropertyValue;
}

export function MortgageCalculator({
  compact = false,
  initialPropertyValue,
  initialState = "Jalisco",
  propertyTitle,
  propertyId,
  showHeader = true,
  showAmortization = true,
  showDisclaimer = true,
  showCta = true,
  className,
}: MortgageCalculatorProps) {
  const searchParams = useSearchParams();
  const precioParam = searchParams.get("precio");

  const [propertyValue, setPropertyValue] = useState<number>(() =>
    parseInitialValue(initialPropertyValue, precioParam)
  );
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(
    MORTGAGE_LIMITS.defaultDownPaymentPercent
  );
  const [termYears, setTermYears] = useState<MortgageTermYears>(
    MORTGAGE_LIMITS.defaultTermYears
  );
  const [annualRate, setAnnualRate] = useState<number>(
    MORTGAGE_LIMITS.defaultAnnualRate
  );
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (initialPropertyValue && initialPropertyValue > 0) {
      setPropertyValue(initialPropertyValue);
    }
  }, [initialPropertyValue]);

  useEffect(() => {
    if (!initialPropertyValue && precioParam) {
      const parsed = Number(precioParam);
      if (!Number.isNaN(parsed) && parsed > 0) {
        setPropertyValue(parsed);
      }
    }
  }, [precioParam, initialPropertyValue]);

  const result = useMemo(
    () =>
      calculateMortgage({
        propertyValue,
        downPaymentPercent,
        termYears,
        annualRate,
      }),
    [propertyValue, downPaymentPercent, termYears, annualRate]
  );

  const scenarios = useMemo(
    () => buildComparisonScenarios(propertyValue, termYears, annualRate),
    [propertyValue, termYears, annualRate]
  );

  const simulationMessage = useMemo(
    () => buildSimulationMessage(result, state),
    [result, state]
  );

  const handleScenarioSelect = (downPayment: number, rate: number) => {
    setDownPaymentPercent(downPayment);
    setAnnualRate(rate);
  };

  const handlePropertyValueInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const parsed = Number(digits);
    if (Number.isNaN(parsed)) return;
    const clamped = clampMortgageInput({ propertyValue: parsed });
    setPropertyValue(clamped.propertyValue);
  };

  return (
    <div className={cn("space-y-6 md:space-y-8", className)}>
      {showHeader && !compact && (
        <FadeUp>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Simulador hipotecario
              </p>
              <p className="text-sm text-neutral-dark">
                Calcula tu mensualidad y compara escenarios de enganche.
              </p>
            </div>
          </div>
        </FadeUp>
      )}

      {compact && showHeader && (
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground mb-1">
            Simula tu crédito
          </h3>
          <p className="text-sm text-neutral-dark">
            Estima la mensualidad para esta propiedad con distintos escenarios.
          </p>
        </div>
      )}

      <div
        className={cn(
          "grid gap-6 md:gap-8",
          compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"
        )}
      >
        {/* Formulario */}
        <div
          className={cn(
            "bg-white rounded-2xl border border-neutral-light/60 p-5 md:p-6 shadow-sm",
            !compact && "lg:col-span-5"
          )}
        >
          <h4 className="font-serif font-bold text-lg text-foreground mb-5">
            Datos de la simulación
          </h4>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Valor de la vivienda
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formatMXN(propertyValue)}
                onChange={(e) => handlePropertyValueInput(e.target.value)}
                className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary font-semibold"
              />
              <input
                type="range"
                min={MORTGAGE_LIMITS.minPropertyValue}
                max={MORTGAGE_LIMITS.maxPropertyValue}
                step={50_000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full mt-3 accent-primary"
              />
              <div className="flex justify-between text-[10px] text-neutral-dark mt-1">
                <span>{formatMXN(MORTGAGE_LIMITS.minPropertyValue)}</span>
                <span>{formatMXN(MORTGAGE_LIMITS.maxPropertyValue)}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Enganche
                </label>
                <span className="text-sm font-bold text-primary">
                  {formatPercent(downPaymentPercent, 0)} · {formatMXN(result.downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={MORTGAGE_LIMITS.minDownPaymentPercent}
                max={MORTGAGE_LIMITS.maxDownPaymentPercent}
                step={1}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full mt-2 accent-primary"
              />
              <div className="flex justify-between text-[10px] text-neutral-dark mt-1">
                <span>{MORTGAGE_LIMITS.minDownPaymentPercent}%</span>
                <span>{MORTGAGE_LIMITS.maxDownPaymentPercent}%</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Plazo
              </label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {MORTGAGE_LIMITS.termYears.map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setTermYears(years)}
                    className={cn(
                      "py-2.5 rounded-lg text-xs font-semibold border transition-colors",
                      termYears === years
                        ? "bg-primary text-white border-primary"
                        : "bg-neutral-light/30 text-foreground border-neutral-light hover:border-primary/40"
                    )}
                  >
                    {years} años
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
                  Tasa anual fija
                </label>
                <span className="text-sm font-bold text-primary">
                  {formatPercent(annualRate)}
                </span>
              </div>
              <input
                type="range"
                min={MORTGAGE_LIMITS.minAnnualRate}
                max={MORTGAGE_LIMITS.maxAnnualRate}
                step={0.05}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full mt-2 accent-secondary"
              />
              <div className="flex justify-between text-[10px] text-neutral-dark mt-1">
                <span>{MORTGAGE_LIMITS.minAnnualRate}%</span>
                <span>{MORTGAGE_LIMITS.maxAnnualRate}%</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Estado
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full mt-1 bg-neutral-light/50 border border-neutral-light rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
              >
                {MEXICAN_STATES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className={cn("space-y-5", !compact && "lg:col-span-7")}>
          <div className="bg-primary-dark rounded-2xl p-5 md:p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-light mb-2">
              Tu mensualidad estimada
            </p>
            <p className="text-3xl md:text-4xl font-serif font-bold">
              {formatMXN(result.monthlyPayment)}
              <span className="text-base font-sans font-medium text-white/70 ml-2">
                / mes
              </span>
            </p>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-white/10 text-xs">
              <div>
                <dt className="text-white/60">Crédito</dt>
                <dd className="font-semibold mt-1">{formatMXN(result.loanAmount)}</dd>
              </div>
              <div>
                <dt className="text-white/60">Enganche</dt>
                <dd className="font-semibold mt-1">
                  {formatMXN(result.downPaymentAmount)}
                </dd>
              </div>
              <div>
                <dt className="text-white/60">Intereses</dt>
                <dd className="font-semibold mt-1">
                  {formatMXN(result.totalInterest)}
                </dd>
              </div>
              <div>
                <dt className="text-white/60">Total</dt>
                <dd className="font-semibold mt-1">
                  {formatMXN(result.totalPayment)}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-dark mb-3">
              Compara escenarios (estilo BBVA)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <MortgageScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  highlighted={
                    downPaymentPercent === scenario.downPaymentPercent &&
                    Math.abs(annualRate - scenario.suggestedAnnualRate) < 0.01
                  }
                  onSelect={() =>
                    handleScenarioSelect(
                      scenario.downPaymentPercent,
                      scenario.suggestedAnnualRate
                    )
                  }
                />
              ))}
            </div>
          </div>

          {showAmortization && (
            <AmortizationTable result={result} previewMonths={12} />
          )}

          {showDisclaimer && (
            <div className="flex gap-3 rounded-xl bg-neutral-light/30 border border-neutral-light/60 p-4">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-dark leading-relaxed">
                {MORTGAGE_DISCLAIMER}
              </p>
            </div>
          )}

          {showCta && (
            <MortgageWhatsAppCta message={simulationMessage} variant="inline" />
          )}
        </div>
      </div>
    </div>
  );
}
