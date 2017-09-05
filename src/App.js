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
      books: null,
    }
  }

  // 挂载完成后加载书架信息.
  componentDidMount() {
    BooksAPI.getAll().then(data => {
      debugger;
      this.setState({books: data})
    })
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
