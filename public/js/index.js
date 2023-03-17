const socket = io();
function showMessages(messages) {
    const messageList = document.getElementById('messageList');
    let messagesHTML;
    if (messages.mensajes.length > 0){
        //normalizer
        const authorSchema = new normalizr.schema.Entity('authors');
        const messageSchema = new normalizr.schema.Entity('messages', {
            author: authorSchema
        });
        const messagesList = messages.mensajes.map((mensaje)=>{
            const denormalizedMessage = normalizr.denormalize(mensaje.result, messageSchema, mensaje.entities);
            return `<li>${denormalizedMessage.dateMsg} - ${denormalizedMessage.author.id} - ${denormalizedMessage.author.firstName} ${denormalizedMessage.author.lastName} : ${denormalizedMessage.message}</li>` 
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
socket.on('updateMessages', (messages, caracteres) => {
    showMessages(messages);
    console.log("La cantidad de caracteres de la lista SIN normalizar es de "+caracteres[0]);
    console.log("La cantidad de caracteres de la lista normalizada es de "+caracteres[1]);
    const porcentaje = 100-((caracteres[0]*100)/caracteres[1])
    console.log("El porcentaje de compresión es de %"+porcentaje);
});
const buttonSendMessage = document.getElementById('buttonSendMessage');
buttonSendMessage.addEventListener('click', e => {
    const emailInput = document.getElementById('emailInput');
    const firstNameInput = document.getElementById('firstNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const ageInput = document.getElementById('ageInput');
    const aliasInput = document.getElementById('aliasInput');
    const avatarInput = document.getElementById('avatarInput');
    const messageInput = document.getElementById('messageInput');
    if (emailInput.value && messageInput.value && firstNameInput.value && lastNameInput.value && ageInput.value && aliasInput.value && avatarInput.value) {
        const author = {
            id: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            age: +ageInput.value,
            avatar: avatarInput.value,
            alias: aliasInput.value,
        }
        const message = {
            author: author,
            message: messageInput.value,
            dateMsg: new Date().toLocaleString()
        }
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
const logoutForm = document.getElementById('logoutForm');
const loginForm = document.getElementById('loginForm');
async function sessionData(){
    const session = await fetch('/api/sessionInfo', {method: 'GET'})
    const sessionData = (await session.json())
    if(sessionData.username){
        loginForm.hidden = true
        const bienvenidaUsuario = document.getElementById('bienvenidaUsuario')
        bienvenidaUsuario.innerText = "Bienvenido " + sessionData.username
    }
    else{
        logoutForm.hidden = true
    }
}
sessionData()