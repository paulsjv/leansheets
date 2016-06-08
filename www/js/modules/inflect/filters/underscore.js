import inflect from 'inflect';

export default () => (input) => inflect.underscore(input);
