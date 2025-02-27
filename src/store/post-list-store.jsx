import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const PostListReducer = (currPostList, action) => {
    let newPostList=currPostList;
    if(action.type==="DELETE_POST"){
        newPostList=currPostList.filter((post)=>post.id!==action.payload);
    }
    else if(action.type==="ADD_POST"){
        newPostList=[action.payload,...currPostList];

    }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    PostListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = ( userId, postTitle, postBody, reactions, tags ) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });

  };
  const deletePost = (PostId) => {
    dispatchPostList({ type: "DELETE_POST", payload: PostId });
  };
  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: 1,
    title: "Post 1",
    body: "This is the content of post 1",
    reactions: 2,
    userId: "user-11",
    tags: ["mumbai", "enjoying"],
  },
  {
    id: 2,
    title: "Post 2",
    body: "This is the content of post 2",
    reactions: 3,
    userId: "user-12",
    tags: ["delhi", "exploring"],
  },
];

export default PostListProvider;
