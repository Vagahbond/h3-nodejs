import crw from "console-read-write"

const stack = {
    items: [],
    push: (item) => {
        stack.items =  [item, ...stack.items]
    },
    pop: () => {
        const temp = stack.items[0]
        stack.items.slice(0, 1)
        return temp;
    },
    peek: () => { stack.items[0] },
    isEmpty: () => stack.items.isEmpty(),
    size: () => { stack.items.length },
    clear: () => { stack.items = [] },
    print: () => {
        console.log(JSON.stringify(stack.items));
    },
};


stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

stack.peek(); // 4

stack.pop(); // 4

stack.print(); // [3,2,1]

stack.clear();

stack.print(); // []


