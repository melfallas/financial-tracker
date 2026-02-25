import 'vitest-canvas-mock';
import '@testing-library/jest-dom';
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
