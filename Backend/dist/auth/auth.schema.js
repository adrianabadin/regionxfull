"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.SignUpSchema = exports.validateSchemaMiddleware = void 0;
const zod_1 = require("zod");
function validateSchemaMiddleware(schema) {
    return (req, res, next) => {
        const response = schema.safeParse(req);
        if (response.success) {
            console.log("Success");
            next();
        }
        else {
            let errors = [];
            response.error.issues.forEach(error => {
                errors.push({ field: error.path[0], message: error.message, complete: `El campo ${error.path[0]} ${error.message}` });
            });
            console.log("not validated");
            res.status(400).send(errors);
            return;
        }
    };
}
exports.validateSchemaMiddleware = validateSchemaMiddleware;
/**
 * SCHEMAS
 */
exports.SignUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().email({ message: "Debes proveer un email valido" }),
        password: zod_1.z.string().min(6, { message: "La contraseña debe contener al menos 6 caracteres" }),
        name: zod_1.z.string().min(3, { message: "El nombre debe contener al menos 3 caracteres" }),
        lastname: zod_1.z.string().min(3, { message: "El apellido debe contener al menos 3 caracteres" }),
    })
});
exports.LoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().email({ message: "debes proveer un email valido" }),
        password: zod_1.z.string().min(6, { message: "La contraseña debe contener al menos 6 caracteres" })
    })
});
