import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Gamedetails2Page } from './gamedetails2.page';

describe('Gamedetails2Page', () => {
  let component: Gamedetails2Page;
  let fixture: ComponentFixture<Gamedetails2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gamedetails2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Gamedetails2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
