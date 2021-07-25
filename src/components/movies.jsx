import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1,
    });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (event) => {
    const { value } = event.currentTarget;
    this.setState({ searchQuery: value, selectedGenre: null, currentPage: 1 });
  };
  render() {
    const length = this.state.movies.length;
    if (length === 0) return <p>No movies to show!</p>;
    const { searchQuery } = this.state;
    let filtered = this.state.movies;
    if (searchQuery)
      filtered = this.state.movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (this.state.selectedGenre && this.state.selectedGenre._id)
      filtered = this.state.movies.filter(
        (m) => m.genre._id === this.state.selectedGenre._id
      );
    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <button
            style={{ marginBottom: "10px" }}
            onClick={() => this.props.history.push("/movies/new")}
            className="btn btn-primary"
          >
            New Movie
          </button>
          <p>There are {filtered.length} movies available</p>
          <div className="form-group">
            <input
              name=""
              value={this.state.searchQuery}
              type="text"
              placeholder="Search..."
              className="form-control my-3"
              onChange={this.handleSearch}
            />
          </div>
          <MoviesTable
            movies={movies}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
