import inflect from 'inflect';

export default () => (input) => inflect.parameterize(input);
