import React, { useEffect, useState }from 'react'


const PostItem = ({ post }) => {
    console.log(post)
    return (
        <div>
            {post.title}
            {post.user}
        </div>
    )
}

export default PostItem