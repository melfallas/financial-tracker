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
(window as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
