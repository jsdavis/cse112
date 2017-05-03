# Contributing to Unlucky Geniuses

Welcome! The following is a list of guidelines to use when contributing to the project. These are just guidelines, not rules. If you would like to propose changes, please feel free to do so.

Any submissisons to the project are encouraged to follow the [Google stylesheet](https://google.github.io/styleguide/jsguide.html). All recommended styling below is taken from this guide.


## Reminders 
 * Always make sure to run ```npm install``` before committing changes to the repository.
 * Keep in mind that *Node.js v7.9.0* is the development runtime. 

#### Table of Contents
1. [Documentation](#documentation)
    * [Whitespace](#whitespace)
    * [Comments](#comments)

## Documentation

### Whitespace
The only whitespace characters that should appear in source files are spaces and newlines. Tabs should not be used.

#### Vertical Whitespace
Single blank lines should be placed:
- Between consecutive methods in a class or object literal (this is optional for consecutive property definitions).
- Sparingly within method bodies to logically group statements, but never at the start or end of a function body.

Consecutive blank lines are allowed but not encouraged.

#### Horizontal Whitespace
Trailing whitespace (at the end of a line) is forbidden.

Single ASCII spaces should appear in the following places: 

1. Separating any reserved word (ex. if) from the open '(' that follows it or the closing '}' that precedes it.    
2. Before any open curly brace except:
    * Before an object literal that is the first argument of a function or the first element in an array literal.
    ```javascript
    foo({a: [{c: d}]})
    ```        
    * In a template expansion: 
    ```javascript
    abc${1 + 2}def
    ```       
3. On both sides of any binary or ternary operator.     
4. After a comma or semicolon, but never before.    
5. After the colon in an object literal.    
6. On both sides of the double-slash-comment-starter '//'.
7. After an open-JSDoc comment character and on both sides of close characters.
   ```javascript
   this.foo = /** @type {number} */ (bar);
   function(/** string */ foo) {}
   ```


### Comments
All classes, fields, and methods are run through JSDoc. The basic formatting of JSDoc blocks can be seen in the example below:
```javascript
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```
For more information on other types of tags, go to the JSDoc website [here](http://usejsdoc.org/). Formatting guidelines are also specified in the [Google stylesheet](https://google.github.io/styleguide/jsguide.html#jsdoc).
