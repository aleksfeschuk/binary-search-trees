## Balanced Binary Search Tree (BST) Project
This project implements a balanced Binary Search Tree (BST) in TypeScript. It provides a Tree class with methods for building, manipulating, and traversing a BST, ensuring efficient operations like insertion, deletion, and lookup with O(log n) time complexity when balanced. The tree is initially constructed from an array, automatically balanced, and includes functionality to rebalance it if it becomes unbalanced.

## Features
* Node Class (BSTNode): Represents a node in the BST with data, left, and right properties.
* Tree Class (Tree): Manages the BST with the following methods:
- buildTree(array): Constructs a balanced BST from an array, removing duplicates and sorting values.
- insert(value): Inserts a new value into the tree.
- deleteItem(value): Deletes a value from the tree, handling cases with no children, one child, or two children.
- find(value): Finds and returns the node with the given value.
- levelOrder(callback): Traverses the tree in breadth-first order, applying a callback to each node.
- inOrder(callback), preOrder(callback), postOrder(callback): Traverse the tree in depth-first order (in-order, pre-order, post-order) with a  callback.
- height(node): Calculates the height of a given node (longest path to a leaf).
- depth(node): Calculates the depth of a given node (path from root to node).
- isBalanced(): Checks if the tree is balanced (difference in heights of subtrees ≤ 1).
- rebalance(): Rebalances the tree if it becomes unbalanced.
- prettyPrint(): Prints the tree in a visually structured format.

## How to Launch
# Clone the Project
- git clone <URL_repository>
- cd Balanced-BST
- npm install && npx tsc && node dist/main.js
