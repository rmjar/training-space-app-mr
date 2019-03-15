import { PilotService } from './pilot.service';
import { Injectable } from '@angular/core';
import { Pilot } from './pilot';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PilotResolver implements Resolve<Pilot> {
  constructor(private pilotService: PilotService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params.id === 'new') {
      return of(new Pilot());
    }
    return this.pilotService.getPilot(route.params.id);
  }
}
