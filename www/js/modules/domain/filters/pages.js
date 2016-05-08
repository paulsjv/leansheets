import range from 'lodash.range';

export default () => {
    'ngInject';

    return (input, max) => {

        let count = input.length,
            pages = Math.ceil(count / max);

        return range(1, pages + 1);
        
    }

}
