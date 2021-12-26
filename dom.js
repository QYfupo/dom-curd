window.dom = {
    //增
    create(string) {
        const container = document.createElement("template");//创建一个什么标签都能容纳的容器
        container.innerHTML = string.trim();
        return container.content.firstChild;
        // const container = document.creatElement("template");
        // container.innerHTML = string.trim();  trime能删掉空格
        // return container.Children[0];
    },
    after(node, node1) {
        console.log(node);
        console.log(node1);
        node.parentNode.insertBefore(node1, node.nextSibling);//通过调用父节点的insertBefor属性实现，实质上是给父节点新增了一个孩子node1
    },
    before(node, node1) {
        console.log("before", node)
        console.log("before", node1)
        node.parentNode.insertBefore(node1, node);
    },
    append(parent, child) {
        parent.appendChild(child);//在父节点的最后新增一个孩子；
    },
    append2(parent, node, node1) {
        parent.insertBefore(node1, node);//在node前面插入node1
    },
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)//给node节点新增一个爸爸parent
    },

    //删

    remove(node) {
        node.parentNode.removeChild(node)
        return node//删除一个节点并返回这个节点
    },
    empty(node) {
        let array = []
        let x = node.firstChild
        while (x) {
            console.log("孩子", x)
            dom.remove(x)
            x = node.firstChild
            array.push(x)
        }
        console.log(array)
    },
    //改
    attr(node, name, value) {
        if (arguments.length === 3) {//重载
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            let b = node.getAttribute(name, value)
            console.log(b)
            return b
        }//添加属性和读取属性
    },
    text(node, string) {
        if (arguments.length === 2) {
            if ("innerText" in node) {//适配
                node.innerText = string//ie读写文本内容
            } else {
                node.textContent = string//firefox读写文本内容
            }
        } else {
            if (arguments.length === 1) {
                if ("innerText" in node) {
                    return node.innerText
                } else {
                    return node.textContent
                }
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === "string") {
                return node.style[name]
            } else if (name instanceof Object) {
                for (let key in Object) {
                    node.style[name] = obj[key]
                }
            }

        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            let c = node.classList.contains(className)
            return c
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    //查
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    sibling(node) {
        return Array.from(node.parentNode.children).filter(n => n != node)
    },
    next(node) {
        let a = node.nextSibling
        while (a && a.nodeType === 3) {
            //3代表文本
            a = a.nextSibling
        }
        return a
    },
    previous(node) {
        let a = node.previousSibling
        while (a && a.nodeType === 3) {
            a = a.previousSibling
        }
        return a
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        let list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};


