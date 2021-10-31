<?php
/**
 * Kevin Garubba WP Theme functions and definitions
 */

// setup theme
if(! function_exists('kg_setup')){
    function kg_setup(){
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1568, 9999 );
		register_nav_menus(
			array(
				'menu-1' => __( 'Primary', 'kg' ),
				'social' => __( 'Social Links Menu', 'kg' ),
			)
        );
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);
    }
}
add_action( 'after_setup_theme', 'kg_setup' );

if( !function_exists('kg_custom_logo_setup') ){
    function kg_custom_logo_setup(){
        $defaults = array(
            'height'      => 100,
            'width'       => 400,
            'flex-height' => true,
            'flex-width'  => true,
            'header-text' => array( 'site-title', 'site-description' ),
            );
            add_theme_support( 'custom-logo', $defaults );
    }
    add_action( 'after_setup_theme', 'kg_custom_logo_setup' );
}

add_filter('wpcf7_form_elements', function($content) {
    $content = preg_replace('/<(span).*?class="\s*(?:.*\s)?wpcf7-form-control-wrap(?:\s[^"]+)?\s*"[^\>]*>(.*)<\/\1>/i', '\2', $content);

    return $content;
});



add_filter( 'wpcf7_form_elements', 'rl_wpcf7_form_elements' );
function rl_wpcf7_form_elements( $content ) {
	// global $wpcf7_contact_form;
	
	$rl_pfind = '/<p>/';
	$rl_preplace = '<p class="wpcf7-form-text">';
	$content = preg_replace( $rl_pfind, $rl_preplace, $content, 2 );

	return $content;	
}


function add_cors_http_header(){
    // header('Access-Control-Allow-Headers: Accept');
    header("Access-Control-Allow-Origin: http://localhost:5001");
}
add_action('init','add_cors_http_header');

//  included scripts
require_once get_parent_theme_file_path('/inc/cpt.php');
require_once get_parent_theme_file_path('/inc/enqueue.php');