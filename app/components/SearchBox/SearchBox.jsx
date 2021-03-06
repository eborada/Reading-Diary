import React from 'react';
import {Route} from 'react-router-dom';

import SearchForm from 'SearchForm';
import SearchDisplay from 'SearchDisplay';
import googleRequests from 'googleRequests';

class SearchBox extends React.Component {
	constructor() {
		super();
		this.state = {
			searchResults: []
		};
	};

	handleSearch(searchTerm) {
		googleRequests.search(searchTerm).then((response) => {
			console.log(response);
			this.extrapolateResults(response.items);
		}), ((error) =>{
			console.log(error)
		});
	};

	extrapolateResults(arr) {
		function Book(objInArr) {
			this.link = objInArr.volumeInfo.infoLink;
			this.bookTitle = objInArr.volumeInfo.title;
			this.publishedDate = objInArr.volumeInfo.hasOwnProperty('publishedDate') ? objInArr.volumeInfo.publishedDate.slice(0,4) : "Unknown"
			this.author = objInArr.volumeInfo.hasOwnProperty('authors') ? objInArr.volumeInfo.authors : "Unknown";
			this.bookDescription = objInArr.volumeInfo.hasOwnProperty('description') ? objInArr.volumeInfo.description.substring(0, 350) + "..." : "No Description Available"
			this.thumbnail = objInArr.volumeInfo.hasOwnProperty('imageLinks') ? objInArr.volumeInfo.imageLinks.smallThumbnail : "No Thumbnail Available"
		};

		var finalRes = [];
		var initRes = arr;
		initRes.forEach(function (objInArr) {
			var obj = new Book(objInArr);
			finalRes.push(obj);
		});
		this.setState({
			searchResults: finalRes
		});
		console.log(this.state.searchResults);
	};

	render() {
		var res = this.state.searchResults;

		function renderResults() {
			if (res.length !== 0) {
				return (<SearchDisplay content={res} mode="searchRes"/>)
			}
			else {
				return;
			};
		};


		return (
			<div>
				<SearchForm onSearch={this.handleSearch.bind(this)} buttonClass="expanded button" classNameA="row" classNameB="columns medium-6 large-4 small-centered">
				</SearchForm>
				<br/>
				<br/><br/><br/>
				{renderResults()}
			</div>)
	}
};

export default SearchBox;
