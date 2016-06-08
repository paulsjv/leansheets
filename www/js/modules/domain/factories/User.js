import angular from 'angular';
import omitBy from 'lodash.omitby';

export default ($http, firebaseRef, $firebaseArray, $firebaseObject) => {
    'ngInject';

    let usersRef = firebaseRef.child('users');

    return class User {

        static get $mapping() {

            return {
                // string, url, email, integer, date, boolean, array
                // required, min, max, nullable, blank, inList, matches, minSize, maxSize, notEqual, validator
                id: 'string',
                displayName: 'string',
                imageUrl: 'url',
                profile: {
                    email: 'email',
                    fullName: 'string',
                    firstName: 'string',
                    lastName: 'string'
                }

            };

        }

        static $get(uid) {
            return $firebaseArray(usersRef).$loaded().then((users) => {

                let user = users.$getRecord(uid);

                if (user) {
                    return Promise.resolve(new User(user));
                } else {
                    return Promise.reject();
                }

            });
        }

        static $all() {
            return $firebaseArray(usersRef).$loaded().then((users) => users.map((user) => new User(user)));
        }

        constructor(obj) {

            let startsWithDollar = /^\$/;

            this.id = obj.$id;
            angular.extend(this, omitBy(obj, (prop) => startsWithDollar.test(prop)));

        }

        $save() {

            return $firebaseArray(usersRef).$save(this).catch(() => {

                let user = $firebaseObject(usersRef.child(this.id));
                angular.extend(user, this);

                return user.$save();

            });

        }

    };

};
