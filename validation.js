import vest, { test } from 'vest';
import enforce from 'vest/enforceExtended';

// Export a function that takes the data, and an optional changed field name
export default vest.create('formName', (data = {}, changedField) => {
  // When called, `only()` filters out any test calls that aren't specified in it.
  // If no field is passed to only (when submitting, for example), it will be ignored.

  vest.only(changedField);

  /**
   * test arguments:
   * 1. fieldName: same name can be used in multiple tests
   * 2. String to show on failure
   * 3. Callback that contains our assertions
   */

  test('name', 'Must be at least three chars long', () => {
    // enforce takes a value
    // and checks that it matches our requirements
    enforce(data.name.value).longerThan(2);
  });

  test('email', 'Must be a valid email address.', () => {
    enforce(data.email.value).isEmail();
  });

  test('amount', 'Amount must be a numeric value.', () => {
    enforce(data.amount.value).isNumeric();
  });

  test('amount', 'Minimum of $2 required.', () => {
    enforce(data.amount.value).greaterThan(1);
  });

  test('amount', 'Just a little more and we can afford that pony', () => {
    // calling `warn` changes the test's severity.
    // Instead of having an `error` when failing, it will now just show a warning.
    vest.warn();

    enforce(data.amount.value).greaterThan(10);
  });

  test('tos', 'You must agree to the terms of service.', () => {
    enforce(data.tos.checked).isTruthy();
  });
});
