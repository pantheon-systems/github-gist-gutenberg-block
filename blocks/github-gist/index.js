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

		edit: function( props ) {
			var url = props.attributes.url || '',
				focus = props.focus;
			var retval = [];
			if ( !! focus || ! url.length ) {
				retval.push(
					el(
						InspectorControls.TextControl,
						{
							value: url,
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
				retval.push(
					el(
						'script',
						{
							src: url.trim(/\/$/) + '.js',
						}
					),
				);
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
