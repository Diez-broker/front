export const MORTGAGE_LIMITS = {
  minPropertyValue: 500_000,
  maxPropertyValue: 50_000_000,
  defaultPropertyValue: 3_000_000,
  minDownPaymentPercent: 10,
  maxDownPaymentPercent: 50,
  defaultDownPaymentPercent: 20,
  minAnnualRate: 8,
  maxAnnualRate: 15,
  defaultAnnualRate: 10.5,
  termYears: [5, 10, 15, 20] as const,
  defaultTermYears: 20,
} as const;

export const MEXICAN_STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;

export type MortgageTermYears = (typeof MORTGAGE_LIMITS.termYears)[number];

export interface MortgageInput {
  propertyValue: number;
  downPaymentPercent: number;
  termYears: MortgageTermYears;
  annualRate: number;
}

export interface MortgageResult {
  propertyValue: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanAmount: number;
  termYears: MortgageTermYears;
  annualRate: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface MortgageScenario {
  id: "down10" | "down30";
  label: string;
  downPaymentPercent: number;
  suggestedAnnualRate: number;
  result: MortgageResult;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function clampMortgageInput(input: Partial<MortgageInput>): MortgageInput {
  return {
    propertyValue: clamp(
      input.propertyValue ?? MORTGAGE_LIMITS.defaultPropertyValue,
      MORTGAGE_LIMITS.minPropertyValue,
      MORTGAGE_LIMITS.maxPropertyValue
    ),
    downPaymentPercent: clamp(
      input.downPaymentPercent ?? MORTGAGE_LIMITS.defaultDownPaymentPercent,
      MORTGAGE_LIMITS.minDownPaymentPercent,
      MORTGAGE_LIMITS.maxDownPaymentPercent
    ),
    termYears: (MORTGAGE_LIMITS.termYears.includes(
      input.termYears as MortgageTermYears
    )
      ? input.termYears
      : MORTGAGE_LIMITS.defaultTermYears) as MortgageTermYears,
    annualRate: clamp(
      input.annualRate ?? MORTGAGE_LIMITS.defaultAnnualRate,
      MORTGAGE_LIMITS.minAnnualRate,
      MORTGAGE_LIMITS.maxAnnualRate
    ),
  };
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  termYears: number
): number {
  if (loanAmount <= 0) return 0;

  const months = termYears * 12;
  if (months <= 0) return 0;

  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return loanAmount / months;

  const factor = Math.pow(1 + monthlyRate, months);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

export function calculateMortgage(rawInput: Partial<MortgageInput>): MortgageResult {
  const input = clampMortgageInput(rawInput);
  const downPaymentAmount = input.propertyValue * (input.downPaymentPercent / 100);
  const loanAmount = Math.max(input.propertyValue - downPaymentAmount, 0);
  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    input.annualRate,
    input.termYears
  );
  const totalPayment = monthlyPayment * input.termYears * 12;
  const totalInterest = Math.max(totalPayment - loanAmount, 0);

  return {
    propertyValue: input.propertyValue,
    downPaymentPercent: input.downPaymentPercent,
    downPaymentAmount,
    loanAmount,
    termYears: input.termYears,
    annualRate: input.annualRate,
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}

export function buildAmortizationSchedule(
  loanAmount: number,
  annualRate: number,
  termYears: number
): AmortizationRow[] {
  if (loanAmount <= 0) return [];

  const months = termYears * 12;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualRate, termYears);
  const monthlyRate = annualRate / 12 / 100;
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let month = 1; month <= months; month++) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principal = Math.min(monthlyPayment - interest, balance);
    balance = Math.max(balance - principal, 0);

    schedule.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance,
    });
  }

  return schedule;
}

export function getSuggestedRateForDownPayment(
  downPaymentPercent: number,
  baseRate: number = MORTGAGE_LIMITS.defaultAnnualRate
): number {
  if (downPaymentPercent >= 30) return clamp(baseRate - 0.4, 8, 15);
  if (downPaymentPercent <= 10) return clamp(baseRate + 0.7, 8, 15);
  return baseRate;
}

export function buildComparisonScenarios(
  propertyValue: number,
  termYears: MortgageTermYears,
  baseRate: number = MORTGAGE_LIMITS.defaultAnnualRate
): MortgageScenario[] {
  const scenarios: Array<{
    id: MortgageScenario["id"];
    label: string;
    downPaymentPercent: number;
  }> = [
    { id: "down10", label: "Enganche 10%", downPaymentPercent: 10 },
    { id: "down30", label: "Enganche 30%", downPaymentPercent: 30 },
  ];

  return scenarios.map((scenario) => {
    const suggestedAnnualRate = getSuggestedRateForDownPayment(
      scenario.downPaymentPercent,
      baseRate
    );

    return {
      ...scenario,
      suggestedAnnualRate,
      result: calculateMortgage({
        propertyValue,
        downPaymentPercent: scenario.downPaymentPercent,
        termYears,
        annualRate: suggestedAnnualRate,
      }),
    };
  });
}

export function buildSimulationMessage(result: MortgageResult, state?: string): string {
  const lines = [
    "Hola, me interesa recibir asesoría hipotecaria. Esta es mi simulación:",
    "",
    `Valor de la vivienda: ${formatMXN(result.propertyValue)}`,
    `Enganche (${formatPercent(result.downPaymentPercent, 0)}): ${formatMXN(result.downPaymentAmount)}`,
    `Monto del crédito: ${formatMXN(result.loanAmount)}`,
    `Plazo: ${result.termYears} años`,
    `Tasa anual: ${formatPercent(result.annualRate)}`,
    `Mensualidad estimada: ${formatMXN(result.monthlyPayment)}`,
  ];

  if (state) {
    lines.push(`Estado: ${state}`);
  }

  return lines.join("\n");
}

export const MORTGAGE_DISCLAIMER =
  "Simulación informativa. No constituye oferta de crédito. Tasas, CAT, seguros y comisiones dependen del banco y tu perfil crediticio. Diez Brokers te conecta con opciones bancarias e Infonavit; los montos finales los define la institución financiera.";
