/// <reference path="../../scripts/angular.min.js" />
//from Liviu T. at stackoverflow 9Feb2013
app.filter('currencyWhole', ['$filter', '$locale', function (filter, locale) {
      var currencyFilter = filter('currency');
      var formats = locale.NUMBER_FORMATS;
      return function (amount, currencySymbol) {
          var value = currencyFilter(amount, currencySymbol);
          var sep = value.indexOf(formats.DECIMAL_SEP);
          if (amount >= 0) {
              return value.substring(0, sep);
          }
          return value.substring(0, sep) + ')';
      };
  }]);