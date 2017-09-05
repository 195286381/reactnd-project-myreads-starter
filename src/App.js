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
        curentlyReading: [],
        wantToRead: [],
        read: []
    }

    this.updateBookState = this.updateBookState.bind(this)
  }

  // update book state when click
  updateBookState(bookId, state) {
    // change book state and reload state
  }


  componentDidMount() {
    // when Component did mounted, get the response from API and init the bookshelf.
    
    BooksAPI.getAll().then(data => {
      let books = {
        curentlyReading: [],
        wantToRead: [],
        read: []
      };
      switch() {
        case 1: {

        }
        break
        case 2: {

        }
        break
        case 3: {

        }
        break
      }
      this.setState({...books})
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' render={
            () => (
              <Main 
                curentlyReading={this.state.curentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
              />
            )
          } />
          <Route exact path='/search' component={Search} />
        </div>
      </Router>
    )
  }
}

export default BooksApp 
