import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static PropTypes = {
    book: PropTypes.prop,
    bookshelfTitle: PropTypes.string,
    updateBookState: PropTypes.func,
  }
  
  render() {
    const { books, bookshelfTitle, updateBookState } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { 
              books.map((book) => (
                <li key={book.id}>
                  <Book book={book} updateBookState={updateBookState}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
