/**
 * The MultiStep module mainly contains a context for managing multi-step forms,
 * as well as template components that implement the context (eg the default page section).
 *
 * The context provider manages the general state of the multistep form by doing the following:
 *   - Managing steps (useSteps)
 *   - Data persistence (ephemeral, session, browser, remote DB)
 */

// UI layout components containing the custom context provider
export { MultiStepTemplate } from './MultiStepTemplate';

// hook to use the custom context provider
export { useMultiStep } from './MultiStep.context';
