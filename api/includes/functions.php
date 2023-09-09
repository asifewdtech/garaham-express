<?php

    // header('Content-Type: application/json');
    require_once('connection.php');
	use GuzzleHttp\Client;
	use \Facebook\Facebook;
	use \PhpOffice\PhpSpreadsheet\Spreadsheet;
	use \PhpOffice\PhpSpreadsheet\Writer\Xlsx;

    class apiFunctions extends DBConnection{
		private $facebookAppID = '2842617659303979';
		private $facebookAppSecret = '3d018c5e826f7469e3c3de27e1f7c33f';
		private $facebookAppVersion = 'v16.0';
		private $facebookAppScopeForFacebook = ['email', 'pages_show_list', 'public_profile', 'public_profile', 'pages_manage_cta', 'pages_manage_instant_articles', 'pages_manage_engagement', 'pages_read_user_content', 'pages_messaging_subscriptions', 'pages_messaging'];
		private $facebookAppScopeForInstagram = ['email', 'instagram_basic', 'pages_messaging_subscriptions', 'pages_messaging', 'pages_show_list', 'public_profile', 'pages_manage_cta', 'pages_manage_instant_articles', 'pages_manage_engagement', 'pages_read_user_content'];
		private $facebookCallback = "https://viraly.io/facebook.php"; // example domain
		private $instagramCallback = 'https://viraly.io/instagram.php'; // example domain
		private $twitterToken = 'AAAAAAAAAAAAAAAAAAAAANsFJwEAAAAAfTW4wacxGS%2BamEZCzC66yVcRPpQ%3DvupILvDFQ6RT81wbmxg75T00BW8cXHhdILGROBKHmSSqrf8Otm';
		private $twitterGuestID = 'v1%3A167972137896244660';
		private $youtubeApiKey = 'AIzaSyDY6Vqs8XbmRlhM8Z919BDj1rtROJTOUBI';
		private $youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/';

		// login for facebook and instagram
		function fbLogin($resource)
		{
			ini_set('max_execution_time', 10000);
			ini_set('memory_limit', '512M');
			$facebook = new Facebook([
				'app_id' => $this->facebookAppID,
				'app_secret' => $this->facebookAppSecret,
				'default_graph_version' => $this->facebookAppVersion
			]);

			$facebook_output = '';

			$facebook_helper = $facebook->getRedirectLoginHelper();
			if (isset($_GET['code'])) {
				if (isset($_COOKIE['user_login'])) {
					unset($_COOKIE['user_login']);
					setcookie('user_login', null);
				}
				$access_token = $facebook_helper->getAccessToken();
				$_SESSION['access_token'] = $access_token;
				$facebook->setDefaultAccessToken($_SESSION['access_token']);
				$graph_response = $facebook->get("/me?fields=name,email", $access_token);
				$facebook_user_info = $graph_response->getGraphUser();
				$_SESSION['id'] = $facebook_user_info['id'];
				$user_id = "#" . md5(uniqid($facebook_user_info['id'], true));
				setcookie("user_login", $user_id . "_" . $facebook_user_info['id'] . "_" . $facebook_user_info['name'] . "_" . $facebook_user_info['email'] . "_" . $access_token . "_" . $resource);

				////insert or update fb user data in db
				$sql = '';
				$sql = "SELECT * FROM users WHERE facebook_id = " . $facebook_user_info['id'];
				$data = $this->getInstance()->query($sql);
				if ($data->rowCount() > 0) {
					$userData = $data->fetch(PDO::FETCH_ASSOC);
					$sql = "UPDATE users SET access_token='" . $access_token . "',user_id = '" . $user_id . "', resources='" . $resource . "' WHERE facebook_id=" . $facebook_user_info['id'];
					$this->getInstance()->query($sql);
				} else {
					$sql = "INSERT INTO users (user_id,facebook_id, username, email, access_token,resources) VALUES ('" . $user_id . "','" . $facebook_user_info['id'] . "','" . $facebook_user_info['name'] . "','" . $facebook_user_info['email'] . "','" . $access_token . "','" . $resource . "')";
					$this->getInstance()->query($sql);
				}
				////insert or update fb user data in db close
				//get fb pages an save into db
				$client = new Client();
				$headers = [
					'headers' => [
						'Accept' => 'application/json'
					]
				];
				$response = $client->request('GET', "https://graph.facebook.com/v16.0/" . $facebook_user_info['id'] . "/accounts?access_token={$access_token}", [
					'headers' => $headers
				]);
				$pages = (array) ((array) json_decode($response->getBody()->getContents()))['data'];
				
				foreach ($pages as $page) {
					$singlePage = (array) $page;
					$sql = "SELECT * FROM pages WHERE page_id = " . $singlePage['id'];
					$data = $this->getInstance()->query($sql);
					if ($data->rowCount() > 0) {
						$sql = "UPDATE pages SET user_id='" . $user_id . "',page_id='" . $singlePage['id'] . "',pagename='" . $singlePage['name'] . "',access_token='" . $singlePage['access_token'] . "', resources='" . $resource . "' WHERE page_id = " . $singlePage['id'];
						$this->getInstance()->query($sql);
					} else {
						$sql = "INSERT INTO pages (user_id,page_id,pagename,access_token,resources) VALUES ('" . $user_id . "','" . $singlePage['id'] . "','" . $singlePage['name'] . "','" . $singlePage['access_token'] . "','" . $resource . "')";
						$this->getInstance()->query($sql);
					}
				}

				//get fb pages an save into db close
				$redirectUrl = $resource.".php";
				header("location:{$redirectUrl}");
			} else {
				$facebook_login_url = $facebook_helper->getLoginUrl($resource=='instagram' ? $this->instagramCallback  : $this->facebookCallback, $resource=='instagram' ? $this->facebookAppScopeForInstagram  : $this->facebookAppScopeForFacebook);
				// Render Facebook login button
				echo $facebook_login_url = '<div align="center"><a href="' . $facebook_login_url . '" id="fbLogin">Login with facebook</a></div>';
			}
		}

		function facebookAndInstagramCallback($requestData)
		{
			$access_token = $requestData['access_token'];
			$resource = $requestData['resource'];
			$user_id = "#" . md5(uniqid($requestData['id'], true));
			// setcookie("user_login", $user_id . "_" . $requestData['id'] . "_" . $requestData['userName'] . "_" . $requestData['email'] . "_" . $requestData['access_token'] . "_" . $resource);
			$sql = '';
			$sql = "SELECT * FROM users WHERE facebook_id = " . $requestData['id'];
			$data = $this->getInstance()->query($sql);
			if ($data->rowCount() > 0) {
				$userData = $data->fetch(PDO::FETCH_ASSOC);
				$sql = "UPDATE users SET access_token='" . $access_token . "',user_id = '" . $user_id . "', resources='" . $resource . "' WHERE facebook_id=" . $requestData['id'];
				$this->getInstance()->query($sql);
			} else {
				$sql = "INSERT INTO users (user_id,facebook_id, username, email, access_token,resources) VALUES ('" . $user_id . "','" . $requestData['id'] . "','" . $requestData['name'] . "','" . $requestData['email'] . "','" . $requestData['access_token'] . "','" . $resource . "')";
				$this->getInstance()->query($sql);
			}
			////insert or update fb user data in db close
			//get fb pages an save into db
			$client = new Client();
			$headers = [
				'headers' => [
					'Accept' => 'application/json'
				]
			];
			$response = $client->request('GET', "https://graph.facebook.com/v16.0/" . $requestData['id'] . "/accounts?access_token={$access_token}", [
				'headers' => $headers
			]);
			
			$pages = (array) ((array) json_decode($response->getBody()->getContents()))['data'];
			
			foreach ($pages as $page) {
				$singlePage = (array) $page;
				$sql = "SELECT * FROM pages WHERE page_id = " . $singlePage['id'];
				$data = $this->getInstance()->query($sql);
				if ($data->rowCount() > 0) {
					$sql = "UPDATE pages SET user_id='" . $user_id . "',page_id='" . $singlePage['id'] . "',pagename='" . $singlePage['name'] . "',access_token='" . $singlePage['access_token'] . "', resources='" . $resource . "' WHERE page_id = " . $singlePage['id'];
					$this->getInstance()->query($sql);
				} else {
					$sql = "INSERT INTO pages (user_id,page_id,pagename,access_token,resources) VALUES ('" . $user_id . "','" . $singlePage['id'] . "','" . $singlePage['name'] . "','" . $singlePage['access_token'] . "','" . $resource . "')";
					$this->getInstance()->query($sql);
				}
			}

			return "SELECT * FROM pages WHERE user_id ='$user_id'";
			$pages = json_decode($this->getDataUsingQuery("SELECT * FROM pages WHERE user_id ='$user_id'",false))->data;
			return json_encode(['success' => true,"pages" => $pages, "access_token" => $requestData['access_token'],'user_id' => $user_id,"status"=>$resource=="facebook"?true:false]);
		}

        // insert data into table
        function insertDataIntoTable($table, $data)
        {
        	$targetColumns = [];
        	foreach ($data as $column => $value) {
        		$targetColumns[] = '?';
        	}
        	$sql = "INSERT  INTO " . $table . " ( " . implode(" , ", array_keys($data)) . ")  VALUES (" . implode(",", $targetColumns) . ")";
        // 	return $sql;
        	if ($this->getInstance()->prepare($sql)->execute(array_values($data))) {
        		return json_encode(['success' => true, 'message' => 'Data has been inserted successfully']);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        }
        
        // update some specific data into table
        function updateTableRecord($table, $data, $where)
        {
        	
        	$columns = "";
        	$columnsValue = [];
        	foreach ($data as $ind => $val) {
        		$columns .= $ind . "=?, ";
        		$columnsValue[] = $val;
        	}
        	$columns = substr($columns, 0, -2);
        	$whereConditions = "";
        	$i = 0;
        	foreach ($where as $conditionColumn => $conditionValue) {
        		$whereConditions .= ($i != (count($where) - 1)) ? $conditionColumn . "=? AND " : $conditionColumn . "=?";
        		$columnsValue[] = $conditionValue;
        		++$i;
        	}
        	// $whereConditions = substr($whereConditions, 0, -5);
        
        	$sql = "UPDATE " . $table . " SET " . $columns . " WHERE " . $whereConditions;
        	if ($this->getInstance()->prepare($sql)->execute($columnsValue)) {
        		return json_encode(['success' => true, 'message' => 'Data has been updated successfully']);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        }
        
        // get against user id and return list of pages
        function getUserPages($user_id,$resource)
        {
        	if (!isset($user_id)) {
        		return json_encode(['success' => false, 'message' => 'User Id is required']);
        	}
        	// $sql = "SELECT * FROM pages WHERE user_id = '#445a1b8f125aba9d0ba2b4c874116896'";
        	$sql = "SELECT * FROM pages WHERE user_id = '$user_id' and resources='$resource'";
        	$data = $this->getInstance()->query($sql);
        	$pages = [];
        	if ($data->rowCount() > 0) {
        		foreach ($data->fetchAll() as $key => $page) {
        			$pages[$page['page_id']] = $page['pagename'];
        		}
        	}
        	
        	return json_encode(['success' => true, 'pages' => $pages]);
        }

		// get post against page id
		function getPagePosts($pageID,$resource){
			$posts = json_decode($this->getDataWithConditions("posts", ['page_id' => $pageID, "resource" => $resource]))->data;
        	return json_encode(["success" => true, 'data' => $posts]);
		}
        
        // get and save data against page Id
        function getAndSaveDataAgainstPageID($pageID)
        {
        	
        	if (!isset($pageID) || $pageID == '') {
        		return json_encode(['success' => false, 'message' => 'Page Id is required']);
        	}
        	
        	$user = $this->getInstance()->query("select * from users where user_id='#41fd5994c08918b5889c82c05b2723aa'")->fetch(PDO::FETCH_ASSOC);
        	$_COOKIE["user_login"] = $user['user_id'] . "_" . $user['facebook_id'] . "_" . $user['username'] . "_" . $user['email'] . "_" . $user['access_token'] . "_" . $user['resources'];
        	// check user is logged in or not
        	if (!isset($_COOKIE["user_login"])) {
        		return json_encode(['success' => false, 'message' => 'You are not authorized user']);
        	}
        	$cookieData = explode('_', $_COOKIE["user_login"]);
        	$facebook_id = $cookieData[1];
        	$user_id = $cookieData[0];
        	$accessToken = $cookieData[4];
        	$resource = $cookieData[5];
        	if ($resource == "instagram") {
        		$instauserId = $this->getData("get", "https://graph.facebook.com/v15.0/{$page_id}?fields=instagram_business_account&access_token={$accessToken}")['instagram_business_account']['id'];
        		$response = $this->getData("get", "https://graph.facebook.com/v15.0/{$instauserId}?fields=id,name,username&access_token={$accessToken}");
        		$data = array("instagram_id " => $this->clean_input($response['id']), "username" => $this->clean_input($response['name']));
        		$cond = array("facebook_id" => $facebook_id);
        		if ($this->updateTableRecord('users', $data, $cond)) {
        			$responsePosts = $this->getData("get", "https://graph.facebook.com/v15.0/{$instauserId}/media?fields=caption,media_type,media_url,thumbnail_url,permalink,timestamp,comments_count,like_count&access_token={$accessToken}");
        			$posts = isset($responsePosts['data']) ? $responsePosts['data'] : [];
        			foreach ($posts as $singlePost) {
        				$data = array(
        					"page_id " => $this->clean_input($pageID),
        					"user_id" => $this->clean_input($user_id),
        					"media_type" => $this->clean_input($singlePost['media_type']),
        					"media_url" => $this->clean_input($singlePost['media_url']),
        					"resource" => "instagram",
        					"post_id" => $this->clean_input($singlePost['id']),
        					'message' => $this->clean_input(isset($singlePost['caption']) ? $singlePost['caption'] : ""),
        					'created_time' => $singlePost['timestamp'],
        					"created_at" => date("Y-m-d")
        				);
        				$conditions = array("post_id" => $singlePost['id']);
        
        				if (!json_decode($this->getRecordsCount("posts", $conditions))->count > 0) {
        					$this->insertDataIntoTable("posts", $data);
        				} else {
        					$this->updateTableRecord('posts', $data, $conditions);
        				}
        				$this->getCommentsandRepliesOfInsta($singlePost['id'], $accessToken);
        			}
        		}
        	} else {
        
        		$sql = "SELECT * FROM pages WHERE page_id = '" . $pageID . "'";
        		$data = $this->getInstance()->query($sql);
        		if ($data->rowCount() > 0) {
        			$userData = $data->fetch(PDO::FETCH_ASSOC);
        			$accessToken = $userData['access_token'];
        		}
        
        		$posts = $this->getData("get", "https://graph.facebook.com/v16.0/" . $pageID . "/feed?fields=id,full_picture,message,created_time,access_token={$accessToken}");
        		$posts = isset($posts['data']) ? $posts['data'] : [];
        		foreach ($posts as $post) {
        			if (isset($post['message']) || isset($post['full_picture'])) {
        				$data = array(
        					"page_id " => $this->clean_input($pageID),
        					"user_id" => $this->clean_input($user_id),
        					"post_id" => $this->clean_input($post['id']),
        					"media_url" => isset($post['full_picture'])?$this->clean_input($post['full_picture']):"",
        					"resource" => $this->clean_input("facebook"),
        					"message" => isset($post['message'])?$this->clean_input($post['message']):"",
        					"created_time" => $this->clean_input($post['created_time']),
        					"created_at" => date("Y-m-d")
        				);
        
        				$conditions = array("post_id" => $post['id']);
        				if (!json_decode($this->getRecordsCount("posts", $conditions))->count > 0) {
        					$this->insertDataIntoTable("posts", $data);
        				} else {
        					$this->updateTableRecord('posts', $data, $conditions);
        				}
        
        				$this->getCommentsandRepliesOfFbPage($post['id'], $accessToken);
        			}
        		}
        	}
        	$posts = json_decode($this->getDataWithConditions("posts", ['page_id' => $pageID, "resource" => $resource]))->data;
        	return json_encode(["success" => true, 'data' => $posts]);
        }
        
        // print_r(getAndSaveDataAgainstPageID(109713668697995));
        // die();
        
        function getData($method, $targetUrl)
        {
        	$curl = curl_init($targetUrl);
        	curl_setopt($curl, CURLOPT_URL, $targetUrl);
        	curl_setopt($curl, CURLOPT_HEADER, false);
        	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        	$response = curl_exec($curl);
        	curl_close($curl);
        	return json_decode($response, true);
        }
        
        
        function getCommentsandRepliesOfFbPage($postID, $accessToken)
        {
        	$commentsResponse = $this->getData("get", "https://graph.facebook.com/v16.0/" . $postID . "/comments?access_token={$accessToken}");
        	//print_r($commentsResponse);
        	$comments = isset($commentsResponse['data']) ? $commentsResponse['data'] : [];
        	foreach ($comments as $comment) {
        		if (isset($comment['message'])) {
        			$data = array(
        				"from_id " => $this->clean_input($comment['from']['id']),
        				"from_name" => $this->clean_input($comment['from']['name']),
        				"post_id" => $this->clean_input($postID),
        				"message" => $this->clean_input($comment["message"]),
        				"created_time" => $this->clean_input($comment['created_time']),
        				"created_at" => date("Y-m-d"),
        				"comment_id" => $this->clean_input($comment['id'])
        			);
        			$conditions = array(
        				"post_id" => $postID,
        				"comment_id" => $comment['id']
        			);
        
        			if (!json_decode($this->getRecordsCount("comments", $conditions) > 0)) {
        				$this->insertDataIntoTable("comments", $data);
        			} else {
        				$this->updateTableRecord('comments', $data, $conditions);
        			}
        
        			$repliesResponse = $this->getData("get", "https://graph.facebook.com/v16.0/" . $comment['id'] . "/comments?access_token={$accessToken}");
        			$replies = isset($repliesResponse['data']) ? $repliesResponse['data'] : [];
        			foreach ($replies as $reply) {
        				if (isset($reply['message'])) {
        					$data = array(
        						"from_id " => $this->clean_input($reply['from']['id']),
        						"from_name" => $this->clean_input($reply['from']['name']),
        						"reply_id" => $this->clean_input($reply['id']),
        						"message" => $this->clean_input($reply["message"]),
        						"created_time" => $this->clean_input($reply['created_time']),
        						"created_at" => date("Y-m-d"),
        						"comment_id" => $reply['id']
        					);
        					$conditions = array(
        						"reply_id" => $reply['id'],
        						"comment_id" => $comment['id']
        					);
        					if (!json_decode($this->getRecordsCount("replies", $conditions))->count > 0) {
        						$this->insertDataIntoTable("replies", $data);
        					} else {
        						$this->updateTableRecord('replies', $data, $conditions);
        					}
        				}
        			}
        		}
        	}
        }
        
        function getCommentsandRepliesOfInsta($postID, $accessToken)
        {
        	$commentsResponse = $this->getData("get", "https://graph.facebook.com/v16.0/" . $postID . "/comments?fields=id,text,username,like_count,timestamp,replies{timestamp,text,id,username,like_count}&access_token={$accessToken}");
        	$comments = isset($commentsResponse['data']) ? $commentsResponse['data'] : [];
        	foreach ($comments as $comment) {
        		$data = array(
        			'post_id' => $postID,
        			'comment_id' => $comment['id'],
        			'from_name' => $this->clean_input($comment['username']),
        			'message' => $this->clean_input($comment['text']),
        			'created_time' => $comment['timestamp']
        		);
        
        		$conditions = array(
        			"post_id" => $postID,
        			"comment_id" => $comment['id']
        		);
        		if (!json_decode($this->getRecordsCount("comments", $conditions) > 0)) {
        			$this->insertDataIntoTable("comments", $data);
        		} else {
        			$this->updateTableRecord('comments', $data, $conditions);
        		}
        
        		if (isset($comment['replies'])) {
        			$commentReplies = (array) ((array) $comment['replies'])['data'];
        			foreach ($commentReplies as $commentReplie) {
        				$dat = array(
        					'reply_id' => $commentReplie['id'],
        					'message' => $this->clean_input($commentReplie['text']),
        					"comment_id" => $comment['id'],
        					'created_time' => $commentReplie['timestamp'],
        					"from_name" => $this->clean_input($commentReplie['username'])
        				);
        				$cond = array(
        					"reply_id" => $commentReplie['id'],
        					"comment_id" => $comment['id']
        				);
        				if (!json_decode($this->getRecordsCount("replies", $cond) > 0)) {
        					$this->insertDataIntoTable("replies", $dat);
        				} else {
        					$this->updateTableRecord('replies', $dat, $cond);
        				}
        			}
        		}
        	}
        }
        
        function clean_input($data)
        {
        	// $data = trim($data);
        	// $data = stripslashes($data);
        	// $data = htmlspecialchars($data);
        	// $data = addslashes($data);
        	return $data;
        }
        
        // get count of record with or without conditions
        function getRecordsCount($table, $conditions)
        {
        	
        	$whereConditions = "";
        	$columnsValue = [];
        	$sql = "SELECT * FROM " . $table;
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			// $columnsValue[] = $conditionValue;
        			++$i;
        		}
        		$sql .= " WHERE " . $whereConditions;
        	}
        
        	$stmt = $this->getInstance()->query($sql);
        	if ($stmt) {
        		return json_encode(['success' => true, 'count' => $stmt->rowCount()]);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        }
        
        function getDataWithConditions($table, $conditions)
        {
        	$whereConditions = "";
        	$columnsValue = [];
        	$sql = "SELECT * FROM " . $table;
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			// $columnsValue[] = $conditionValue;
        			++$i;
        		}
        		$sql .= " WHERE " . $whereConditions;
        	}
        
        	$stmt = $this->getInstance()->query($sql);
        	if ($stmt) {
        		return json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        }
        
        
        
        function getUnique($table, $conditions, $fields, $group)
        {
        	try {
        		$whereConditions = "";
        		if (count($conditions) > 0) {
        			$i = 0;
        			foreach ($conditions as $conditionColumn => $conditionValue) {
        				$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        				// $columnsValue[] = $conditionValue;
        				++$i;
        			}
        		}
        		$sql = "SELECT $fields FROM $table WHERE $whereConditions GROUP BY $group";
        		return $sql;
        		$stmt = $this->getInstance()->query($sql);
        		if ($stmt) {
        			return json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        		}
        		return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        
        	} catch (PDOException $e) {
        		return json_encode(['success' => false, 'message' => $e->getMessage()]);
        	}
        }  
        
        function getRandomOrderData($table, $start, $limit, $conditions) {
        	try {
                
                $whereConditions = "";
                $sql = "SELECT * FROM  $table";
                if (count($conditions) > 0) {
                    $i = 0;
                    foreach ($conditions as $conditionColumn => $conditionValue) {
                        $whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
                        ++$i;
                    }
                    $sql .= " WHERE " . $whereConditions;
                }
                $sql .= " ORDER BY RAND()";
        
                $stmt = $this->getInstance()->query($sql);
                if ($stmt) {
                    return json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
                }
                return json_encode(['success' => false, 'message' => 'Some error has been occured']);
            } catch (PDOException $e) {
                return json_encode(['success' => false, 'message' => $e->getMessage()]);
            }
        }
        
        function getGroupedData($table, $conditions, $field)
        {
        	try {
        		
        		$whereConditions = "";
        		$sql = "SELECT * FROM  $table";
        		if (count($conditions) > 0) {
        			$i = 0;
        			foreach ($conditions as $conditionColumn => $conditionValue) {
        				$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        				++$i;
        			}
        			$sql .= " WHERE " . $whereConditions;
        		}
        		$sql.= " GROUP BY $field ORDER BY $field";
        
        		$stmt = $this->getInstance()->query($sql);
        		if ($stmt) {
        			return json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        		}
        		return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        
        	} catch (PDOException $e) {
        		return json_encode(['success' => false, 'message' => $e->getMessage()]);
        	}
        }        
        
        function getSpecificColumnData($table, $conditions, $requireColumns)
        {
        	
        	$whereConditions = "";
        	$arr = [];
        	$sql = "SELECT * FROM  $table";
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			++$i;
        		}
        		$sql .= " WHERE " . $whereConditions;
        	}
        
        	$stmt = $this->getInstance()->query($sql);
        	if ($stmt) {
        		while ($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$requireData = [];
					foreach($requireColumns as $column){ $requestData[$column] = $data[$column]; }
        			$arr[] = $requestData;
        		}
        
        	}
        	return json_encode(['success' => true, 'data' => $arr]);
        
        }
        
        
        function display_where($table, $conditions)
        {
        	
        	$whereConditions = "";
        	$sql = "SELECT * FROM  $table";
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			++$i;
        		}
        		$sql .= " WHERE " . $whereConditions;
        	}
        	$stmt = $this->getInstance()->query($sql);
        	if ($stmt) {
        		return json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        } 
        
        function display_where_value($table, $conditions, $value)
        {
        	
        	$whereConditions = "";
        	$sql = "SELECT * FROM  $table";
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			++$i;
        		}
        		$sql .= " WHERE " . $whereConditions;
        	}
        	$stmt = $this->getInstance()->query($sql);
        	if ($stmt) {
        		$data = $stmt->fetch(PDO::FETCH_ASSOC);
        		return json_encode(['success' => true, 'data' => $data!=null?$data[$value]:'']);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        }
        
        function getOnlyOneRecord($table, $conditions, $field, $order)
        {	
        	$whereConditions = "";
        	$where = "";
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			++$i;
        		}
        	}
        	$query1 = "SELECT $field FROM $table WHERE $whereConditions ORDER BY $field $order LIMIT 0,1";
        	$stmt = $this->getInstance()->query($query1);
        	if ($stmt) {
        		$data = $stmt->fetch(PDO::FETCH_ASSOC);
        		return json_encode(['success' => true, 'data' =>$data!=null?$data[$field]:'']);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
        }
        
        function filterDataWithCustomQuery($table, $conditions, $operator)
        {
        	$whereConditions = "";
        	$conditions = array_filter($conditions);
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			if (!empty($conditionValue)) {
        				$whereConditions .= ($i != (count($conditions) - 1) ) ? $conditionValue . " " . $operator . "  " : $conditionValue;
        			}
        			++$i;
        		}
        	}
        
        	if ($whereConditions !== "") {
        		$stmt = $this->getInstance()->prepare("SELECT * FROM $table WHERE $whereConditions");
        		if($stmt!=null && $stmt->execute()){
        			return json_encode(['success' => true, 'data' => $stmt->fetchAll(PDO::FETCH_ASSOC),'ids' => $this->getInstance()->query("SELECT id FROM $table WHERE $whereConditions")->fetchAll(PDO::FETCH_COLUMN)]);
        		}
        		return json_encode(['success' => false,"data"=>[], 'message' =>"Some error has been occured"]);
        	}
        
        	return json_encode(['success' => false, 'message' =>"Some error has been occured"]);
        }
        
        function getDataUsingQuery($query,$specificColumn)
        {
        	$stmt = $this->getInstance()->query($query);
        	if($stmt!=null && $stmt->execute()){
        		return json_encode(['success' => true, 'data' => $specificColumn?$stmt->fetchAll(PDO::FETCH_COLUMN):$stmt->fetchAll(PDO::FETCH_ASSOC)]);
        	}
        	return json_encode(['success' => false,"data"=>[], 'message' =>"Some error has been occured"]);
        }
        
        // get detail of youtube video
        function getYoutubeVideoData($videoUrl)
        {
        	if (isset($videoUrl)) {
        		ini_set('max_execution_time', 300);
        		$query = parse_url($videoUrl, PHP_URL_QUERY);
        		parse_str($query, $parameters);
        		//get vedio basic info
        		$api_url = $this->youtubeBaseUrl . "videos?id=" . $parameters['v'] . "&part=snippet,statistics&key=" .$this->youtubeApiKey;
        		$response = $this->getData("get", $api_url);
        		if(isset($response['pageInfo'])){
        			// print_r($response['items']);
        			$statistics = (array) (((array) ((array) $response['items'])[0])['statistics']);
        			$videoSnippets = (array) (((array) ((array) $response['items'])[0])['snippet']);
        			$videoBanner = ((array) ((array) $videoSnippets['thumbnails'])['high'])['url'];
        			$videoData = [
        				'video_id' => $parameters['v'],
        				'channelTitle' => $videoSnippets['channelTitle'],
        				"thumbnails" => $videoBanner,
        				'titleVideo' => $videoSnippets['title'],
        				'description' => $videoSnippets['description'],
        				"viewCount" => $statistics['viewCount'],
        				"likeCount" => $statistics['likeCount'],
        				"commentCount" => $statistics['commentCount'],
        				"favoriteCount" => $statistics['favoriteCount']
        			];
        			$this->getYoutubeComments($parameters['v'], '');
        			return json_encode(['success' => true, 'data' => $videoData]);
        		}
        		return json_encode(['success' => false, 'message' =>"Some error has been occured"]);
        	}
        }
        
        function getYoutubeComments($videoId, $nextToken = '')
        {
        	ini_set('max_execution_time', 10000);
        	ini_set('memory_limit', '512M');
        	static $ids = [];
        	static $idsWithreply = [];
        	$commentDBIds = [];
        	$postComments = [];
        	$autherNames = [];
        	$commentDate = [];
        	static $all = [];
        	$replyauther = [];
        	$replycommentDate = [];
        	$replies = [];
        	static $repliesCount = [];
        	$channel_id = '';
        	static $items = [];
        	$dbCommentsId = 0;
        	$apiKey = "AIzaSyDY6Vqs8XbmRlhM8Z919BDj1rtROJTOUBI";
        	$base_url = "https://www.googleapis.com/youtube/v3/";
        	///get comments and replies
        	$api_url = $base_url . "commentThreads?part=snippet&videoId=" . $videoId . "&key=" . $apiKey . "&maxResults=100" . "&pageToken=" . $nextToken;
        	$ch = curl_init();
        	curl_setopt($ch, CURLOPT_URL, $api_url);
        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        	$output = curl_exec($ch);
        	$data = NULL;
        	$data = json_decode($output, true);
        	foreach ($data['items'] as $key => $item) {
        		$all[] = $item['snippet']['topLevelComment']['snippet'];
        		$repliesCount[] = $item['snippet']['totalReplyCount'];
        		$ids[] = $item['snippet']['topLevelComment']['id'];
        	}
        
        	if (isset($data['nextPageToken'])) {
        		if ($data['nextPageToken'] != NULL) {
        			$pageToken = $data['nextPageToken'];
        			$this->getYoutubeComments($videoId, $pageToken);
        		}
        	}
        	curl_close($ch);
        	$allComments = $all;
        	foreach ($allComments as $key => $comment) {
        		if (array_key_exists('authorChannelId', $comment)) {
        			$channel_id = ((array) $comment['authorChannelId'])['value'];
        		}
        		$postComment = array(
        			'video_id' => $comment['videoId'],
        			'message' => $this->clean_input($comment['textDisplay']),
        			"comment_id" => $ids[$key],
        			"from_channel_id" => $channel_id,
        			"from_channel_age" => 0,
        			"from_name" => $this->clean_input($comment['authorDisplayName']),
        			"created_time" => $comment['publishedAt'],
        			"likeCounts" => $this->clean_input($comment['likeCount'])
        		);
        		$cond = array(
        			"video_id" => $comment['videoId'],
        			"comment_id" => $ids[$key]
        		);
        		$data = $this->updateOrCreate("comments", $cond, $postComment);
        		if ($data) {
        			$dbCommentsId = $this->display_where_value("comments", $cond, "id");
        			if ($repliesCount[$key] > 0) {
        				$api_url = $base_url . "comments?part=snippet&maxResults=100&key=" . $apiKey . "&parentId=" . $ids[$key];
        				$response = $this->getData("get", $api_url);
        				$perPageInfo = ((array) $response['pageInfo'])['resultsPerPage'];
        
        				if ($perPageInfo > 0) {
        					$replyData = (array) $response['items'];
        					foreach ($replyData as $key => $item) {
        						$reply = (array) (((array) $item)['snippet']);
        						$data = array(
        							'message' => $this->clean_input($reply['textOriginal']),
        							"vedio_comment_id" => $ids[$key],
        							"comment_id" => $dbCommentsId,
        							"from_name" => $this->clean_input($reply['authorDisplayName']),
        							"created_time" => $reply['publishedAt'],
        							"reply_id" => ((array) $item)['id']
        						);
        						$res = $this->updateOrCreate("replies", ['reply_id' => ((array) $item)['id'], "comment_id" => $dbCommentsId], $data);
        						return $res;
        						if ($res) {
        							return json_encode(['success' => true]);
        						}
        					}
        				}
        			}
        		}
        
        	}
        	return json_encode(['success' => true]);
        }
        
        function updateOrCreate($table, $condition,$data)
        {
        	if (json_decode($this->getRecordsCount($table, $condition))->count > 0) {
        		return $this->updateTableRecord($table, $data, $condition);
        	} else {
        		return $this->insertDataIntoTable($table,$data);
        	}
        }
        
        // export data into excel
        // function exportDataToExcel($data){
        // 	// Create new PHPExcel object
        //     $objPHPExcel = new PHPExcel();
        
        //     // Set properties for the Excel document
        //     $objPHPExcel->getProperties()
        //         ->setCreator("Your Name")
        //         ->setLastModifiedBy("Your Name")
        //         ->setTitle("Data Export")
        //         ->setSubject("Data Export")
        //         ->setDescription("Data export from array to Excel.");
        
        //     // Create a new worksheet and set its title
        //     $objPHPExcel->setActiveSheetIndex(0);
        //     $objPHPExcel->getActiveSheet()->setTitle('Data');
        
        //     // Loop through the data array and write each row to the worksheet
        //     foreach($data as $row => $dataRow) {
        //         foreach($dataRow as $col => $dataValue) {
        //             $objPHPExcel->getActiveSheet()
        //                 ->setCellValueByColumnAndRow($col, $row+1, $dataValue);
        //         }
        //     }
        
        //     // Save the Excel file to a directory on the server
        //     $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        //     $objWriter->save('excel_file.xlsx');
        // }


        function exportDataToExcel($data){
        	// (C) CREATE A NEW SPREADSHEET + WORKSHEET
			$spreadsheet = new Spreadsheet();
			$sheet = $spreadsheet->getActiveSheet();
			$sheet->setTitle("Winners");
        
            // Loop through the data array and write each row to the worksheet
            foreach($data as $row => $dataRow) {
				$i = (intval($row)+1);
				$sheet->setCellValue("A".$i, $dataRow[0]);
				$sheet->setCellValue("B".$i, $dataRow[1]);
				$sheet->setCellValue("C".$i, $dataRow[2]);
            }

			// (E) SAVE FILE
			$writer = new Xlsx($spreadsheet);
			$writer->save("excel_file.xlsx");
        }

		function getRtweets($tweetUrl, $nextToken = null)
		{
			ini_set('max_execution_time', 10000);
			ini_set('memory_limit', '512M');
			$all = [];
			preg_match_all('!\d+!', $tweetUrl, $matches);
			$tweetId = $matches[0][0];
			preg_match("/^https?:\/\/(www\.)?twitter\.com\/(#!\/)?(?<name>[^\/]+)(\/\w+)*$/", $tweetUrl, $username);
			if (count($matches[0]) == 3) {
				$tweetId = $matches[0][1];
			}
			$curl = curl_init();
			$next = "";
			if ($nextToken !== null) {
				$next = "&pagination_token=" . $nextToken;
			}
			curl_setopt_array(
				$curl,
				array(
					CURLOPT_URL => "https://api.twitter.com/2/tweets/$tweetId/retweeted_by?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld&max_results=100" . $next,
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => '',
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 0,
					CURLOPT_FOLLOWLOCATION => true,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => 'GET',
					CURLOPT_HTTPHEADER => array(
						'Authorization: Bearer '.$this->twitterToken,
						'Cookie: guest_id='.$this->twitterGuestID
					),
				)
			);

			$response = curl_exec($curl);
			$data = json_decode($response, true);
			if (isset($data['data'])) {
				foreach ($data['data'] as $key => $item) {
					$all[] = $item;
				}
			}
			if (isset($data['meta']['next_token'])) {
				echo $data['meta']['next_token'];
				$this->getRtweets($tweetUrl, $data['meta']['next_token']);
			}
			curl_close($curl);
			foreach ($all as $key => $value) {
				$cond = array(
					"username" => clean_input($value['username']),
					"tweeter_id" => clean_input($value['id'])
				);
				$dateOfBirth = date('Y-m-d', strtotime($value['created_at']));
				$today = date("Y-m-d");
				$diff = date_diff(date_create($dateOfBirth), date_create($today));
				$data = array(
					"username" => clean_input($value['username']),
					"followers_count" => clean_input($value['public_metrics']['followers_count']),
					"following_count" => clean_input($value['public_metrics']['following_count']),
					"listed_count" => clean_input($value['public_metrics']['listed_count']),
					"tweet_count" => clean_input($value['public_metrics']['tweet_count']),
					"location" => isset($value['location']) ? clean_input($value['location']) : "",
					"name" => clean_input($value['name']),
					"description" => isset($value['description']) ? clean_input($value['description']) : "",
					"profile_image_url" => clean_input($value['profile_image_url']),
					"created_at" => clean_input($value['created_at']),
					"tweet_id" => clean_input($tweetId),
					"tweeter_id" => clean_input($value['id']),
					"age" => (date('Y') - date('Y',strtotime($dateOfBirth)))
				);
				$this->updateOrCreate("retweets", $cond, $data);
			}
			$minMaxResponse = json_decode($this->getMinMax('retweets', array("tweet_id" => $tweetId), 'age'))->data;
			return json_encode(['success' => true, 'data' => json_encode(['tweet_id'=>$tweetId,'max_age'=>$minMaxResponse->max,'min_age'=>$minMaxResponse->min,'tweets'=>json_decode($this->display_where("retweets",array("tweet_id" => $tweetId )))->data])]);
		}

		// get minimum or maximum value of column
		function getMinMax($table, $conditions, $value)
		{
			$whereConditions = "";
        	$sql = "SELECT MAX($value) as max ,min($value) as min FROM $table";
        	if (count($conditions) > 0) {
        		$i = 0;
        		foreach ($conditions as $conditionColumn => $conditionValue) {
        			$whereConditions .= ($i != (count($conditions) - 1)) ? $conditionColumn . "='$conditionValue' AND " : $conditionColumn . "='$conditionValue'";
        			++$i;
        		}
        		$sql .= " WHERE " . $whereConditions;
        	}
        	$stmt = $this->getInstance()->query($sql);
        	if ($stmt) {
        		return json_encode(['success' => true, 'data' => $stmt->fetch(PDO::FETCH_ASSOC)]);
        	}
        	return json_encode(['success' => false, 'message' => 'Some error has been occured']);
		}

		// find winner from request
		function getWinnerWithFilteration($requestData){
			if (isset($requestData['fb_insta_filter'])) {
				$numberOfWinners = $requestData['winners'];
				$post_id = isset($requestData['post_id'])? $requestData['post_id']:"";
				$requireQuery = isset($requestData['post_id'])? "select id,from_name,message,likeCounts from comments where post_id ='$post_id'":"select comment_id,from_name,message from comments";
				$cond = array("post_id" => $requestData['post_id']);
				$logo = '';
				if (isset($requestData['logo'])) {
					$logo = $requestData['logo'];
				}
				$maincolor = '';
				if (isset($requestData['maincolor'])) {
					$maincolor = $requestData['maincolor'];
				}
				$uniqueusersIds = [];
				if (isset($requestData['badwords']) && !empty($requestData['badwords'])) {
					$badwords = [];
					foreach (json_decode($this->getSpecificColumnData("comments", $cond, ["id","message"]))->data as $commentsData) {
						// if ($this->searchFromString(preg_replace("/[^a-zA-Z0-9]+/", "", html_entity_decode($commentsData->message)), preg_replace("/[^a-zA-Z0-9]+/", "", html_entity_decode($requestData['badwords'])))) {
						if ($this->searchFromString($commentsData->message, $requestData['badwords'])) {
							$badwords[]= $commentsData->id;
						}
					}
					if(count($badwords)>0){
						$badwords = implode(',',$badwords);
						$requireQuery.=" and id NOT IN($badwords)";
					}
				}
				$hashtags = '';
				if (isset($requestData['hashtags']) && !empty($requestData['hashtags'])) {
					if (!$this->searchFromString($requestData['hashtags'], "#")) {
						$hashtags = "#" . $requestData['hashtags'];
					} else {
						$hashtags = $requestData['hashtags'];
					}

					$requireQuery.=" and message like '%{$hashtags}%'";
					
				}
				$duplicates = '';
				if (isset($requestData['duplicates'])) {
					$duplicates = $requestData['duplicates'];
				}
				$following = '';
				if (isset($requestData['following'])) {
					$following = $requestData['following'];
				}
				$profilepic = '';
				if (isset($requestData['profilepic'])) {
					$profilepic = $requestData['profilepic'];
				}
				$name = '';
				if (isset($requestData['name'])) {
					$name = $requestData['name'];
				}
				$postcount = '';
				if (isset($requestData['postcount'])) {
					$postcount = $requestData['postcount'];
				}
				$followers = '';
				if (isset($requestData['followers'])) {
					$followers = $requestData['followers'];
				}
				$words = '';
				if (isset($requestData['words'])  && !empty($requestData['words'])) {
					$words = $requestData['words'];
					$requireQuery.= " and message like '%{$words}%'";
				}
				if (isset($requestData['mintags']) && !empty($requestData['mintags'])) {
					$mintags = [];
					foreach (json_decode($this->getSpecificColumnData("comments", $cond, ["id","message"]))->data as $commentsData) {
						// if ($this->searchFromString(preg_replace("/[^a-zA-Z0-9 #]+/", "", html_entity_decode($commentsData->message)), "#")) {
						// 	if (count(explode(' #', preg_replace("/[^a-zA-Z0-9 #]+/", "", html_entity_decode($commentsData->message)))) >= $requestData['mintags'] && (isset($requestData['duplicatetag']) && explode(' ', $commentsData->message) == array_unique(explode(' ', $commentsData->message)))) {
						// 		$mintags[]= $commentsData->id;
						// 	} else if (count(explode(' #', preg_replace("/[^a-zA-Z0-9 #]+/", "", html_entity_decode($commentsData->message)))) >= $requestData['mintags'] && !isset($requestData['duplicatetag'])) {
						// 		$mintags[]= $commentsData->id;
						// 	}
						// }

						if (count(explode(' #', $commentsData->message)) >= $requestData['mintags'] && (isset($requestData['duplicatetag']) && explode(' ', $commentsData->message) == array_unique(explode(' ', $commentsData->message)))) {
							$mintags[]= $commentsData->id;
						} else if (count(explode(' #', $commentsData->message)) >= $requestData['mintags'] && !isset($requestData['duplicatetag'])) {
							$mintags[]= $commentsData->id;
						}
					}
					// $mintags = substr($mintags, 0, -3);
					if(count($mintags)>0){
						$mintags = implode(',',$mintags);
						$requireQuery.=" and id IN($mintags)";
					}
				}
				if (isset($requestData['phrases']) && !empty($requestData['phrases'])) {
					$phrases = [];
					foreach (json_decode($this->getSpecificColumnData("comments", $cond, ["id","message"]))->data as $commentsData) {
						if (strpos($commentsData->message, $requestData['phrases']) !== false) {
							$phrases[] = $commentsData->id;
						}
					}

					if(count($phrases)>0){
						$phrases = implode(',',$phrases);
						$requireQuery.=" and id IN($phrases)";
					}
				}
				if (isset($requestData['mentions']) && !empty($requestData['mentions'])) {
					$mentions = '';
					if (!$this->searchFromString($requestData['mentions'], "@")) {
						$mentions = "@" . $requestData['mentions'];
					} else {
						$mentions = $requestData['mentions'];
					}
					$requireQuery.=" and message like '%{$mentions}%'";
				}
				if (isset($requestData['blocks']) && !empty($requestData['blocks'])) {
					$blocks = implode("','", explode(",", $requestData['blocks']));
					$requireQuery.=" and from_name NOT IN ('{$blocks}')";
				}
				if (isset($requestData['uniqueusers']) && !empty($requestData['uniqueusers'])) {
					$uniqueusers = [];
					foreach (json_decode($this->getGroupedData("comments", $cond, "from_name"))->data as $comment) {
						$uniqueusers[] = $comment->id;
					}
					if(count($uniqueusers)>0){
						$uniqueusers = implode(",",$uniqueusers);
						$requireQuery.=" and id IN({$uniqueusers})";
					}
				}
				
				$requireQuery.=" ORDER BY RAND() LIMIT 0, $numberOfWinners";
				// echo "<pre>";
				// print_r($requireQuery);
				// die();
				$comments = (json_decode($this->getDataUsingQuery($requireQuery,false))->data);

				return json_encode(['success' => true, 'data' => $comments]);
			}
	
			if (isset($requestData['youtube_filter'])) {
				$video_id = $requestData['video_id'];
				$cond = array("video_id" => $video_id);
				$numberOfWinners = $requestData['winners'];
				$requireQuery = "select id,from_name,message,likeCounts from comments where video_id='$video_id'";
				$keyfilter = '';
				if (isset($requestData['keyfilter']) && !empty($requestData['keyfilter'])) {
					$keyfilter = $requestData['keyfilter'];
					$requireQuery.=" and message like '%{$keyfilter}%'";
				}
				if (isset($requestData['phrases']) && !empty($requestData['phrases'])) {
					$phrases = [];
					foreach (json_decode($this->getSpecificColumnData("comments", $cond, ["id","message"]))->data as $commentData) {
						// if ($this->searchFromString($commentData, $requestData['phrases'])) {
						if (strstr($commentData['message'], $requestData['phrases'])) {
							// $phrases .= $commentData['id'] . "','";
							$phrases[] = $commentData['id'];
						}
					}

					if(count($phrases)>0){
						$phrases = implode(',',$phrases);
						$requireQuery.=" and id IN($phrases)";
					}
				}

				if (isset($requestData['firstComment']) && !empty($requestData['firstComment'])) {
					$firstComment = json_decode($this->getOnlyOneRecord("comments", $cond, "created_time", " ASC"))->data;
					$requireQuery.=" and created_time ='{$firstComment}'";
				}
				$duplicateComments = '';
				if (!isset($requestData['duplicateComments']) && empty($requestData['duplicateComments'])) {
				    if(isset(json_decode($this->getUnique("comments", $cond, "id,message", "message"))->data)){
    					foreach (json_decode($this->getUnique("comments", $cond, "id,message", "message"))->data as $msg) {
    						$duplicateComments .= $msg->id . ",";
    					}
    					$duplicateComments = substr($duplicateComments, 0, -1);
    					$requireQuery.=" and id IN($duplicateComments)";
				    }
				}

				if (isset($requestData['nPhrases']) && !empty($requestData['nPhrases'])) {
					$nPhrases = [];
					foreach (json_decode($this->getSpecificColumnData("comments", $cond, ["id","message"]))->data as $commentsData) {
						if ($this->searchFromString($commentsData->message, $requestData['nPhrases'])) {
							// echo $commentsData->message."<br>";
							$nPhrases[] = $commentsData->id;
						}
					}

					if(count($nPhrases)>0){
						$nPhrases = implode(',',$nPhrases);
						$requireQuery.=" and id NOT IN($nPhrases)";
					}
					
				}
				if (isset($requestData['banComment']) && !empty($requestData['banComment'])) {
					$banComment = [];
					foreach (json_decode($this->getSpecificColumnData("comments", $cond, ["id","message"]))->data as $commentsData) {
						if ($this->searchFromString($commentsData->message, $requestData['banComment'])) {
							// echo $commentsData->message;
							$banComment[] = $commentsData->id;
						}
					}

					if(count($banComment)>0){
						$banComment = implode(',',$banComment);
						$requireQuery.=" and id NOT IN($banComment)";
					}
				}

				if (isset($requestData['endDate']) && !empty($requestData['endDate'])) {
					$endDate = $requestData['endDate'];
					$requireQuery.=" and DATE(created_time) <= '{$endDate}'";
				}

				if (isset($requestData['block']) && !empty($requestData['block'])) {
					$blocks = implode("','", explode(",", $requestData['block']));
					$requireQuery.=" and from_name NOT IN ('{$blocks}')";
				}

				$uniqueusers = '';
				if (isset($requestData['uniqueuser']) && !empty($requestData['uniqueuser'])) {
					foreach (json_decode($this->getUnique("comments", $cond, "id,from_name", "from_name"))->data as $comment) {
						$uniqueusers .= $comment->id . ",";
					}
					$uniqueusers = substr($uniqueusers, 0, -1);
					$requireQuery.=" and id IN($uniqueusers)";
				}
				
				if (isset($requestData['topComment']) && !empty($requestData['topComment'])) {
					$ids = implode(',', json_decode($this->getDataUsingQuery(str_replace("*", 'id', $requireQuery), true))->data);
					$comments = (json_decode($this->getDataUsingQuery("select comment_id,from_name,message from comments where id in($ids) ORDER BY RAND() LIMIT 0, $numberOfWinners", false))->data);
				} else {
					$requireQuery .= " ORDER BY RAND() LIMIT 0, $numberOfWinners";
					$comments = (json_decode($this->getDataUsingQuery($requireQuery, false))->data);
				}
				// print_r($requireQuery);
				// die();
				return json_encode(['success' => true, 'data' => $comments]);
			}
	
			if (isset($requestData['twitter_filter'])) {
				$tweet_id = $requestData['tweet_id'];
				$numberOfWinners = $requestData['winners'];
				$winners = '';
				$requireQuery = "select * from retweets where tweet_id='$tweet_id'";
				if (isset($requestData['winners']) && !empty($requestData['winners'])) {
					foreach (json_decode($this->getRandomOrderData("retweets", 0, $requestData['winners'], array("tweet_id" => $tweet_id)))->data as $tweet) {
						$winners .= $tweet->id . ",";
					}
	
					$winners = substr($winners, 0, -1);
					if($winners!=''){
					    $requireQuery.=" and id IN({$winners})";
					}
				}
	
				$blocks = '';
				if (isset($requestData['block']) && !empty($requestData['block'])) {
					$blocks = implode("','", explode(",", $requestData['block']));
					$requireQuery.=" and name NOT IN ('{$blocks}')";
				}

				if (isset($requestData['avatar']) && !empty($requestData['avatar'])) {
					$avatar = [];
					foreach (json_decode($this->getSpecificColumnData("retweets", array("tweet_id" => $tweet_id), ["id","profile_image_url"]))->data as $tweetsData) {
						if ($this->searchFromString($tweetsData->profile_image_url, "default_profile_normal.png")) {
							$avatar[]= $tweetsData->id;
						}
					}

					if(count($avatar)>0){
						$avatar = implode(',',$avatar);
						$requireQuery.=" and id NOT IN($avatar)";
					}
			
				}

				if(isset($requestData['description']) && !empty($requestData['description'])){
					$requireQuery.=" and description !=''";
				}

				if(isset($requestData['location']) && !empty($requestData['location'])){
					$requireQuery.=" and location !=''";
				}
	
				if (isset($requestData['profile_age']) && !empty($requestData['profile_age'])) {
					$profile_age = $requestData['profile_age'];
					$requireQuery.=" and age = $profile_age";
				}

				if(isset($requestData['tweet_count']) && !empty($requestData['tweet_count']) && $requestData['tweet_count']!='Any'){
					$tweet_count = $requestData['tweet_count'];
					$requireQuery.=" and tweet_count >= $tweet_count";

				}
				setcookie("contest_name", (isset($requestData['title']) && !empty($requestData['title']) ? $requestData['title'] : ""));
				$requireQuery .= " ORDER BY RAND() LIMIT 0, $numberOfWinners";
				$comments = (json_decode($this->getDataUsingQuery($requireQuery, false))->data);
			} 

			return json_encode(['success' => true, 'data' => $comments]);
		}

		// search string from given string
		function searchFromString($fromString, $targetString){
			$fromString = strtolower($fromString);
			$targetString = strtolower($targetString);
			return preg_match("/\b" . preg_quote($targetString, '/') . "\b/i", $fromString);
		}
    }
    
    $api =  new apiFunctions();
    
    if (!function_exists('str_contains')) {
        function str_contains($haystack, $needle): bool {
            if ( is_string($haystack) && is_string($needle) ) {
                return '' === $needle || false !== strpos($haystack, $needle);
            } else {
                return false;
            }
        }
    }