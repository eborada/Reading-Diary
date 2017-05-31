import React from 'react';

import MenuItem from 'MenuItem';
import googleRequests from 'googleRequests';


class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: []
		}
		this.onSearch = this.onSearch.bind(this);
}

	onSearch(e) {
		e.preventDefault();
		googleRequests.search(this.refs.searchTerm.value).then((response) => {
			console.log(response.items);
			this.setState({
				results: this.state.results.concat(response.items)
			});
			this.extrapolateResults(response.items);

		}), ((error) =>{
			console.log(error)
		});
		this.refs.searchTerm.value = '';
	}
extrapolateResults(arr) {
		function Book(objInArr) {
			this.bookTitle = objInArr.volumeInfo.title;
			this.author = objInArr.volumeInfo.authors;
			this.bookDescription = objInArr.volumeInfo.description;
			this.thumbnail = function() {
				if (objInArr.volumeInfo.hasOwnProperty('imageLinks')){
				return objInArr.volumeInfo.imageLinks.smallThumbnail
			} 
			else {
				return "No Thumbnail Available";
			}
		};
			this.thumbnailPic = this.thumbnail();

	}
		
	var finalRes = [];
	var initRes = arr;
		initRes.forEach(function (objInArr) {
			var obj = new Book(objInArr);
			finalRes.push(obj);
		})
	console.log(finalRes)
	return finalRes
}
	render() {
		var style = {
			border: '1px solid black',
			float: 'left',
			height: '20rem',
			width: '100%'
		}

		return(
			<div style={style} className="container">
				<form onSubmit={this.onSearch}>
					<input type="text" placeholder="search name here" ref="searchTerm"/>
					<input type="submit" className="button" value="Get Book"/>
				</form>
			</div>
			);
	}
};

export default SearchForm;