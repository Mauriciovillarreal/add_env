const socket = io()

document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const brands = document.getElementById('product-brands').value
    const name = document.getElementById('product-name').value
    const description = document.getElementById('product-description').value
    const code = document.getElementById('product-code').value
    const price = parseFloat(document.getElementById('product-price').value)
    const status = document.getElementById('product-status').checked
    const stock = parseInt(document.getElementById('product-stock').value)
    const category = document.getElementById('product-category').value
    const thumbnails = document.getElementById('product-thumbnails').value

    socket.emit('add-product', { 
        brands, 
        name, 
        description, 
        code, 
        price, 
        status, 
        stock, 
        category, 
        thumbnails 
    })
    document.getElementById('add-product-form').reset()
})


socket.on('update-products', (products) => {
    const productsList = document.getElementById('products-list')
    productsList.innerHTML = ''
    products.forEach((product) => {
        const li = document.createElement('li')
        li.classList.add('col') 
        const branDiv = document.createElement('h2')
        branDiv.textContent = product.brands
        li.appendChild(branDiv)
        const titleDiv = document.createElement('h2')
        titleDiv.textContent = product.name
        li.appendChild(titleDiv)
        const idDiv = document.createElement('div')
        idDiv.textContent = `id: ${product._id}`
        li.appendChild(idDiv)
        const priceDiv = document.createElement('div')
        priceDiv.textContent = `$${product.price}`
        li.appendChild(priceDiv)
        productsList.appendChild(li)
    })
})

document.getElementById('delete-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const _id = document.getElementById('delete-product-id').value
    const productId = String(_id)
    if (productId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(productId)) {
        showError('Invalid product ID')
        return
    }
    socket.emit('delete-product', productId)
    document.getElementById('delete-product-form').reset()
})

socket.on('product-not-found', () => {
    alert('No se encontró el producto con el ID proporcionado.')
})
