import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyreleasesComponent } from './myreleases.component';

describe('MyreleasesComponent', () => {
  let component: MyreleasesComponent;
  let fixture: ComponentFixture<MyreleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreleasesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyreleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
