const esprima=require('esprima');
const estraverse=require('estraverse');
const escodegen=require('escodegen');

let sourceCode='function ast(){}';
let indent=0;
function pad() {
    return ' '.repeat(indent);
}
let ast=esprima.parseModule(sourceCode);
estraverse.traverse(ast,{
    enter(node){
        console.log(pad()+node.type);
        if(node.type == 'FunctionDeclaration'){
            node.id.name = 'ast_rename';
        }
        indent+=2;
    },
    leave(node){
        indent-=2;
        console.log(pad()+node.type);
    }
})
let generated=escodegen.generate(ast);
console.log(generated)