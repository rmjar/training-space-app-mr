import { Component, OnInit } from '@angular/core';
import { SpaceShipService } from '../space-ship.service';
import { DestructionFormValue } from '../destruction-form-value';

@Component({
  selector: 'app-destruction-room',
  templateUrl: './destruction-room.component.html',
  styleUrls: ['./destruction-room.component.css']
})
export class DestructionRoomComponent implements OnInit {
  spaceShips = this.spaceShipService.hangarShips;

  constructor(private spaceShipService: SpaceShipService) {}

  ngOnInit() {}

  orderDestruction(formValue: DestructionFormValue) {
    this.spaceShipService.removeShip(formValue);
  }
}
