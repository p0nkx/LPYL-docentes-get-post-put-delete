const docentes = require('../../datos/docentes.json');


const getAllDocentes = (req, res) => {
    res.json(docentes).status(200)
}


const getDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo
    
    const resultado = docentes.find( docentes => docentes.legajo == legajo)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El docente con legajo ${legajo} no fue encontrado`} )
    }
}

const deleteDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const indice = docentes.findIndex( docentes => docentes.legajo == legajo )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    } else {
        const docente = docentes[indice];
        const resultado = docentes.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "El docente fue despedido...",
                  docente : docente
            }
        )
    }
}

const crateDocente = (req, res) => {
    const docenteData = req.body
    const existe = docentes.find(docente => docente.legajo == docenteData.legajo)
    if (!existe) {
        if( ! docenteData.concursado)
            docenteData.concursado = false
    
        if (!docenteData.nombre) {
            res.status(400).json({mensaje: `No se pudo generar el docente con legajo ${docenteData.legajo} por no tener nombre`})    
        } else  {
            docentes.push(docenteData)
            res.status(201).json({mensaje: `El docente fue matriculado con legajo ${docenteData.legajo} correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El docente con legajo ${docenteData.legajo} ya existe en la base de datos`})
    }
}

const updateDocente = (req, res)=>{
    const legajo = req.params.legajo  //Path Parameter
    const docenteData = req.body //Body
    const indice = docentes.findIndex(docentes => docentes.legajo == legajo)
    if ( indice >= 0 ) {
        docentes[indice].nombre = docenteData.nombre
        if (docenteData.concursado!==undefined) {
            docentes[indice].concursado = docenteData.concursado 
        }
        res.status(201).json({"docente": docentes[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "No se pudo modificar...",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    }
}




module.exports = {
    getAllDocentes,
    getDocenteByLegajo,
    deleteDocenteByLegajo,
    crateDocente,
    updateDocente
}