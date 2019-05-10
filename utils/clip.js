const clipborady = require("clipboardy");
const argv = require("optimist").argv;

class Text {
  static clear(target) {
    return target.split(/\n/g).filter(str => !!str);
  }

  static map(func) {
    return target => target.map(item => func(item));
  }

  static replace(regex) {}

  static lint(regex) {}

  static json(target) {
    return target.replace(/"/g, "'");
  }

  static string(target) {
    const type = typeof target;

    switch (type) {
      case "object":
        if (target instanceof Array) {
          return target.map(item => Text.string(item)).join("\n");
        }
        return JSON.stringify(target);
      default:
        return target.toString();
    }
  }

  static compose() {
    const functions = [].slice.call(arguments, 1);
    let target = [].slice.call(arguments, 0, 1)[0];

    let cache = target;

    while (functions.length) {
      let fn = functions.shift();
      if (fn) {
        cache = fn.apply(null, [cache]);
      }
    }

    return cache;
  }
}

const content = clipborady.readSync();

if (!content) {
  console.log("===============================================");
  console.log("=========== CLIP'S CONTENT IS EMPTY ===========");
  console.log("===============================================");
  return;
}

const { f } = argv || {};

if (f && f === "json") {
  const text = Text.compose(
    content,
    Text.clear,
    Text.map(Text.json),
    Text.string
  );
  clipborady.writeSync(text);
}
