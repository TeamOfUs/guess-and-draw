"use strict";

var CommentBox = React.createClass({
  displayName: "CommentBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "commentBox", __self: this
      },
      "Hello, world! I am a CommentBox!"
    );
  }
});
ReactDOM.render(React.createElement(CommentBox, {
  __self: undefined
}), document.getElementById('content'));