import type { Product } from './types';

export type AppState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Product[] }
  | { status: 'error'; error: string };

export let currentState: AppState = { status: 'idle' };

export function updateState(newState: AppState) {
  currentState = newState;
  console.log("Trạng thái app hiện tại:", currentState.status);
}