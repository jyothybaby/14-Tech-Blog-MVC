const { Post } = require('../models');

const postData = [{
        title: "About Job",
        content: "Seeking to learn and master the art of software engineering. I did bachelors in Electronics and Communications Engineering and Masters in Embedded Systems.",
        user_id: 1

    },
    {
        title: "So much to learn!",
        content: "Seeking to learn and master the art of software engineering. I did bachelors in Electronics and Communications Engineering and Masters in Embedded Systems",
        user_id: 2
    },
    {
        title: "Full Stack Software Development",
        content: "Full stack development: It refers to the development of both front end (client side) and back end (server side) portions of web application.",
        user_id: 3
    },
    {
        title: "Full stack web Developers:",
        content: "Full stack web developers have the ability to design complete web application and websites.",
        user_id: 4
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;