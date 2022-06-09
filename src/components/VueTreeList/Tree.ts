import { traverseTree } from './tools'
export class TreeNode {
    public id: string;
    public parent: any;
    public children: any;
    public isLeaf: any;
    public name: any;
    public pid: string
    constructor(data: any) {
        const { id, isLeaf } = data
        this.id = typeof id === 'undefined' ? new Date().valueOf() : id
        this.parent = null
        this.children = null
        this.isLeaf = !!isLeaf

        // other params
        for (var k in data) {
            if (k !== 'id' && k !== 'children' && k !== 'isLeaf') {
                this[k] = data[k]
            }
        }
    }

    changeName(name) {
        this.name = name
    }

    addChildren(children) {
        if (!this.children) {
            this.children = []
        }

        if (Array.isArray(children)) {
            for (let i = 0, len = children.length; i < len; i++) {
                const child = children[i]
                child.parent = this
                child.pid = this.id
            }
            this.children.concat(children)
        } else {
            const child = children
            child.parent = this
            child.pid = this.id
            this.children.push(child)
        }
    }

    // remove self
    remove() {
        const parent = this.parent
        const index = parent.findChildIndex(this)
        parent.children.splice(index, 1)
    }

    // remove child
    _removeChild(child) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1)
                break
            }
        }
    }

    isTargetChild(target) {
        let parent = target.parent
        while (parent) {
            if (parent === this) {
                return true
            }
            parent = parent.parent
        }
        return false
    }

    moveInto(target) {
        if (this.name === 'root' || this === target) {
            return
        }

        // cannot move ancestor to child
        if (this.isTargetChild(target)) {
            return
        }

        // cannot move to leaf node
        if (target.isLeaf) {
            return
        }

        this.parent._removeChild(this)
        this.parent = target
        this.pid = target.id
        if (!target.children) {
            target.children = []
        }
        target.children.unshift(this)
    }

    findChildIndex(child) {
        var index
        for (let i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i] === child) {
                index = i
                break
            }
        }
        return index
    }

    _canInsert(target) {
        if (this.name === 'root' || this === target) {
            return false
        }

        // cannot insert ancestor to child
        if (this.isTargetChild(target)) {
            return false
        }

        this.parent._removeChild(this)
        this.parent = target.parent
        this.pid = target.parent.id
        return true
    }

    insertBefore(target) {
        if (!this._canInsert(target)) return

        const pos = target.parent.findChildIndex(target)
        target.parent.children.splice(pos, 0, this)
    }

    insertAfter(target) {
        if (!this._canInsert(target)) return

        const pos = target.parent.findChildIndex(target)
        target.parent.children.splice(pos + 1, 0, this)
    }

    toString() {
        return JSON.stringify(traverseTree(this))
    }
}


