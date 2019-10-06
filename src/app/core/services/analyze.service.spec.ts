import { TestBed } from '@angular/core/testing';

import { AnalyzeService } from './analyze.service';

describe('AnalyzeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalyzeService = TestBed.get(AnalyzeService);
    expect(service).toBeTruthy();
  });
});
