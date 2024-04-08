import{i,j as a,I as c,E as p}from"./IoC-Bjh-gjCn.js";import{r as t}from"./index-BBkUAzwr.js";const u=i();function m(){const r=t.useRef(null);return t.useEffect(()=>{r.current&&u.get(c.Workbench).initialize({container:r.current,initialPosition:p.BOTTOM,panelSize:30})},[]),a.jsx("div",{ref:r})}const x={title:"Example/Workbench",tags:["autodocs"],parameters:{layout:"fullscreen"}},e={render(){return a.jsx(m,{})}};var n,s,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render() {
    return <Wrapper />;
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const E=["Demo"];export{e as Demo,E as __namedExportsOrder,x as default};
