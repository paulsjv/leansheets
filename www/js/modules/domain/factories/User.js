import angular from 'angular';

export default (firebaseRef, $firebaseArray, $firebaseObject) => {
    'ngInject';

    let usersRef = firebaseRef.child('users'),
        users = $firebaseArray(usersRef);

    return class User {

        static get(uid) {
            return users.$loaded().then(() => new User(users.$getRecord(uid)));
        }

        constructor(obj) {
            angular.extend(this, obj);
        }

        getProfile() {
            return this.profile;
        }

        setProfile(profile) {
            this.profile = profile;
        }

        // getSettings() {
        //
        // }
        //
        // setSettings(settings) {
        //
        // }

        $save() {

            return users.$save(this).catch(() => {

                let user = $firebaseObject(usersRef.child(this.$id));
                angular.extend(user, this);

                return user.$save();

            });

        }

    }

}
