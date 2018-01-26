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

		edit: function( props ) {
			var url = props.attributes.url || '',
				focus = props.focus;
			// retval is our return value for the callback.
			var retval = [];
			// When the block is focus or there's no URL value,
			// show the text input control so the user can enter a URL.
			if ( !! focus || ! url.length ) {
				// Instantiate a TextControl element
				retval.push(
					el(
						InspectorControls.TextControl,
						{
							value: url,
							// When the value is changed, we need to
							// update the property
							onChange: function( newVal ) {
								props.setAttributes({
									url: newVal
								});
							},
							placeholder: __( 'Enter a GitHub Gist URL' ),
						}
					)
				);
			}
			if ( url.length ) {
				// Because Gutenberg doesn't render inline JS,
				// we need to fetch the assets and update the div.
				var id = 'gist-' + props.id;
				setTimeout(function(){
					jQuery.getJSON( url.trim(/\/$/) + '.json?callback=?', function(data){
						var div = jQuery('#'+id);
						div.html('');
						var stylesheet = jQuery('<link />');
						stylesheet.attr('ref', 'stylesheet');
						stylesheet.attr('href', data.stylesheet);
						stylesheet.attr('type', 'text/css');
						div.append(stylesheet);
						div.append(data.div);
					});
				}, 10 );
				retval.push( el( 'div', { id: id } ) );
			}
			return retval;
		},

		save: function( props ) {
			var url = props.attributes.url || '';
			if ( ! url.length ) {
				return null;
			}
			return el(
				'a',
				{
					href: url,
				},
				__( 'View Gist on GitHub' ),
			);
		}
	} );
} )(
	window.wp
);
