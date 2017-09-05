import React from 'react'

import Book from './Book'

const Bookshelf = ({books}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
					books.map((book) => (
            <li>
              <Book book={book} />
            </li>
					))
        }
      </ol>
    </div>
  </div>
)

export default Bookshelf