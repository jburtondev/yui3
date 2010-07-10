YUI.add("history-hash",function(A){var C=A.HistoryBase,G=A.Lang,F=A.Object,K=YUI.namespace("Env.HistoryHash"),B="hash",E,D,J,I=A.config.win,L=I.location;function H(){H.superclass.constructor.apply(this,arguments);}A.extend(H,C,{_init:function(M){M=M||{};M.initialState=M.initialState||H.parseHash();A.after("hashchange",A.bind(this._afterHashChange,this),I);H.superclass._init.call(this,M);},_storeState:function(O,N){var M=H.createHash(N);H.superclass._storeState.apply(this,arguments);if(H.getHash()!==M){H[O===C.SRC_REPLACE?"replaceHash":"setHash"](M);}},_afterHashChange:function(M){this._resolveChanges(B,H.parseHash(M.newHash),{});}},{NAME:"historyHash",SRC_HASH:B,hashPrefix:"",_REGEX_HASH:/([^\?#&]+)=([^&]+)/g,createHash:function(O){var M=H.encode,N=[];F.each(O,function(Q,P){if(G.isValue(Q)){N.push(M(P)+"="+M(Q));}});return N.join("&");},decode:function(M){return decodeURIComponent(M.replace(/\+/g," "));},encode:function(M){return encodeURIComponent(M).replace(/%20/g,"+");},getHash:(A.UA.gecko?function(){var N=/#(.*)$/.exec(L.href),O=N&&N[1]||"",M=H.hashPrefix;return M&&O.indexOf(M)===0?O.replace(M,""):O;}:function(){var N=L.hash.substr(1),M=H.hashPrefix;return M&&N.indexOf(M)===0?N.replace(M,""):N;}),getUrl:function(){return L.href;},parseHash:function(P){var M=H.decode,Q,T,R,N,O={},S=H.hashPrefix,U;P=G.isValue(P)?P:H.getHash();if(S){U=P.indexOf(S);if(U===0||(U===1&&P.charAt(0)==="#")){P=P.replace(S,"");}}R=P.match(H._REGEX_HASH)||[];for(Q=0,T=R.length;Q<T;++Q){N=R[Q].split("=");O[M(N[0])]=M(N[1]);}return O;},replaceHash:function(M){if(M.charAt(0)==="#"){M=M.substr(1);}L.replace("#"+(H.hashPrefix||"")+M);},setHash:function(M){if(M.charAt(0)==="#"){M=M.substr(1);}L.hash=(H.hashPrefix||"")+M;}});E=YUI.namespace("Env.HistoryHash._hashNotifiers");A.Event.define("hashchange",{on:function(O,M,N){if((O.compareTo(I)||O.compareTo(A.config.doc.body))&&!F.owns(E,N.key)){E[N.key]=N;}},detach:function(O,M,N){if(!N.hasSubs()){delete E[N.key];}}});D=H.getHash();J=H.getUrl();if(C.nativeHashChange){A.Event.attach("hashchange",function(O){var M=H.getHash(),N=H.getUrl();F.each(E,function(P){P.fire({oldHash:D,oldUrl:J,newHash:M,newUrl:N});});D=M;J=N;},I);}else{if(!K._hashPoll){if(A.UA.webkit&&!A.UA.chrome&&navigator.vendor.indexOf("Apple")!==-1){A.on("unload",function(){},I);}K._hashPoll=A.later(50,null,function(){var M=H.getHash(),N;if(D!==M){N=H.getUrl();F.each(E,function(O){O.fire({oldHash:D,oldUrl:J,newHash:M,newUrl:N});});D=M;J=N;}},null,true);}}A.HistoryHash=H;if(!A.History&&(!C.html5||!A.HistoryHTML5)){A.History=H;}},"@VERSION@",{requires:["event-synthetic","history-base","yui-later"]});