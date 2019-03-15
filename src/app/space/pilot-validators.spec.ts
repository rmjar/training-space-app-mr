import { PilotValidators } from './pilot-validators';
import { FormControl } from '@angular/forms';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

describe('PilotValidators', () => {
  it('should create an instance', () => {
    expect(new PilotValidators()).toBeTruthy();
  });

  describe('pilotName', () => {
    it('should return null', () => {
      const control = new FormControl('');
      expect(PilotValidators.pilotName(control)).toBeNull();
    });

    it('should return null', () => {
      const control = new FormControl('Filip');
      expect(PilotValidators.pilotName(control)).toBeNull();
    });

    it('should return null', () => {
      const control = new FormControl('filip');
      expect(PilotValidators.pilotName(control)).toEqual({ pilotName: true });
    });
  });

  describe('pilotForbidden', () => {
    describe('when value is empty', () => {
      it('should return observable with null', () => {
        const control = new FormControl('');
        PilotValidators.pilotForbidden(control).subscribe(result =>
          expect(result).toBeNull()
        );
      });

      describe('when value is forbidden', () => {
        it('should return observable with validation object', () => {
          const control = new FormControl('Ciapciak');
          spyOn(ajax, 'get').and.returnValue(
            of({ response: [{ name: 'Ciapciak' }] })
          );
          PilotValidators.pilotForbidden(control).subscribe(result =>
            expect(result).toEqual({ pilotForbidden: true })
          );
        });
      });

      describe('when value is not forbidden', () => {
        it('should return observable with null', () => {
          const control = new FormControl('Adama');
          spyOn(ajax, 'get').and.returnValue(of({ response: [] }));
          PilotValidators.pilotForbidden(control).subscribe(result =>
            expect(result).toBeNull()
          );
        });
      });

    });
  });
});
