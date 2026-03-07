import 'vitest/globals';

// Mock IntersectionObserver for Vitest/JSDOM environment
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(public callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver;
if (typeof window !== 'undefined') {
  (window as any).IntersectionObserver = MockIntersectionObserver;
}