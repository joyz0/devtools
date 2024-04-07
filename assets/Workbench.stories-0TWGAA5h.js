import{j as o,I as c,a as i,E as p}from"./IoC-Dm1I8csg.js";import{r as t}from"./index-BBkUAzwr.js";function u(){const r=t.useRef(null);return t.useEffect(()=>{r.current&&c.get(i.Workbench).initialize({container:r.current,initialPosition:p.BOTTOM,panelSize:30})},[]),o.jsx("div",{ref:r})}const f={title:"Example/Workbench",tags:["autodocs"],parameters:{layout:"fullscreen"}},e={render(){return o.jsx(u,{})}};var n,a,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render() {
    return <Wrapper />;
  }
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const E=["Demo"];export{e as Demo,E as __namedExportsOrder,f as default};
