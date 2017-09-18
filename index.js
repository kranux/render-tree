const data = [
    {
        label: 'Lorem',
        childs: [
            {
                label: 'Ipsum'
            },
            {
                label: 'Dolor',
                childs: [
                    {
                        label: 'Orci',
                        childs: [
                            {
                                label: 'Quis',
                                childs: [
                                    {
                                        label: 'Odio'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Sit',
                childs: [
                    {
                        label: 'Amet',
                    },
                    {
                        label: 'Consectetur'
                    }
                ]
            },
            {
                label: 'Adioiscing',
                childs: [
                    {
                        label: 'Elit',
                        childs: [
                            {
                                label: 'Vestibulum'
                            },
                            {
                                label: 'Vitae'
                            }
                        ]
                    }

                ]
            }
        ]
    }
];

const recursiveTreeContainer = document.getElementById('recursive-tree-container');
const iterativeTreeContainer = document.getElementById('iterative-tree-container');

function renderNode(container, element, level) {
    let resultText = '';
    for(let i = 0; i < level; i += 1) {
        resultText += '-';
    }
    resultText = `${resultText} ${element.label}`;
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(resultText));
    const button = document.createElement('a');
    button.appendChild(document.createTextNode(' +'));
    button.addEventListener('click', function() {
        const label = prompt('Enter name:'); 
        element.childs = element.childs || [];
        element.childs.push({label});
        render();
    });

    listItem.appendChild(button);
    container.appendChild(listItem);
}

function renderRecursive(container, nodes, level) {
    nodes.forEach(function(node) {
        renderNode(container, node, level);
        if (node.childs) {
            renderRecursive(container, node.childs, level + 1);
        }
    });
}

function renderIterative(container, nodes) {
    const stack = [
        {
            level: 0,
            element: nodes[0]
        }
    ];

    let current;
    while(current = stack.pop()) {
        renderNode(container, current.element, current.level);
        if (current.element.childs) {
            [...current.element.childs].reverse().forEach(function(node){
                stack.push({
                    element: node,
                    level: current.level + 1
                })
            });
        }
    }
}

function emptyNode(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function render() {
    emptyNode(recursiveTreeContainer);
    renderRecursive(recursiveTreeContainer, data, 0);

    emptyNode(iterativeTreeContainer);
    renderIterative(iterativeTreeContainer, data);
}

window.addEventListener('load', function() {
    render();
});