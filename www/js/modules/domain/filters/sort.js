import sortBy from 'lodash.sortby';
import reverse from 'lodash.reverse';

export default () => {
    'ngInject';

    return (input, sort, desc) => {

        if (desc) {
            return reverse(sortBy(input, sort));
        } else {
            return sortBy(input, sort);
        }
        
    }

}
