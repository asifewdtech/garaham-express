<?php
    
    require_once('config.php');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    if (isset($_REQUEST['page_id']) && !isset($_REQUEST['fb_insta_filter'])) {
        print_r($api->getAndSaveDataAgainstPageID($_REQUEST['page_id']));
        exit();
    }

    if (isset($_REQUEST['page_id']) && isset($_REQUEST['resource'])) {
        print_r($api->getPagePosts($_REQUEST['page_id'],$_REQUEST['resource']));
        exit();
    }

    if (isset($_REQUEST['user_id']) && isset($_REQUEST['resource'])) {
        print_r($api->getUserPages($_REQUEST['user_id'],$_REQUEST['resource']));
        exit();
    }

    if (isset($_REQUEST['video_url'])) {
        print_r($api->getYoutubeVideoData($_REQUEST['video_url']));
        exit();
    }

    if (isset($_REQUEST['twitter_url'])) {
        print_r($api->getRtweets($_REQUEST['twitter_url']));
        die();
    }

    if (isset($_REQUEST['twitter_filter'])) {
        print_r($api->getWinnerWithFilteration($_REQUEST));
        die();
    }
    
    if(isset($_REQUEST['youtube_filter'])) {
        print_r($api->getWinnerWithFilteration($_REQUEST));
        die();
    }

    if(isset($_REQUEST['fb_insta_filter'])) {
        print_r($api->getWinnerWithFilteration($_REQUEST));
        die();
    }

    if(isset($_REQUEST['facebookInstagramCallback'])) {
        print_r($api->facebookInstagramCallback($_REQUEST));
        die();
    }    

?>