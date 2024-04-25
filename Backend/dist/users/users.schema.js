"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAdminSchema = exports.departmentsSchema = exports.departmentSchema = void 0;
const zod_1 = require("zod");
/**
 * SCHEMAS
 */
exports.departmentSchema = zod_1.z.object({
    query: zod_1.z.object({ name: zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres") })
});
exports.departmentsSchema = zod_1.z.object({
    query: zod_1.z.object({ name: zod_1.z.array(zod_1.z.string().min(3, "El nombre debe tener al menos 3 caracteres")) })
});
exports.setAdminSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().uuid({ message: "El id debe ser un UUID" }) })
});
