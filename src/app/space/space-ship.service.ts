import { Injectable } from '@angular/core';
import { OrderFormValue } from './order-form-value';
import { Observable, from, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SpaceShip } from './space-ship';
import { SpaceShipType } from './space-ship-type.enum';
import { FighterShip } from './fighter-ship';
import { BomberShip } from './bomber-ship';

@Injectable({
  providedIn: 'root'
})
export class SpaceShipService {
  static shipProductionTime = 2000;

  constructor() {}

  produceShips(formValues: OrderFormValue): Observable<SpaceShip> {
    const shipClass =
      formValues.shipType === SpaceShipType.Fighter ? FighterShip : BomberShip;

    return interval(SpaceShipService.shipProductionTime).pipe(
      map(() => new shipClass()),
      take(formValues.shipCount)
    );
  }
}
