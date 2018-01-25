<?php
/**
 * Plugin Name:     GitHub Gist Gutenberg Block
 * Plugin URI:      https://pantheon.io
 * Description:     Render GitHub gists
 * Author:          Pantheon
 * Author URI:      https://pantheon.io
 * Text Domain:     github-gist-gutenberg-block
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Github_Gist_Gutenberg_Block
 */

/**
 * Register the GitHub Gist shortcode
 */
function gggb_init() {
	add_shortcode( 'github-gist', 'gggb_render_shortcode' );
}
add_action( 'init', 'gggb_init' );

/**
 * Render the GitHub Gist shortcode
 *
 * @param array $atts Shortcode attributes.
 */
function gggb_render_shortcode( $atts ) {
	if ( empty( $atts['url'] )
		|| 'gist.github.com' !== parse_url( $atts['url'], PHP_URL_HOST ) ) {
		return '';
	}
	return sprintf(
		'<script src="%s"></script>',
		esc_url( rtrim( $atts['url'], '/' ) . '.js' )
	);
}
