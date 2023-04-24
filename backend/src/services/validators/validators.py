import re


def is_email(email):
    email_regex = re.compile(r"([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])")
    validate = re.fullmatch(email_regex, email)
    if validate:
        return True
    return False


def is_strong_password(password):
    password_regex = re.compile(r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    validate = re.fullmatch(password_regex, password)
    if validate:
        return True
    return False


def is_name(name):
    name_regex = re.compile(r"([A-Za-z]*)([\s\\\'-][A-Za-z]*)*")
    validate = re.fullmatch(name_regex, name)
    if validate:
        return True
    return False