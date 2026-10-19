export interface DivisorInfo {
  value: number;
  isProper: boolean; // strictly less than n
  pair?: number;
}

export interface CalculationStep {
  step: number;
  i: number;
  isDivisor: boolean;
  remainder: number;
  currentSum: number;
  note: string;
}

export interface PerfectNumberResult {
  number: number;
  isPerfect: boolean;
  properDivisors: number[];
  sumOfDivisors: number;
  difference: number;
  formulaString: string;
  steps: CalculationStep[];
  executionTimeMs: number;
}

export interface ScenarioItem {
  id: string;
  input: number;
  expectedResult: boolean;
  description: string;
  sourceScenario?: boolean;
}
