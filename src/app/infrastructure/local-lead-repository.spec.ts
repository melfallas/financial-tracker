import { LocalLeadRepository } from './local-lead-repository';
import { Lead } from '../shared/types';
import { firstValueFrom } from 'rxjs';

describe('LocalLeadRepository', () => {
    let repository: LocalLeadRepository;

    const mockLead: Lead = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        createdAt: new Date().toISOString(),
        source: 'landing-page'
    };

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        repository = new LocalLeadRepository();
    });

    it('should save a lead and retrieve all leads', async () => {
        await firstValueFrom(repository.save(mockLead));
        const leads = await firstValueFrom(repository.getAll());

        expect(leads.length).toBe(1);
        expect(leads[0]).toEqual(mockLead);
    });

    it('should get a lead by id', async () => {
        await firstValueFrom(repository.save(mockLead));
        const lead = await firstValueFrom(repository.getById('1'));

        expect(lead).toEqual(mockLead);
    });

    it('should return null if lead id does not exist', async () => {
        const lead = await firstValueFrom(repository.getById('non-existent'));
        expect(lead).toBeNull();
    });

    it('should delete a lead', async () => {
        await firstValueFrom(repository.save(mockLead));
        await firstValueFrom(repository.delete('1'));
        const leads = await firstValueFrom(repository.getAll());

        expect(leads.length).toBe(0);
    });
});
