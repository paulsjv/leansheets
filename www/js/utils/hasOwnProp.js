import has from 'lodash.has';

export default function hasOwnProp(a, b) {
    return has(a, b);
}
