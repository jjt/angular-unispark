'use strict';
var getColors, scaleData;

getColors = function(scope) {
  var colors, err;
  colors = ['#c00'];
  console.log(scope.colors);
  switch (scope.colorTheme) {
    case 'solarized':
      colors = ['#b58900', '#cb4b16', '#dc322f', '#d33682', '#6c71c4', '#268bd2', '#2aa198', '#859900'];
  }
  if (scope.color != null) {
    colors = [scope.color];
  }
  if (scope.colors != null) {
    try {
      colors = JSON.parse(scope.colors);
    } catch (_error) {
      err = _error;
      console.log("error in jjtUnispark: expected scope.colors to be a JSON array string like \"['#cfa', '#88a']\"", err);
    }
  }
  return colors;
};

scaleData = function(scope, data, range, domain) {
  var domainSize;
  if (data == null) {
    data = scope.data;
  }
  if (range == null) {
    range = 5;
  }
  if (domain == null) {
    domain = [0, range];
  }
  try {
    domain = JSON.parse(scope.domain);
  } catch (_error) {
    console.log("error in jjtUnispark: expected scope.domain to be a JSON array string like \"['#cfa', '#88a']\"", err);
  }
  domainSize = Math.abs(domain[0] - domain[1]);
  return data.map(function(el) {
    return Math.floor((el + (domainSize / (range * 2))) * range / domainSize);
  });
};

angular.module('jjt.unispark', []).directive('jjtUnispark', function() {
  return {
    template: '',
    scope: {
      color: '@jjtUnisparkColor',
      colors: '@jjtUnisparkColors',
      colorTheme: '@jjtUnisparkColorTheme',
      data: '=jjtUnispark',
      domain: '@jjtUnisparkDomain'
    },
    restrict: 'EA',
    link: function(scope, element, attrs) {
      var charcode, color, colors, data, el, htmlOutArr, index;
      colors = getColors(scope);
      data = scaleData(scope);
      htmlOutArr = (function() {
        var _i, _len, _results;
        _results = [];
        for (index = _i = 0, _len = data.length; _i < _len; index = ++_i) {
          el = data[index];
          color = colors[index % colors.length];
          charcode = 2581 + el + Math.floor(el / 3);
          _results.push("<span style=\"color:" + color + "\">&#x" + charcode + ";</span>");
        }
        return _results;
      })();
      return element.html(htmlOutArr.join('')).addClass('jjtUnispark');
    }
  };
});
