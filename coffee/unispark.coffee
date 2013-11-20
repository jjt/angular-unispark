'use strict'

# Get colors from scope
# In descending priority:
#   colorTheme (string):  "solarized"
#   color (string):       "#c00"
#   colors (array):       ["#c00", "#d00", ... ]
getColors = (scope) ->
  colors = ['#c00']
  console.log scope.colors
  switch scope.colorTheme
    when 'solarized'
      colors = ['#b58900','#cb4b16','#dc322f','#d33682','#6c71c4','#268bd2',
        '#2aa198','#859900']

  if scope.color?
    colors = [scope.color]

  if scope.colors?
    try
      colors = JSON.parse scope.colors
    catch err
      console.log "error in jjtUnispark: expected scope.colors to be a JSON array string like \"['#cfa', '#88a']\"", err

  colors

# Take the input domain and map it to the range (default [0,5])
scaleData = (scope, data=scope.data, range=5, domain=[0, range]) ->
  try
    domain = JSON.parse scope.domain
  catch
    console.log "error in jjtUnispark: expected scope.domain to be a JSON array string like \"['#cfa', '#88a']\"", err
    
  domainSize = Math.abs domain[0] - domain[1]
  data.map (el) ->
    Math.floor (el + (domainSize / (range * 2))) * range / domainSize
  

angular.module('jjt.unispark', []).directive 'jjtUnispark', () ->
  template: ''
  scope:
    color: '@jjtUnisparkColor'
    colors: '@jjtUnisparkColors'
    colorTheme: '@jjtUnisparkColorTheme'
    data: '=jjtUnispark'
    domain: '@jjtUnisparkDomain'
  restrict: 'EA'
  link: (scope, element, attrs) ->
    colors = getColors scope
    data = scaleData scope
    htmlOutArr = for el, index in data
      color = colors[index % colors.length]
      # x2584 is wonky, so skip it. el is in [0,5], so floor(el/3) is 0 or 1
      charcode = 2581 + el + Math.floor(el/3)

      "<span style=\"color:#{color}\">&#x#{charcode};</span>"
      
    element.html(htmlOutArr.join(''))
      .addClass('jjtUnispark')

