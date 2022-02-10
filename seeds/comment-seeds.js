const { Comment } =  require('../models');

const commentData = [
    {
        user_id: "1",
        post_id: "3",
        comment_text: "I didn't know that much water could be so deadly!"
    },
    {
        user_id: "2",
        post_id: "5",
        comment_text: "These wonders of tech and plant growth...awesome-sauce!!!"
    },
    {
        user_id: "3",
        post_id: "5",
        comment_text: "I don't beieve plants can ever truly adapt to technology."
    },
    {
        user_id: "4",
        post_id: "4",
        comment_text: "Fascinating...that's why I get those wierd cravings."
    },
    {
        user_id: "2",
        post_id: "1",
        comment_text: "Water...ha"
    },
    {
        user_id: "1",
        post_id: "6",
        comment_text: "So many shiny things!!!"
    }
]

const commentSeedsArray = () => Comment.bulkCreate(commentData);

module.exports = commentSeedsArray;
