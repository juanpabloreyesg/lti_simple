var lti = require('ims-lti');
var consumer_key = "prueba";
var consumer_secret = "prueba";
var nonceStore = new lti.Stores.MemoryStore();

function registrarIngeso(req) {
    return new Promise(function (resolve, reject) {
        var provider = new lti.Provider(consumer_key, consumer_secret, nonceStore);
        provider.valid_request(req, function (err, is_valid) {
            var body = req.body;
            if (!is_valid || !provider.outcome_service) return reject(new Error("El envío de los parámetros desde Coursera no coincide: "+err));
            if (!body.custom_examen) return reject(new Error('Es necesario indicar el id del examen en los parámetros de personalización de la actividad. Por ejemplo, llave: examen y valor: 1'));

            var userId = body.user_id;
            var examenId = body.custom_examen;
            var serviceUrl = body.lis_outcome_service_url;
            var sourcedId = body.lis_result_sourcedid;

            resolve((function () {
                var respuestaExamen = {
                    ExamenId: examenId,
                    EstudianteId: userId,
                    lis_outcome_service_url: serviceUrl,
                    lis_result_sourcedid: sourcedId,
                    actividad: actividad
                };
                returnrespuestaExamen;
            }));
        });
    });
}

module.exports = {
    registrarIngeso: registrarIngeso,
};