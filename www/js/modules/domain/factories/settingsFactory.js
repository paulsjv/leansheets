export default (firebaseRef) => {
    'ngInject';

    return firebaseRef.getObject('/settings')

}
