let tokenLocal = localStorage.getItem('token')
let bookList = document.querySelector('.book-list')
let searchInput = document.querySelector('.search-input')
let logOutBtn = document.querySelector('.logout-btn')
let resultTitle = document.querySelector('.result-title')
let sortByData = document.querySelector('.sort-bydate')
let bookMarkList = document.querySelector('.bookmarks-list')
let modal = document.querySelector('.modal')
let closeModal = document.querySelector('.close-modal')

if (!tokenLocal) {
    window.location.replace('./login.html')
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
})

let windowMarks = JSON.parse(window.localStorage.getItem('bookmarks'))
let newBookMark = windowMarks ? windowMarks : []

async function fetchBook(searchValue, sort) {
    bookList.innerHTML = null;

    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
        .then(response => response.json())
        .then(books => {
            resultTitle.innerHTML = `Showing ${books.totalItems} Result(s)`
            books.items.sort((a, b) => {
                if (sort == 'sortByNew') {
                    if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
                        return -1
                    } else if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
                        return 1
                    } else {
                        return 0
                    }
                }
                if (sort == 'sortByOld') {
                    if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
                        return 1
                    } else if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }).map((data) => {
                let bookItem = document.createElement('div')
                let bookCard = document.createElement('div')
                let bookMoreInfoSections = document.createElement('div')
                let bookBtnSections = document.createElement('div')
                let bookMarkBtnSections = document.createElement('div')
                let bookImageCard = document.createElement('div')
                let bookAuthorSection = document.createElement('div')
                let bookImage = document.createElement('img')
                let bookCardBody = document.createElement('div')
                let bookTitle = document.createElement('h5')
                let readBtn = document.createElement('a')
                let bookMarkBtn = document.createElement('button')
                let moreInfoBtn = document.createElement('button')
                let bookDate = document.createElement('p')

                bookItem.setAttribute('class', 'col')
                bookAuthorSection.setAttribute('class', 'd-flex')
                bookCard.setAttribute('class', 'card h-100 shadow rounded-1 d-flex justify-content-center')
                bookImageCard.setAttribute('class', 'px-5 d-flex justify-content-center pt-3')
                bookImage.setAttribute('class', 'rounded-1')
                bookCardBody.setAttribute('class', 'card-body px-4 mt-3')
                bookTitle.setAttribute('class', 'fs-5')
                bookMoreInfoSections.setAttribute('class', 'px-1 w-50')
                bookMarkBtnSections.setAttribute('class', 'px-1 w-50')
                bookBtnSections.setAttribute('class', 'd-flex')
                readBtn.setAttribute('class', 'btn btn-secondary w-100')
                bookMarkBtn.setAttribute('class', 'btn btn-warning w-100 px-0 mb-2')
                moreInfoBtn.setAttribute('class', 'btn btn-link w-100 px-0 mb-2 bg-white text-decoration-none')
                bookDate.setAttribute('class', 'card-text')
                bookImage.style.height = '300px';
                bookImageCard.style.height = '300px';

                readBtn.href = data.volumeInfo.previewLink;
                readBtn.target = '_blank';

                bookImage.src = data.volumeInfo.imageLinks?.thumbnail;
                bookTitle.textContent = data.volumeInfo?.title;
                bookDate.textContent = data.volumeInfo?.publishedDate;
                readBtn.textContent = 'Read';
                bookMarkBtn.textContent = 'BookMark';
                moreInfoBtn.textContent = 'More Info';

                bookMarkBtn.addEventListener('click', () => {
                    newBookMark.push(data)
                    window.localStorage.setItem('bookmarks', JSON.stringify(newBookMark))
                    bookMark(newBookMark)
                })

                moreInfoBtn.addEventListener('click', () => {
                    modalData(data)
                    modal.style.display = 'flex'
                })

                bookImageCard.appendChild(bookImage)
                bookCard.appendChild(bookImageCard)
                bookCard.appendChild(bookCardBody)
                bookCardBody.appendChild(bookTitle)
                data.volumeInfo.authors?.map((author) => {
                    let bookAuthor = document.createElement('p')

                    bookAuthor.setAttribute('class', 'card-text')
                    bookAuthor.textContent = author;

                    bookAuthorSection.appendChild(bookAuthor)

                })
                bookCardBody.appendChild(bookAuthorSection)
                bookCardBody.appendChild(bookDate)
                bookMarkBtnSections.appendChild(bookMarkBtn)
                bookMoreInfoSections.appendChild(moreInfoBtn)
                bookBtnSections.appendChild(bookMarkBtnSections)
                bookBtnSections.appendChild(bookMoreInfoSections)
                bookCardBody.appendChild(bookBtnSections)
                bookCardBody.appendChild(readBtn)
                bookItem.appendChild(bookCard)


                bookList.appendChild(bookItem)
            })
        })
}



fetchBook('terms', 'nosort')

searchInput.addEventListener('keyup', (e) => {
    fetchBook(e.target.value ? e.target.value : 'terms', 'nosort')
})

logOutBtn.addEventListener('click', () => {
    window.localStorage.removeItem('token')
    window.location.replace('./login.html')
})

sortByData.addEventListener('click', (e) => {
    e.target.classList.toggle('bynew')
    if(e.target.classList.contains('bynew')) {
        fetchBook(searchInput.value ? searchInput.value : 'terms', 'sortByNew')
    }else {
        fetchBook(searchInput.value ? searchInput.value : 'terms', 'sortByOld')
    }
})

function bookMark(bookmarkData) {
    bookMarkList.innerHTML = null;
    bookmarkData.map((elem) => {
        let markCardBody = document.createElement('div')
        let markCard = document.createElement('div')
        let markReadBtnSection = document.createElement('div')
        let markBtnSections = document.createElement('div')
        let markDeleteBtnSection = document.createElement('div')
        let markTitle = document.createElement('h5')
        let markReadBtn = document.createElement('a')
        let markDeleteBtn = document.createElement('button')

        markCardBody.setAttribute('class', 'card-body')
        markCard.setAttribute('class', 'card text-bg-light mb-3')
        markTitle.setAttribute('class', 'card-title')
        markReadBtn.setAttribute('class', 'btn btn-secondary w-100 px-0')
        markReadBtnSection.setAttribute('class', 'px-1 w-50')
        markDeleteBtnSection.setAttribute('class', 'px-1 w-50')
        markBtnSections.setAttribute('class', 'd-flex')
        markDeleteBtn.setAttribute('class', 'btn btn-danger w-100 px-0')

        markReadBtn.href = elem.volumeInfo.previewLink;
        markReadBtn.target = '_blank';

        markTitle.textContent = elem.volumeInfo?.title;
        markReadBtn.textContent = 'Read';
        markDeleteBtn.textContent = 'Delete';

        markDeleteBtn.addEventListener("click", (e) =>{
            newBookMark =  newBookMark.filter((par) => par.id != elem.id)

            window.localStorage.setItem('bookmarks', JSON.stringify(newBookMark))
            
            bookMark(newBookMark)

        })

        markCardBody.appendChild(markTitle)
        
        elem.volumeInfo.authors?.map((author) => {
            let markAuthor = document.createElement('p')
            
            markAuthor.setAttribute('class', 'card-text')
            markAuthor.textContent = author;
            
            markCardBody.appendChild(markAuthor)
            
        })
        markReadBtnSection.appendChild(markReadBtn)
        markDeleteBtnSection.appendChild(markDeleteBtn)
        markBtnSections.appendChild(markReadBtnSection)
        markBtnSections.appendChild(markDeleteBtnSection)
        markCardBody.appendChild(markBtnSections)
        markCard.appendChild(markCardBody)
        bookMarkList.appendChild(markCard)
    })
}

bookMark(newBookMark)

function modalData(findData) {
   let modalTitle = document.querySelector('.modal-title');
   let modalText = document.querySelector('.modal-text');
   let modalAuthor = document.querySelector('.modal-author');
   let modalCategorie = document.querySelector('.modal-categories');
   let modalPublisher = document.querySelector('.modal-publisher');
   let modalPageCount = document.querySelector('.modal-pagecount');
   let modalPublished = document.querySelector('.modal-published');

   modalTitle.textContent = findData.volumeInfo.title;
   modalText.textContent = findData.volumeInfo.description;
   modalPublisher.textContent = findData.volumeInfo.publisher;
   modalPublished.textContent = findData.volumeInfo.publishedDate;
   modalPageCount.textContent = findData.volumeInfo.pageCount;

   findData.volumeInfo.authors?.map((author) => {
    let findDataAuthor = document.createElement('button')
    
    findDataAuthor.setAttribute('class', 'btn btn-link bg-light text-decoration-none rounded-3')
    findDataAuthor.style.whiteSpace = 'no-wrap';
    findDataAuthor.textContent = author;
    
    modalAuthor.appendChild(findDataAuthor)
    
})

findData.volumeInfo.categories?.map((categorie) => {
    let findDataCategorie = document.createElement('button')
    
    findDataCategorie.setAttribute('class', 'btn btn-link bg-light text-decoration-none rounded-3')
    findDataCategorie.style.whiteSpace = 'no-wrap';
    findDataCategorie.textContent = categorie;
    
    modalCategorie.appendChild(findDataCategorie)
    
})
}