import{i as T,j as t,E as s,I as l}from"./IoC-Bjh-gjCn.js";import{r as c}from"./index-BBkUAzwr.js";const p=T();function S(e){const r=c.useRef(null);return c.useEffect(()=>{if(r.current){const n=p.get(l.Panel);n.initialize({...e,container:r.current}),n.makeDraggable()}},[]),t.jsx("div",{ref:r})}function R(){const e=c.useRef(null);return c.useEffect(()=>{if(e.current){const r=p.get(l.Panel),n=p.get(l.Panel);r.initialize({initialPosition:s.BOTTOM,panelSize:30,container:e.current}),n.initialize({initialPosition:s.RIGHT,panelSize:60,container:e.current}),r.makeDraggable(),n.makeDraggable()}},[]),t.jsx("div",{ref:e})}const O={title:"Example/Panel",tags:["autodocs"],parameters:{layout:"fullscreen"}},a={render(){return t.jsx(S,{initialPosition:s.BOTTOM,panelSize:30})}},i={render(){return t.jsx(S,{initialPosition:s.RIGHT,panelSize:60})}},o={render(){return t.jsx(R,{})}};var u,m,d;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render() {
    return <Wrapper initialPosition={EdgePosition.BOTTOM} panelSize={30} />;
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var P,g,f;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render() {
    return <Wrapper initialPosition={EdgePosition.RIGHT} panelSize={60} />;
  }
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var x,E,z;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render() {
    return <MultipleWrapper />;
  }
}`,...(z=(E=o.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};const I=["BottomPanel","RightPanel","MultiplePanel"];export{a as BottomPanel,o as MultiplePanel,i as RightPanel,I as __namedExportsOrder,O as default};
