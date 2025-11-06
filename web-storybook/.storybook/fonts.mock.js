
// Return a class for components that read `.className`
// and return the *variable-class* that Next would normally give you.
// We translate the requested CSS custom property (e.g. "--font-sans")
// into a class we can style if needed. Since we set :root vars, this can be empty too.
export const Lato = (opts) => ({
  className: 'font-sans', // optional helper
  // If the real code asks for variable: '--font-sans', return a class name we could target.
  // Not strictly needed since we set :root, but harmless to keep API parity.
  variable: opts?.variable ? `var-${opts.variable.replace(/^--/, '')}` : '',
});

export const Mulish = (opts) => ({
  className: 'font-muli',
  variable: opts?.variable ? `var-${opts.variable.replace(/^--/, '')}` : '',
});