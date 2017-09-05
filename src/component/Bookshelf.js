import React from 'react'

import Book from './Book'

const Bookshelf = ({books, bookshelfTitle}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{bookshelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { 
	  books.map((book) => (
            <li key={Math.random()}>
              <Book book={book} />
            </li>
	  ))
        }
      </ol>
    </div>
  </div>
)

export default Bookshelf
