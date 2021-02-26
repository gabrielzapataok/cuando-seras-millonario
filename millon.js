function procesar(){

    //DATOS DEL INPUT
    const inversion = parseInt(document.getElementById('inversion').value)
    const interes = parseInt(document.getElementById('interes').value)
    const frecuencia = document.getElementById('frecuencia').value
    const hoy = new Date()

    //SIN INTERES COMPUESTO CUANTO GANARIAS EN DOS AÑOS?
    const dosAños = (inversion,interes,frecuencia,fecha) => {
        const ganancia = inversion * ( interes / 100 ) 
        return inversion + ganancia * 24
    }

    //CON INTERES COMPUESTO CUANTO TE TARDARIAS EN VOLVERTE MILLONARIO?
    const millon = (inversion,interes,frecuencia,fecha, objetivo) => {
        //La ganancia es igual a lo que inverto
        let ganancia = inversion
        //mientras la ganancia no supere los 1000000
        if(ganancia <= objetivo){
            //Avanzo en la fecha actual
            switch (frecuencia) {
                case 'Mensual':
                    //Dejo pasar un mes
                    fecha.setMonth(fecha.getMonth()+1)
                    break;
                case 'Anual':
                    //Dejo pasar un año
                    fecha.setFullYear(fecha.getFullYear()+1)
                    break;
                case 'Diario':
                    //Dejo pasar un dia
                    fecha.setDate(fecha.getDate()+1)
                    break;
                default:
                    break;
            }

            //le aumento el interes del total
            ganancia = inversion + Math.round( inversion * ( interes / 100 ) )

            // Vuelvo a llamar a la funcion
            millon(ganancia,interes,frecuencia,fecha,objetivo)
            
            //Retorno dia mes y año en el que se detuvo la funcion
            return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`
        }else{
            //si la inversion es mas alta que los 1000000 entonces retorno 0
            return 0
        }
    }
    

    //TU INVERSION, QUE PORCENTAJE REPRESENTA DE UN SALARIO PROMEDIO EN ARGENTINA?
    const calcular_porcentaje = (inversion, salario_promedio = 35708) => {
        //Regla de 3 simple
        return `en promedio ${inversion} es el %${ Math.round( 100 * inversion / salario_promedio ) } de un salario promedio en argentina`
    }
    
    //Renderizo
    document.querySelectorAll('render-inversion').textContent=`$${inversion}`
    document.getElementById('render-interes').textContent=`%${interes}`
    document.getElementById('render-frecuencia').textContent=`${frecuencia}`
    document.getElementById('render-hoy').textContent=`${hoy.getDate()}/${hoy.getMonth()+1}/${hoy.getFullYear()} `
    document.getElementById('inversionADosAños').textContent = `${dosAños(inversion,interes,frecuencia,hoy)}`
    document.getElementById('millon').textContent = `${millon(inversion,interes,frecuencia,hoy,1000000)}`
    document.getElementById('porcentaje').textContent = `${calcular_porcentaje(inversion)}`
}

//Asigno la funcion al boton
document.getElementById('procesar').addEventListener('click',procesar)

//Proceso al cargar la pagina
procesar()

