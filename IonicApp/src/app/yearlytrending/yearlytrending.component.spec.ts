import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YearlytrendingComponent } from './yearlytrending.component';

describe('YearlytrendingComponent', () => {
  let component: YearlytrendingComponent;
  let fixture: ComponentFixture<YearlytrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlytrendingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YearlytrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
