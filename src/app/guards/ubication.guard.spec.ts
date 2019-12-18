import { TestBed, async, inject } from '@angular/core/testing';

import { UbicationGuard } from './ubication.guard';

describe('UbicationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UbicationGuard]
    });
  });

  it('should ...', inject([UbicationGuard], (guard: UbicationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
