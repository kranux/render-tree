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
                    'label': 'Orci',
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
        }
    ]
}
];

const recursiveTreeContainer = document.getElementById('recursive-tree-container');

function renderNode(container, element, level) {
    let resultText = '';
    for(let i = 0; i<level; i+=1) {
        resultText += '-';
    }
    resultText = `${resultText} ${element.label}`;
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(resultText));
    const button = document.createElement('a');
    button.appendChild(document.createTextNode(' +'));
    button.addEventListener('click', function() {
        element.childs = element.childs || [];
        element.childs.push({
            label: `Child of '${element.label}' \#${element.childs.length + 1}`
        });
        render();
    });

    listItem.appendChild(button);
    container.appendChild(listItem);
}

function renderRecursive(container, data, level) {
    data.forEach(function(element) {
        renderNode(container, element, level);
        if (element.childs) {
            renderRecursive(container, element.childs, level + 1);
        }
    });
}

function emptyNode(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function render() {
    emptyNode(recursiveTreeContainer);
    renderRecursive(recursiveTreeContainer, data, 0);
}
window.addEventListener('load', function() {
    render();
});