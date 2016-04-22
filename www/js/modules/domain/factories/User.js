import angular from 'angular';

export default (firebaseRef, $firebaseArray, $firebaseObject) => {
    'ngInject';

    let usersRef = firebaseRef.child('users'),
        users = $firebaseArray(usersRef);

    // Getters
    // Object.keys(obj.prototype)
    //     .filter((k) => k.indexOf('get') === 0)
    //     .map((k) => k.replace(/^get/, ''));

    return class User {

        static get $mapping() {

            return {
                // string, url, email, integer, date, boolean, array
                // required, min, max, nullable, blank, inList, matches, minSize, maxSize, notEqual, validator
                $id: 'string',
                displayName: 'string',
                imageUrl: 'url',
                profile: {
                    email: 'email',
                    fullName: 'string',
                    firstName: 'string',
                    lastName: 'string'
                }

            }

        }

        static $get(uid) {
            return users.$loaded().then(() => {

                let user = users.$getRecord(uid);

                if (user) {
                    return Promise.resolve(new User(user));
                } else {
                    return Promise.reject();
                }

            });
        }

        static $all() {
            return users.$loaded();
        }

        constructor(obj) {
            angular.extend(this, obj);
        }

        $save() {

            return users.$save(this).catch(() => {

                let user = $firebaseObject(usersRef.child(this.$id));
                angular.extend(user, this);

                return user.$save();

            });

        }

    };

}
