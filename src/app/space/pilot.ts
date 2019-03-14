export class Pilot {
  static defaultImageUrl = "/assets/unknown-pilot.png";

  firstName: string;
  lastName: string;
  imageUrl: string;

  constructor(fullName: string, imageUrl = Pilot.defaultImageUrl) {
    this.fullName = fullName;
    this.imageUrl = imageUrl;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(fullName: string) {
    const tmp = fullName.split(" ");
    this.firstName = tmp[0];
    this.lastName = tmp[1];
  }
}
