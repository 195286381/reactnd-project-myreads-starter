import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './pages/Main'
import Search from './pages/Search'

class BooksApp extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    this.updateBookState = this.updateBookState.bind(this)
    this.findBookById = this.findBookById.bind(this)
  }

  findBookById(id) {
    var book = null
    const Prevbooks = [...this.state.currentlyReading, ...this.state.wantToRead, ...this.state.read]
    Prevbooks.find(bk => {
      if (bk.id === id) {
        book = bk
        return true
      }
      return false
    })
    return book
  }

  // update book state when click
  updateBookState(book, shelf) {
    const { currentlyReading, wantToRead, read } = this.state
    const prevBooks = [...currentlyReading, ...wantToRead, ...read]
    // judge book is if in bookshelf
    var isInBookShelf = prevBooks.find(bk => bk.id === book.id )

    if (isInBookShelf) {
      const currentlyReadingAry = []
      const wantToReadAry = []
      const readAry = []

      BooksAPI.update(book, shelf).then(res => {
        if (res) {
          res.currentlyReading.forEach(id => {
            const bk = this.findBookById(id)
            bk.shelf = 'currentlyReading'
            currentlyReadingAry.push(bk)
          })
          res.wantToRead.forEach(id => {
            const bk = this.findBookById(id)
            bk.shelf = 'wantToRead'
            wantToReadAry.push(bk)
          })
          res.read.forEach(id => {
            const bk = this.findBookById(id)
            bk.shelf = 'read'
            readAry.push(bk)
          })

          this.setState({
            currentlyReading: currentlyReadingAry,
            wantToRead: wantToReadAry,
            read: readAry,
          })
        }
      })
    } else {
      // bugFixed: BooksAPI.update even if the book is not in the shelf
      BooksAPI.update(book, shelf).then(() => {
          const shelfType = shelf
          book.shelf = shelfType
          if (shelfType === 'currentlyReading') {
            this.setState({currentlyReading: [...currentlyReading, book]})
          } else if (shelfType === 'wantToRead'){
            this.setState({wantToRead: [...wantToRead, book]})
          } else if (shelfType === 'read') {
            this.setState({read: [...read, book]})
          }
        }
      )
    }
    
  }

  componentDidMount() {
    // when Component did mounted, get the response from API and init the bookshelf.
    BooksAPI.getAll().then(data => {
      let books = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      }

      books.books =data

      data.forEach(book => {
        switch (book.shelf) {
          case 'currentlyReading':
            books.currentlyReading.push(book)
            break
          case 'wantToRead': 
            books.wantToRead.push(book)
            break
          case 'read': 
            books.read.push(book)
            break
          default:
            break
        }
      })
      this.setState({
        currentlyReading: books.currentlyReading,
        wantToRead: books.wantToRead,
        read: books.read,
      })
    })

  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state
    const books = [...currentlyReading, ...wantToRead, ...read]
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={
            () => (
              <Main 
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
                updateBookState={this.updateBookState}
              />
            )
          } />
          <Route exact path='/search' render={
            () => (
              <Search 
                books={books} 
                updateBookState={this.updateBookState} 
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
                read={read}
              />
            )
          } />
        </div>
      </Router>
    )
  }
}

export default BooksApp 