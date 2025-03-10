import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import {PostList} from "../store/post-list-store";

const Post=({ post })=> {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={() => deletePost(post.id)}>
            <MdDelete />
            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>

        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge hashtag text-bg-primary">
            {tag}
          </span>
        ))}

        <div className="alert alert-success reactions" role="alert">
          This post has been reacted to {post.reactions.likes} times
        </div>
      </div>
    </div>
  );
}

export default Post;
