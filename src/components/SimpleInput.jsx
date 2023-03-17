import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
	const nameInputRef = useRef();
	const [enteredName, setEnteredName] = useState("");
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	useEffect(() => {
		if (enteredNameIsValid) {
			console.log("Name Input is valid!");
		}
	}, [enteredNameIsValid]);

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameTouched(true);

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		}
		setEnteredNameIsValid(true);

		console.log("useState:", enteredName);
		const enteredValue = nameInputRef.current.value;
		console.log("useRef:", enteredValue);

		setEnteredName("");
	};

	// use only one of these two
	// if you check only once when form is submitted then useRefs is better
	// if you check every key stroke, end want to reset input value, then useRefs is better

	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

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
