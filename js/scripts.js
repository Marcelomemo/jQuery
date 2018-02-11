
// Funcion lista todos los estudiantes desde el LocaStorage
function listar_estudiantes(){
	notas = [];
  	var texto = "<table border='1' > <tr> <th>Código</th> <th>Nombre</th> <th>Nota</th> <th>Editar</th> <th>Eliminar</th> </tr>";

  	for( num = 0; num < localStorage.length; num ++) {
		var codigo = localStorage.key(num);
		var estudiante = $.parseJSON(localStorage.getItem(codigo));
		notas.push(estudiante.Nota);

		texto += "<tr> <td>" + estudiante.Codigo + "</td> <td>" + estudiante.Nombre + "</td> <td>" + estudiante.Nota.toFixed(2) + "</td> <td align='center'> <button onclick='editar_estudiante(" + estudiante.Codigo + ")' > Editar </button> </td> <td align='center'> <button onclick='eliminar_estudiante(" + estudiante.Codigo + ")' > Eliminar </button> </td> </tr>";  		
	}

	texto += "</table>";
	$("#listado").html(texto);

}

// Funcion editar estudiante almacenado en el LocaStorage
function editar_estudiante(codigo){
	var estudiante;

  	for( num = 0; num < localStorage.length; num ++) {
		var Codigo = localStorage.key(num);
		if(Codigo == codigo){
			estudiante = $.parseJSON(localStorage.getItem(codigo));
			$("#Codigo").val(estudiante.Codigo);
			$("#Nombre").val(estudiante.Nombre);
			$("#Nota").val(estudiante.Nota);
		}
	}
}

// Funcion eliminar estudiante desde el LocaStorage
function eliminar_estudiante(Codigo){
	localStorage.removeItem(Codigo);
	listar_estudiantes();
}


$(document).ready(function(){
	var contador;
	var alumnos = [];
	var notas = [];

	if(localStorage.length>0){
		contador = localStorage.length + 1;
	}else{
		contador = 1;
	}
	$("#Codigo").val(contador);


	// Funcion calcula el promedio de la nota de los Alumnos  y despliega en la pantalla
	$("#Promedio").click(function(){
		if (notas == []){
			alert("No existe información de los Estudiantes");
			return;
		}
		var sum = 0;
		var pro = 0;

	  	for( num = 0; num < localStorage.length; num ++) {
			var codigo = localStorage.key(num);
			var estudiante = $.parseJSON(localStorage.getItem(codigo));
			sum += (estudiante.Nota);
		}

		pro = sum / num;
		alert("El Promedio es: " + pro.toFixed(2));
	});


	// Funcion extrae al Estudiantecon la nota mayor y despliega en la pantalla
	$("#Mayor").click(function(){
		if (notas == []){
			alert("No existe información de los Estudiantes");
			return;
		}
		var mayor = notas.indexOf(Math.max.apply(null, notas ));
		alert("La nota mayor del estudiante: " + nombre_alumno(mayor));
	});


	// Funcion extrae al Estudiante con la nota menor y despliega en la pantalla	
	$("#Menor").click(function(){
		if (notas == []){
			alert("No existe información de los Estudiantes");
			return;
		}
		var menor = notas.indexOf(Math.min.apply(null, notas ));
		alert("La nota menor del estudiante: " + nombre_alumno(menor));
	});

	// Funcion agregar de Estudiante despliega en la pantalla		    
	$("#Estudiante").click(function(){

		if($("#Nombre").val() == "" ){
			alert("Información del Nombre no puede estar en blanco...!");
			return;
		}

		if($("#Nota").val() == "" ) {
			alert("Información de la Nota no puede estar en blanco...!");
			return;
		}

		var Codigo = $("#Codigo").val();
		var alumno = {
			"Codigo" : Codigo,
			"Nombre" : $("#Nombre").val(),
			"Nota"   : parseFloat($("#Nota").val())};
		alumnos.push( alumno );

		localStorage.setItem(Codigo, JSON.stringify(alumno));
		contador = localStorage.length + 1;	

		Restablecer_from();
		listar_estudiantes();
	});


	$("#Restablecer").click(function(){
		Restablecer_from();
	});


	//Funcion restablecer el formulario para un nuevo estudiante
	function Restablecer_from(){
		$("#Codigo").val(contador);
		$("#Nombre").val("");
		$("#Nota").val("");

	} 

	// Funcion para sacar el nombre del Alumno segun su pocision
	function nombre_alumno(num){
		var codigo = localStorage.key(num);
		var estudiante = $.parseJSON(localStorage.getItem(codigo));
		return estudiante.Nombre + "  la nota es: " + estudiante.Nota.toFixed(2);
	}


	listar_estudiantes();

});
