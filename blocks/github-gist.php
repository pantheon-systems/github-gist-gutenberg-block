<?php
/**
 * Registers GitHub Gist block utilities
 *
 * @package Github_Gist_Gutenberg_Block
 */

/**
 * Register block editor assets
 */
function github_gist_enqueue_block_editor_assets() {
	$dir        = dirname( __FILE__ );
	$block_js   = 'github-gist/index.js';
	$editor_css = 'github-gist/editor.css';
	wp_enqueue_script(
		'github-gist-block', plugins_url( $block_js, __FILE__ ), array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		), filemtime( "$dir/$block_js" )
	);
	wp_enqueue_style(
		'github-gist-block', plugins_url( $editor_css, __FILE__ ), array(
			'wp-blocks',
		), filemtime( "$dir/$editor_css" )
	);
}
add_action( 'enqueue_block_editor_assets', 'github_gist_enqueue_block_editor_assets' );
