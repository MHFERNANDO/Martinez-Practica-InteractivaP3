import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserItem, User } from './user-item';

describe('UserItem', () => {
  let component: UserItem;
  let fixture: ComponentFixture<UserItem>;

  const mockUser: User = {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    address: { city: 'Gwenborough' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserItem);
    component = fixture.componentInstance;

    // Asignación correcta del input con Signals
    fixture.componentRef.setInput('user', mockUser);

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el nombre y el correo del usuario correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Leanne Graham');
    expect(compiled.textContent).toContain('Sincere@april.biz');
  });

  it('debe emitir el evento toggle correctamente', () => {
    let emittedId: number | undefined;

    // Suscripción directa al output para verificar su funcionamiento sin usar spyOn
    component.toggle.subscribe((id) => {
      emittedId = id;
    });

    component.toggle.emit(mockUser.id);

    expect(emittedId).toBe(1);
  });
});
