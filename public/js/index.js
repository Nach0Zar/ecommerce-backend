const socket = io();
function showMessages(messages) {
    const messageList = document.getElementById('messageList');
    let messagesHTML;
    //sort by time
    messages.sort((a, b) => {
        let fa = a.dateMsg.toLowerCase(),
            fb = b.dateMsg.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    console.log(messages)
    if (messages.length > 0){
        const messagesList = messages.map(({ dateMsg, author, message }) => {
            return `<li>${dateMsg} - ${author}: ${message}</li>`
        })
        messagesHTML = `
        <ul>
        ${messagesList.join('\n')}
        </ul>`
    }
    else{
        messagesHTML = `<h3>No message was uploaded</h3>`
    }
    messageList.innerHTML = messagesHTML
}
socket.on('updateMessages', (messages) => {
    showMessages(messages);
});
const buttonSendMessage = document.getElementById('buttonSendMessage');
buttonSendMessage.addEventListener('click', e => {
    const authorInput = document.getElementById('authorInput');
    const messageInput = document.getElementById('messageInput');
    if (authorInput.value && messageInput.value) {
        const message = {
            author: authorInput.value,
            message: messageInput.value,
            dateMsg: new Date().toLocaleString()
        }
        console.log(message)
        socket.emit('newMessage', message);
    } else {
        alert('Tu mensaje o tu nombre de usuario están vacios. Por favor rellenar los datos correctamente');
    }
});
function showProducts(products) {
    const productList = document.getElementById('productList');
    let productsHTML;
    if (products.length > 0){
        const productsList = products.map(({ title, price, thumbnail }) => {
            return `
            <div class="container item">
                <img class="imgThumbnail" src=${thumbnail}>
                <h3>
                    ${title}
                </h3>
                <h4>
                    ${price}
                </h4>
            </div>`
        })
        productsHTML = `${productsList.join('\n')}`
    }
    else{
        productsHTML = `<h3>No product was uploaded</h3>`
    }
    
    productList.innerHTML = productsHTML
}
socket.on('updateProducts', (products) => {
    showProducts(products);
});
const buttonSendProduct = document.getElementById('buttonSendProduct');
buttonSendProduct.addEventListener('click', e => {
    const titleInput = document.getElementById('titleInput');
    const priceInput = document.getElementById('priceInput');
    const thumbnailInput = document.getElementById('thumbnailInput');
    if (titleInput.value && priceInput.value && thumbnailInput.value) {
        const product = {
            title: titleInput.value,
            price: +priceInput.value,
            thumbnail: thumbnailInput.value
        }
        socket.emit('newProduct', product);
    } else {
        alert('Tu producto no fue llenado correctamente.');
    }
});