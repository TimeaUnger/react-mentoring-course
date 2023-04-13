import React, { useState, useRef} from "react";
import MultiSelectDropdown from './MultiSelectDropdown';
import Button from "./Button";
import './MovieForm.css';

const MovieForm = (props) => {
	
	const multiSelectOptions = [
		{ value: "Drama", label: "Drama" },
		{ value: "Romance", label: "Romance" },
		{ value: "Animation", label: "Animation" },
		{ value: "Adventure", label: "Adventure" },
		{ value: "Family", label: "Family" },
		{ value: "Comedy", label: "Comedy" },
		{ value: "Fantasy", label: "Fantasy" },
		{ value: "Science Fiction", label: "Science Fiction" },
		{ value: "Action", label: "Action" }
	];

	const onEditSelectedOptions = props.formData.genres;
	const arrSetGenres = [];
	const formRef = useRef();
	
	// set existing genres if any into correct object format for multi-select options
	onEditSelectedOptions?.map((genre) => {
		arrSetGenres.push({value: `${genre}`, label: `${genre}`});
	});

	const [optionSelected, setMultiSelectOption] = useState(arrSetGenres);
	const { formAction } = props;
	const {id, title, poster_path, vote_average, release_date, runtime, overview} = props.formData

	const handleChange = (selected) => {
    setMultiSelectOption(selected);
  };

	const handleSubmit = (event) => {

		event.preventDefault();

		const formDataSubmit = Object.fromEntries(new FormData(event.target));

		if(formAction === 'delete'){
			props.handleSubmit(id,'delete');
			props.handleCloseModal();
		}
		else{
			const arrOptionSelected = [];
			// convert selected options back to simple array
			if(optionSelected.length > 1){
				optionSelected?.map((genre) => {
					arrOptionSelected.push(genre.value);
				});
			}
			
			formDataSubmit.genres = arrOptionSelected;	

			props.handleSubmit(formDataSubmit);
			props.handleCloseModal();
		}
	}

	const resetForm = () => {
		console.log('reset')
		formRef.current.reset();
	}

	return (

		<div className="movieFormWrapper">
			<div className="movieFormBoxTitle">{`${formAction} movie`}</div>
			<div className="movieForm">
				<form ref={formRef} onSubmit={handleSubmit}>
				{formAction === 'delete' 
					?	<div className="deleteMovieContent">
							<div className="deleteMovieBody">Are you sure you want to delete this movie?</div>
							<div className="deleteMovieFooter">
								<Button type="submit" className="movieFormSubmitBtn">Confirm</Button>
							</div>
						</div>
					
					: <div className="movieFormContent">
							<div className="inputRow">
								<div className="movieTitle">
									<label htmlFor="movieTitle" className="movieFormLabel">Title</label>
									<input 
										type="text" 
										className="movieTitleInput" 
										data-testid="movieTitleInput"
										name="title" 
										id="movieTitle" 
										defaultValue={title}
									/>
								</div>
								<div className="movieReleaseDate">
									<label htmlFor="movieReleaseDate" className="movieFormLabel">Release date</label>
									<input 
										type="date" 
										name="release_date" 
										id="movieReleaseDate" 
										defaultValue={release_date} 
									/>
								</div>
							</div>
							<div className="inputRow">
								<div className="movieUrl">
									<label htmlFor="movieUrl" className="movieFormLabel">Movie url</label>
									<input 
										type="text" 
										name="poster_path" 
										id="movieUrl" 
										defaultValue={poster_path}
									/>
								</div>
								<div className="movieRating">
									<label htmlFor="movieRating" className="movieFormLabel">Rating</label>
									<input 
										type="text" 
										name="vote_average" 
										id="movieRating" 
										defaultValue={vote_average}
									/>
								</div>
							</div>
							<div className="inputRow">
								<div className="movieGenreSelect">
									<label htmlFor="movieGenre" className="movieFormLabel">Genre</label>
									<MultiSelectDropdown 
										options={multiSelectOptions}
										handleChange={handleChange}
										defaultValue={arrSetGenres}
										isMulti={true}
										className="movieFormOptions"
									/>
								</div>
								<div className="movieRuntime">
									<label htmlFor="movieRuntime" className="movieFormLabel">Runtime</label>
									<input 
										type="text" 
										name="runtime" 
										id="movieRuntime" 
										defaultValue={runtime}				
									/>
								</div>
							</div>
							<div className="inputRow textarea">
								<label htmlFor="movieOverview" className="movieFormLabel">Overview</label>
								<textarea 
									name="overview" 
									id="movieOverview" 
									defaultValue={overview}
								>
								</textarea>
							</div>
							<div className="formButtonsWrapper">
								<Button type="button" className="movieFormResetBtn" onClick={resetForm}>Reset</Button>
								<Button type="submit" className="movieFormSubmitBtn">Submit</Button>
							</div>
						</div>
					}
				</form>
			</div>
		</div>
	)
}

export default MovieForm;