Drupal.behaviors.results_filterBehavior = function (context) {

  // create an array for class names
  var $types = [];

  // loop through results divs and add their class names to the $types array
  $('dl.search-results div').not('#sort-search').each(function() {
    $types.push(this.className);
  });
 
  // filter the array of classes down to just the unique ones
  var $links = $types.filter(function(itm, i, $types) {
    return i == $types.indexOf(itm);
  });
  
  // Build and output the filter links
  var $options = '';
  $.each($links, function(index, value) {   
    $label = value.replace("-", " "); // convert dashes to spaces for the link text
    $options += '<option value="'+ value +'">' + $label + '</option>'; // markup for the link
  }); 
  $($options).appendTo('#types'); // put the options into the select list

  // Filter search results
  $('#types').change(function() {
    $destination = $(this).val(); // get the destination by looking at the selected option
    
    $('dl.search-results div').not('#sort-search').hide(); // hide everything
    
    if ($destination != 'all') {
      $('dl.search-results div.'+$destination).fadeIn('fast'); // show desired results if we're filtering    
    } else {
      $('dl.search-results div').fadeIn('fast'); // show all results if "Show all" is selected
    }
  
  });

};
