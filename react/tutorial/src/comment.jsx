const React = require("react");

module.exports = React.createClass({
  rawMarkup: function() {
    const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{ this.props.author }</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    );
  }
});