import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Bookshelf from '../component/Bookshelf'

class Main extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array,
    updateBookState: PropTypes.func,
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Xzzzzz's Read</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf books={this.props.currentlyReading} updateBookState={this.props.updateBookState} bookshelfTitle="Currently Reading" />
            <Bookshelf books={this.props.wantToRead} updateBookState={this.props.updateBookState} bookshelfTitle="Want to Read" />
            <Bookshelf books={this.props.read} updateBookState={this.props.updateBookState} bookshelfTitle="Read" />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    )
  }
}

export default Main