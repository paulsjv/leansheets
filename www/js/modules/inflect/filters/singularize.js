import inflect from 'inflect';

export default () => (input) => inflect.singularize(input);
