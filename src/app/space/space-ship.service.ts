import { Injectable } from '@angular/core';
import { OrderFormValue } from './order-form-value';
import { Observable, from, interval, BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { SpaceShip } from './space-ship';
import { SpaceShipType } from './space-ship-type.enum';
import { FighterShip } from './fighter-ship';
import { BomberShip } from './bomber-ship';

@Injectable({
  providedIn: 'root'
})
export class SpaceShipService {
  static shipProductionTime = 2000;

  hangarShips = new BehaviorSubject<SpaceShip[]>([]);

  constructor() {}

  produceShips(formValues: OrderFormValue): Observable<SpaceShip> {
    const shipClass =
      formValues.shipType === SpaceShipType.Fighter ? FighterShip : BomberShip;

    return interval(SpaceShipService.shipProductionTime).pipe(
      map(() => new shipClass()),
      take(formValues.shipCount),
      tap(spaceShip => {
        return this.hangarShips.next([...this.hangarShips.getValue(), spaceShip]);
      })
    );
  }
}
