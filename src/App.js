import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './pages/Main'
import Search from './pages/Search'

class BooksApp extends React.Component {
  constructor() {
    super(...arguments)

    this.openSearchPage = this.openSearchPage.bind(this)
    this.openMainPage = this.openMainPage.bind(this)
  }

  openSearchPage() {

  }

  openMainPage() {

  }

  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/' component={Main}></Route>
          <Route exact path='/search' component={Search}></Route>
        </div>
      </Router>
    )
  }
}

export default BooksApp
