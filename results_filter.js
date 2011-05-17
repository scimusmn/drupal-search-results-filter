Drupal.behaviors.results_filterBehavior = function (context) {

  // create an array for class names
  var $types = [];

  // loop through results divs and add their class names to the $types array
  $('dl.search-results div').not('#search-tools').not('#search-tools div').each(function() {
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
    $query = $('input#edit-keys').val(); // store the original query
    $adv_query = $(this).val(); // get the desired type by looking at the selected option
    $adv_query_type = ''; // TODO: We need the machine name of the content type, not the label.

    $('input#edit-keys').val($query + ' type:' + $adv_query); // populate the search form with the adv query
     
    $('input#edit-submit').click(); // submit the form with the new query

  });

};
