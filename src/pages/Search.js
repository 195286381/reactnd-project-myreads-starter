import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

import Book from '../component/Book'

class Search extends Component {

  static propTypes = {
    getSearchResultFn: PropTypes.func,
    books: PropTypes.array,
    updateBookState: PropTypes.func,
  }

  constructor() {
    super(...arguments)
    this.state = {
      searchBooks: [],
    }
    this.handleInpputChange = this.handleInpputChange.bind(this)
  }

  modifyBookShelf(book) {
    const { books } = this.props
    var shelf = 'none'
    books.forEach(bk => {
      if (book.id === bk.id) {
        shelf = bk.shelf
      }
    })
    book.shelf = shelf
    
  }

  handleInpputChange(e) {
    var query = e.target.value
    
    BooksAPI.search(query).then(books => {
      if (!Array.isArray(books)) {
        this.setState({searchBooks: []})
        return
      }
      this.setState({searchBooks: books})
    })
  }


  render() {
    const { searchBooks } = this.state
    const { updateBookState } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.handleInpputChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { 
              searchBooks.map((book) => {
                this.modifyBookShelf(book)
                return (
                  <li key={book.id}>
                    <Book book={book} updateBookState={updateBookState}/>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search