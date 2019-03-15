import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pilot, PilotAttrs } from './pilot';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  constructor(private http: HttpClient) {}

  getPilots(): Observable<Pilot[]> {
    return this.http
      .get<PilotAttrs[]>('/api/pilots')
      .pipe(map(data => data.map(pilotAttrs => new Pilot(pilotAttrs))));
  }

  getPilot(id: number): Observable<Pilot> {
    return this.http
      .get<PilotAttrs>(`/api/pilots/${id}`)
      .pipe(map(pilotAttrs => new Pilot(pilotAttrs)));
  }

  savePilot(pilotAttrs: PilotAttrs): Observable<Pilot> {
    if (pilotAttrs.id) {
      return this.updatePilot(pilotAttrs);
    } else {
      return this.createPilot(pilotAttrs);
    }
  }

  updatePilot(data: PilotAttrs): Observable<Pilot> {
    return this.http
      .put<PilotAttrs>(`/api/pilots/${data.id}`, data)
      .pipe(map(pilotAttrs => new Pilot(pilotAttrs)));
  }

  createPilot(data: PilotAttrs): Observable<Pilot> {
    return this.http
      .post<PilotAttrs>(`/api/pilots`, data)
      .pipe(map(pilotAttrs => new Pilot(pilotAttrs)));
  }
}
