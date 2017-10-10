webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_CommentBox__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CommentList__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Notification__ = __webpack_require__(5);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class DisqusProxy extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isFetchingComment: true,
      notificationTitle: '',
      notificationBody: '',
      showNotification: false
    };
  }

  componentWillMount() {
    var _this = this;

    return _asyncToGenerator(function* () {

      // 用文字标识符获取评论
      const identifier = window.disqusProxy.identifier;
      const query = 'identifier=' + encodeURIComponent(identifier);
      const url = '//' + window.disqusProxy.server + ':' + window.disqusProxy.port.toString() + '/api/getComments';
      try {
        const result = yield fetch(url + '?' + query);
        const res = yield result.json();
        _this.setState({ isFetchingComment: false });
        if (res.code === 0) _this.setState({ comments: res.response });
        // 错误码 2 是找不到文章的thread，一般为未有评论，故此处忽略之
        else if (res.code !== 2) _this.setState({
            notificationTitle: '评论获取错误',
            notificationBody: res.response,
            showNotification: true
          });
      } catch (e) {
        _this.setState({
          isFetchingComment: false,
          notificationTitle: '评论获取错误',
          notificationBody: e,
          showNotification: true
        });
      }
    })();
  }

  render() {
    const { notificationTitle, notificationBody, showNotification, comments, isFetchingComment } = this.state;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'disqus-proxy' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'disqus-statement' },
        '\u60A8\u7684\u7F51\u7EDC\u8FDE\u63A5\u5728\u8FDE\u63A5',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: 'https://disqus.com' },
          ' disqus.com '
        ),
        '\u65F6\u51FA\u73B0\u95EE\u9898, \u5DF2\u4E3A\u4F60\u5C55\u793A\u7CBE\u7B80\u7248\u8BC4\u8BBA\u7CFB\u7EDF'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_CommentBox__["a" /* default */], null),
      showNotification && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Notification__["a" /* default */], { title: notificationTitle,
        body: notificationBody,
        duration: 50000 }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_CommentList__["a" /* default */], { comments: comments, isLoading: isFetchingComment })
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = DisqusProxy;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const styles = {
  notification: {
    boxSizing: 'border-box',
    transition: 'all 0.5s',
    position: 'absolute',
    padding: 16,
    borderRadius: 6,
    minWidth: 140,
    top: 22,
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, .2)'
  }
};

class Notification extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 0);
    setTimeout(() => {
      this.setState({ show: false });
    }, this.props.duration);
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: _extends({}, styles.notification, {
          right: this.state.show ? 40 : '-100%'
        }) },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: {
            marginBottom: 6,
            fontSize: 14,
            color: 'rgba(0, 0, 0, .85)'
          } },
        this.props.title
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, .65)'
          } },
        this.props.body
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Notification;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Notification__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




const styles = {
  button: {
    transition: 'all 0.4s',
    outline: 'none',
    border: 'none',
    color: 'white',
    backgroundColor: '#42b983',
    cursor: 'pointer'
  },
  label: {
    boxSizing: 'border-box',
    display: 'block',
    width: '220px',
    margin: '10px 0'
  },
  span: {
    display: 'inline-block',
    width: '60px',
    fontSize: '12px'
  },
  input: {
    padding: '0 10px',
    boxSizing: 'border-box',
    height: '22px',
    width: '160px',
    outline: 'none',
    borderRadius: '4px'
  }
};

class commentBox extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(props) {
    super(props);

    this.handleChange = (e, key) => {
      this.setState({
        [key]: e.target.value,
        [key + 'Valid']: true
      });
    };

    this.commentMetaToggle = () => {
      this.setState({ showCommentMeta: !this.state.showCommentMeta });
    };

    this.state = {
      thread: null,
      message: '',
      authorName: '',
      authorEmail: '',
      authorNameValid: true,
      authorEmailValid: true,
      messageValid: true,
      showCommentMeta: false,
      disabled: false,
      notificationTitle: '',
      notificationBody: '',
      showNotification: false
    };
  }

  componentWillMount() {
    var _this = this;

    return _asyncToGenerator(function* () {

      const identifier = window.disqusProxy.identifier;
      const query = 'identifier=' + encodeURIComponent(identifier);
      const url = '//' + window.disqusProxy.server + ':' + window.disqusProxy.port.toString() + '/api/getThreads';
      const result = yield fetch(url + '?' + query);
      const res = yield result.json();

      if (res.code === 0 && res.response.length) {
        const thread = res.response[0].id;
        _this.setState({ thread });
        const message = localStorage.getItem(thread);
        if (typeof message === 'string') _this.setState({ message });
      } else if (typeof res.code === 'number') {
        _this.setState({
          notificationTitle: 'thread 获取错误',
          notificationBody: res.response,
          showNotification: true
        });
      }
    })();
  }

  postComment() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.state.thread) return;

      _this2.setState({
        message: _this2.state.message.trim(),
        authorName: _this2.state.authorName.trim(),
        authorEmail: _this2.state.authorEmail.trim()
      });

      const checkValid = function () {
        let valid = true;['message', 'authorName', 'authorEmail'].forEach(function (item) {
          if (_this2.state[item] === '') {
            valid = false;
            _this2.setState({ [item + 'Valid']: false });
          }
        });

        const email = _this2.state.authorEmail;
        if (!/^[-a-zA-Z0-9.]+@[-a-zA-Z0-9]+\.[-a-zA-Z0-9]+$/.test(email)) {
          valid = false;
          _this2.setState({ authorEmailValid: false });
        }
        return valid;
      };

      const isValid = checkValid();

      if (!isValid) return false;

      _this2.setState({ disabled: true });

      localStorage.setItem(_this2.state.thread.toString(), _this2.state.message);

      const payload = {
        thread: _this2.state.thread,
        author_name: _this2.state.authorName,
        author_email: _this2.state.authorEmail,
        message: _this2.state.message
      };
      const url = '//' + window.disqusProxy.server + ':' + window.disqusProxy.port.toString() + '/api/createComment';

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    })();
  }

  submit() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.state.disabled) return;
      const response = yield _this3.postComment();
      if (!response) return;
      const res = yield response.json();
      _this3.setState({ disabled: false });

      if (res.code === 0) {
        localStorage.removeItem(_this3.state.thread);
        _this3.setState({
          message: '',
          authorName: '',
          authorEmail: '',
          showCommentMeta: false,
          notificationTitle: '发表成功',
          notificationBody: '请等待审核',
          showNotification: true
        });
        setTimeout(function () {
          _this3.setState({ showNotification: false });
        }, 5000);
      } else if (typeof res.code === 'number') {
        _this3.setState({
          notificationTitle: '发表失败',
          notificationBody: res.response,
          showNotification: true
        });
        setTimeout(function () {
          _this3.setState({ showNotification: false });
        }, 5000);
      }
    })();
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: {
          padding: '10px 20px',
          position: 'relative',
          overflow: 'hidden'
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: {
            height: '110px',
            position: 'relative'
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { style: {
              position: 'absolute',
              paddingTop: '6px'
            } },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: window.disqusProxy.defaultAvatar, alt: 'avatar', style: {
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              boxShadow: '1px 1px 3px 0.5px #ccc'
            } })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { value: this.state.message,
          style: {
            position: 'absolute',
            top: '0',
            left: '70px',
            width: 'calc(100% - 70px)',
            height: '100px',
            boxSizing: 'border-box',
            fontSize: '16px',
            letterSpacing: '0.7px',
            padding: '12px',
            color: '#555',
            backgroundColor: '#f8f8f8',
            outline: 'none',
            border: this.state.messageValid ? 'none' : 'border: 1px solid #ff7500',
            resize: 'none',
            borderRadius: '8px',
            overflow: 'auto',
            boxShadow: '1px 1px 2px -1px #aaa'
          },
          disabled: this.state.disabled,
          onChange: e => this.handleChange(e, 'message') })
      ),
      this.state.showNotification && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Notification__["a" /* default */], { title: this.state.notificationTitle,
        body: this.state.notificationBody,
        duration: 4000 }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { style: _extends({}, styles.button, {
            fontSize: '14px',
            marginLeft: 'calc(100% - 46px)',
            padding: '2px 16px',
            borderRadius: '4px'
          }), onClick: this.commentMetaToggle },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-comment-o', 'aria-hidden': 'true' })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: {
            marginLeft: 'calc(100% - 220px)',
            transition: 'all 0.5s',
            color: '#666',
            overflow: 'hidden',
            height: this.state.showCommentMeta ? 120 : 0
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          { style: styles.label },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { style: styles.span },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-user-o', 'aria-hidden': 'true' }),
            ' \u6635\u79F0 '
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
            style: _extends({}, styles.input, {
              border: this.state.authorNameValid ? '1px solid #ccc' : ' 1px solid #ff7500'
            }),
            value: this.state.authorName,
            disabled: this.state.disabled,
            onChange: e => this.handleChange(e, 'authorName') })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          { style: styles.label },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { style: styles.span },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-envelope-o', 'aria-hidden': 'true' }),
            ' \u90AE\u7BB1 '
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
            style: _extends({}, styles.input, {
              border: this.state.authorEmailValid ? '1px solid #ccc' : ' 1px solid #ff7500'
            }),
            value: this.state.authorEmail,
            disabled: this.state.disabled,
            onChange: e => this.handleChange(e, 'authorEmail') })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { onClick: () => this.submit(), style: _extends({}, styles.button, {
              marginLeft: 'calc(100% - 46px)',
              outline: 'none',
              borderRadius: '4px',
              height: '24px',
              width: '46px',
              border: 'none'
            }) },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-share', 'aria-hidden': 'true' })
        )
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = commentBox;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Comment__ = __webpack_require__(8);



class CommentList extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  render() {
    const { comments, isLoading } = this.props;
    const topLevelComments = [];
    const childComments = [];

    comments.forEach(function (comment) {
      (comment.parent ? childComments : topLevelComments)['push'](comment);
    });

    const commentLists = topLevelComments.map(comment => ({
      comment,
      author: comment.author.name,
      isPrimary: comment.author.username === window.disqusProxy.shortname,
      children: getChildren(+comment.id)
    }));

    function getChildren(id) {
      if (childComments.length === 0) return null;
      const list = [];
      for (const comment of childComments) {
        if (comment.parent === id) list.unshift({
          comment,
          author: comment.author.name,
          isPrimary: comment.author.username === window.disqusProxy.shortname,
          children: getChildren(+comment.id)
        });
      }
      return list.length ? list : null;
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: { overflowX: 'auto' } },
      isLoading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: { textAlign: 'center', color: '#ccc', fontSize: 14 } },
        '\u8BC4\u8BBA\u52A0\u8F7D\u4E2D ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-spinner fa-spin fa-fw' })
      ) : commentLists.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        null,
        commentLists.map(discuss => {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'li',
            { key: discuss.comment.id },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Comment__["a" /* default */], { comment: discuss.comment,
              children: discuss.children,
              isPrimary: discuss.isPrimary,
              author: discuss.author })
          );
        })
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: { textAlign: 'center', color: '#ccc', fontSize: 14 } },
        '\u8FD8\u6CA1\u6709\u8BC4\u8BBA\u5462'
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommentList;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Comment;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const styles = {
  span: {
    display: 'inline-block',
    marginRight: 10
  }
};

function Comment(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { style: { padding: '0 10px' } },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: { display: 'inline-block' } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: props.isPrimary ? window.disqusProxy.adminAvatar : window.disqusProxy.defaultAvatar,
        style: {
          width: 40,
          height: 40,
          borderRadius: '50%',
          boxShadow: ' 1px 1px 3px 0.5px #ccc'
        },
        alt: 'avatar' })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: { margin: '-60px 0 0 60px' } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: 'comment-header' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { style: _extends({}, styles.span, { color: '#888', fontSize: 14 }) },
          props.comment.author.name
        ),
        props.isPrimary && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { style: _extends({}, styles.span, {
              boxSizing: 'border-box',
              lineHeight: '16px',
              fontSize: 12,
              backgroundColor: '#aaa',
              color: 'white',
              padding: '0 3px',
              borderRadius: 4
            }) },
          'Admin'
        ),
        props.replyTo && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { style: _extends({}, styles.span, { color: '#888', fontSize: 14 }) },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-share',
            style: {
              color: '#42b983',
              display: 'inline-block',
              marginRight: 10
            } }),
          props.replyTo
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { style: _extends({}, styles.span, {
              color: '#bbb',
              fontSize: 12,
              fontFamily: "'calligraffittiregular', sans-serif"
            }) },
          window.moment(props.comment.createdAt).utcOffset(-8).format('YYYY/MM/DD HH : mm')
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', { className: 'comment-body',
        style: { fontSize: 14, color: '#34495e' },
        dangerouslySetInnerHTML: { __html: props.comment.message } })
    ),
    props.children && props.children.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'ul',
      { className: 'post-reply' },
      props.children.map(discuss => {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { key: discuss.comment.id },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Comment, { comment: discuss.comment,
            author: discuss.author,
            isPrimary: discuss.isPrimary,
            replyTo: props.author,
            children: discuss.children })
        );
      })
    )
  );
}

/***/ })
]);