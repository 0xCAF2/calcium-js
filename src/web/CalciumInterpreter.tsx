import { Interpreter, type Code } from "./interpreter"

export interface CalciumInterpreterProps {
  code: Code
}

export function CalciumInterpreter(props: CalciumInterpreterProps) {
  const cal = new Interpreter(props.code)

  return <>{cal.show()}</>
}
