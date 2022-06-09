import { javascript } from '@codemirror/lang-javascript'
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import _ from 'lodash'
const langType = {
    js: javascript,
    css: css,
    scss: css,
    vue: html,
    jsx: () => javascript({ jsx: true, typescript: true }),
    ts: () => javascript({ jsx: true, typescript: true }),
    html,
    json,
    md: markdown
}
export const setLang = (type) => langType[type]()

// 数组转树
export const setCatalogue = (currentSandbox): any[] => {

    const arr = _.cloneDeep([...currentSandbox.directories, ...currentSandbox.modules])
    function loop(parId?) {
        return arr.reduce((acc, cur) => {
            if (cur.directory_shortid == parId) {
                cur.children = loop(cur.id)
                acc.push(cur)
            }
            return acc
        }, [])
    }
    return loop()
}

// 搜寻树节点
export const searchTree = (element, entryFile) => {
    let selectEle: any = {}
    let elementArr = element

    const loop = (val) => {
        selectEle = elementArr.find(element => {
            return element.title === val
        })
        if (selectEle) {
            elementArr = selectEle.children
        } else {
            selectEle = {}
        }
    }
    entryFile.forEach(val => {
        loop(val)
    });
    return selectEle
}
// 拼接代码
export const conversionCode = (currentSandbox) => {
    const myArray = setCatalogue(currentSandbox)
    let key = []
    const project = {
        files: {
        },
        dependencies: currentSandbox.npm_dependencies,
        entry: currentSandbox.entry,
        environment: currentSandbox.template,
    }
    let flat = (arr) => {
        arr.forEach((item) => {
            if (item.children && item.children.length > 0) {
                key.push(item.title)
                flat(item.children)
                key.pop();
            } else {
                const newKey = key.length > 0 ? `/${key.join('/')}/${item.title}` : item.title
                if (!(newKey.includes('md') || newKey.includes('json')))
                    project.files[newKey] = item
            }
        })
    }

    flat(myArray)
    console.log(project)
    return project
}

// 更新代码



