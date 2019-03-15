import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PilotService } from './pilot.service';
import { of } from 'rxjs';
import { Pilot, PilotAttrs } from './pilot';

@Injectable()
export class HttpClientMock extends HttpClient {
  constructor() {
    super(null);
  }
}

describe('PilotService', () => {
  let pilotService;
  let http;

  beforeEach(() => {
    http = new HttpClientMock();
    pilotService = new PilotService(http);
  });

  describe('getPilot', () => {
    let pilotAttrs;
    beforeEach(() => {
      pilotAttrs = {
        id: 1,
        firstName: 'Mike',
        lastName: 'Tomsky',
        imageUrl: ''
      };
      spyOn(http, 'get').and.returnValue(of(pilotAttrs));
    });

    it('should make request to api', () => {
      pilotService.getPilot(1);
      expect(http.get).toHaveBeenCalledWith('/api/pilots/1');
    });

    it('should return pilot instance', () => {
      pilotService.getPilot(1).subscribe(pilot => {
        expect(pilot instanceof Pilot).toBeTruthy();
      });
    });
  });

  describe('save pilot with id', () => {
    let pilotAttrs;
    beforeEach(() => {
      pilotAttrs = {
        id: 1,
        firstName: 'Mike',
        lastName: 'Tomsky',
        imageUrl: ''
      };
      spyOn(http, 'put').and.returnValue(of(pilotAttrs));
    });

    it('should make request to api', () => {
      pilotService.savePilot(pilotAttrs);
      expect(http.put).toHaveBeenCalledWith('/api/pilots/1', pilotAttrs);
    });
  });

  describe('when pilot has not id', () => {
    let pilotAttrs;
    beforeEach(() => {
      pilotAttrs = {
        id: null,
        firstName: 'Mike',
        lastName: 'Tomsky',
        imageUrl: ''
      };
      spyOn(http, 'post').and.returnValue(of(pilotAttrs));
    });

    it('should make post request', () => {
      pilotService.savePilot(pilotAttrs);
      expect(http.post).toHaveBeenCalledWith('/api/pilots', pilotAttrs);
    });
  });
});
