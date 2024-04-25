import { emailRegex } from '../regexDados';

export const emailValidator = (email: string): boolean => {
	if (!email) {
		return false;
	}

	if (!emailRegex.test(email)) {
		return false;
	}

	return true;
};

export const passwordValidator = (password: string): boolean => {
	if (!password) {
		return false;
	}

	if (password.length < 6) {
		return false;
	}

	return true;
};
