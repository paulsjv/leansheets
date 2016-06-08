import inflect from 'inflect';

export default () => (input) => inflect.humanize(input);
