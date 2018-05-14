/** scripts.js */
let notes = window.localStorage.getItem('notes') || '{"data": []}';
// recuperar informações do data storage
notes = JSON.parse(notes);

// função atualizar lista
let updateList = function () {
    Array.observe(notes.data, function (changes) {
        let index = null;
        let value = '';
        let status = null;

        if (changes[0].type === 'splice') {
            index = changes[0].index;
            value = changes[0].object[index];
            status = (changes[0].addedCount > 0) ? 'created' : 'removed';
        }

        if (changes[0].type === 'update') {
            index = changes[0].name;
            value = changes[0].object[index];
            status = 'updated';
        }

        if (!value && status === 'created' && status === 'updated') {
            return;
        }

        let notesTag = document.getElementById('notes');

        if (status === 'updated') {
            return;
        }

        if (status === 'removed') {
            let listOfNotes = document.querySelectorAll('#notes li');
            notesTag.removeChild(listOfNotes[index]);
        }

        if (status === 'created') {
            let newLi = document.createElement('li');
            newLi.innerHTML = value;
            notesTag.appendChild(newLi);
        }

        // salvar json no data storage
        window.localStorage.setItem('notes', JSON.stringify(notes));
    });
}

let createNote = function () {
    // pegar valor do input do formulario
    let input = document.querySelector('#form-add-note input[type="text"]');
    let value = input.value;

    // adiciona o novo item no final do array
    notes.data.push(value);

    // limpando o input
    input.value = "";
}

/** atualizar a lista */
updateList();

/* quando o documento é carregado */
document.addEventListener('DOMContentLoaded', function (event) {
    let listOfNotes = document.getElementById('notes');
    // limpa a lista
    let listHtml = '';

    /* percorre o array e lista os li com os valores */
    for(let i=0; i< notes.data.length; i++) {
        listHtml += '<li>' + notes.data[i] +  '</li>';
    }

    // adicionar lista ao html
    listOfNotes.innerHTML = listHtml;

    /* pegar evento de envio */
    let formAddNotes = document.getElementById('form-add-note')
    formAddNotes.addEventListener('submit', function (e) {
        /* não recarregar a pagina inteira, envia mas não recarregar a página */
        e.preventDefault();

        /* função criar nota */
        createNote();
    });
});

document.addEventListener('click', function (e) {
    let notesTag = document.getElementById('notes');

    if (e.target.parentElement === notesTag) {
        if (confirm('remover esta nota?')) {
            // pega todos os itens
            let listOfNotes = document.querySelectorAll('#notes li');
            
            // percorre todos os item 
            listOfNotes.forEach(function (item, index) {

                if (e.target === item) {
                    /* reove o item da lista apartir do index */
                    notes.data.splice(index, 1);
                }
            });
        }
    }
});

if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function(reg) {
                console.log('Service worker registrado.');
            })
            .catch(function (err) {
                console.log('erro', err);
            });
    });
}