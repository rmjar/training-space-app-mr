import { Pilot } from "./pilot";

export abstract class SpaceShip {
  modelName: string;
  imageUrl: string;
  health = 100;
  activeShields: true;
  activeWeapons: true;
  pilot: Pilot;

  constructor(modelName: string, imgUrl: string, pilot: Pilot) {
    this.modelName = modelName;
    this.imageUrl = imgUrl;
    this.pilot = pilot;
  }
}
