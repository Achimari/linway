import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reducePanels } from '../src/lib/panels.ts';

const closed = { open: null };

test('opening a sheet moves focus into it', () => {
  assert.deepEqual(reducePanels(closed, { type: 'toggle', id: 'story' }), { state: { open: 'story' }, focus: { to: 'panel', id: 'story' } });
});

test('switching goes straight to the other sheet', () => {
  assert.deepEqual(reducePanels({ open: 'story' }, { type: 'toggle', id: 'prayer' }), { state: { open: 'prayer' }, focus: { to: 'panel', id: 'prayer' } });
});

test('close button, Escape, and the same index button all return focus to the trigger', () => {
  assert.deepEqual(reducePanels({ open: 'year' }, { type: 'close' }), { state: closed, focus: { to: 'trigger', id: 'year' } });
  assert.deepEqual(reducePanels({ open: 'year' }, { type: 'toggle', id: 'year' }), { state: closed, focus: { to: 'trigger', id: 'year' } });
});

test('Escape with nothing open does nothing', () => {
  assert.deepEqual(reducePanels(closed, { type: 'close' }), { state: closed, focus: null });
});
