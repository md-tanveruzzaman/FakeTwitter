import { BehaviorSubject } from 'rxjs';

export interface ILoadingService {
  loadingSub: BehaviorSubject<boolean>;
  setLoading(loading: boolean, url: string): void;
}