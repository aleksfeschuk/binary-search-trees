class BSTNode {
    data: number;
    left: BSTNode | null;
    right: BSTNode | null;

    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    root: BSTNode | null;

    constructor(array: number[]) {
        this.root = this.buildTree(array);
    }

    buildTree(array: number[]): BSTNode | null {
        if (array.length === 0) {
            return null;
        }

        const uniqueArray = [...new Set(array)];
        uniqueArray.sort((a, b) => a - b);
        const mid = Math.floor(uniqueArray.length / 2);
        const node = new BSTNode(uniqueArray[mid]);
        node.left = this.buildTree(uniqueArray.slice(0, mid));
        node.right = this.buildTree(uniqueArray.slice(mid + 1));

        return node;
    }

    insert(value: number): void {
        if (this.root === null) {
            this.root = new BSTNode(value)
        }  else {
            this.insertNode(this.root, value);
        }
    }

    insertNode(node: BSTNode, value: number): void {
        if (value < node.data) {
            if (node.left === null) {
                node.left = new BSTNode(value);
            } else {
                this.insertNode(node.left, value);
            }
        } else if (value > node.data){
            if (node.right === null) {
                node.right = new BSTNode(value);
            } else {
                this.insertNode(node.right, value);
            }
        }
    }

    find(value: number): BSTNode | null {
        return this.findNode(this.root, value);
    }

    findNode(node: BSTNode | null, value: number): BSTNode | null {
        if (node === null) {
            return null;
        } 
        if (value === node.data) {
            return node;
        } else if (value < node.data) {
            return this.findNode(node.left, value);
        } else {
            return this.findNode(node.right, value);
        }
    }

    levelOrder(callback: (node: BSTNode) => void): void {
        if (!callback) {
            throw new Error('Callback is required');
        }

        if (this.root === null) {
            return;
        }

        const queue: BSTNode[] = [];
        queue.push(this.root);
        while (queue.length > 0) {
            const node = queue.shift()!;
            callback(node);

            if (node.left !== null) {
                queue.push(node.left)
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    prettyPrint(): void {
        this.printNode(this.root);
    }



    printNode(node: BSTNode | null, prefix: string = "", isLeft: boolean = true): void {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.printNode(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            this.printNode(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }


    deleteItem(value: number): void {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node: BSTNode | null, value: number): BSTNode | null {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null; 
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                const minNode = this.findMin(node.right);
                node.data = minNode.data;
                node.right = this.deleteNode(node.right, minNode.data);
            }
        }
        return node;
    }

    findMin(node: BSTNode): BSTNode {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    inOrder (callback: (node: BSTNode) => void) {
        if (!callback) {
            throw new Error ('Callback is required');
        }

        if (this.root !== null) {
            this.inOrderTraversal(this.root, callback);
        }
    }
    
    inOrderTraversal(node: BSTNode | null, callback: (node: BSTNode) => void): void {
        if (node === null) {
            return;
        }

        this.inOrderTraversal(node.left, callback);

        callback(node);

        this.inOrderTraversal(node.right, callback);
    }


    preOrder (callback: (node: BSTNode) => void) {
        if (!callback) {
            throw new Error ('Callback is required');
        }

        if (this.root !== null) {
            this.preOrderTraversal(this.root, callback);
        }
    }
    
    preOrderTraversal(node: BSTNode | null, callback: (node: BSTNode) => void): void {
        if (node === null) {
            return;
        }
        callback(node);


        this.preOrderTraversal(node.left, callback);

        this.preOrderTraversal(node.right, callback);
    }


    postOrder (callback: (node: BSTNode) => void) {
        if (!callback) {
            throw new Error ('Callback is required');
        }

        if (this.root !== null) {
            this.postOrderTraversal(this.root, callback);
        }
    }
    
    postOrderTraversal(node: BSTNode | null, callback: (node: BSTNode) => void): void {
        if (node === null) {
            return;
        }

        this.postOrderTraversal(node.left, callback);

        this.postOrderTraversal(node.right, callback);

        callback(node);
    }  


    height(node: BSTNode | null): number {
        if (node === null) {
            return -1;
        }
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node: BSTNode | null): number {
        if (node === null || this.root === null) {
            return -1;
        } 
        return this.calculateDepth(this.root, node, 0);
    }

    calculateDepth(current: BSTNode | null, target: BSTNode | null, depth: number): number {
        if (current === null) {
            return -1;
        }

        if (current === target) {
            return depth;
        }

        const leftDepth = this.calculateDepth(current.left, target, depth + 1);
        if(leftDepth !== -1) {
            return leftDepth;
        }

        return this.calculateDepth(current.right, target, depth + 1);
    }


    isBalanced(): boolean {
        return this.checkBalance(this.root) !== -1;
    }
    
    checkBalance(node: BSTNode | null): number {
        if (node === null) {
            return 0;
        }
        const leftHeight = this.checkBalance(node.left);
        if (leftHeight === -1) {
            return -1;
        }
        const rightHeight = this.checkBalance(node.right);
        if (rightHeight === -1) {
            return -1;
        }
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }
        return 1 + Math.max(leftHeight, rightHeight);
    }

    rebalance(): void {
        const values: number[] = [];
        this.inOrder((node) => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

export { Tree, BSTNode };