// console.log(window.location)

export const useCurrentPath = () => {

  if (window.location.search !== "undefined") {
    return window.location.search;
  }
  else {
    return window.location.pathname;
  }
  
}