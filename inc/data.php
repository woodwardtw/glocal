<?php
/**
 * Data 
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action( 'init', 'create_theme_taxonomies', 0 );
function create_theme_taxonomies()
{
  // Add new taxonomy, NOT hierarchical (like tags)
  $labels = array(
    'name' => _x( 'Themes', 'taxonomy general name' ),
    'singular_name' => _x( 'theme', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Themes' ),
    'popular_items' => __( 'Popular Themes' ),
    'all_items' => __( 'All Themes' ),
    'parent_item' => null,
    'parent_item_colon' => null,
    'edit_item' => __( 'Edit Themes' ),
    'update_item' => __( 'Update theme' ),
    'add_new_item' => __( 'Add New theme' ),
    'new_item_name' => __( 'New theme' ),
    'add_or_remove_items' => __( 'Add or remove Themes' ),
    'choose_from_most_used' => __( 'Choose from the most used Themes' ),
    'menu_name' => __( 'Theme' ),
  );

//registers taxonomy specific post types - default is just post
  register_taxonomy('themes', array('post'), array(
    'hierarchical' => true,
    'labels' => $labels,
    'show_ui' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array( 'slug' => 'theme' ),
    'show_in_rest'          => true,
    'rest_base'             => 'theme',
    'rest_controller_class' => 'WP_REST_Terms_Controller',
    'show_in_nav_menus' => true,    
  ));
}


//from https://nustart.solutions/code-snippet/gravity-forms-populate-dropdown-taxonmy/
//Adds a filter to form id 1. Replace 3 with your actual form id

add_filter('gform_pre_render_1', 'glocal_populate_theme_dropdown');
function glocal_populate_theme_dropdown($form){


    $terms = get_terms( array(
        'taxonomy' => 'themes',
        'hide_empty' => false,
        'orderby'   =>'title',
        'order'   =>'ASC',
    ) );

    //Creating drop down item array.
    $items = array();

    //Adding initial blank value.
    $items[] = array("text" => "", "value" => "");

    //Adding post titles to the items array
    foreach($terms as $term)
        $items[] = array(
           "value" => $term->name, 
           "text" =>  $term->name
      );

    //Adding items to field id 11
    foreach($form["fields"] as &$field)
        if($field["id"] == 11){
            $field["type"] = "select";
            $field["choices"] = $items;
        }

    return $form;
}

add_filter('gform_pre_render_1', 'glocal_populate_category_dropdown');
function glocal_populate_category_dropdown($form){


    $terms = get_terms( array(
        'taxonomy' => 'category',
        'hide_empty' => false,
        'orderby'   =>'title',
        'order'   =>'ASC',
    ) );

    //Creating drop down item array.
    $items = array();

    //Adding initial blank value.
    $items[] = array("text" => "", "value" => "");

    //Adding post titles to the items array
    foreach($terms as $term)
        $items[] = array(
           "value" => $term->name, 
           "text" =>  $term->name
      );

    //Adding items to field id 11
    foreach($form["fields"] as &$field)
        if($field["id"] == 12){
            $field["type"] = "select";
            $field["choices"] = $items;
        }

    return $form;
}
