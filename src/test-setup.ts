import { vi } from 'vitest';
import 'vitest-canvas-mock';
import '@testing-library/jest-dom';

// Jasmine-compatible spyOn shim for Vitest environment
if (typeof (globalThis as any).spyOn === 'undefined') {
  (globalThis as any).spyOn = vi.spyOn;
}

import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

// Mock IntersectionObserver for JSDOM
// Mock IntersectionObserver for JSDOM
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
(window as any).IntersectionObserver = MockIntersectionObserver;

TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
