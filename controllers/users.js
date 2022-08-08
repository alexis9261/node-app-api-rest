const { response, request } = require('express');

// get
const userGet = (req = request, res = response) => {

    // Obtengo los query params, que vienen en la url de la peticion
    // EJ: url_api/endpoint?param1=asdfasdf&param2=asdf
    const query = req.query
    // otra forma seria desestructurando los query params
    // Esta forma es la recomendada porq solo obtenemos lo que deseamos,
    // los demas valores posibles son ignorados
    const { name, secretKey, page = 1, limit = 10 } = req.query

    // Respondo a la peticion con un codigo(status) 200ok, y un json
    res.status(200).json({
       data: 'get api - controller',
       name,
       page,
       limit,
       secretKey
    });
}

// post
const userPost = (req, res = response ) => {

    const body = req.body;

    res.status(200).json({
       data: 'post api - controller',
       body: body
    });
}

// put
const userPut = (req, res = response ) => {

    // obtengo el id enviado en la url, configurado en la ruta :userId
    const id = req.params.userId;

    res.status(200).json({
       data: 'put api - controller',
       id: id
    });
}

// patch
const userPatch = (req, res = response ) => {
    res.status(200).json({
       data: 'patch api - controller' 
    });
}

// delete
const userDelete = (req, res) => {
    res.status(200).json({
       data: 'delete api - controller' 
    });
}


module.exports = {
    userGet,
    userPut,
    userPatch,
    userPost,
    userDelete
}