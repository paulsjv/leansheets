import inflect from 'inflect';

export default () => (input) => inflect.camelize(input);
