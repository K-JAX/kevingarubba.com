<?php
/**
 * Kevin Garubba WP Theme Custom Post Types
 */
if (!function_exists('register_portofio_pt')) {

    function register_portfolio_pt()
    {
        $labels = array(
            'name'                  => _x('Projects', 'Post type general name', 'kg'),
            'singular_name'         => _x('Project', 'Post type singular name', 'kg'),
            'menu_name'             => _x('Projects', 'Admin Menu text', 'kg'),
            'name_admin_bar'        => _x('Project', 'Add New on Toolbar', 'kg'),
            'add_new'               => __('Add New', 'kg'),
            'add_new_item'          => __('Add New Project', 'kg'),
            'new_item'              => __('New Project', 'kg'),
            'edit_item'             => __('Edit Project', 'kg'),
            'view_item'             => __('View Project', 'kg'),
            'all_items'             => __('All Projects', 'kg'),
            'search_items'          => __('Search Projects', 'kg'),
            'parent_item_colon'     => __('Parent Projects:', 'kg'),
            'not_found'             => __('No Projects found.', 'kg'),
            'not_found_in_trash'    => __('No Projects found in Trash.', 'kg'),
            'featured_image'        => _x('Project Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'kg'),
            'set_featured_image'    => _x('Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'kg'),
            'remove_featured_image' => _x('Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'kg'),
            'use_featured_image'    => _x('Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'kg'),
            'archives'              => _x('Project archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'kg'),
            'insert_into_item'      => _x('Insert into Project', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'kg'),
            'uploaded_to_this_item' => _x('Uploaded to this Project', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'kg'),
            'filter_items_list'     => _x('Filter Projects list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'kg'),
            'items_list_navigation' => _x('Projects list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'kg'),
            'items_list'            => _x('Projects list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'kg'),
        );
        $args = array(
            'label'               => _x('Project', 'kg'),
            'description'         => _x('Custom post type for projects.', 'kg'),
            'labels'              => $labels,
            'public'              => true,
            'publicly_queryable'  => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'show_in_rest'        => true,
            'show_in_admin_bar'   => true,
            'show_in_nav_menus'   => true,
            'can_export'          => true,
            'exclude_from_search' => false,
            'query_var'           => true,
            'menu_icon'           => 'dashicons-images-alt2',
            'rewrite'             => array('slug' => 'projects'),
            'capability_type'     => 'post',
            'has_archive'         => true,
            'hierarchical'        => false,
            'menu_position'       => 2,
            'supports'            => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'revisions', 'page-attributes'),
            'taxonomies'          => array('workflow'),
        );

        register_post_type('project', $args);
    }

    add_action('init', 'register_portfolio_pt');

}

/**
 * Kevin Garubba WP Theme Taxonomy
 */

if (!function_exists('register_portfolio_taxonomies')) {

    function register_portfolio_taxonomies()
    {
        $workflow_labels = array(
            'name'              => _x('Tech', 'taxonomy general name', 'kg'),
            'singular_name'     => _x('Workflow', 'taxonomy singular name', 'kg'),
            'search_items'      => __('Search Tech', 'kg'),
            'all_items'         => __('All Workflows', 'kg'),
            'parent_item'       => __('Parent Workflow', 'kg'),
            'parent_item_colon' => __('Parent Workflow:', 'kg'),
            'edit_item'         => __('Edit Workflow', 'kg'),
            'update_item'       => __('Update Workflow', 'kg'),
            'add_new_item'      => __('Add New Workflow', 'kg'),
            'new_item_name'     => __('New Workflow Name', 'kg'),
            'menu_name'         => __('Workflow', 'kg'),
        );
        $workflow_args = array(
            'labels'                => $workflow_labels,
            'capabilities'          => array(
                'manage_terms' => 'edit_posts',
                'edit_terms'   => 'edit_posts',
                'delete_terms' => 'edit_posts',
                'assign_terms' => 'edit_posts',
            ),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_rest'          => true,
            'show_admin_column'     => true,
            'show_in_nav_menus'     => true,
            'rewrite'               => array('slug' => 'workflow'),
            'rest_base'             => 'workflow',
            'rest_controller_class' => 'WP_REST_Terms_Controller',
            'query_var'             => true,
            'show_tagcloud'         => true,
        );
        register_taxonomy('workflow', array('project'), $workflow_args);

        $tech_labels = array(
            'name'              => _x('Tech', 'taxonomy general name', 'kg'),
            'singular_name'     => _x('Tech', 'taxonomy singular name', 'kg'),
            'search_items'      => __('Search Tech', 'kg'),
            'all_items'         => __('All Tech', 'kg'),
            'parent_item'       => __('Parent Tech', 'kg'),
            'parent_item_colon' => __('Parent Tech:', 'kg'),
            'edit_item'         => __('Edit Tech', 'kg'),
            'update_item'       => __('Update Tech', 'kg'),
            'add_new_item'      => __('Add New Tech', 'kg'),
            'new_item_name'     => __('New Tech Name', 'kg'),
            'menu_name'         => __('Tech', 'kg'),
        );
        $tech_args = array(
            'labels'                => $tech_labels,
            'capabilities'          => array(
                'manage_terms' => 'edit_posts',
                'edit_terms'   => 'edit_posts',
                'delete_terms' => 'edit_posts',
                'assign_terms' => 'edit_posts',
            ),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_rest'          => true,
            'show_admin_column'     => true,
            'show_in_nav_menus'     => true,
            'rewrite'               => array('slug' => 'tech'),
            'rest_base'             => 'tech',
            'rest_controller_class' => 'WP_REST_Terms_Controller',
            'query_var'             => true,
            'show_tagcloud'         => true,
        );
        register_taxonomy('tech', array('project'), $tech_args);

    }

    add_action('init', 'register_portfolio_taxonomies');
}

add_action('rest_api_init', 'register_rest_field_for_custom_taxonomy_location');
function register_rest_field_for_custom_taxonomy_location()
{
    register_rest_field('project',
        'year',
        array(
            'get_callback' => 'get_date_meta_field',
            'schema'       => null,
        )
    );
}

// Return the year
function get_date_meta_field($object, $field_name, $request)
{
    return get_the_date('Y', $object['id']);
}