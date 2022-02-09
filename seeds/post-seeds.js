
const { Post } =  require('../models');

const postData = [
{
    post_url: "https://watertech.com",
	title: "Water treatment",
    user_id: "1"
},
{
    post_url: "https://soloforce.com",
	title: "New lightsabers",
    user_id: "3"
},
{
    post_url: "https://whyhydrate.com",
	title: "Views on water intake",
    user_id: "3"
},
{
    post_url: "https://redvsblue.com",
	title: "What color says about you",
    user_id: "2"
},
{
    post_url: "https://plantsgalore.com",
	title: "Plants and the future",
    user_id: "4"
},
{
    post_url: "https://superawesome.com",
	title: "What's new to come",
    user_id: "5"
},
]

const postSeedsArray = () => Post.bulkCreate(postData);

module.exports = postSeedsArray;