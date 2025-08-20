import type { ModelType } from "./model_type";

type AuthType = "login"|"register";

interface AuthStructureType {
    type:AuthType,
    header:Record<'title'|'subtitle',string>,
    form: Record<'model',ModelType> & Record<'url'|'submitTitle',string>
    otherOption: Record<'ask'|'reply'|'redirectTo',string>
}

export type {
    AuthType,
    AuthStructureType
}