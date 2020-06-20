import { connect } from 'react-redux';
import { PostList } from './PostList';
import { createPost, getPosts, updatePost } from './actions/facebook_post'

const mapStateToProps = state => ({
    status: state.status,
    posts: state.posts.posts
})

const mapDispatchToProps = {
    createPost,
    getPosts,
    updatePost
}

export const PostListContainer = connect( mapStateToProps, mapDispatchToProps )(PostList);

