import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookState:PropTypes.func
  }

  constructor() {
    super(...arguments)
    this.handleChange = this.handleChange.bind(this)
  }

  hanldeChange(e) {
    // const updateBookState = this.props.updateBookState
    // const bookId = this.props.book.bookId
    // const checkedValue = e.target.value
    // switch(checkValue) {
    //   case 'currentlyReading': {
    //     updateBookState
    //   }
    //   break;
    // }
  }

  render() {
    const { book } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: book.title}}></div>
          <div className="book-shelf-changer" onClick={this.handleChange}>
            <select onChange={this.props.updateBookChange}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book