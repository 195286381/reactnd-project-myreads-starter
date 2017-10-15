import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookState:PropTypes.func
  }

  constructor() {
    super(...arguments)
    this.state = {
      shelf: this.props.book.shelf
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    
    const {book, updateBookState} = this.props
    const shelf = e.target.value
    if (book.shelf !== shelf) {
      updateBookState(book, shelf)
    }
    this.setState({shelf: shelf})
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: `url(${
            // thre is a bug, when search letter "l", it has a book has no imageLinks property.
            // so set a protect. there is no imageLinks property, return a empty string
            !book.imageLinks ? '' : book.imageLinks.smallThumbnail || book.imageLinks.thumbnail
          })`}}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleChange} value={this.state.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
      </div>
    )
  }
}

export default Book