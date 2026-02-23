import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalInteractionRepository } from './local-interaction-repository';
import { InteractionLog } from '../shared/types';
import { firstValueFrom } from 'rxjs';

describe('LocalInteractionRepository', () => {
    let repository: LocalInteractionRepository;

    const mockLog: InteractionLog = {
        id: '1',
        session_id: 'sess-123',
        widget_id: 'calc-1',
        interaction_type: 'slider-move',
        value: 5000,
        duration_ms: 150,
        timestamp: new Date().toISOString()
    };

    beforeEach(async () => {
        repository = new LocalInteractionRepository();
        await firstValueFrom(repository.clearLogs());
    });

    it('should log an interaction and retrieve all logs', async () => {
        await firstValueFrom(repository.log(mockLog));
        const logs = await firstValueFrom(repository.getAll());

        expect(logs).toHaveLength(1);
        expect(logs[0].id).toBe(mockLog.id);
    });

    it('should get logs by widget id', async () => {
        await firstValueFrom(repository.log(mockLog));
        await firstValueFrom(repository.log({ ...mockLog, id: '2', widget_id: 'other-calc' }));

        const logs = await firstValueFrom(repository.getByWidgetId('calc-1'));
        expect(logs).toHaveLength(1);
        expect(logs[0].widget_id).toBe('calc-1');
    });

    it('should clear all logs', async () => {
        await firstValueFrom(repository.log(mockLog));
        await firstValueFrom(repository.clearLogs());
        const logs = await firstValueFrom(repository.getAll());

        expect(logs).toHaveLength(0);
    });
});
