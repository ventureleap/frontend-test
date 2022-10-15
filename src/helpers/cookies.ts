export function setCookie(
  cookieName: string,
  cookieValue: string,
  expireDays?: number
) {
  let expires = '';
  if (expireDays) {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie =
    cookieName + '=' + (cookieValue || '') + expires + '; path=/';
}

export function getCookie(cookieName: string) {
  const name = cookieName + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function removeCookie(cookieName: string) {
  document.cookie = cookieName + '=; Max-Age=-99999999;';
}
