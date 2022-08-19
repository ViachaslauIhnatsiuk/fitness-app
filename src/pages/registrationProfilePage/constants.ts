const emptyFieldReport = 'Field can not be empty';
const minNameLengthReport = 'Minimum 3 characters required';
const maxNameLengthReport = 'Maximum 15 characters';
const invalidEmailReport = 'Invalid email address. Please correct and try again';
const invalidPasswordReport = 'Password must contain at least one number and uppercase characters';
const minPasswordLengthReport = 'Minimum 8 characters required';
const matchPasswordReport = 'Passwords must match';
const emailValidation =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;

const nameRegister = {
  required: emptyFieldReport,
  minLength: {
    value: 3,
    message: minNameLengthReport
  },
  maxLength: {
    value: 15,
    message: maxNameLengthReport
  }
};

const emailRegister = {
  required: emptyFieldReport,
  pattern: {
    value: emailValidation,
    message: invalidEmailReport
  }
};

const passwordRegister = {
  required: emptyFieldReport,
  minLength: {
    value: 8,
    message: minPasswordLengthReport
  },
  pattern: {
    value: passwordValidation,
    message: invalidPasswordReport
  }
};

export { nameRegister, emailRegister, passwordRegister, matchPasswordReport };
