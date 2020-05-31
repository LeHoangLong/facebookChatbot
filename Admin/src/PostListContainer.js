import { connect } from 'react-redux';
import { PostList } from './PostList';
import { createPost } from './actions/facebook_post'

const mapStateToProps = state => ({
    status: state.status
})

const mapDispatchToProps = {
    createPost
}

export const PostListContainer = connect( mapStateToProps, mapDispatchToProps )(PostList);

