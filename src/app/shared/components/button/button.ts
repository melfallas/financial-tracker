import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="'btn-' + variant()"
      (click)="onButtonClick()"
      [attr.aria-busy]="loading()"
      [attr.aria-label]="label()"
    >
      @if (loading()) {
        <span class="mr-2 animate-spin">🌀</span>
      }
      {{ label() }}
    </button>
  `,
    styles: `
    :host {
      display: inline-block;
      width: 100%;
    }
    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: none;
      font-family: inherit;
      padding: 10px 20px;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      box-shadow: none !important;
      transform: none !important;
    }
    button:active:not(:disabled) {
      transform: scale(0.98);
    }
    .btn-primary {
      background-color: var(--color-emerald-green);
      color: white;
      box-shadow: 0 4px 14px 0 rgba(0, 200, 83, 0.3);
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #00b34a;
      box-shadow: 0 6px 20px rgba(0, 200, 83, 0.4);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background-color: var(--color-deep-blue);
      color: white;
    }
    .btn-secondary:hover:not(:disabled) {
      background-color: #142e56;
      transform: translateY(-1px);
    }
    .btn-ghost {
      background: transparent;
      color: var(--color-deep-blue);
      border: 2px solid var(--color-deep-blue);
    }
    .btn-ghost:hover:not(:disabled) {
      background: var(--color-deep-blue);
      color: white;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
    label = input.required<string>();
    variant = input<'primary' | 'secondary' | 'ghost'>('primary');
    type = input<'button' | 'submit' | 'reset'>('button');
    disabled = input<boolean>(false);
    loading = input<boolean>(false);

    clicked = output<void>();

    onButtonClick() {
        if (!this.disabled() && !this.loading()) {
            this.clicked.emit();
        }
    }
}
