import Firebase from 'firebase';

export default (FIREBASE_URL) => {
    'ngInject';

    return new Firebase(FIREBASE_URL);

};
