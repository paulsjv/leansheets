import slice from 'lodash.slice'

export default () => {
    'ngInject';

    return (input, offset, max) => {
        return slice(input, offset, offset + max);
    }

}
