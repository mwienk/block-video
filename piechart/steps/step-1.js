function init(step){

	console.log(Wizard.config.baseUrl);

promise.get(Wizard.config.baseUrl + 'site/blocks/block-video/barchart/data/barchart.json').then(
				function(error, text, xhr) {
					if (error) {
						alert('Error ' + xhr.status);
						return;
					}
					var starting_value = [ text ];
					// Initialize the editor
					var editor = new JSONEditor(document
							.getElementById('editor_holder-' + step), {
						// Enable fetching schemas via ajax
						ajax : true,
						// The schema for the editor
						schema : {
							type : "object",
							title : "Piechart",
							  "properties": {
							  	"labels": {
					  				"type": "string",
					  				"default": "tw,nl,de",
							  	},
							  	"values": {
					  				"type": "string",
					  				"default": "10,20,10",
							  	},
							    "title": {
							      "type": "string",
							      "default": "Titel",
							    },
							    "categories": {
							    	"type": "string",
							    	"default": "cat-one cat-all"
							    },
							    "width": {
								      "type": "number",
								      "default": 340,
								},
								"height": {
								      "type": "number",
								      "default": 340,
								},
								"background": {
								      "type": "string",
								      "default": "green",
								},
							  }
						},
						// Seed the form with a starting value
						startval : starting_value,
						// Disable additional properties
						no_additional_properties : true,
						disable_edit_json : true,
						disable_properties : true,
						disable_collapse : true,
						// Require all properties by default
						required_by_default : true
					});
				      // Hook up the submit button to log to the console
				      document.getElementById('submit-' + step).addEventListener('click',function(event) {
				    	  	event.stopPropagation();
				    	  	console.log(editor.validate());
				    	  	Wizard.goToNextStep(event);
				    	  	console.log('sending to swagger api');
				    	  	console.log(editor.getValue());

				  			var hash = location.hash.split('=');
				  			var data = hash[1].split('-');
				  			var meta = {
								"absolute-url" : document.getElementById('iframe').getAttribute('src'),
								"state" : data[0],
								"block" : data[2],
								"type" : data[4],
								"template" : Wizard.widgetJson[data[4]].template
				  			}
				  			console.log(meta);

				  			var fullData = {
				  				"meta" : meta,
				  				"editor" : editor.getValue(),
				  			}

				  		 	var jsonString = JSON.stringify(fullData);

				  			var data = {
				    			  "id" : 112,
				    			  "data" : jsonString
				    			};

				  			promise.post('http://localhost:8080/api/block', data).then(
				  					function(error, text, xhr) {
				  						if (error) {
				  							alert('Error ' + xhr.status);
				  							return;
				  						}
				  						console.log(text);
				  						document.getElementById('iframe').contentWindow.location = location.href;
				  					});

				      });

				});

}