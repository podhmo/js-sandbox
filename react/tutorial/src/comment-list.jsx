const React = require("react");
const Comment = require("./comment")

module.exports = React.createClass({
  render: function() {
    const commentNodes = this.props.data.map(function(comment, i) {
      return (
       <Comment key={i} author={comment.author}>{comment.text}</Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
