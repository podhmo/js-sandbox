const React = require("react");
const ReactDOM = require("react-dom");
const axios = require("axios");

// structure
// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm

var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

const CommentList = React.createClass({
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

const CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    const author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    const text = ReactDOM.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return ;
    }
    this.props.onCommentSubmit({author: author, text: text});
    ReactDOM.findDOMNode(this.refs.author).value = '';
    ReactDOM.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
     <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
     </form>
    );
  }
});

const Comment = React.createClass({
  rawMarkup: function() {
    const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          { this.props.author }
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    );
  }
});
const CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadCommentsFromServer: function(){
    axios.get(this.props.url).then((response) => {
      this.setState({data: response.data});
    }).catch((err) => {
      console.error(`url=${this.props.url} ${err}`);
    });
  },
  handleCommentSubmit: function(comment) {
    const comments = this.state.data;
    const newComments = comments.concat([comment]);
    this.setState({data: newComments});
    axios.post(this.props.url, comment).catch((err) => {
      this.setState({data: comments});
      console.error(`url=${this.props.url} ${err}`);
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.interval);
  },
  render: function() {
    return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
    )
  }
});
ReactDOM.render(
  <CommentBox url="api/comments" interval={500}/>,
  document.getElementById('content')
);
