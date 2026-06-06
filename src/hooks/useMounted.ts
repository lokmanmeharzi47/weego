import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * A hook that safely returns true when the component is mounted on the client.
 * Uses useSyncExternalStore to prevent hydration mismatch and avoids the
 * react-hooks/set-state-in-effect lint error.
 */
export function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
