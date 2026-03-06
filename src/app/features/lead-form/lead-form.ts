import { Component, ChangeDetectionStrategy, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { I_LEAD_REPOSITORY } from '@core/interfaces/i-lead-repository';
import { Lead } from '@shared/types';

export type LeadFormState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
    selector: 'ft-lead-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './lead-form.html',
    styleUrl: './lead-form.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadForm {
    private fb = inject(FormBuilder);

    // Use the injection token, Angular DI provides LocalLeadRepository
    private leadRepo = inject(I_LEAD_REPOSITORY);

    // Expose an event when successfully submitted for parent components to react (e.g., closing a modal or triggering US2.2 PDF)
    onSuccess = output<Lead>();
    onDownloadClick = output<void>();

    currentState = signal<LeadFormState>('idle');
    errorMessage = signal<string | null>(null);

    form = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        gdprConsent: [false, Validators.requiredTrue],
    });

    // Track field interactions for validation feedback
    submitted = signal<boolean>(false);

    // Computeds for template logic
    isSubmitting = computed(() => this.currentState() === 'submitting');
    isSuccess = computed(() => this.currentState() === 'success');
    isError = computed(() => this.currentState() === 'error');

    async onSubmit() {
        this.submitted.set(true);

        if (this.form.invalid) {
            this.currentState.set('error');
            this.errorMessage.set('Por favor, completa los campos correctamente.');

            // Trigger M1 Shake animation
            const formElement = document.querySelector('.lead-form-container');
            if (formElement) {
                formElement.classList.remove('animate-shake');
                void formElement.clientWidth; // Trigger reflow
                formElement.classList.add('animate-shake');
            }
            return;
        }

        this.currentState.set('submitting');
        this.errorMessage.set(null);

        try {
            const formValue = this.form.value;
            const newLead: Lead = {
                id: crypto.randomUUID(),
                firstName: formValue.firstName!,
                lastName: formValue.lastName!,
                email: formValue.email!,
                createdAt: new Date().toISOString(),
                source: 'landing-page'
            };

            // Ensure persistence (US1.5 integration)
            await lastValueFrom(this.leadRepo.save(newLead));

            // Simulate network request for UI feel (800ms)
            await new Promise((resolve) => setTimeout(resolve, 800));

            this.currentState.set('success');
            this.onSuccess.emit(newLead);

        } catch (error) {
            console.error('Error saving lead:', error);
            this.currentState.set('error');
            this.errorMessage.set('Ocurrió un error al procesar tu solicitud. Intenta de nuevo.');
        }
    }

    // Helper to check errors on fields
    hasError(field: 'firstName' | 'lastName' | 'email' | 'gdprConsent') {
        const control = this.form.get(field);
        return control && control.invalid && (control.dirty || control.touched || this.submitted());
    }
}
