import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
	const nameInputRef = useRef();
	const [enteredName, setEnteredName] = useState("");
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== "";
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameTouched(true);

		if (!enteredNameIsValid) {
			return;
		}

		console.log("useState:", enteredName);

		const enteredValue = nameInputRef.current.value;
		console.log("useRef:", enteredValue);

		setEnteredName("");
		setEnteredNameTouched(false);
	};

	// use only one - useState or useRefs
	// if you check only once when form is submitted then useRefs is better
	// if you check every key stroke, end want to reset input value, then useRefs is better

	const nameInputClasses = nameInputIsInvalid
		? "form-control invalid"
		: "form-control";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					ref={nameInputRef}
					type="text"
					id="name"
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className="form-actions">
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
