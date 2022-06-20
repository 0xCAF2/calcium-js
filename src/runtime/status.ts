/**
 * the result of `Runtime`'s methods
 */
enum Status {
  AtBreakpoint = 'AtBreakpoint',
  Paused = 'Paused',
  Running = 'Running',
  Terminated = 'Terminated',
  UnhandledError = 'UnhandledError',
}

export default Status
