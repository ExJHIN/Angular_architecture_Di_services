import { Injectable } from '@angular/core';
import { ServiceType } from '../consts/service-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NoteServiceSelectorService {
  private serviceTypeKey = 'noteServiceType';

  getServiceType(): ServiceType {
    const storedType = localStorage.getItem(this.serviceTypeKey) as ServiceType;

    if (
      storedType === ServiceType.Api ||
      storedType === ServiceType.LocalStorage
    ) {
      return storedType;
    }

    return ServiceType.LocalStorage;
  }

  setServiceType(type: ServiceType): void {
    localStorage.setItem(this.serviceTypeKey, type);
  }
}
