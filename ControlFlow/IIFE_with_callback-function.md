
### Callback Functions
- **Definition**: A callback function is a function passed as an argument to another function, which is then executed within the outer function.
- **Usage**: Commonly used in asynchronous operations, event handling, and array methods like `forEach()`.
- **Example**:
  ```javascript
  function fun1() {
      console.log("text");
  }
  function callingfun(callback) {
      callback();
  }
  callingfun(fun1); // fun1 is used as a callback
  ```

### `Array.forEach()` with Callback
- **Purpose**: The `forEach()` method executes a provided function once for each array element.
- **Parameters**: The callback function can take up to three parameters: the current element, the index, and the array itself.
- **Example**:
  ```javascript
  const numbers = [1, 2, 3, 4, 5];
  numbers.forEach((number) => {
      console.log(number);
  });
  ```

### Immediately Invoked Function Expressions (IIFE)
- **Definition**: An IIFE is a function that is executed immediately after it is defined.
- **Syntax**: Typically wrapped in parentheses and followed by another set of parentheses to invoke it.
- **Usage**: Useful for creating a local scope to avoid polluting the global namespace.
- **Example**:
  ```javascript
  (function() {
      console.log("This is an IIFE");
  })();
  ```

### Combining Callback Functions and IIFE
- **Example**:
  ```javascript
  function fun1() {
      console.log("text");
  }
  (function callingfun(callback) {
      for (let i = 1; i < 5; i++) {
          callback();
      }
  })(fun1); // fun1 is passed as a callback to the IIFE
  ```

In this combined example:
- `fun1` is defined to log "text" to the console.
- An IIFE is defined and immediately invoked, taking `fun1` as a callback.
- Inside the IIFE, `fun1` is called four times, logging "text" each time.

