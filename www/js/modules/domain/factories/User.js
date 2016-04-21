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

            obj = obj || {};

            this.$id = obj.$id;
            this.displayName = obj.displayName;
            this.imageUrl = obj.imageUrl;

        }

        getProfile() {
            return this.profile;
        }

        setProfile(profile) {
            this.profile = profile;
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
