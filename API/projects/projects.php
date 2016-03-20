<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: POST, GET, OPTIONS');

require_once('../class.database.php');

//======================================================================
// Cast the request
//======================================================================
$output =  array();
if( $_SERVER['REQUEST_METHOD'] == "POST"){
	if($_GET['request'] == 'create'){
		$data = file_get_contents("php://input");
  		$data = json_decode($data, TRUE);
		$result = create_project($data);
		if($result){
			$output['data'] = $data;
			$output['success'] = TRUE;
		}else{
			$output['success']= FALSE;
		}
	}else if($_GET['request'] == 'update'){
		$data = file_get_contents("php://input");
  		$data = json_decode($data, TRUE);
  		$output['success'] = update_project($data);
	}

}else if($_SERVER['REQUEST_METHOD'] == 'GET'){
	if($_GET['request'] == 'kanban'){
		$output = project_kanban();
	}else if($_GET['request'] == 'list'){
		if(!$_GET['detail']){
			$output =  project_list();
		}else{
			$idpro = $_GET['detail'];
			$output = get_project($idpro);
			$output['success'] = TRUE;
		}
	}else{
		header('HTTP/1.1 405 Method Not Allowed');
		exit;
	}
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

function create_project($datos){
	$db = Database::getInstance();
    $mysqli = $db->getConnection(); 
    $sql_query = "INSERT INTO  `Easyerp`.`projects` (
`idproject` ,
`project_name` ,
`assignedto` ,
`customer` ,
`stage` ,
`order` ,
`priority`
)
VALUES (
'NULL', '$datos[subject]' ,  '$datos[assignedto]',  '$datos[customer]',  '$datos[stage]',  '1',  '$datos[priority]'
);";
    $result = $mysqli->query($sql_query);
    $mysqli->close();
    return $result;
}

function update_project($datos, $id){
	$id_project = array_shift($datos);
	$fielddata = array();
	foreach ($datos as $key => $value) {
		$fielddata[] = array('field' => $key,'value' => $value);
	}
	$fields = "";
	foreach ($fielddata as $key) {
		$fields .= "`".$key['field']."` = '".$key['value']."', ";
	}
	$fields = substr($fields, 0, -2);
	$query = "UPDATE `Easyerp`.`projects` SET $fields WHERE `projects`.`idproject` = $id_project ";
	$values = substr($values, 0, -1);

	$db = Database::getInstance();
    $mysqli = $db->getConnection();
	$result = $mysqli->query($query);
	$mysqli->close();

	//print_r($query);
	return $result;
}

function get_project($idproject){
	$db = Database::getInstance();
    $mysqli = $db->getConnection(); 
    $sql_query = "SELECT * FROM  `projects` WHERE  `idproject` =$idproject";
    $result = $mysqli->query($sql_query);
    $mysqli->close();
    $output =  $result->fetch_assoc();
	return $output;
}
