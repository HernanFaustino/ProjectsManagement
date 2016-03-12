<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: POST, GET, OPTIONS');

require_once('../class.database.php');

//======================================================================
// Cast the request
//======================================================================
$output =  array();
if($_GET['request'] == 'kanban'){
	$output = project_kanban();
}else if($_GET['request'] == 'list'){
	$output =  project_list();
}else{
	header('HTTP/1.1 405 Method Not Allowed');
	exit;
}
echo json_encode($output);

//======================================================================
// Functions 
//======================================================================

//print_r($_SERVER['REQUEST_METHOD']);
function mostrar_cursos(){
	$cursos = array('AngularJS', 'MongoDB', 'PHP', 'UX', 'Ruby');
	return $cursos;
}
function mostrar_alumnos(){
	$db = Database::getInstance();
    $mysqli = $db->getConnection(); 
    $sql_query = "SELECT * FROM user";
    $result = $mysqli->query($sql_query);
    $mysqli->close();
	$output =  array();
	while($row = $result->fetch_assoc()){
		$output[] = $row;
	}
	return $output;
}

function project_kanban(){
	$db = Database::getInstance();
    $mysqli = $db->getConnection(); 
    $sql_query = "SELECT * FROM projects";
    $result = $mysqli->query($sql_query);
    $mysqli->close();
    $output =  array();
	while($row = $result->fetch_assoc()){
		$output[$row['stage']][] = $row;
	}

	return $output;
}
function project_list(){
	$db = Database::getInstance();
    $mysqli = $db->getConnection(); 
    $sql_query = "SELECT * FROM projects";
    $result = $mysqli->query($sql_query);
    $mysqli->close();
    $output =  array();
	while($row = $result->fetch_assoc()){
		$output[] = $row;
	}
	return $output;
}
