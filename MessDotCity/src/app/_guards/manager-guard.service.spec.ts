/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagerGuardService } from './manager-guard.service';

describe('Service: ManagerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerGuardService]
    });
  });

  it('should ...', inject([ManagerGuardService], (service: ManagerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
