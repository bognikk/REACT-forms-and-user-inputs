import { useRef, useState } from "react";

const SimpleInput = (props) => {
	const nameInputRef = useRef();
	//name
	const [enteredName, setEnteredName] = useState("");
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	//email
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	//check name
	const enteredNameIsValid = enteredName.trim() !== "";
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	//check email
	const enteredEmailIsValid = enteredEmail.includes("@");
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
	};

	const emailInputBlurHandler = (event) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameTouched(true);
		setEnteredEmailTouched(true);

		if (!enteredNameIsValid && !enteredEmailIsValid) {
			return;
		}

		console.log("useState:", enteredName);

		const enteredValue = nameInputRef.current.value;
		console.log("useRef:", enteredValue);

		setEnteredName("");
		setEnteredNameTouched(false);

		setEnteredEmail("");
		setEnteredEmailTouched(false);
	};

	// use only one - useState or useRefs
	// if you check only once when form is submitted then useRefs is better
	// if you check every key stroke, end want to reset input value, then useRefs is better

	const nameInputClasses = nameInputIsInvalid
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
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && (
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
