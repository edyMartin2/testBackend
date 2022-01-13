const Joi = require('joi');
const connection = require('../config/connection')
var generator = require('generate-password');
const { aplication, auth, logs } = require('../database/schemas')


const RegisterLog = (data,  serverEnd) => {
    var newLog = new logs({
        application_id: data.application_id,
        type: serverEnd.log.type,
        priority: serverEnd.log.priority,
        path:serverEnd.log.path,
        message: serverEnd.log.message,
        request: serverEnd.log.request,
        response: serverEnd.log.response,
        createAt: new Date()
    });

    console.log(serverEnd.log)
    if (newLog.save()) {
        serverEnd.serverEnd.json({message: "se registro con exito"})
    }
}

const OauthRegister = (appId, data) => {
    var token = generator.generate({
        length: 10,
        numbers: true
    });
    var newOauth = new auth({
        application_id: appId,
        token: token
    })
    if (newOauth.save()) {
        data.serverEnd.json({Token: token})
    } else {
        console.log("err")
    }
}
const AppicationRegister = (data) => {
    var id = generator.generate({
        length: 10,
        numbers: true
    });


    var newApp = new aplication({ id: id, name: data.name })
    if (newApp.save()) {
        OauthRegister(id, data)
    } else {
        console.log("ocurrio un error")
    }

}
const ApplicationValidTokenDB = (id, data) => {
    console.log(id)
    connection().then(conn => {
        conn.models.auth.find({ application_id: id }, (err, dataFind) => {
            if (err) {
                data.serverEnd.json({message: err})
            } else {
                RegisterLog(dataFind[0], data)
            }
        })
    })
}
const ApplicationValidDb = (data) => {
    connection().then(conn => {
        conn.models.application.find({ name: data.name }, (err, dataFind) => {
            if (err) {
                console.log(err)

            } else {
                if (dataFind[0]) {
                    var id = dataFind[0].id
                    ApplicationValidTokenDB(id, data)
                } else {
                    AppicationRegister(data)
                }
            }
        })

    })
}

//
const LogValidJoi = (data) => {
    const schema = Joi.object({
        type: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        priority: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        path: Joi.string()
            
            .min(3)
            .max(30)
            .required(),

        message: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        request: Joi.string()
           
            .min(3)
            .max(30)
            .required(),

        response: Joi.string()
            
            .min(3)
            .max(30)
            .required(),
    });
    return schema.validate(data);
}

const ApplicationValid = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        token: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    });
    return schema.validate(data);
}

module.exports = {
    ApplicationValid,
    ApplicationValidDb,
    LogValidJoi
}