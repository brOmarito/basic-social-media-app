const validateEmail = (email) => {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailPattern.test(email);
}

exports.validateEmail = validateEmail;