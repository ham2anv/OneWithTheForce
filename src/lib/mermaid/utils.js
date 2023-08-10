/**
 * Generator that creates unique id strings based on a stub string.
 * @generator
 * @param {string} stub - A string to prepend to each generated id.
 * @yields {string} A unique id string based on the stub.
 */
export function* idGenerator(stub) {
  let counter = 0;
  while (true) {
    counter++;
    yield `${stub}${counter}`;
  }
}


/**
 * Returns the string as a slug fit for an id.
 * @param {string} text - The string to slugify.
 * @returns {string}
 * @ignore
 */
export function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}


export class Enum {
  static match(str) {
    return Object.keys(this).some(key => key === str);
  }

  static entries() {
    return Object.entries(this);
  }
}