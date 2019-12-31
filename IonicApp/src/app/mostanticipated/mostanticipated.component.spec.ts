import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MostanticipatedComponent } from './mostanticipated.component';

describe('MostanticipatedComponent', () => {
  let component: MostanticipatedComponent;
  let fixture: ComponentFixture<MostanticipatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostanticipatedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MostanticipatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
