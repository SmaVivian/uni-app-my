
export const getQueryString = (str) => {
  var query = location.hash.substring(1).split('?')[1];
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
  	 var pair = vars[i].split("=");
  	 if(pair[0] == str){return pair[1];}
  }
  return(false);
}