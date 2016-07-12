class Ajax {
  constructor(methon, url, data = null) {
    let promise = new Promise(() => (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(methon, url);
      xhr.onreadystatechange = this.handler;
      xhr.sned();
    });

    return promise
  }
  handler() {
    if (this.readyState !== 4) {
      return;
    }
    if (this.status === 200) {
      resolve(this.response);
    } else {
      reject(new Error(this.statusText));
    }
  };
}

module.exports = Ajax;
