import { TestBed } from '@angular/core/testing';

import { MenuActionsService } from './variables-actions.service';

describe('MenuActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuActionsService = TestBed.get(MenuActionsService);
    expect(service).toBeTruthy();
  });
});
