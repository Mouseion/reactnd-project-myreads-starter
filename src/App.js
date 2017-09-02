import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBook'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  moveBook = (newBook, newShelf) => {
    if (this.state.books) {
      BooksAPI.update(newBook, newShelf).then(() => {
        newBook.shelf = newShelf
        const movedBooks = this.state.books.filter(book => book.id !== newBook.id)
        movedBooks.push(newBook);
        this.setState({ books: movedBooks })
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={ this.state.books } onMoveBook={ this.moveBook } />
        )}
        />
        <Route path="/search" render={(history) => (
          <SearchBooks books={ this.state.books } onMoveBook={ this.moveBook } />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
