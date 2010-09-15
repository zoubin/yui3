(function(){var d,b=YUI.Env,c=YUI.config,h=c.doc,e=h&&h.documentElement,i=e&&e.doScroll,k=YUI.Env.add,f=YUI.Env.remove,g=(i)?"onreadystatechange":"DOMContentLoaded",a=c.pollInterval||40,j=function(l){b._ready();};if(!b._ready){b._ready=function(){if(!b.DOMReady){b.DOMReady=true;f(h,g,j);}};
/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(i){if(self!==self.top){d=function(){if(h.readyState=="complete"){f(h,g,d);j();}};k(h,g,d);}else{b._dri=setInterval(function(){try{e.doScroll("left");clearInterval(b._dri);b._dri=null;j();}catch(l){}},a);}}else{k(h,g,j);}}})();YUI.add("event-base",function(a){(function(){var c=YUI.Env,b=function(){a.fire("domready");};a.publish("domready",{fireOnce:true,async:true});if(c.DOMReady){b();}else{a.before(b,c,"_ready");}})();(function(){var c=a.UA,b={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},d=function(g){try{if(g&&3==g.nodeType){g=g.parentNode;}}catch(f){return null;}return a.one(g);};a.DOMEventFacade=function(m,g,f){f=f||{};var i=m,h=g,j=a.config.doc,n=j.body,o=i.pageX,l=i.pageY,k,r,p=j.documentElement,q=f.overrides||{};this.altKey=i.altKey;this.ctrlKey=i.ctrlKey;this.metaKey=i.metaKey;this.shiftKey=i.shiftKey;this.type=q.type||i.type;this.clientX=i.clientX;this.clientY=i.clientY;if(("clientX" in i)&&(!o)&&(0!==o)){o=i.clientX;l=i.clientY;if(c.ie){o+=(p.scrollLeft||n.scrollLeft||0);l+=(p.scrollTop||n.scrollTop||0);}}this._yuifacade=true;this._event=i;this.pageX=o;this.pageY=l;k=i.keyCode||i.charCode||0;if(c.webkit&&(k in b)){k=b[k];}this.keyCode=k;this.charCode=k;this.button=i.which||i.button;this.which=this.button;this.target=d(i.target||i.srcElement);this.currentTarget=d(h);r=i.relatedTarget;if(!r){if(i.type=="mouseout"){r=i.toElement;}else{if(i.type=="mouseover"){r=i.fromElement;}}}this.relatedTarget=d(r);if(i.type=="mousewheel"||i.type=="DOMMouseScroll"){this.wheelDelta=(i.detail)?(i.detail*-1):Math.round(i.wheelDelta/80)||((i.wheelDelta<0)?-1:1);}this.stopPropagation=function(){if(i.stopPropagation){i.stopPropagation();}else{i.cancelBubble=true;}f.stopped=1;this.stopped=1;};this.stopImmediatePropagation=function(){if(i.stopImmediatePropagation){i.stopImmediatePropagation();}else{this.stopPropagation();}f.stopped=2;this.stopped=2;};this.preventDefault=function(e){if(i.preventDefault){i.preventDefault();}i.returnValue=e||false;f.prevented=1;this.prevented=1;};this.halt=function(e){if(e){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};if(this._touch){this._touch(i,g,f);}};})();(function(){a.Env.evt.dom_wrappers={};a.Env.evt.dom_map={};var j=a.Env.evt,c=a.config,g=c.win,l=YUI.Env.add,e=YUI.Env.remove,i=function(){YUI.Env.windowLoaded=true;a.Event._load();e(g,"load",i);},b=function(){a.Event._unload();},d="domready",f="~yui|2|compat~",h=function(n){try{return(n&&typeof n!=="string"&&a.Lang.isNumber(n.length)&&!n.tagName&&!n.alert);}catch(m){return false;}},k=function(){var o=false,p=0,n=[],q=j.dom_wrappers,m=null,r=j.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){if(!k._interval){k._interval=setInterval(a.bind(k._poll,k),k.POLL_INTERVAL);}},onAvailable:function(s,w,A,t,x,z){var y=a.Array(s),u,v;for(u=0;u<y.length;u=u+1){n.push({id:y[u],fn:w,obj:A,override:t,checkReady:x,compat:z});}p=this.POLL_RETRYS;setTimeout(a.bind(k._poll,k),0);v=new a.EventHandle({_delete:function(){if(v.handle){v.handle.detach();return;}var C,B;for(C=0;C<y.length;C++){for(B=0;B<n.length;B++){if(y[C]===n[B].id){n.splice(B,1);}}}}});return v;},onContentReady:function(w,t,v,u,s){return this.onAvailable(w,t,v,u,true,s);},attach:function(v,u,t,s){return k._attach(a.Array(arguments,0,true));},_createWrapper:function(y,x,s,t,w){var v,z=a.stamp(y),u="event:"+z+x;if(false===w){u+="native";}if(s){u+="capture";}v=q[u];if(!v){v=a.publish(u,{silent:true,bubbles:false,contextFn:function(){if(t){return v.el;}else{v.nodeRef=v.nodeRef||a.one(v.el);return v.nodeRef;}}});v.overrides={};v.el=y;v.key=u;v.domkey=z;v.type=x;v.fn=function(A){v.fire(k.getEvent(A,y,(t||(false===w))));};v.capture=s;if(y==g&&x=="load"){v.fireOnce=true;m=u;}q[u]=v;r[z]=r[z]||{};r[z][u]=v;l(y,x,v.fn,s);}return v;},_attach:function(y,x){var D,F,v,C,s,u=false,w,z=y[0],A=y[1],t=y[2]||g,G=x&&x.facade,E=x&&x.capture,B=x&&x.overrides;if(y[y.length-1]===f){D=true;}if(!A||!A.call){return false;}if(h(t)){F=[];a.each(t,function(I,H){y[2]=I;F.push(k._attach(y,x));});return new a.EventHandle(F);}else{if(a.Lang.isString(t)){if(D){v=a.DOM.byId(t);}else{v=a.Selector.query(t);switch(v.length){case 0:v=null;break;case 1:v=v[0];break;default:y[2]=v;return k._attach(y,x);}}if(v){t=v;}else{w=this.onAvailable(t,function(){w.handle=k._attach(y,x);},k,true,false,D);return w;}}}if(!t){return false;}if(a.Node&&t instanceof a.Node){t=a.Node.getDOMNode(t);}C=this._createWrapper(t,z,E,D,G);if(B){a.mix(C.overrides,B);}if(t==g&&z=="load"){if(YUI.Env.windowLoaded){u=true;}}if(D){y.pop();}s=y[3];w=C._on(A,s,(y.length>4)?y.slice(4):null);if(u){C.fire();}return w;},detach:function(z,A,u,x){var y=a.Array(arguments,0,true),C,v,B,w,s,t;if(y[y.length-1]===f){C=true;}if(z&&z.detach){return z.detach();}if(typeof u=="string"){if(C){u=a.DOM.byId(u);}else{u=a.Selector.query(u);v=u.length;if(v<1){u=null;}else{if(v==1){u=u[0];}}}}if(!u){return false;}if(u.detach){y.splice(2,1);return u.detach.apply(u,y);}else{if(h(u)){B=true;for(w=0,v=u.length;w<v;++w){y[2]=u[w];B=(a.Event.detach.apply(a.Event,y)&&B);}return B;}}if(!z||!A||!A.call){return this.purgeElement(u,false,z);}s="event:"+a.stamp(u)+z;t=q[s];if(t){return t.detach(A);}else{return false;}},getEvent:function(v,t,s){var u=v||g.event;return(s)?u:new a.DOMEventFacade(u,t,q["event:"+a.stamp(t)+v.type]);},generateId:function(s){var t=s.id;if(!t){t=a.stamp(s);s.id=t;}return t;},_isValidCollection:h,_load:function(s){if(!o){o=true;if(a.fire){a.fire(d);}k._poll();}},_poll:function(){if(this.locked){return;}if(a.UA.ie&&!YUI.Env.DOMReady){this.startInterval();
return;}this.locked=true;var t,s,x,u,w,y,v=!o;if(!v){v=(p>0);}w=[];y=function(B,C){var A,z=C.override;if(C.compat){if(C.override){if(z===true){A=C.obj;}else{A=z;}}else{A=B;}C.fn.call(A,C.obj);}else{A=C.obj||a.one(B);C.fn.apply(A,(a.Lang.isArray(z))?z:[]);}};for(t=0,s=n.length;t<s;++t){x=n[t];if(x&&!x.checkReady){u=(x.compat)?a.DOM.byId(x.id):a.Selector.query(x.id,null,true);if(u){y(u,x);n[t]=null;}else{w.push(x);}}}for(t=0,s=n.length;t<s;++t){x=n[t];if(x&&x.checkReady){u=(x.compat)?a.DOM.byId(x.id):a.Selector.query(x.id,null,true);if(u){if(o||(u.get&&u.get("nextSibling"))||u.nextSibling){y(u,x);n[t]=null;}}else{w.push(x);}}}p=(w.length===0)?0:p-1;if(v){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return;},purgeElement:function(v,s,z){var x=(a.Lang.isString(v))?a.Selector.query(v,null,true):v,B=this.getListeners(x,z),w,y,A,u,t;if(s&&x){B=B||[];u=a.Selector.query("*",x);w=0;y=u.length;for(;w<y;++w){t=this.getListeners(u[w],z);if(t){B=B.concat(t);}}}if(B){w=0;y=B.length;for(;w<y;++w){A=B[w];A.detachAll();e(A.el,A.type,A.fn,A.capture);delete q[A.key];delete r[A.domkey][A.key];}}},getListeners:function(w,v){var x=a.stamp(w,true),s=r[x],u=[],t=(v)?"event:"+x+v:null,y=j.plugins;if(!s){return null;}if(t){if(y[v]&&y[v].eventDef){t+="_synth";}if(s[t]){u.push(s[t]);}t+="native";if(s[t]){u.push(s[t]);}}else{a.each(s,function(A,z){u.push(A);});}return(u.length)?u:null;},_unload:function(s){a.each(q,function(u,t){u.detachAll();e(u.el,u.type,u.fn,u.capture);delete q[t];delete r[u.domkey][t];});e(g,"unload",b);},nativeAdd:l,nativeRemove:e};}();a.Event=k;if(c.injected||YUI.Env.windowLoaded){i();}else{l(g,"load",i);}if(a.UA.ie){a.on(d,k._poll,k,true);}a.on("unload",b);k.Custom=a.CustomEvent;k.Subscriber=a.Subscriber;k.Target=a.EventTarget;k.Handle=a.EventHandle;k.Facade=a.EventFacade;k._poll();})();a.Env.evt.plugins.available={on:function(d,c,f,e){var b=arguments.length>4?a.Array(arguments,4,true):[];return a.Event.onAvailable.call(a.Event,f,c,e,b);}};a.Env.evt.plugins.contentready={on:function(d,c,f,e){var b=arguments.length>4?a.Array(arguments,4,true):[];return a.Event.onContentReady.call(a.Event,f,c,e,b);}};},"@VERSION@",{requires:["event-custom-base"]});