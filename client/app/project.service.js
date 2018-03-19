
var ist = angular.module('ist');
ist.service('ProjectService', function($http) {
    this.getUISettings = $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/30838bb6110d5893819f38e7c712133a74fac848/UISettings.json");
    this.getTemplate = $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/f45b7e9e67db48f0c2c07289f61758f26dc4aaad/projectTemplate.json");
    this.getValue = $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/f45b7e9e67db48f0c2c07289f61758f26dc4aaad/projectValue.json");
})