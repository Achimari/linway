// Which information sheet is open, and where keyboard focus should go next.
// Pure, so tests can run it without a browser; index.astro applies it to the DOM.

export type PanelState = { open: string | null };
export type PanelAction = { type: 'toggle'; id: string } | { type: 'close' };
/** `panel`: move focus into the opened sheet. `trigger`: return it to the sheet's index button. */
export type FocusTarget = { to: 'panel' | 'trigger'; id: string } | null;

export function reducePanels(state: PanelState, action: PanelAction): { state: PanelState; focus: FocusTarget } {
  if (action.type === 'close') {
    // Close button or Escape. With nothing open there is nothing to do.
    return state.open ? { state: { open: null }, focus: { to: 'trigger', id: state.open } } : { state, focus: null };
  }
  if (state.open === action.id) {
    // Pressing the open sheet's own index button closes it; focus stays on that button.
    return { state: { open: null }, focus: { to: 'trigger', id: action.id } };
  }
  // Opening, or switching straight to another sheet.
  return { state: { open: action.id }, focus: { to: 'panel', id: action.id } };
}
