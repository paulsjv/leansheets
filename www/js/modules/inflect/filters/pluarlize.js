import inflect from 'inflect';

export default () => (input) => inflect.pluralize(input);
