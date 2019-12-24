import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchgenresComponent } from './searchgenres.component';

describe('SearchgenresComponent', () => {
  let component: SearchgenresComponent;
  let fixture: ComponentFixture<SearchgenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchgenresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchgenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
