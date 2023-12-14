
export const hideEmail = (email:string) => {
  const [user, domain] = email.split('@');
  const userLength = user.length;
  const visibleChars = 3; 

  if (userLength <= 2 * visibleChars) {
  }

  const visibleStart = user.substring(0, visibleChars);
  const visibleEnd = user.substring(userLength - visibleChars, userLength);

  return `${visibleStart}${'*'.repeat(userLength - 2 * visibleChars)}${visibleEnd}@${domain}`;
};


export const validateEmail = (email:string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}