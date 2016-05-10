import inflect from 'inflect';

export default () => (input) => inflect.dasherize(input);
