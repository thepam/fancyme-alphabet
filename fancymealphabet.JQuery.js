/* FancyMe Alphabet Plugin
 * By Pamela Rodriguez
 * Free to use
 * Link backs are appreciated :)
 * www.thepamrdz.com
 */

(function($){

$.fn.fancymealphabet = function(params){
	params = $.extend( {
	  theme: 'default', // Available themes: blue, red, orange, green, pink, black, yellow, and purple
	  tabheight: 'auto', //Height of the tab containers. Default is auto (depending on the content), any other value should be in pixels (e.j: '400px')
	  collength: '15', // Changing to 'one' lets only one menu be shown at a time. Default is 'all' can be shown
	  }, params);
    var items = []; //Declares array of items to be sorted
    var titles = []; //Declares array of titles (tab selectors)
    var main = $(this);
    var numflag = 0;
    main.addClass('fancyme-alphabet'); //Adds class to main element
	if(params.theme != "default"){
		main.addClass(params.theme); //Adds theme class		
	}
    main.find('span').each(function(){
        items.push($(this).html()); //Adds all sortable elements to the declared array
    });
    items.sort(); //Sorts
	var listitems = 0; 
    var htmlcode = ""; 
    for(var i=0; i<items.length; i++){ //For each item already sorted
        if(numflag==0){ //This identifies whether all the objects starting with a number or special character have been sorted
			if((/[a-zA-Z]/.test(items[i].substr(0,1).toUpperCase()))){ //If the item no longer starts with number and/or special character
            	numflag = 1; 
            	if(htmlcode == ""){
                    htmlcode = "<div id='tabcontainer'><div id='tab-"+items[i].substr(0,1).toUpperCase()+"' class='tab current'><ul>";  
                }
				else{
                    htmlcode = htmlcode + "</ul></div><div id='tab-"+items[i].substr(0,1).toUpperCase()+"' class='tab'><ul>"; 
                }
				htmlcode = htmlcode + "<li>"+items[i]+"</li>";  
				titles.push(items[i].substr(0,1).toUpperCase());  
				listitems = 0; 
            } 
            else{//if we're still dealing with numbers or special characters
                if(titles.length == 0){
                    titles.push('#01');
                    htmlcode = "<div id='tabcontainer'><div id='tab-charnum' class='tab current'><ul>";
                    
                }
                if(listitems < params.collength){ //checks the parameter that defines the column length
            		htmlcode = htmlcode + "<li>"+items[i]+"</li>"; //adds the items
				}
				else{
					htmlcode = htmlcode + "</ul><ul><li>"+items[i]+"</li>"; 
					listitems = 0;
				}
            } 
        } 
        else{ //for the rest of the items starting with letters
			if(titles[titles.length-1] == items[i].substr(0,1).toUpperCase()){ //if we're on the same letter header
            	if(listitems < params.collength){ //checks the parameter that defines the column length
            		htmlcode = htmlcode + "<li>"+items[i]+"</li>"; //adds the items
				}
				else{
					htmlcode = htmlcode + "</ul><ul><li>"+items[i]+"</li>"; 
					listitems = 0;
				} 
			}
			else{ // if the letter header has changed, a new title is pushed into the title array and a new tab is open
				htmlcode = htmlcode + "</ul></div><div id='tab-"+items[i].substr(0,1).toUpperCase()+"' class='tab'><ul>"; 
				htmlcode = htmlcode + "<li>"+items[i]+"</li>";  
				titles.push(items[i].substr(0,1).toUpperCase()); 
				listitems = 0; 	
			}
        } 
		listitems = listitems + 1;     
    }
    htmlcode = htmlcode + "</ul></div></div>"
	var navcode = "<ul id='tabnav'>" //generates HTML code of the list of titles
	for(var i=0; i<titles.length; i++){
		if(i==0){
			navcode = navcode + "<li class='current'><a href='#'>" + titles[i] + "</a></li>";
		}
		else{
			navcode = navcode + "<li><a href='#'>" + titles[i] + "</a></li>";	
		}
	}
	navcode = navcode + "</ul>"
    main.html(navcode + htmlcode); //adds both list of titles and HTML code of tabs to the main element
	if(params.tabheight != "auto"){
		main.find("#tabcontainer").css("height", params.tabheight);
	}
	main.find("#tabnav li a").click(function(){ //Tab change event listener added to the links inside tab selectors
		event.preventDefault();
		main.find("#tabnav li").removeClass("current");
		$(this).parent().addClass("current");
		var title = $(this).text();
		if(title == "#01"){
			title = "charnum";	
		}
		main.find("#tabcontainer .tab").hide();
		main.find("#tabcontainer #tab-"+title).show();
	});
};

})(jQuery); 