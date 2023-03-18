import { useRef, useState } from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput((value) => value.trim() !== "");

	const nameInputRef = useRef();

	//email
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	//check email
	const enteredEmailIsValid = enteredEmail.includes("@");
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const emailInputBlurHandler = (event) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredEmailTouched(true);

		if (!enteredNameIsValid && !enteredEmailIsValid) {
			return;
		}

		console.log("useState:", enteredName);

		const enteredValue = nameInputRef.current.value;
		console.log("useRef:", enteredValue);

		resetNameInput();

		setEnteredEmail("");
		setEnteredEmailTouched(false);
	};

	// use only one - useState or useRefs
	// if you check only once when form is submitted then useRefs is better
	// if you check every key stroke, end want to reset input value, then useRefs is better

	const nameInputClasses = nameInputHasError
		? "form-control invalid"
		: "form-control";

	const emailInputClasses = emailInputIsInvalid
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
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameInputHasError && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Your E-Mail</label>
				<input
					type="email"
					id="email"
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
				/>
				{emailInputIsInvalid && (
					<p className="error-text">Please enter a valid email.</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
