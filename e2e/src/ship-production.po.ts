import { element, by, browser } from 'protractor';

export class ShipProduction {
  nagivateTo() {
    browser.get('/space');
  }

  setShipQuantity(number: number) {
    element(by.name('shipCount')).sendKeys(number);
  }

  setFighterType() {
    element
      .all(by.css(`[name="shipType"]`))
      .first()
      .click();
  }

  submitProduceForm() {
    element(by.buttonText('Produkuj')).click();
  }

  getShipsCount() {
    return element.all(by.css('app-space-ship')).count();
  }
}
