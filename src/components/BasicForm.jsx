import useInput from "../hooks/use-input";

const checkIfEmpty = (value) => value.trim() !== "";
const checkEmail = (value) => value.includes("@");

const BasicForm = (props) => {
	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: firstNameReset,
	} = useInput(checkIfEmpty);

	const {
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: lastNameReset,
	} = useInput(checkIfEmpty);

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: emailReset,
	} = useInput(checkEmail);

	let formIsValid = false;

	if (firstNameIsValid && lastNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const submitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log("First name:", firstNameValue);
		console.log("Last name:", lastNameValue);
		console.log("Email:", emailValue);

		firstNameReset();
		lastNameReset();
		emailReset();
	};

	const firstNameClasses = firstNameHasError
		? "form-control invalid"
		: "form-control";

	const lastNameClasses = lastNameHasError
		? "form-control invalid"
		: "form-control";

	const emailClasses = emailHasError ? "form-control invalid" : "form-control";

	return (
		<form onSubmit={submitHandler}>
			<h3>Practice Form</h3>
			<div className="control-group">
				<div className={firstNameClasses}>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						value={firstNameValue}
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
					/>
					{firstNameHasError && (
						<p className="error-text">Please enter a first name.</p>
					)}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						value={lastNameValue}
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
					/>
					{lastNameHasError && (
						<p className="error-text">Please enter a last name.</p>
					)}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input
					type="email"
					id="email"
					value={emailValue}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
				/>
				{emailHasError && (
					<p className="error-text">Please enter a valid email adrdress.</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
