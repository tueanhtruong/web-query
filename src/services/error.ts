import { Toastify } from '.';

const MESSAGES = {
  invalidEmail: 'Email is invalid',
  invalidPhone: 'Phone number is invalid',
  invalidSSN: 'SSN number is invalid format',
  unknown: 'An error has occurred',
  required: 'Field cannot be blank',
  accountNotExist: 'Username does not exist',
  accountExist: 'An account with this email already exists.',
  userExistError: 'User is already existed.',
  incorrectAccount: 'Incorrect username or password',
  incorrectCredentials: 'Incorrect login credentials. Please try again.',
  incorrectPassword: 'Incorrect password.', // pragma: allowlist secret
  onlyLetter: 'Only alphabets are allowed for this field.',
  SSNMessage: 'SSN already exists, please enter again.',
  alphanumeric: 'Alphanumeric characters',
  businessIdLength: '3-25 characters',
  noSpaces: 'No spaces',
  noSpecialCharacters: 'No special characters',
  invalidRoutingNumber: 'Invalid routing number',
  onlyLetterAndNumber: 'Only alphabets or numeric are allowed for this field.',
  invalidInformation: 'The provided information is invalid. Please try again.',
  notTrimmable: 'This field must have no whitespace at the beginning and end.',
  pleaseUseEnglishAlphabetForInput: 'Please use English alphabet for input.',
};

const handler = (error: AuthError | Error) => {
  console.error(error);
  if (error?.message.includes('Attempt limit exceeded, please try after some time.')) {
    return Toastify.error(
      'The code you entered is incorrect more than 5 times. Please try after few minutes or resend email to receive the new code.'
    );
  } else {
    Toastify.error(error?.message || MESSAGES.unknown);
  }
};
export const TYPES = {
  NotAuthorizedException: 'NotAuthorizedException',
  UserNotFoundException: 'UserNotFoundException',
  UserNotConfirmedException: 'UserNotConfirmedException',
  CodeMismatchException: 'CodeMismatchException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
  InvalidPasswordException: 'InvalidPasswordException', // pragma: allowlist secret
  UsernameExistsException: 'UsernameExistsException',
  UserLambdaValidationException: 'UserLambdaValidationException',
  badRequest: 'BAD_REQUEST',
};

export default {
  handler,
  MESSAGES,
  TYPES,
};
