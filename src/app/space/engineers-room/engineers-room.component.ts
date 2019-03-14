import { SpaceShipType } from './../space-ship-type.enum';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderFormValue } from '../order-form-value';
import { SpaceShip } from '../space-ship';
import { SpaceShipService } from '../space-ship.service';

interface ShipType {
  label: string;
  value: SpaceShipType;
}

@Component({
  selector: 'app-engineers-room',
  templateUrl: './engineers-room.component.html',
  styleUrls: ['./engineers-room.component.css']
})
export class EngineersRoomComponent implements OnInit {
  spaceShipTypes: ShipType[] = [
    { label: 'Fighter', value: SpaceShipType.Fighter },
    { label: 'Bomber', value: SpaceShipType.Bomber }
  ];
  isProducing = false;

  @Output() shipProduced = new EventEmitter<SpaceShip>();

  constructor(private spaceShipService: SpaceShipService) {}

  ngOnInit() {}

  orderSpaceShips(formValue: OrderFormValue): void {
    this.isProducing = true;
    this.spaceShipService.produceShips(formValue).subscribe({
      next: ship => this.shipProduced.emit(ship),
      complete: () => (this.isProducing = false)
    });
  }
}
