const React = require("react");
const ReactDOM = require("react-dom");

// structure
// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm

const CommentBox = require("./comment-box");

ReactDOM.render(
  <CommentBox url="api/comments" interval={500}/>,
  document.getElementById('content')
);
