import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const PostListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id !== action.payload);
  } else if (action.type === "addIntialPost") {
    newPostList = action.payload;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};


const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(PostListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addInitialPost = (posts) => {
    dispatchPostList({
      type: "addIntialPost",
      payload: posts,
    });
  };

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };
  const deletePost = (PostId) => {
    dispatchPostList({ type: "DELETE_POST", payload: PostId });
  };

 
  useEffect(() => {
    setFetching(true);
    const controller=new AbortController()
    const signal=controller.signal;

    fetch("https://dummyjson.com/posts",{signal})
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        // console.log(data.posts);
        setFetching(false);
      });

      return ()=>{
        console.log("cleaning up UseEffect")
        controller.abort();
      }

  }, []);
  

  return (
    <PostList.Provider
      value={{ postList,fetching,addPost, deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
