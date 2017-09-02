import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  searchServer = (book) => {
    const { books } = this.props;
    const serverBook = books.find((serverBook) => (serverBook.id === book.id))
    book.shelf = serverBook ? serverBook.shelf : 'none'
    return book
  }

  updateQuery = (event) => {
    const query = event.target.value.trim()
    this.setState({ query: query })
    BooksAPI.search(query, 50).then(books => {
      if (books.length > 0) {
        books.map((book) => {
          this.searchServer(book)
        })
        this.setState({ results: books })
      } else {
        this.setState({ results: [] })
      }
    })
  }

  render() {
    const { query, results } = this.state
    const { onMoveBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={ this.updateQuery } />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((book) => (
               <li key={book.id}>
                 <Book book={ book } onMoveBook={ onMoveBook }  />
               </li>
             ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
