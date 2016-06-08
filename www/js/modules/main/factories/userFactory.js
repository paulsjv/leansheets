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
                    imageUrl: gBasicProfile.getImageUrl()		// if return undefind will error must be null if undefind
                });

			// was user.setProfile({});
            user.profile = {
                email: gBasicProfile.getEmail(),
                fullName: gBasicProfile.getName(),
                firstName: gBasicProfile.getGivenName(),
                lastName: gBasicProfile.getFamilyName()
            };
			$log.debug('user', user);
            user.$save();

            return user;

        }

    };

};
