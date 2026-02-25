import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.css',
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
