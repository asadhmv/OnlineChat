<?php
//define('ROOT',str_replace('index.php','',$_SERVER['SCRIPT_FILENAME']));

 abstract class Controller{

    public function loadModel(string $model){

        require_once('/var/www/html/OnlineChat/PHP/MVC/' . 'models/'. $model . '.php');
        $this->$model=new $model();


    }
    public function render(){
        require_once('/var/www/html/OnlineChat/HTML/chatpage.html');
    }

}



?>