/*
  Taken from: https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript
  References: https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript/blob/master/src/data-structures/linked-lists/node.js
*/

// tag::snippet[]
/**
 * Linked List Node
 */
// tag::singly[]
class Node {
  constructor(value = null) {
    this.value = value;
    this.next = null;
    // end::singly[]
    this.previous = null; // if doubly linked list
    // tag::singly[]
  }
}
// end::singly[]
// end::snippet[]

module.exports = Node;