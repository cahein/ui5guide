if (typeof oum === "undefined") {
   var oum = {};
}
oum.namespace = function(string) {
   let object = this;
   const levels = string.split(".");
   for (let i = 0, l = levels.length; i < l; i++) {
      if (typeof object[levels[i]] === "undefined") {
         object[levels[i]] = {};
      }
      object = object[levels[i]];
   }
   return object;
};
