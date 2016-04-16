// structure
// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm

const commentBox = React.createClass({
  render: () => {
    return (
        <div className="commentBox">
        Hello, World! I am CommentBox.
        </div>
    )
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);


