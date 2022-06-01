import { javascript } from '@codemirror/lang-javascript'
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
const langType = {
    js: javascript,
    css: css,
    scss: css,
    html,
    json,
    md: markdown
}
export const setLang = (type) => langType[type]()


