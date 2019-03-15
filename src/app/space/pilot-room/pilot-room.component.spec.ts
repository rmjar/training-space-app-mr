import { Component, Input, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { Pilot } from './../pilot';
import { PilotService } from '../pilot.service';
import { PilotRoomComponent } from './pilot-room.component';

@Injectable()
class PilotMockService extends PilotService {
  constructor() {
    super(null);
  }
}

@Component({
  selector: 'app-pilot',
  template: 'pilot {{pilot.firstName}} <ng-content></ng-content>'
})
class PilotMockComponent {
  @Input() pilot: Pilot;
}

fdescribe('PilotRoomComponent', () => {
  let component: PilotRoomComponent;
  let fixture: ComponentFixture<PilotRoomComponent>;
  let pilotService: PilotService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PilotRoomComponent, PilotMockComponent],
      providers: [{ provide: PilotService, useClass: PilotMockService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    pilotService = TestBed.get(PilotService);
    fixture = TestBed.createComponent(PilotRoomComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when pilots fetched successfully', () => {
    let pilot: Pilot;

    beforeEach(() => {
      pilot = new Pilot({ id: 1, firstName: 'Mike', lastName: 'Tomsky' });
      spyOn(pilotService, 'getPilots').and.returnValue(of([pilot]));
      spyOn(component.selected, 'emit');
      fixture.detectChanges();
    });

    it('should display pilots', () => {
      expect(fixture.nativeElement.textContent).toContain('Mike');
    });

    describe('when pilot is being selected', () => {
      beforeEach(() => {
        const selectButton = fixture.debugElement.query(
          By.css('.select-button')
        );
        selectButton.nativeElement.click();
      });

      it('should store selected pilot', () => {
        expect(component.selectedPilot).toBe(pilot);
      });

      it('should emit pilot', () => {
        expect(component.selected.emit).toHaveBeenCalledWith(pilot);
      });
    });

    describe('when pilot is being deselected', () => {
      beforeEach(() => {
        component.selectedPilot = pilot;
        fixture.detectChanges();
        const deselectButton = fixture.debugElement.query(
          By.css('.deselect-button')
        );
        deselectButton.nativeElement.click();
      });

      it('should store deselected pilot', () => {
        expect(component.selectedPilot).toBeNull();
      });

      it('should emit null', () => {
        expect(component.selected.emit).toHaveBeenCalledWith(null);
      });
    });
  });
  describe('when pilots fetch failed', () => {
    beforeEach(() => {
      spyOn(pilotService, 'getPilots').and.returnValue(throwError('error'));
      spyOn(window, 'alert');
      fixture.detectChanges();
    });

    it('should display alert with warning', () => {
      expect(window.alert).toHaveBeenCalledWith(jasmine.any(String));
    });
  });
});
