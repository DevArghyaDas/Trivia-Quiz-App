import { createContext, Dispatch, ReactNode, useReducer } from "react";

// --- Types ---
// Replace Option with a stricter shape if you know the fields (id, label, value, ...)
export type Option = Record<string, any>;

export type OptionsAction = {
  type: "SET_OPTIONS";
  payload: Option[];
};

export type ScoreAction =
  | { type: "SET_SCORE"; payload: number }
  | { type: "RESET_SCORE" };

// --- Reducers ---
const optionsReducer = (state: Option[], action: OptionsAction): Option[] => {
  switch (action.type) {
    case "SET_OPTIONS":
      return action.payload;
    default:
      return state;
  }
};

const scoreReducer = (
  state: number | null,
  action: ScoreAction
): number | null => {
  switch (action.type) {
    case "SET_SCORE":
      return action.payload;
    case "RESET_SCORE":
      return null;
    default:
      return state;
  }
};

// Context tuple: [score, scoreDispatch, options, optionsDispatch]
export type QuizContextType = [
  score: number | null,
  scoreDispatch: Dispatch<ScoreAction>,
  options: Option[],
  optionsDispatch: Dispatch<OptionsAction>
];

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider props
type ProviderProps = { children: ReactNode };

export const QuizContextProvider = ({ children }: ProviderProps) => {
  const [options, optionsDispatch] = useReducer(optionsReducer, [] as Option[]);
  const [score, scoreDispatch] = useReducer(
    scoreReducer,
    null as number | null
  );

  return (
    <QuizContext.Provider
      value={[score, scoreDispatch, options, optionsDispatch]}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
