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

const treeContainer = document.getElementById('tree-container');

function renderNode(data, level) {
    let resultText = '';
    for(let i = 0; i<level; i+=1) {
        resultText += '-';
    }
    resultText = `${resultText} ${data}`;
    const child = document.createElement('li');
    child.appendChild(document.createTextNode(resultText));
    treeContainer.appendChild(child);
}

function renderRecursive(data, level) {
    data.forEach(function(element) {
        renderNode(element.label, level);
        if (element.childs) {
            renderRecursive(element.childs, level + 1);
        }
    });
}

window.addEventListener('load', function() {
    renderRecursive(data, 0);
});