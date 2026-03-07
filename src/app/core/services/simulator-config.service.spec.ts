import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimulatorConfigService } from './simulator-config.service';

describe('SimulatorConfigService', () => {
    let service: SimulatorConfigService;
    let httpMock: HttpTestingController;

    const mockDefaults = {
        general: {
            initial_capital: 1000,
            monthly_contributions: 100,
            annual_return: 8,
            annual_inflation: 4,
            term_in_years: 20
        },
        wealth_gap_chart: {
            critical_inflation: 10
        },
        cost_of_waiting: {
            low_loss_rate: 25,
            moderate_loss_rate: 50,
            critical_loss_rate: 75
        },
        retirement_simulator: {
            monthly_expenses: 2000,
            current_age: 30,
            retirement_age: 65
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SimulatorConfigService]
        });
        service = TestBed.inject(SimulatorConfigService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load config from JSON', (done) => {
        service.loadConfig().then(() => {
            const config = service.config();
            expect(config).toEqual(mockDefaults as any);
            done();
        });

        const req = httpMock.expectOne('assets/config/simulator-defaults.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockDefaults);
    });

    it('should get individual config values', (done) => {
        service.loadConfig().then(() => {
            expect(service.get('initial_capital')).toBe(1000);
            expect(service.get('annual_return')).toBe(8);
            expect(service.get('retirement_age')).toBe(65);
            done();
        });

        const req = httpMock.expectOne('assets/config/simulator-defaults.json');
        req.flush(mockDefaults);
    });
});
