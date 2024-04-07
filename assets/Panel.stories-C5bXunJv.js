import{i as T,j as t,E as o,I as l}from"./IoC-CNpldvGV.js";import{r as c}from"./index-BBkUAzwr.js";const p=T();function S(e){const r=c.useRef(null);return c.useEffect(()=>{if(r.current){const n=p.get(l.Panel);n.initialize({...e,container:r.current}),n.makeDraggable()}},[]),t.jsx("div",{ref:r})}function x(){const e=c.useRef(null);return c.useEffect(()=>{if(e.current){const r=p.get(l.Panel),n=p.get(l.Panel);r.initialize({initialPosition:o.BOTTOM,panelSize:30,container:e.current}),n.initialize({initialPosition:o.RIGHT,panelSize:60,container:e.current}),r.makeDraggable(),n.makeDraggable()}},[]),t.jsx("div",{ref:e})}const j={title:"Example/Panel",tags:["autodocs"],parameters:{layout:"fullscreen"}},a={render(){return t.jsx(S,{initialPosition:o.BOTTOM,panelSize:30})}},i={render(){return t.jsx(S,{initialPosition:o.RIGHT,panelSize:60})}},s={render(){return t.jsx(x,{})}};var u,m,d;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render() {
    return <Wrapper initialPosition={EDGE_POSITION.BOTTOM} panelSize={30} />;
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var P,f,g;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render() {
    return <Wrapper initialPosition={EDGE_POSITION.RIGHT} panelSize={60} />;
  }
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var E,I,O;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render() {
    return <MultipleWrapper />;
  }
}`,...(O=(I=s.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const D=["BottomPanel","RightPanel","MultiplePanel"];export{a as BottomPanel,s as MultiplePanel,i as RightPanel,D as __namedExportsOrder,j as default};
