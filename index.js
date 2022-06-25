/**
 * A basic example of vest (npmjs.com/package/vest) using Vanilla js.
 * You can also see the React example here:https://stackblitz.com/edit/vest-react-support-example
 */

import validate from './validation'; // <- our Vest validation is here
import classNames from 'vest/classNames';
import './style.scss';

const form = document.querySelector('#pledge');
const allInputs = Array.from(form.querySelectorAll('input'));
const tos = form.querySelector('#tos input');

const handleChange = ({ target: { name, value, checked } }) => {
  // Pass to our validation module an object with the change field
  // And its name as the second argument. We'll use the name
  // To filter out the fields that did not change.

  console.log(name, value, checked)
  validate({ [name]: { value, checked } }, name)
    .done(handleResult);
}

const handleSubmit = () => {

  // Here we're organizing the input values in an on object
  // so that we can pass it over to our validation module

  const allData = allInputs.reduce((allData, current) => (
    Object.assign(allData, {
      [current.name]: current
    })
  ), {});

  // run our validation suite with the values of all inputs
  // And after that handle the results
  validate(allData)
    .done(handleResult);
}

const handleResult = (result) => {

  console.log(result)

  const cn = classNames(result, {
    valid: 'valid',
    invalid: 'invalid',
    warning: 'warning'
  });

  // Iterate over all the tested fields in the current validations
  // (Since some may have been skipped)
  allInputs.forEach(({name}) => {

    // Find the parent element
    const parent = form.querySelector(`#${name}`);
    let msg = '';

    const messages = [...result.getErrors(name), ...result.getWarnings(name)];

  // update the DOM
    parent.className = cn(name);
    parent.setAttribute('data-msg', messages[0]||'');
  });
}

form.addEventListener('keyup', handleChange);
tos.addEventListener('change', handleChange);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});