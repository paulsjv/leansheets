export default ($log, User) => {
    'ngInject';

    return class UserFactory {

        /**
         * Factory method.
         *
         * @param gUser {gUser}
         *
         * @returns {User}
         */
        static fromGoogle(gUser) {

            $log.debug('fromGoogle');

            var gBasicProfile = gUser.getBasicProfile(),
                user = new User({
                    $id: `google:${gUser.getId()}`,
                    displayName: gBasicProfile.getGivenName(),
                    imageUrl: gBasicProfile.getImageUrl()
                });

            user.setProfile({
                email: gBasicProfile.getEmail(),
                fullName: gBasicProfile.getName(),
                firstName: gBasicProfile.getGivenName(),
                lastName: gBasicProfile.getFamilyName()
            });

            user.$save();

            return user;

        }

    };

};
