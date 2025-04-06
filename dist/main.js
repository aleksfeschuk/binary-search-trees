"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_1 = require("./binary");
function getRandomyArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}
function runDemo() {
    const randomArray = getRandomyArray(10, 100);
    console.log('Initial array:', randomArray);
    const tree = new binary_1.Tree(randomArray);
    console.log('Is balanced initially?', tree.isBalanced());
    console.log('Initial tree:');
    tree.prettyPrint();
    console.log('Level order:');
    const levelOrderValues = [];
    tree.levelOrder((node) => levelOrderValues.push(node.data));
    console.log(levelOrderValues);
    console.log('In order: ');
    const inOrderValues = [];
    tree.inOrder((node) => inOrderValues.push(node.data));
    console.log(inOrderValues);
    console.log('Pre order: ');
    const preOrderValues = [];
    tree.preOrder((node) => preOrderValues.push(node.data));
    console.log(preOrderValues);
    console.log('In order: ');
    const postOrderValues = [];
    tree.postOrder((node) => postOrderValues.push(node.data));
    console.log(postOrderValues);
    tree.insert(150);
    tree.insert(200);
    tree.insert(300);
    console.log('After inserting > 100: ');
    tree.prettyPrint();
    console.log('Is balanced?', tree.isBalanced());
    tree.rebalance();
    console.log('After rebalancing:');
    tree.prettyPrint();
    console.log('Is balanced', tree.isBalanced());
    console.log('Level order after rebalance');
    const levelOrderAfter = [];
    tree.levelOrder((node) => levelOrderAfter.push(node.data));
    console.log(levelOrderAfter);
}
runDemo();
