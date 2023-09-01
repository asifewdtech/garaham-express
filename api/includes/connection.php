<?php
    
    class DBConnection{
        private $db;
        private $host_name = "localhost"; //your host
        private $database = "viraly"; // Change your database name
        private $username = "root";          // Your database user id 
        private $password = "";          // Your password
    
        public function getInstance() {
            // Database connection
            try {
                $this->db = new PDO('mysql:host='.$this->host_name.';dbname='.$this->database, $this->username, $this->password);
            }catch(PDOException $e) {
                $this->db = null;
            }

            return $this->db;
        }   
    }