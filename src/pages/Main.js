import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from '../component/Bookshelf'

class Main extends Component {
  static propTypes = {
    curentlyReading: PropTypes.array,
    wantToRead: PropTypes.array,
    read: PropTypes.array,
  }

  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Xzzzzz's Read</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf books={this.props.curentlyReading} bookshelfTitle="Currently Reading" />
            <Bookshelf books={this.props.wantToRead} bookshelfTitle="Want to Read" />
            <Bookshelf books={this.props.read} bookshelfTitle="Read" />
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