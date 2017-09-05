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
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    this.updateBookState = this.updateBookState.bind(this)
    this.findBookById = this.findBookById.bind(this)
  }

  findBookById(id) {
    var book = null
    const { books } = this.state
    books.some(bk => {
      if (bk.id === id) {
        book = bk
        return true
      }
    })
    return book;
  }
  // update book state when click
  updateBookState(book, shelf) {
    debugger
    const { books } = this.state
    const currentlyReading = []
    const wantToRead = []
    const read = []

    BooksAPI
      .update(book, shelf)
      .then(res => {
        debugger
        if (res) {
          res.currentlyReading.forEach(id => {
            const bk = this.findBookById(id)
            currentlyReading.push(bk)
          })
          res.wantToRead.forEach(id => {
            const bk = this.findBookById(id)
            wantToRead.push(bk)
          })
          res.read.forEach(id => {
            const bk = this.findBookById(id)
            read.push(bk)
          })

          this.setState({
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read,
          })
        }
      })
  }

  componentDidMount() {
    // when Component did mounted, get the response from API and init the bookshelf.
    BooksAPI.getAll().then(data => {
      let books = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: [],
      }

      books.books =data;

      data.forEach(book => {
        switch (book.shelf) {
          case 'currentlyReading': {
            books.currentlyReading.push(book)
          }
          break
          case 'wantToRead': {
            books.wantToRead.push(book)
          }
          break
          case 'read': {
            books.read.push(book)
          }
        }
      })
      debugger
      this.setState({
        books: books.books,
        currentlyReading: books.currentlyReading,
        wantToRead: books.wantToRead,
        read: books.read,
      })
    })

  }

  render() {
    console.dir(this.state)
    const {currentlyReading, wantToRead, read} = this.state
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
              <Search />
            )
          } />
        </div>
      </Router>
    )
  }
}

export default BooksApp 
