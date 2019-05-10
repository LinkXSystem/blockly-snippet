const clipborady = require("clipboardy");
const argv = require("optimist").argv;

class Text {
  static clear(target) {
    return target.split(/\n/g).filter(str => !!str);
  }

  static json(target) {
    const cache = target.replace(/"/g, "'");
    return this;
  }

  static argv(target) {
    return target;
  }

  static compose() {
    const functions = [].slice.call(arguments, 1);
    let target = [].slice.call(arguments, 0, 1);

    while (functions) {
      let fn = functions.shift();
      cache = fn.apply(this, target)
    }

    return 
  }
}

const content = clipborady.readSync();

if (!content) {
  console.log("===============================================");
  console.log("=========== CLIP'S CONTENT IS EMPTY ===========");
  console.log("===============================================");
  return;
}
