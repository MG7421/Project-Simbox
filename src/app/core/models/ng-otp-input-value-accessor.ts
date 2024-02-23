import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NG_OTP_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgOtpInputValueAccessor),
  multi: true,
};

@Directive({
  selector: 'ng-otp-input[formControlName],ng-otp-input[formControl],ng-otp-input[ngModel]',
  providers: [NG_OTP_INPUT_VALUE_ACCESSOR],
})
export class NgOtpInputValueAccessor implements ControlValueAccessor {
  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  handleInput(value: any): void {
    this.onChange(value);
  }

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
