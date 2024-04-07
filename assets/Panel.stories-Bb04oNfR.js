import{j as a,E as o,I as c,a as p}from"./IoC-Dm1I8csg.js";import{r as l}from"./index-BBkUAzwr.js";function S(e){const r=l.useRef(null);return l.useEffect(()=>{if(r.current){const n=c.get(p.Panel);n.initialize({...e,container:r.current}),n.makeDraggable()}},[]),a.jsx("div",{ref:r})}function T(){const e=l.useRef(null);return l.useEffect(()=>{if(e.current){const r=c.get(p.Panel),n=c.get(p.Panel);r.initialize({initialPosition:o.BOTTOM,panelSize:30,container:e.current}),n.initialize({initialPosition:o.RIGHT,panelSize:60,container:e.current}),r.makeDraggable(),n.makeDraggable()}},[]),a.jsx("div",{ref:e})}const R={title:"Example/Panel",tags:["autodocs"],parameters:{layout:"fullscreen"}},t={render(){return a.jsx(S,{initialPosition:o.BOTTOM,panelSize:30})}},i={render(){return a.jsx(S,{initialPosition:o.RIGHT,panelSize:60})}},s={render(){return a.jsx(T,{})}};var u,m,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render() {
    return <Wrapper initialPosition={EDGE_POSITION.BOTTOM} panelSize={30} />;
  }
}`,...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var P,f,g;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render() {
    return <Wrapper initialPosition={EDGE_POSITION.RIGHT} panelSize={60} />;
  }
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var E,I,O;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render() {
    return <MultipleWrapper />;
  }
}`,...(O=(I=s.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const j=["BottomPanel","RightPanel","MultiplePanel"];export{t as BottomPanel,s as MultiplePanel,i as RightPanel,j as __namedExportsOrder,R as default};
