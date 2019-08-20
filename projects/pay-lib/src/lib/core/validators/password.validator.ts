import { FormGroup } from '@angular/forms';

export function confirmPasswordValidator(password, confirmPassword) {
	return (form: FormGroup) => {
		if( form.controls[confirmPassword].value !== '' && form.controls[password].value !==  form.controls[confirmPassword].value ) {
			form.controls[confirmPassword].setErrors({
				mismatchedFields: true
			});
		} else {
			if( form.controls[password].value ===  form.controls[confirmPassword].value && form.controls[confirmPassword].hasError('mismatchedFields') ) {
				delete form.controls[confirmPassword].errors['mismatchedFields'];
				form.controls[confirmPassword].updateValueAndValidity();
			}
		}
	}
}