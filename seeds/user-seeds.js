const { User } = require('../models');

const userData = [{
        username: 'jyothy',
        password: 'jyothy123',
        email: 'jyothy@abc.com'

    },
    {
        username: 'francis',
        password: 'francis123',
        email: 'francis@abc.com'
    },
    {
        username: 'norah',
        password: 'norah123',
        email: 'norah@abc.com'
    },
    {
        username: 'cibu',
        password: 'cibu123',
        email: 'cibu@abc.com'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;