(this["webpackJsonpBGBF-react-three-radar-chart"]=this["webpackJsonpBGBF-react-three-radar-chart"]||[]).push([[0],{23:function(e,t,n){e.exports={SpringSlider:"SpringSlider_SpringSlider__3tfRa",bar:"SpringSlider_bar__3HV5W",bar_active:"SpringSlider_bar_active__264bU",dot__container:"SpringSlider_dot__container__1fqcO",box__marker:"SpringSlider_box__marker__guagE",marker:"SpringSlider_marker__3wSRI",dot_thumb:"SpringSlider_dot_thumb__1_IUC",label__value:"SpringSlider_label__value__19qLA"}},33:function(e,t,n){e.exports={AutosizeInput:"EditLabel_AutosizeInput__3BRPr",container_slider:"EditLabel_container_slider__2x9rn",container__inputs:"EditLabel_container__inputs__RJ3Dj",container__edit:"EditLabel_container__edit__u_Yer",btn__delete:"EditLabel_btn__delete__2_Epl"}},63:function(e,t,n){},64:function(e,t,n){e.exports={ThreeRadarChart:"ThreeRadarChart_ThreeRadarChart__1dK7M"}},81:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"ThreeRadarChart",(function(){return ve}));var o=n(11),i=n(2),r=n.n(i),l=n(28),c=n.n(l),s=n(8),u=n(14),d=n(19),h=n.n(d),b=n(22),f=n(16),j=n(6),v=n(18),g=n(57),O=n.n(g),m=(n(36),n(39)),x=n.n(m),p=n(66),C=n(58),_=n(40),S=Object(_.a)(Object(C.devtools)((function(e,t){return{setState:function(t){e(t)},isOnEditLabel:!1,isClickOutLabel:!1,isResetCamera:!1,focusPointIndex:!1}}))),k=n(59),y=r.a.memo((function(e){Object(k.a)(e);var t=Object(i.useCallback)((function(){S.getState().isOnEditLabel&&S.setState({isClickOutLabel:!0})}),[]);return Object(o.jsxs)("group",{onPointerDown:t,children:[Object(o.jsxs)("mesh",{position:[0,0,-20],"rotation-y":Math.PI/4,children:[Object(o.jsx)("meshBasicMaterial",{color:"white",transparent:!0,opacity:0,depthTest:!1}),Object(o.jsx)("planeBufferGeometry",{args:[1e3,1e3]})]}),Object(o.jsxs)("mesh",{position:[0,0,-20],"rotation-y":-Math.PI/4,children:[Object(o.jsx)("meshBasicMaterial",{color:"white",transparent:!0,opacity:0,depthTest:!1}),Object(o.jsx)("planeBufferGeometry",{args:[1e3,1e3]})]})]})})),L=n(13),D=n(15),P=n(44),w=(n(81),n(91)),A=function(e){var t=e.isThinLineMode,n=e.color,a=e.points,r=void 0===a?[{x:1,y:1,z:1}]:a,l=e.isOutlineDashMode,c=e.lineWidth,u=void 0===c?1:c,d=Object(f.a)(e,["isThinLineMode","color","points","isOutlineDashMode","lineWidth"]),h=Object(i.useCallback)((function(e){return e.setFromPoints(r)}),[r]);return t?Object(o.jsxs)("line",{children:[Object(o.jsx)("bufferGeometry",{onUpdate:h}),Object(o.jsx)("lineBasicMaterial",{color:n})]}):Object(o.jsx)(w.a,Object(s.a)({points:r.map((function(e){var t=e.x,n=e.y,a=e.z;return[t,n,void 0===a?0:a]})),color:n,lineWidth:u,dashed:l},d))},I=r.a.memo((function(e){var t=e.data,n=e.maxValue,a=e.color,r=void 0===a?"red":a,l=(e.outlineColor,e.lengthRadius),c=Object(f.a)(e,["data","maxValue","color","outlineColor","lengthRadius"]),u=Object(i.useRef)(),d=Object(i.useRef)(Object(D.a)(Array(t.length)).map((function(){return{x:0,y:0,z:0}}))),h=Object(i.useState)(null),b=Object(L.a)(h,2),v=b[0],g=b[1],O=Object(i.useState)(),m=Object(L.a)(O,2),x=m[0],p=m[1],C=Object(P.useSprings)(t.length,(function(e){return{x:0,y:0,onChange:function(n){var a=n.value,o=a.x,i=a.y;d.current[e]={x:o,y:i},t.forEach((function(e,n){var a=d.current[n]||{},o=a.x,i=void 0===o?0:o,r=a.y,l=void 0===r?0:r;0===n?(u.current=new j.Shape,u.current.autoClose=!0,u.current.moveTo(i,l)):u.current.lineTo(i,l),n+1===t.length&&(g(u.current),p([].concat(Object(D.a)(d.current),[d.current[0]])))}))}}}),[t.length]),_=Object(L.a)(C,2),S=(_[0],_[1]),k=Object(i.useCallback)((function(e){var t=e.length,a=2*Math.PI/t;S((function(t){var o=a*t,i=e[t].value/n;return{delay:80*t,x:.93*l*i*Math.cos(o),y:.93*l*i*Math.sin(o)}}))}),[S]);return Object(i.useEffect)((function(){return k(t),function(){}}),[t,k]),Object(o.jsx)("group",Object(s.a)(Object(s.a)({},c),{},{children:Object(o.jsxs)("group",{rotation:[0,0,Math.PI/2],children:[Object(o.jsxs)("mesh",{children:[v&&Object(o.jsx)("shapeBufferGeometry",{args:[v]}),Object(o.jsx)("meshBasicMaterial",{side:j.DoubleSide,color:r,transparent:!0,blending:j.MultiplyBlending})]}),Object(o.jsxs)("mesh",{children:[v&&Object(o.jsx)("shapeBufferGeometry",{args:[v]}),Object(o.jsx)("meshBasicMaterial",{side:j.DoubleSide,color:r,transparent:!0,blending:j.AdditiveBlending}),Object(o.jsx)(A,{points:x,color:"rgba(0, 168, 255, 0.5)",lineWidth:3,transparent:!0,blending:j.AdditiveBlending})]})]})}))})),M=n(46);function R(e,t,n,a,o){var i=Math.PI/180*o,r=Math.cos(i),l=Math.sin(i);return[r*(n-e)+l*(a-t)+e,r*(a-t)-l*(n-e)+t]}var T=r.a.memo((function(e){var t=e.points,n=e.centerPoint,a=e.offsetY,i=e.color,r=e.lineWidth;return t.map((function(e,t){var l=[{x:n[0],y:n[1],z:n[2]+1.3*a},e];return Object(o.jsx)(A,{points:l,lineWidth:r,color:i},"line"+t)}))})),W={top:-.5,bottom:.5,center:0},E=r.a.memo((function(e){var t=e.children,n=e.position,a=e.textHeight,i=void 0===a?.3:a,r=e.color,l=void 0===r?"rgba(255, 255, 255, 1)":r,c=e.backgroundColor,u=e.padding,d=void 0===u?0:u,h=e.borderWidth,b=void 0===h?0:h,v=e.borderRadius,g=void 0===v?0:v,O=e.borderColor,m=void 0===O?"white":O,x=e.strokeWidth,p=void 0===x?.3:x,C=e.strokeColor,_=void 0===C?"#fc5603":C,S=e.fontFace,k=void 0===S?"Arial":S,y=e.fontSize,P=void 0===y?90:y,w=e.fontWeight,A=void 0===w?"normal":w,I=e.textAlign,M=void 0===I?"center":I,R=e.verticalAlign,T=void 0===R?"center":R,E=Object(f.a)(e,["children","position","textHeight","color","backgroundColor","padding","borderWidth","borderRadius","borderColor","strokeWidth","strokeColor","fontFace","fontSize","fontWeight","textAlign","verticalAlign"]),B=t,V=document.createElement("canvas"),N=V.getContext("2d"),H=Array.isArray(b)?b:[b,b],z=H.map((function(e){return e*P*.1})),F=(Array.isArray(g)?g:[g,g,g,g]).map((function(e){return e*P*.1})),Y=Array.isArray(d)?d:[d,d],G=Y.map((function(e){return e*P*.1})),q=B.split("\n"),K="".concat(A," ").concat(P,"px ").concat(k);N.font=K;var J=Math.max.apply(Math,Object(D.a)(q.map((function(e){return N.measureText(e).width})))),U=P*q.length;if(V.width=J+2*z[0]+2*G[0],V.height=U+2*z[1]+2*G[1],b){if(N.strokeStyle=m,z[0]){var Q=z[0]/2;N.lineWidth=z[0],N.beginPath(),N.moveTo(Q,F[0]),N.lineTo(Q,V.height-F[3]),N.moveTo(V.width-Q,F[1]),N.lineTo(V.width-Q,V.height-F[2]),N.stroke()}if(z[1]){var X=z[1]/2;N.lineWidth=z[1],N.beginPath(),N.moveTo(Math.max(z[0],F[0]),X),N.lineTo(V.width-Math.max(z[0],F[1]),X),N.moveTo(Math.max(z[0],F[3]),V.height-X),N.lineTo(V.width-Math.max(z[0],F[2]),V.height-X),N.stroke()}if(g){var Z=Math.max.apply(Math,Object(D.a)(z)),$=Z/2;N.lineWidth=Z,N.beginPath(),[!!F[0]&&[F[0],$,$,F[0]],!!F[1]&&[V.width-F[1],V.width-$,$,F[1]],!!F[2]&&[V.width-F[2],V.width-$,V.height-$,V.height-F[2]],!!F[3]&&[F[3],$,V.height-$,V.height-F[3]]].filter((function(e){return e})).forEach((function(e){var t=Object(L.a)(e,4),n=t[0],a=t[1],o=t[2],i=t[3];N.moveTo(n,o),N.quadraticCurveTo(a,o,a,i)})),N.stroke()}}c&&(N.fillStyle=c,g?(N.beginPath(),N.moveTo(z[0],F[0]),[[z[0],F[0],V.width-F[1],z[1],z[1],z[1]],[V.width-z[0],V.width-z[0],V.width-z[0],z[1],F[1],V.height-F[2]],[V.width-z[0],V.width-F[2],F[3],V.height-z[1],V.height-z[1],V.height-z[1]],[z[0],z[0],z[0],V.height-z[1],V.height-F[3],F[0]]].forEach((function(e){var t=Object(L.a)(e,6),n=t[0],a=t[1],o=t[2],i=t[3],r=t[4],l=t[5];N.quadraticCurveTo(n,i,a,r),N.lineTo(o,l)})),N.closePath(),N.fill()):N.fillRect(z[0],z[1],V.width-2*z[0],V.height-2*z[1])),N.translate(0,10),N.translate.apply(N,Object(D.a)(z)),N.translate.apply(N,Object(D.a)(G)),N.font=K,N.fillStyle=l,N.textBaseline="bottom";var ee=p>0;ee&&(N.lineWidth=p*P/10,N.strokeStyle=_),q.forEach((function(e,t){var n=(J-N.measureText(e).width)/2,a=(t+1)*P;ee&&N.strokeText(e,n,a),N.fillText(e,n,a)}));var te=i*q.length+2*H[1]+2*Y[1],ne=[te*V.width/V.height,te,0],ae={center:[n[0],n[1]+ne[1]*W[T],n[2]],left:[n[0]+ne[0]/3+ne[1]/3,n[1],n[2]],right:[n[0]-ne[0]/3-ne[1]/3,n[1],n[2]]};return Object(o.jsx)("sprite",Object(s.a)(Object(s.a)({scale:ne,position:ae[M]},E),{},{children:Object(o.jsx)("spriteMaterial",{attach:"material",transparent:!0,alphaTest:.5,children:Object(o.jsx)("canvasTexture",{attach:"map",image:V,minFilter:j.LinearFilter},t+l+i+p+_)})}))})),B=n(26),V=n.n(B),N=n(90),H=n(61),z=n.n(H),F=n(32),Y=n(62),G=n(65),q=n(23),K=n.n(q),J=G.a.utils,U=(J.pipe,J.clamp),Q=J.mapRange,X=J.snap,Z=J.splitColor,$=function(e){var t=e.className,n=e.barColor,a=void 0===n?"red":n,r=e.barHeight,l=void 0===r?"5px":r,c=e.dotSize,u=void 0===c?"2.2rem":c,d=e.dotColor,h=void 0===d?"white":d,b=e.mainColor,f=void 0===b?"#aac3e0":b,j=e.value,v=void 0===j?0:j,g=e.minValue,O=void 0===g?0:g,m=e.maxValue,p=void 0===m?5:m,C=e.step,_=void 0===C?.1:C,S=e.onChange,k=e.index,y=Object(i.useRef)(),P=Object(i.useCallback)(X(_),[]),w=Object(i.useMemo)((function(){return"rgba(".concat([].concat(Object(D.a)(Z(a)),[.3]),")")}),[a]),A=Object(F.useSpring)((function(){return{x:0}}),[]),I=Object(L.a)(A,2),M=I[0],R=I[1];Object(i.useEffect)((function(){return setTimeout((function(){R({immediate:!0,x:Q(O,p,0,y.current.offsetWidth,v)})}),30),function(){}}),[]);var T=Object(F.useSpring)((function(){return{scale:Q(O,p,0,3.5,v)}}),[v]),W=Object(L.a)(T,2),E=W[0],B=(W[1],Object(Y.a)((function(e){var t=Object(L.a)(e.movement,1)[0],n=e.event;n.preventDefault(),n.stopPropagation();var a=y.current.offsetWidth,o=U(0,a,t);S(P(Q(0,a,O,p,o)),k),R((function(){return{x:o}}))}),{axis:"x",initial:function(){return[M.x.get(),0]}}));return Object(o.jsx)("div",{className:x()(K.a.SpringSlider,t),style:{"--dot-size":u,"--dot-color":h,"--bar-color":a,"--bar-height":l,"--label-color":f},children:Object(o.jsxs)("div",{ref:y,className:K.a.bar,style:{background:w},children:[Object(o.jsx)(F.a.div,{className:K.a.bar_active,style:{width:M.x}}),Object(o.jsxs)(F.a.div,Object(s.a)(Object(s.a)({},B()),{},{className:K.a.dot__container,style:M,children:[Object(o.jsx)(F.a.div,{style:E,className:K.a.box__marker,children:Object(o.jsx)("div",{className:K.a.marker,children:"\ud83c\udf5a"})}),Object(o.jsx)("div",{className:K.a.label__value,children:v}),Object(o.jsx)("div",{className:K.a.dot_thumb})]}))]})})},ee=n(33),te=n.n(ee),ne={top:"100%",bottom:"-50%",center:"0%",left:"50%",right:"-50%"},ae=r.a.forwardRef((function(e,t){var n=e.position,a=e.value,r=e.onChangeValue,l=e.onChangeInputLabel,c=e.index,s=e.text,u=e.handleCloseEdit,d=e.handleEnterKeyDown,h=e.textAlign,b=e.verticalAlign,f=e.handleDeleteDataItem,j=e.isDeleteAble,v=Object(i.useRef)(!1),g=S(Object(i.useCallback)((function(e){return{focusPointIndex:e.focusPointIndex}}),[]),V.a).focusPointIndex;Object(i.useEffect)((function(){return v.current&&g!==c?u():v.current=!0,function(){}}),[g]);var O=Object(i.useCallback)((function(e){e.stopPropagation()}),[]);return Object(o.jsx)(N.a,{center:!0,position:n,children:Object(o.jsxs)("div",{className:te.a.container__edit,style:{transform:"translate(".concat(ne[h],",").concat(ne[b],")")},children:[Object(o.jsx)("div",{className:te.a.container_slider,children:Object(o.jsx)($,{value:a,onChange:r,index:c})}),Object(o.jsxs)("div",{className:te.a.container__inputs,children:[j&&Object(o.jsx)("button",{className:te.a.btn__delete,"data-index":c,onClick:f,children:"\u2212"}),Object(o.jsx)(z.a,{ref:t,className:te.a.AutosizeInput,defaultValue:s,"data-index":c,onChange:l,onKeyDown:d,onClick:O,onPointerDown:O})]})]})})})),oe=n(63),ie=n.n(oe),re=function(e){var t=e.position,n=e.text,a=e.value,r=e.textAlign,l=e.verticalAlign,c=e.onChangeInputLabel,u=e.onChangeValue,d=(e.labelMode,e.color),h=e.mode,b=e.index,j=e.setCanvasCursor,v=e.setCanvasCursorAsDefault,g=e.isLastLabel,O=(e.distanceFactor,e.handleDeleteDataItem),m=e.isDeleteAble,x=Object(f.a)(e,["position","text","value","textAlign","verticalAlign","onChangeInputLabel","onChangeValue","labelMode","color","mode","index","setCanvasCursor","setCanvasCursorAsDefault","isLastLabel","distanceFactor","handleDeleteDataItem","isDeleteAble"]),p=Object(i.useState)("edit"===h),C=Object(L.a)(p,2),_=C[0],k=C[1],y=Object(i.useRef)(),D=Object(i.useState)(!1),P=Object(L.a)(D,2),w=(P[0],P[1]),A=S(Object(i.useCallback)((function(e){return{isClickOutLabel:e.isClickOutLabel}}),[]),V.a).isClickOutLabel,I=Object(i.useCallback)((function(e){k(e),S.setState({isOnEditLabel:e})}),[]),M=Object(i.useCallback)((function(){"editable"===h&&I(!1)}),[]),R=Object(i.useCallback)((function(e){"Enter"===e.key&&(M(),S.setState({isResetCamera:!0}))}),[]);Object(i.useEffect)((function(){_&&A?(I(!1),S.setState({isClickOutLabel:!1})):g&&S.setState({isClickOutLabel:!1})}),[A,_]);var T=Object(i.useCallback)((function(e){e.stopPropagation(),"editable"===h&&(setTimeout((function(){I(!0)}),30),setTimeout((function(){var e,t;null===(e=y.current)||void 0===e||null===(t=e.input)||void 0===t||t.focus()}),500),S.setState({focusPointIndex:b.toString()}))}),[]);return Object(i.useEffect)((function(){return _?(v(),setTimeout((function(){w(!0)}),0)):w(!1),function(){}}),[_]),_?Object(o.jsx)(ae,{ref:y,position:t,value:a,onChangeValue:u,onChangeInputLabel:c,index:b,text:n,handleCloseEdit:M,handleEnterKeyDown:R,textAlign:r,verticalAlign:l,handleDeleteDataItem:O,isDeleteAble:m}):Object(o.jsx)(E,Object(s.a)(Object(s.a)({className:ie.a.SpriteText,onClick:T,onPointerDown:T,position:t,color:d,textAlign:r,verticalAlign:l,onPointerOver:j,onPointerLeave:v},x),{},{children:n||"\uff1f\uff1f\uff1f"}),"sprite-".concat(n))},le=r.a.memo((function(e){var t=e.data,n=e.points,a=e.textAlignList,r=e.verticalAlignList,l=e.handleDeleteDataItem,c=Object(f.a)(e,["data","points","textAlignList","verticalAlignList","handleDeleteDataItem"]),u=Object(i.useCallback)((function(e){l(parseInt(e.target.dataset.index))}),[]);return t.map((function(e,i){var l=e.name,d=e.value;return Object(o.jsx)(re,Object(s.a)({index:i,position:[n[i].x,n[i].y,.1],text:l,value:d,textAlign:a[i],verticalAlign:r[i],isLastLabel:t.length===i+1,handleDeleteDataItem:u,isDeleteAble:t.length>3},c),i)}))})),ce=r.a.memo((function(e){var t=e.data,n=e.centerPoint,a=void 0===n?[0,0,0]:n,r=e.numPolygonSide,l=e.lengthRadius,c=void 0===l?1:l,u=e.color,d=e.blending,h=e.isCenterLineDisplay,b=void 0!==h&&h,v=e.isOutlineMode,g=void 0!==v&&v,O=e.outlineColor,m=e.centerOutLineColor,x=e.outOutlineStrokeWidth,p=void 0===x?1:x,C=(e.isOutlineDashMode,e.isThinLineMode),_=void 0===C||C,S=e.fontColor,k=e.textHeight,y=e.textStrokeWidth,D=e.textStrokeColor,P=e.labelMode,w=e.onChangeInputLabel,I=e.onChangeValue,W=e.offsetY,E=e.setCanvasCursor,B=e.setCanvasCursorAsDefault,V=e.handleDeleteDataItem,N=Object(f.a)(e,["data","centerPoint","numPolygonSide","lengthRadius","color","blending","isCenterLineDisplay","isOutlineMode","outlineColor","centerOutLineColor","outOutlineStrokeWidth","isOutlineDashMode","isThinLineMode","fontColor","textHeight","textStrokeWidth","textStrokeColor","labelMode","onChangeInputLabel","onChangeValue","offsetY","setCanvasCursor","setCanvasCursorAsDefault","handleDeleteDataItem"]),H=Object(i.useMemo)((function(){return new M.a.Polygon(a[0],a[1],c,r)}),[r,c]),z=Object(i.useMemo)((function(){var e=new j.Shape;return e.autoClose=!0,H._collection.forEach((function(t,n){var o=t.x,i=t.y,l=R(a[0],a[1],o,i,180/r),c=Object(L.a)(l,2),s=[c[0],c[1]];0===n?e.moveTo.apply(e,s):e.lineTo.apply(e,s)})),e}),[H]),F=Object(i.useMemo)((function(){return z.getPoints()}),[z]),Y=Object(i.useMemo)((function(){var e=(F.length-2)/2;return[F.map((function(t,n){return 0===n||n===e?"center":n<e?"right":"left"})),F.map((function(t,n){return 0===n?"bottom":n===e?"top":"center"}))]}),[F]),G=Object(L.a)(Y,2),q=G[0],K=G[1];return z&&Object(o.jsxs)("group",Object(s.a)(Object(s.a)({},N),{},{children:[!g&&Object(o.jsxs)("mesh",{children:[Object(o.jsx)("shapeBufferGeometry",{args:[z]}),Object(o.jsx)("meshBasicMaterial",{color:u,side:j.DoubleSide,transparent:!0,blending:d})]}),Object(o.jsx)(A,{color:O,points:F,lineWidth:p,isThinLineMode:_}),b&&Object(o.jsx)(T,{points:F,lineWidth:p,centerPoint:a,offsetY:W,color:m||O}),b&&Object(o.jsx)(le,{data:t,points:F,color:S,textHeight:k,strokeWidth:y,strokeColor:D,textAlignList:q,verticalAlignList:K,mode:P,onChangeInputLabel:w,onChangeValue:I,setCanvasCursor:E,setCanvasCursorAsDefault:B,handleDeleteDataItem:V})]}))})),se=(n(85),function(e){var t=e.data,n=e.numAbility,a=e.numLayer,i=void 0===a?3:a,r=e.color,l=e.fontColor,c=e.textHeight,s=e.textStrokeWidth,u=e.textStrokeColor,d=e.outlineColor,h=e.outOutlineStrokeWidth,b=e.centerOutLineColor,f=e.offsetY,v=e.lengthRadius,g=e.labelMode,O=e.onChangeInputLabel,m=e.onChangeValue,x=e.setCanvasCursor,p=e.setCanvasCursorAsDefault,C=e.handleDeleteDataItem;e.children;return Object(o.jsxs)("group",{children:[Object(o.jsx)(ce,{data:t,numPolygonSide:n,color:r,isCenterLineDisplay:!0,fontColor:l,textHeight:c,textStrokeWidth:s,textStrokeColor:u,outlineColor:d,centerOutLineColor:b,offsetY:f,lengthRadius:v,labelMode:g,onChangeInputLabel:O,onChangeValue:m,setCanvasCursor:x,setCanvasCursorAsDefault:p,handleDeleteDataItem:C,blending:j.AdditiveBlending,isThinLineMode:!1,outOutlineStrokeWidth:h}),Object(o.jsx)("group",{children:Object(D.a)(Array(i)).map((function(e,t){var a=t/i;return Object(o.jsx)(ce,{color:t%2?"#4c5c70":"#37414e",blending:t%2?j.MultiplyBlending:j.AdditiveBlending,isThinLineMode:!1,outOutlineStrokeWidth:h,numPolygonSide:n,scale:[a,a,1],position:[0,0,f/(i-1)*(i-t)],outlineColor:d,lengthRadius:v},"layer"+t)}))})]})}),ue=n(92),de=n(93),he=n(31);var be=r.a.memo((function(e){e.maxDistance,e.minDistance;var t=e.isPreloadDone,n=void 0===t||t,a=e.control,l=e.numAbility,c=e.lengthRadius,s=e.centerPoint,u=e.startCameraPosition,d=void 0===u?[0,0,5]:u,h=e.defaultCameraPosition,b=void 0===h?[0,0,5]:h,f=e.defaultCameraLookAtPosition,v=void 0===f?[0,0,0]:f,g=Object(i.useRef)(null),O=Object(i.useRef)(!1),m=Object(i.useRef)(null),x=S(Object(i.useCallback)((function(e){return{isClickOutLabel:e.isClickOutLabel,isResetCamera:e.isResetCamera,focusPointIndex:e.focusPointIndex}}),[]),V.a),p=x.isClickOutLabel,C=x.isResetCamera,_=x.focusPointIndex,k=function(e){var t=e.defaultPosition,n=void 0===t?[0,1,0]:t,a=e.defaultCameraLookAtPosition,o=e.refControls,i=e.refCamera,r=Object(P.useSpring)({position:n,lookAtPosition:a},[]),l=Object(L.a)(r,2)[1];return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;l({from:{position:[i.current.position.x,i.current.position.y,i.current.position.z]},to:{position:e,lookAtPosition:t},onChange:function(e){var t,n=e.value,a=n.position,r=n.lookAtPosition;(t=i.current.position).set.apply(t,Object(D.a)(a)),o.current.target=Object(he.a)(j.Vector3,Object(D.a)(r)),o.current.update()},onStart:function(){},onRest:function(){}})}}({defaultPosition:b,refControls:m,defaultCameraLookAtPosition:v,refCamera:g});Object(i.useEffect)((function(){return(p||C)&&(k(),S.setState({isResetCamera:!1,focusPointIndex:!1})),function(){}}),[p,C]),Object(i.useEffect)((function(){return n&&(k(),setTimeout((function(){}),5e3)),function(){}}),[n]);var y=Object(i.useMemo)((function(){return new M.a.Polygon(s[0],s[1],3*c,l)._collection.map((function(e,t){var n=e.x,a=e.y;return[].concat(Object(D.a)(R(s[0],s[1],n,a,180/l)),[2.5*c])}))}),[l,c]);return Object(i.useEffect)((function(){return O.current?!1!==_&&y&&k(y[_],[0,0,-1]):O.current=!0,function(){}}),[_,y]),Object(o.jsxs)(r.a.Fragment,{children:[Object(o.jsx)(ue.a,{makeDefault:!0,ref:g,position:d,args:[60,window.innerWidth/window.innerHeight,1,2e3]}),Object(o.jsx)(de.a,{ref:m,enableRotate:a,enablePan:a})]})})),fe=n(64),je=n.n(fe);Object(v.d)({ShaderPass:p.a});var ve=function(e){var t,n=e.className,a=e.centerPoint,r=void 0===a?[0,0,0]:a,l=e.lengthRadius,c=void 0===l?1:l,d=e.maxValue,g=void 0===d?5:d,m=e.data,p=void 0===m?[{name:"\u6211\u9f41",value:5},{name:"\u7f8e\u8853",value:3},{name:"\u6e2c\u8a66\u8a66",value:.5},{name:"\u5275\u610f",value:3},{name:"\u8010\u73a9",value:5},{name:"\u7b56\u7565",value:1}]:m,C=e.control,_=void 0===C||C,S=e.isTriggerSaveImage,k=e.onCompleteSaveImage,L=e.nameSavedImage,D=e.children,P=e.canvasBgColor,w=void 0===P?"transparent":P,A=e.fontColor,M=void 0===A?"white":A,R=e.textHeight,T=void 0===R?.22:R,W=e.textStrokeWidth,E=void 0===W?0:W,B=e.textStrokeColor,V=void 0===B?"white":B,N=e.outlineColor,H=void 0===N?"#aac3e0":N,z=e.outOutlineStrokeWidth,F=void 0===z?1.2:z,Y=e.centerOutLineColor,G=e.abilityPlateBgColor,q=void 0===G?"#313b47":G,K=e.abilityPlateColor,J=void 0===K?"#2E5E79":K,U=e.offsetY,Q=void 0===U?.15:U,X=e.labelMode,Z=void 0===X?"editable":X,$=e.onChangeInputLabel,ee=e.onChangeValue,te=e.handleDeleteDataItem,ne=e.drawImageList,ae=void 0===ne?[]:ne,oe=e.drawBorderLineWidthPercent,ie=e.drawBorderLineColor,re=Object(f.a)(e,["className","centerPoint","lengthRadius","maxValue","data","control","isTriggerSaveImage","onCompleteSaveImage","nameSavedImage","children","canvasBgColor","fontColor","textHeight","textStrokeWidth","textStrokeColor","outlineColor","outOutlineStrokeWidth","centerOutLineColor","abilityPlateBgColor","abilityPlateColor","offsetY","labelMode","onChangeInputLabel","onChangeValue","handleDeleteDataItem","drawImageList","drawBorderLineWidthPercent","drawBorderLineColor"]),le=Object(i.useRef)(),ce=(Object(i.useRef)(),Object(i.useCallback)((function(){le.current.style.cursor="pointer"}),[])),ue=Object(i.useCallback)((function(){le.current.style.cursor="default"}),[]),de=Object(i.useCallback)(Object(b.a)(h.a.mark((function e(){var t,n,a,o,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.createElement("canvas"),n=t.getContext("2d"),a=le.current,o=a.width,i=a.height,n.canvas.width=o,n.canvas.height=i,n.drawImage(le.current,0,0),ie&&oe&&(n.lineWidth=o*oe*2,n.strokeStyle=ie,n.strokeRect(0,0,o,i)),e.next=9,Promise.all(ae.map((function(e){var t=e.src,a=e.x,o=e.y,i=e.width,r=e.height;return new Promise((function(e,l){var c=new Image;c.crossOrigin="anonymous",c.onload=function(){n.drawImage(c,a,o,i,r),e()},c.onerror=l,c.src=t+"?time="+(new Date).valueOf()}))})));case 9:O()(t,L);case 10:case"end":return e.stop()}}),e)}))),[ae]);Object(i.useEffect)((function(){return S&&(de(),k()),function(){}}),[S]);var he=Object(i.useMemo)((function(){return[0,0,0+1.3*Q+.001]}),[]),fe=Object(i.useCallback)((function(e){var t=e.target,n=t.value,a=t.dataset.index;$(n,parseInt(a))}),[]),ve=p.length<3?3:p.length,ge=Object(i.useMemo)((function(){return[0,-.5,0]}),[]);return Object(o.jsx)("div",{className:x()(je.a.ThreeRadarChart,n),children:Object(o.jsxs)(v.a,Object(s.a)(Object(s.a)({shadows:!0,alpha:!0,gl:{preserveDrawingBuffer:!0},onCreated:function(e){e.camera;var t=e.gl,n=e.scene;e.viewport;t.setPixelRatio(window.devicePixelRatio||2),le.current=t.domElement,w&&"transparent"!==w?n.background=new j.Color(w):(n.background=null,t.setClearColor(0,0))}},re),{},{children:[Object(o.jsxs)("group",{scale:1.3,position:ge,children:[Object(o.jsx)(y,{}),Object(o.jsx)(se,(t={data:p,numAbility:ve,numLayer:g,color:q,outlineColor:H,centerOutLineColor:Y,outOutlineStrokeWidth:F,fontColor:M,textHeight:T,textStrokeWidth:E,textStrokeColor:V,offsetY:Q,lengthRadius:c,labelMode:Z,onChangeInputLabel:fe,onChangeValue:ee},Object(u.a)(t,"labelMode",Z),Object(u.a)(t,"setCanvasCursor",ce),Object(u.a)(t,"setCanvasCursorAsDefault",ue),Object(u.a)(t,"handleDeleteDataItem",te),t)),Object(o.jsx)(I,{data:p,maxValue:g,color:J,outlineColor:H,position:he,lengthRadius:c})]}),D,Object(o.jsx)(be,{control:_,numAbility:ve,lengthRadius:c,centerPoint:r})]}),w)})};var ge=function(){return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("h1",{children:"All Lib Components"}),Object(o.jsx)("a",{href:"./storybook",children:"Go Stroybook"}),Object.values(a).map((function(e){return Object(o.jsx)("div",{children:Object(o.jsx)(e,{})})}))]})};c.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(ge,{})}),document.getElementById("root"))}},[[86,1,2]]]);
//# sourceMappingURL=main.6b7c1da2.chunk.js.map