import { Interpreter, type Code } from "./interpreter"

interface CalciumInterpreterProps {
  code: Code
}

export function CalciumInterpreter(props: CalciumInterpreterProps) {
  const cal = new Interpreter(props.code)

  return <div>{cal.show()}</div>
}
