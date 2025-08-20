import { z } from "zod";
import type { FormItemType } from "./form-type";

interface ModelType {
    schema:z.ZodObject<z.ZodRawShape>,
    form:FormItemType[]
}

export type {
    ModelType
}