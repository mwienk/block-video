function init(step){


promise.get(Wizard.config.baseUrl + 'blocks/block-video/video/data/basic.json').then(
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
							type : "array",
							title : "People 2",
							format : "tabs",
							items : {
								title : "Person",
								headerTemplate : "{{i}} - {{self.name}}",
								oneOf : [ {
									$ref : Wizard.config.baseUrl + "blocks/block-video/video/schema/basic_person.json",
									title : "Basic Person"
								}, {
									$ref : Wizard.config.baseUrl + "blocks/block-video/video/schema/person.json",
									title : "Complex Person"
								} ]
							}
						},

						// Seed the form with a starting value
						startval : starting_value,

						// Disable additional properties
						no_additional_properties : true,

						// Require all properties by default
						required_by_default : true
					});



				      // Hook up the submit button to log to the console
				      document.getElementById('submit-' + step).addEventListener('click',function(e) {
				    	  e.stopPropagation();
				        // Get the value from the editor
				        console.log(editor.getValue());
				      });

				});

}