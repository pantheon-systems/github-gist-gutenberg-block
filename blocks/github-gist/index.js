( function( wp ) {
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var InspectorControls = wp.blocks.InspectorControls;

	// Visit https://wordpress.org/gutenberg/handbook/block-api/ to learn about Block API
	wp.blocks.registerBlockType( 'github-gist-gutenberg-block/github-gist', {
		title: __( 'Github Gist', 'github-gist-gutenberg-block' ),

		category: 'widgets',

		// Remove to make block editable in HTML mode.
		supportHTML: false,

		attributes: {
			url: {
				type: 'string',
			}
		},

		/**
		 * Called when Gutenberg initially loads the block.
		 */
		edit: function( props ) {
			var url = props.attributes.url || '',
				focus = props.focus;
			// retval is our return value for the callback.
			var retval = [];
			// When the block is focus or there's no URL value,
			// show the text input control so the user can enter a URL.
			if ( !! focus || ! url.length ) {
				// Instantiate a TextControl element
				var controlOptions = {
					// Existing 'url' value.
					value: url,
					// When the text input value is changed, we need to
					// update the 'url' attribute to propagate the change.
					onChange: function( newVal ) {
						props.setAttributes({
							url: newVal
						});
					},
					placeholder: __( 'Enter a GitHub Gist URL' ),
				};
				retval.push(
					// el() is a function to instantiate a new element.
					el( InspectorControls.TextControl, controlOptions )
				);
			}
			// Only add preview UI when there's a URL entered.
			if ( url.length ) {
				// Because Gutenberg doesn't render inline JS,
				// we need to fetch the assets from GitHub and update the div.
				var id = 'gist-' + props.id;
				// setTimeout is used to wait until after render
				setTimeout(function(){
					jQuery.getJSON( url.trim(/\/$/) + '.json?callback=?',
						function(data){
							var div = jQuery('#'+id);
							div.html('');
							var stylesheet = jQuery('<link />');
							stylesheet.attr('ref', 'stylesheet');
							stylesheet.attr('href', data.stylesheet);
							stylesheet.attr('type', 'text/css');
							div.append(stylesheet);
							div.append(data.div);
						}
					);
				}, 10 );
				retval.push( el( 'div', { id: id } ) );
			}
			return retval;
		},

		/**
		 * Called when Gutenberg "saves" the block to post_content
		 */
		save: function( props ) {
			var url = props.attributes.url || '';
			// If there's no URL, don't save any inline HTML.
			if ( ! url.length ) {
				return null;
			}
			// Include a fallback link for non-JS contexts
			// and for when the plugin is activated.
			return el( 'a', { href: url }, __( 'View Gist on GitHub' ) );
		}
	} );
} )(
	window.wp
);
