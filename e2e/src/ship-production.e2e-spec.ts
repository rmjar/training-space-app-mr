import { ShipProduction } from './ship-production.po';

describe('Ship production', () => {
  let page: ShipProduction;

  beforeEach(() => {
      page = new ShipProduction();
      page.nagivateTo();
  });

  describe('when performed ship production', () => {
    beforeEach(() => {
        page.setShipQuantity(1);
        page.setFighterType();
        page.submitProduceForm();
    });

    it('should render produced ship', () => {
      expect(page.getShipsCount()).toEqual(1);
    });
  });
});
