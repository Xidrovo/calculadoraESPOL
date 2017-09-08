$(document).ready(function(){
	zero("notaMin");
	zero("promedio");
	if($(window).innerWidth() <= 751) {
		$("#minimaPasar").text("Minimo");
		$("#notaPract").text("practica");
		$("#mejoramiento").text("mej");
		$("#primer").text("1er");
		$("#segundo").text("2do");
		$("#prom").text("final");
	}else{
	}
})

//
//Funciones que se llaman cada que cambian las vairables de abajo
//
$("#teorico").change(function(){

	//Me aseguro que el valor de teórico esté entre 0 y 100
	if($("#teorico").val() > 100)
		$("#teorico").val(100);

	if($("#teorico").val() < 0)
		$("#teorico").val(0);

	//Calculamos el valor del porcentaje práctico 
	$("#practico").val(100 - $("#teorico").val())

});
$("#primerP").change(function(){
	restringirMaxMin("primerP");
})
$("#segundoP").change(function(){
	restringirMaxMin("segundoP");
})
$("#tercerP").change(function(){
	restringirMaxMin("tercerP");
})
$("#notaPractica").change(function(){
	restringirMaxMin("notaPractica");
})
//
//Fin de change funciones.
//

$(".validate").keyup(function(event){
	if(event.keyCode == 13){
        $("#btn-calcular").click();
    }
})

$("#btn-calcular").click(function(){

	if(verificar()){
		zero("notaMin");
		var 	prctjTeorico 	=	parseInt($("#teorico").val()) / 100;
		var 	prctjPractico 	=	parseInt($("#practico").val()) / 100;

		var 	primer		 	=	parseInt($("#primerP").val())/2 	* 	prctjTeorico;
		var 	segundo		 	=	parseInt($("#segundoP").val())/2	* 	prctjTeorico;
		var 	tercer		 	=	parseInt($("#tercerP").val())/2		*	prctjTeorico;

		var 	practico		=	parseInt($("#notaPractica").val()) 	* 	prctjPractico;

		$("#promedio").val((getTeorico(primer,segundo,tercer) + practico).toFixed(2));

		if($("#promedio").val() >= 60)
			$("#estado").text("AP");
		else{
			$("#estado").text("RP");
			$("#notaMin").val((getMinimoPasar(	getMax(primer,segundo),
													practico,
													prctjTeorico)).toFixed(2));
		}
	}else{
		alert("Tiene algún campo no lleno");
		//enceramos todos los campos
		zero("notaMin");
		zero("promedio");
		zero("primerP");
		zero("segundoP");
		zero("tercerP");
		zero("notaPractica");
		nullify("practico");
		nullify("teorico");
	}
})

function getMin(primer,segundo,tercer){
	if(primer < segundo){
		if(primer < tercer)
			return primer;
		else
			return tercer;
	}
	if(segundo < tercer)
		return segundo;
	else
		return tercer;
}

function getTeorico(primer,segundo,tercer){
	
	return (primer + segundo + tercer) - getMin(primer,segundo,tercer);
}

function getMax(primer, segundo){
	if(primer > segundo)
		return primer;
	else
		return segundo;
}

function getMinimoPasar(Max, notaPractica, prctjTeorico){
	var	result	= 	Max + notaPractica;
		result	=	60 - result;
		result	=	(result*2)/prctjTeorico;

	return	result;	
}

function verificar(){
	if(isNaN(parseInt($("#teorico").val() )))
		return false;
	if(isNaN(parseInt($("#primerP").val() )))
		return false;
	if(isNaN(parseInt($("#segundoP").val() )))
		return false;
	if(isNaN(parseInt($("#tercerP").val() )))
		return false;
	if(isNaN(parseInt($("#notaPractica").val() )))
		return false;

	return true;

}

function zero(idInput){
	$("#" + idInput).val(0);
}

function nullify(idInput){
	$("#" + idInput).val('');
}

//Esta funcion evita que los valores de los input supere a 100
//o sea menor a 0
function restringirMaxMin(idInput){
	if($("#" + idInput).val() > 100)
		$("#" + idInput).val(100);
	
	if($("#" + idInput).val() < 1)
		$("#" + idInput).val(0)
}