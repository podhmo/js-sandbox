const React = require("react");
const axios = require("axios");

const CommentList = require("./comment-list");
const CommentForm = require("./comment-form");

module.exports = React.createClass({
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
