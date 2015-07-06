;(function(window){
  var undef = {}['undefined']
  // var GLOBAL_PROPS = {}
  // for (var k in window) {
  //   if (window.hasOwnProperty(k) && window[k] !== undef) {
  //     GLOBAL_PROPS[k] = true
  //   }
  // }
  var RESTORE_NAMES = [
    'FAAS_BACKUPS'
    , 'requirejs', 'require', 'define'
    , 'CryptoJS'
  ]
  var name
  var RESTORES = {}
  for (var i = 0; i < RESTORE_NAMES.length; i++) {
    name = RESTORE_NAMES[i]
    if (window.hasOwnProperty(name)) {
      RESTORES[name] = window[name]
      try {
        window[name] = undef
        delete window[name]
      }catch(e){}
    }
  }
  window.FAAS_BACKUPS = {
    // GLOBAL_PROPS: GLOBAL_PROPS
    RESTORE_NAMES: RESTORE_NAMES
    , RESTORES: RESTORES
  }

}(window))
;(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(g,j){var e={},d=e.lib={},m=function(){},n=d.Base={extend:function(a){m.prototype=this;var c=new m;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=d.WordArray=n.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=j?c:4*a.length},toString:function(a){return(a||l).stringify(this)},concat:function(a){var c=this.words,p=a.words,f=this.sigBytes;a=a.sigBytes;this.clamp();if(f%4)for(var b=0;b<a;b++)c[f+b>>>2]|=(p[b>>>2]>>>24-8*(b%4)&255)<<24-8*((f+b)%4);else if(65535<p.length)for(b=0;b<a;b+=4)c[f+b>>>2]=p[b>>>2];else c.push.apply(c,p);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=g.ceil(c/4)},clone:function(){var a=n.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*g.random()|0);return new q.init(c,a)}}),b=e.enc={},l=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++){var d=c[f>>>2]>>>24-8*(f%4)&255;b.push((d>>>4).toString(16));b.push((d&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f+=2)b[f>>>3]|=parseInt(a.substr(f,
2),16)<<24-4*(f%8);return new q.init(b,c/2)}},k=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],f=0;f<a;f++)b.push(String.fromCharCode(c[f>>>2]>>>24-8*(f%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],f=0;f<c;f++)b[f>>>2]|=(a.charCodeAt(f)&255)<<24-8*(f%4);return new q.init(b,c)}},h=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
u=d.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=h.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,d=b.words,f=b.sigBytes,l=this.blockSize,e=f/(4*l),e=a?g.ceil(e):g.max((e|0)-this._minBufferSize,0);a=e*l;f=g.min(4*a,f);if(a){for(var h=0;h<a;h+=l)this._doProcessBlock(d,h);h=d.splice(0,a);b.sigBytes-=f}return new q.init(h,f)},clone:function(){var a=n.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=u.extend({cfg:n.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new w.HMAC.init(a,
d)).finalize(b)}}});var w=e.algo={};return e}(Math);
(function(){var g=CryptoJS,j=g.lib,e=j.WordArray,d=j.Hasher,m=[],j=g.algo.SHA1=d.extend({_doReset:function(){this._hash=new e.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(d,e){for(var b=this._hash.words,l=b[0],k=b[1],h=b[2],g=b[3],j=b[4],a=0;80>a;a++){if(16>a)m[a]=d[e+a]|0;else{var c=m[a-3]^m[a-8]^m[a-14]^m[a-16];m[a]=c<<1|c>>>31}c=(l<<5|l>>>27)+j+m[a];c=20>a?c+((k&h|~k&g)+1518500249):40>a?c+((k^h^g)+1859775393):60>a?c+((k&h|k&g|h&g)-1894007588):c+((k^h^
g)-899497514);j=g;g=h;h=k<<30|k>>>2;k=l;l=c}b[0]=b[0]+l|0;b[1]=b[1]+k|0;b[2]=b[2]+h|0;b[3]=b[3]+g|0;b[4]=b[4]+j|0},_doFinalize:function(){var d=this._data,e=d.words,b=8*this._nDataBytes,l=8*d.sigBytes;e[l>>>5]|=128<<24-l%32;e[(l+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(l+64>>>9<<4)+15]=b;d.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=d.clone.call(this);e._hash=this._hash.clone();return e}});g.SHA1=d._createHelper(j);g.HmacSHA1=d._createHmacHelper(j)})();
(function(){var g=CryptoJS,j=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(e,d){e=this._hasher=new e.init;"string"==typeof d&&(d=j.parse(d));var g=e.blockSize,n=4*g;d.sigBytes>n&&(d=e.finalize(d));d.clamp();for(var q=this._oKey=d.clone(),b=this._iKey=d.clone(),l=q.words,k=b.words,h=0;h<g;h++)l[h]^=1549556828,k[h]^=909522486;q.sigBytes=b.sigBytes=n;this.reset()},reset:function(){var e=this._hasher;e.reset();e.update(this._iKey)},update:function(e){this._hasher.update(e);return this},finalize:function(e){var d=
this._hasher;e=d.finalize(e);d.reset();return d.finalize(this._oKey.clone().concat(e))}})})();
(function(){var g=CryptoJS,j=g.lib,e=j.Base,d=j.WordArray,j=g.algo,m=j.HMAC,n=j.PBKDF2=e.extend({cfg:e.extend({keySize:4,hasher:j.SHA1,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(e,b){for(var g=this.cfg,k=m.create(g.hasher,e),h=d.create(),j=d.create([1]),n=h.words,a=j.words,c=g.keySize,g=g.iterations;n.length<c;){var p=k.update(b).finalize(j);k.reset();for(var f=p.words,v=f.length,s=p,t=1;t<g;t++){s=k.finalize(s);k.reset();for(var x=s.words,r=0;r<v;r++)f[r]^=x[r]}h.concat(p);
a[0]++}h.sigBytes=4*c;return h}});g.PBKDF2=function(d,b,e){return n.create(e).compute(d,b)}})();

require.register("javascripts/faas-ix-core", function(exports, require, module) {
exports.ixDefiner = require('javascripts/faas/ix/definer')

var Middleware = require('javascripts/faas/ix/middleware')
exports.appendAfterAPI = Middleware.appendAfterAPI
exports.appendBeforeAPI = Middleware.appendBeforeAPI
exports.prependAfterAPI = Middleware.prependAfterAPI
exports.prependBeforeAPI = Middleware.prependBeforeAPI

exports.isOfflineError = require('javascripts/faas/ix/online_tester').isOfflineError

var Caller = require('javascripts/faas/ix/caller')
exports.setDeviceKey = Caller.setDeviceKey

});

;require.register("javascripts/faas", function(exports, require, module) {
var Core = require('javascripts/faas-ix-core')

var exp
for (exp in Core) { if (Core.hasOwnProperty(exp)) {
  exports[exp] = Core[exp]
} }

});

;require.register("javascripts/faas/base", function(exports, require, module) {
var Faas = require('javascripts/faas');
var URL = require('javascripts/faas/url');


// /API_KEY_ [/DEVICE_KEY] .js
var IX_CLIENT_JS_REGEXP = /^\/([0-9A-Z]{8})(?:\/([-\w]{3,}))?\.js$/; // Copied from server.


var clog = function()
{
  //console.log.apply(console, Array.prototype.slice.call(arguments, 0)); // Uncomment only for debugging.
}


// exports.HOST_API = 'api-beta.faas.io'


var domainName = 'faas.io'; //used to parse API Key in the url provided in script tag


var urlForHost = function(host, path)
{
  return 'https://'+host+(path && path.charAt(0) === '/' ? '' : '/')+path
}

var urlForApi = function(path)
{
  return urlForHost(pageFaasOptions.host_api, path)
}

var urlForiFrames = function(path)
{
  return urlForHost(pageFaasOptions.host_iframes, path)
}

var urlForWww = function(path)
{
  return urlForHost(pageFaasOptions.host_www, path)
}

var urlForMobile = function(path)
{
  return urlForHost(pageFaasOptions.host_mobile, path)
}

var loadjscssfile = function(filename, filetype, id, cb) {
  var fileref = "";
  if (filetype === "js") {
    fileref=document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    fileref.setAttribute("id", id);
  } else {
    // css
    fileref=document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    fileref.setAttribute("id", id);
  }

  if (typeof fileref != "undefined") {
    clog("Adding CSS");
    // alert("Adding CSS");
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }

  var interval_id = setInterval(function(){
    var cssTagList = document.getElementsByTagName("link");

    for(var i = 0; i < cssTagList.length; i++){
      var fname = cssTagList[i].href.toString().trim();
      var oname = filename.toString().trim();
      if (oname == fname) {
        clearInterval(interval_id);
        // alert('cb');
        cb();
      }
    }

    var scriptTagList = document.getElementsByTagName("script");

    for(var i = 0; i < scriptTagList.length; i++){
      var fname = scriptTagList[i].src.toString().trim();
      var oname = filename.toString().trim();
      if (oname == fname) {
        clearInterval(interval_id);
        // alert('cb');
        cb();
      }
    }
  }, 100);
} // loadjscssfile


var getJSCookie = function(c_name)
{
  c_name = c_name || 'faas_cookie';
  var c_value = document.cookie;
  //clog("getJSCookie: "+c_name+": "+c_value);

  var c_start = c_value.indexOf(" " + c_name + "=");

  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  };

  if (c_start == -1) {
    c_value = null;
  }
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start,c_end));
  }

  return c_value;
}

  ////////////////// faas.io ////////////////////


//global module
var page_api_key = null;
var pageFaasOptions = {};


var start = function(options) {
  var Bouncer = Faas.bouncer;
  // deep copy
  var options = JSON.parse(JSON.stringify(pageFaasOptions));

  page_api_key = options.api_key;

  Faas.phonegap.loadRemoteCordova(function(err){
    // if (!err) {

    clog("pageFaasOptions.bouncer: "+pageFaasOptions.bouncer);

    Bouncer.getLoginScreenInfo(page_api_key, function(err, data) {
      clog('base.start: getLoginScreenInfo data: '+JSON.stringify(data));
      if (!err) {
        clog("data.bouncer_flag: "+data.bouncer_flag);

        if (pageFaasOptions.is_bouncer_flag_provided && (data.bouncer_flag === false)) {
          options.bouncer = pageFaasOptions.bouncer;
        }

        if (data.bouncer_flag) {
          options.bouncer = true;
        }

        if ((page_api_key === "0") && pageFaasOptions.is_bouncer_flag_provided && (pageFaasOptions.bouncer === false)) {
          options.bouncer = false;
        }

        clog("options.bouncer: "+options.bouncer);

        if (options.bouncer) {
          if (data.use_bouncer_ui || (page_api_key === "0")) {
            Bouncer.start(page_api_key);
          }
        } else {
          clog('bouncer is turned off');
          if (navigator && navigator.splashscreen) {
            // alert('hiding splashscreen');
            // navigator.splashscreen.hide();
            // setTimeout(function(){
            //   alert('hiding splashscreen');
            //   navigator.splashscreen.hide();
            // }, 7000);
          } else {
            // alert('no splashscreen');
          }
        }

        setTimeout(function() {
          clog('raising event faasready');
          window.dispatchEvent(new CustomEvent('faasready', {'faas': 'ready'}))
        }, 200);
      // } else {
      //   // ignore cordova load error
      // }
      } else {
        // assume bouncer is on
        options.bouncer = true;
        Bouncer.start(page_api_key);
      }
    }); // Faas.bouncer.getLoginScreenInfo
  }); // Faas.phonegap.loadRemoteCordova

}

var extractFaasCookieObj = function(faas_cookie_signed) {
  if ( (faas_cookie_signed != undefined) && (faas_cookie_signed != "undefined") && (faas_cookie_signed != "") ) {

    // Signed Cookie Format (node.js Connect):
    // "s:" + {key: val, faas_session_id: xxxxxxxxxx} + "." + signature

    var split1 = (faas_cookie_signed.split('s:'))[1];
    var faas_cookie_object_str = (split1.split('}.'))[0] + "}";
    return JSON.parse(faas_cookie_object_str);
  } else {
    return null;
  }
}

// var getApiKey = function() {
//   var method_name = "faas.io.js.getApiKey";

//   clog(method_name+': page_api_key: '+page_api_key);

//   var cookie_api_key = null;

//   // Try to get from cookie
//   var faas_cookie = getJSCookie();
//   //clog(method_name+": faas_cookie: "+faas_cookie);

//   if (faas_cookie && (faas_cookie != undefined) && (faas_cookie != "undefined")) {
//     var faas_cokie_obj = extractFaasCookieObj(faas_cookie);
//     cookie_api_key = faas_cokie_obj.api_key;
//   }

//   clog(method_name+': cookie_api_key: '+cookie_api_key);

//   // page_api_key and cookie_api_key can differ only when page_api_key is "0"
//   if (cookie_api_key) {
//     return cookie_api_key;
//   } else {
//     return page_api_key;
//   }
// }


var getFaasCookieObj = function() {
  var faas_cookie = getJSCookie();
  if (faas_cookie != undefined) {
    var faas_cokie_obj = extractFaasCookieObj(faas_cookie);
    return faas_cokie_obj;
  } else {
    return null;
  }
}

var getApiKey = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.api_key : page_api_key;
}

var getSessionId = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.session_id : null;
}

var getUserId = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.user_id : null;
}

var getUsername = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.username : null;
}

var getTenantId = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.tenant_id : null;
}

var getOrgId = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.org_id : null;
}

var getRoleId = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.role_id : null;
}

var getRoleCode = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.role_code : null;
}

var getPermissions = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.permissions : null;
}

var getRoleOrgs = function() {
  var faasCookieObj = getFaasCookieObj();
  return faasCookieObj ? faasCookieObj.role_orgs : null;
}

// Iterate through all the <script> tags on the page
// API Key is in the file name:
//       https://api-beta.faas.io/XXXXXXXXX.js?bouncer=0

var script_api_key = null;
var script_device_key = null;
var paramBouncer = null;
var paramFaasHost = null;
var paramApiServer = null;
var paramiFramesServer = null;
var paramMobileServer = null;
var paramIxServer = null;
var paramLoginPg = null;
var paramVersion = null;
var paramVersionUUID = null;
var faas_io_js_file_host = null;
var scriptTagList = document.getElementsByTagName("script");
var is_local_faas = false;

var i = scriptTagList.length;
while (i > 0) {
  i--;
  // Optimize search by starting from the end.
  // Also supports static-then-dynamic inclusion:
  //   <script src="faas.ix.js?apiKey=12345678"></script>
  //   <script src="https://api.faas.io/faas.ix.js?apiKey=12345678"></script>
  var scriptElement = scriptTagList[i];
  var scriptUrl = scriptElement.src;
  var scriptSrc = scriptElement.getAttribute('src');
  clog('url:'+scriptUrl);
  if (!scriptSrc) { continue; }
  var url = URL.parse(scriptUrl);
  var src = URL.parse(scriptSrc);

  faas_io_js_file_host = src.host || ''; // Allow static inclusion.

  var script_file_name = url.basename;
  var script_api_key_tmp = null;

  if (faas_io_js_file_host.indexOf(domainName, (faas_io_js_file_host.length - domainName.length)) !== -1) { // hostname ends with 'faas.io'
    if (script_file_name === 'my.faas.js') { // special case
      script_api_key = '0';
    }
    else {
      var matches = url.path.match(IX_CLIENT_JS_REGEXP);
      if (matches) {
        script_api_key = matches[1];
        script_device_key = matches[2];
      }
    }
  }
  if ((script_file_name === 'faas.ix.js') || (script_file_name === 'faas.ext.js')) {
    is_local_faas = true;
    script_api_key_tmp = url.params.apiKey || url.params.apikey || "";
    if (script_api_key_tmp &&
        (script_api_key_tmp.length === 8) &&
        (script_api_key_tmp.toUpperCase() === script_api_key_tmp) &&
        (!script_api_key_tmp.match(/^[0-9a-z]+$/))
       ) {
      // API Key must be 8 char long (+ 3 chars for ".js" suffix)
      // API Key must contain only alpha-num, all upper case
      script_api_key = script_api_key_tmp;
    }
  }
  clog('script_api_key: '+script_api_key);

  if (script_api_key) {
    script_device_key = script_device_key || url.params.deviceKey;

    paramBouncer = url.params.bouncer;
    clog('paramBouncer: '+paramBouncer);

    paramFaasHost = url.params.faashost;
    clog('paramFaasHost: '+paramFaasHost);

    paramApiServer = url.params.apiserver;
    clog('paramApiServer: '+paramApiServer);

    paramiFramesServer = url.params.iframesserver;
    clog('paramiFramesServer: '+paramiFramesServer);

    paramMobileServer = url.params.mobileserver;
    clog('paramMobileServer: '+paramMobileServer);

    paramLoginPg = url.params.loginpg;
    clog('paramLoginPg: '+paramLoginPg);

    paramVersion = url.params.version;
    clog('paramVersion: '+paramVersion);

    paramVersionUUID = url.params.uuid;
    clog('paramVersionUUID: '+paramVersionUUID);

    paramIxServer = url.params.ixserver;
    clog('paramIxServer: '+paramIxServer);

    break;
  }
}



var getPageFaasOptions = function() {
  return pageFaasOptions;
}

if (script_api_key) {
  pageFaasOptions.api_key = script_api_key;
  pageFaasOptions.device_key = script_device_key;

  pageFaasOptions.is_bouncer_flag_provided = false;
  if (paramBouncer && paramBouncer.toString() === "0") {
    pageFaasOptions.bouncer = false;
    pageFaasOptions.is_bouncer_flag_provided = true;
  }

  if (paramBouncer && paramBouncer.toString() === "1") {
    pageFaasOptions.bouncer = true;
    pageFaasOptions.is_bouncer_flag_provided = true;
  }

  clog("Setting options... faas_io_js_file_host: "+faas_io_js_file_host);

  pageFaasOptions.host_www = 'beta.faas.io' // Default
  pageFaasOptions.host_api = 'api.faas.io' // Default
  pageFaasOptions.host_iframes = 'iframes-beta.faas.io' // Default
  pageFaasOptions.host_mobile = 'mobile-beta.faas.io' // Default

  // Maintain the mapping manually, or get from GOLD when ready
  if ((faas_io_js_file_host.toUpperCase() === "3001.API.FAAS.IO") ||
      (faas_io_js_file_host.toUpperCase() === "3003.MOBILE.FAAS.IO")) {
    pageFaasOptions.host_www = '3000.dev.faas.io'
    pageFaasOptions.host_api = '3001.api.faas.io'
    pageFaasOptions.host_iframes = '3002.iframes.dev.faas.io'
    pageFaasOptions.host_mobile = '3003.mobile.faas.io'
  }

  // Override, if parameter is provided
  if (paramFaasHost && (paramFaasHost.toUpperCase().indexOf('FAAS.IO') != -1)) {
    pageFaasOptions.host_www = paramFaasHost;
  }

  // Override, if parameter is provided
  if (paramApiServer && (paramApiServer.toUpperCase().indexOf('FAAS.IO') != -1)) {
    pageFaasOptions.host_api = paramApiServer;
  }

  // Override, if parameter is provided
  if (paramiFramesServer && (paramiFramesServer.toUpperCase().indexOf('FAAS.IO') != -1)) {
    pageFaasOptions.host_iframes = paramiFramesServer;
  }

  // Override, if parameter is provided
  if (paramMobileServer && (paramMobileServer.toUpperCase().indexOf('FAAS.IO') != -1)) {
    pageFaasOptions.host_mobile = paramMobileServer;
  }

  pageFaasOptions.loginpg = paramLoginPg;
  pageFaasOptions.app_version = paramVersion;
  pageFaasOptions.app_version_uuid = paramVersionUUID;

  if (is_local_faas && (pageFaasOptions.host_api === '3001.api.faas.io')) {
    pageFaasOptions.host_www = '3000.dev.faas.io'
    pageFaasOptions.host_api = '3001.api.faas.io'
    pageFaasOptions.host_iframes = '3002.iframes.dev.faas.io'
    pageFaasOptions.host_mobile = '3003.mobile.faas.io'
  }

  pageFaasOptions.host_ix = paramIxServer || faas_io_js_file_host || pageFaasOptions.host_api;

} else {
  clog("faas api_key not found");
}

clog('pageFaasOptions: '+JSON.stringify(pageFaasOptions));


exports.urlForApi = urlForApi
exports.urlForiFrames = urlForiFrames
exports.urlForWww = urlForWww
exports.urlForMobile = urlForMobile
exports.loadjscssfile = loadjscssfile
exports.getJSCookie = getJSCookie
exports.extractFaasCookieObj = extractFaasCookieObj
exports.start = start
exports.getPageFaasOptions = getPageFaasOptions

exports.getFaasSessionId = getSessionId
exports.getApiKey = getApiKey
exports.getSessionId = getSessionId
exports.getUsername = getUsername
exports.getUserId = getUserId
exports.getTenantId = getTenantId
exports.getOrgId = getOrgId
exports.getRoleId = getRoleId
exports.getRoleCode = getRoleCode
exports.getPermissions = getPermissions
exports.getRoleOrgs = getRoleOrgs

exports.clog = clog

});

;require.register("javascripts/faas/ix/background_queuer", function(exports, require, module) {
var BackgroundQueuer, Caller, JOB_UNLOCK_TIMEOUT, J_API_NAME, J_ARGS, J_ATTEMPTED_AT, J_CALLBACK_NAME, J_LOCK, J_QUEUED_AT, OnlineTester, PROCESS_QUEUE_INTERVAL_MS, PROCESS_QUEUE_TIMER, QUEUE_MUTEX_LOCKED, Store, addToQueue, findWorkableJob, modifyQueueThen, now, processQueue, runJob, runQueue, setTimer;

Store = require('javascripts/faas/ix/store');

OnlineTester = require('javascripts/faas/ix/online_tester');

Caller = require('javascripts/faas/ix/caller');

J_API_NAME = 0;

J_ARGS = 1;

J_CALLBACK_NAME = 2;

J_QUEUED_AT = 3;

J_ATTEMPTED_AT = 4;

J_LOCK = 5;

PROCESS_QUEUE_INTERVAL_MS = 60000;

PROCESS_QUEUE_TIMER = null;

JOB_UNLOCK_TIMEOUT = 300000;

BackgroundQueuer = (function() {
  function BackgroundQueuer() {}

  BackgroundQueuer.invoke = function(apiName, args, callbackName) {
    return addToQueue(apiName, args, callbackName);
  };

  return BackgroundQueuer;

})();

now = function() {
  return (new Date).getTime();
};

addToQueue = function(apiName, args, callbackName) {
  return modifyQueueThen(function(queue) {
    var job;
    job = [];
    job[J_API_NAME] = apiName;
    job[J_ARGS] = args;
    job[J_CALLBACK_NAME] = callbackName;
    job[J_QUEUED_AT] = now();
    return queue.push(job);
  }, function() {
    return runQueue();
  });
};

QUEUE_MUTEX_LOCKED = false;

modifyQueueThen = function(modifyQueueCallback, afterModifiedCallback) {
  var e, modifyVal, queue;
  if (QUEUE_MUTEX_LOCKED) {
    return setTimeout((function() {
      return modifyQueueThen(modifyQueueCallback, afterModifiedCallback);
    }), 100);
  } else {
    QUEUE_MUTEX_LOCKED = true;
    queue = Store.getBackgroundQueue() || [];
    try {
      modifyVal = modifyQueueCallback(queue);
      Store.setBackgroundQueue(queue);
    } catch (_error) {
      e = _error;
    }
    QUEUE_MUTEX_LOCKED = false;
    return afterModifiedCallback(queue, modifyVal);
  }
};

runQueue = function() {
  if (PROCESS_QUEUE_TIMER) {
    clearTimeout(PROCESS_QUEUE_TIMER);
  }
  return processQueue();
};

setTimer = function() {
  return PROCESS_QUEUE_TIMER = setTimeout(runQueue, PROCESS_QUEUE_INTERVAL_MS);
};

processQueue = function() {
  return OnlineTester.test((function(_this) {
    return function(isOnline) {
      if (!isOnline) {
        setTimer();
        return;
      }
      return modifyQueueThen(function(queue) {
        var job;
        job = findWorkableJob(queue);
        if (job) {
          job[J_ATTEMPTED_AT] = now();
          job[J_LOCK] = Math.floor(Math.random() * 1000000);
        }
        return job;
      }, function(queue, job) {
        if (job) {
          return runJob(job);
        } else if (queue.length > 0) {
          return setTimer();
        }
      });
    };
  })(this));
};

runJob = function(job) {

  /*
   * A callback NAME is used instead of callback FUNCTION
   * to enable persisting the queue across page refreshes,
   * app closes, etc. Cached anonymous functions would get
   * discarded when the page is unloaded (no global persistence).
   * With a callback NAME, the function can be statically defined
   * and available again when the page reloads.
   */
  var callback, callbackName, clientCallback, name, names, _i, _len;
  callbackName = job[J_CALLBACK_NAME];
  clientCallback = null;
  if (callbackName) {
    names = callbackName.split('.');
    if (names && names.length > 0) {
      clientCallback = window;
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        clientCallback = clientCallback[name];
      }
    }
  }
  callback = function(err, data) {
    return modifyQueueThen(function(queue) {
      var j, qjob, _j, _len1, _results;
      _results = [];
      for (j = _j = 0, _len1 = queue.length; _j < _len1; j = ++_j) {
        qjob = queue[j];
        if (qjob[J_LOCK] === job[J_LOCK] && qjob[J_ATTEMPTED_AT] === job[J_ATTEMPTED_AT]) {
          queue.splice(j, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }, function() {
      var e;
      if (clientCallback) {
        try {
          clientCallback(err, data);
        } catch (_error) {
          e = _error;
        }
      }
      return runQueue();
    });
  };
  return Caller.invoke(job[J_API_NAME], job[J_ARGS], function(err, data) {
    if (err) {
      return Caller.pingClient(function(success) {
        if (success) {
          return callback(err, data);
        } else {
          return modifyQueueThen(function(queue) {
            var j, qjob, _j, _len1, _results;
            _results = [];
            for (j = _j = 0, _len1 = queue.length; _j < _len1; j = ++_j) {
              qjob = queue[j];
              if (qjob[J_LOCK] === job[J_LOCK] && qjob[J_ATTEMPTED_AT] === job[J_ATTEMPTED_AT]) {
                qjob[J_LOCK] = null;
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }, function() {
            return setTimer();
          });
        }
      });
    } else {
      return callback(err, data);
    }
  });
};

findWorkableJob = function(queue) {
  var at, job, workable, _i, _len;
  workable = null;
  at = now();
  for (_i = 0, _len = queue.length; _i < _len; _i++) {
    job = queue[_i];
    if (!job[J_LOCK]) {
      workable = job;
      break;
    }
    if (job[J_ATTEMPTED_AT] && (at - job[J_ATTEMPTED_AT] > JOB_UNLOCK_TIMEOUT)) {
      workable = job;
      break;
    }
  }
  return workable;
};

module.exports = BackgroundQueuer;

});

require.register("javascripts/faas/ix/cacher", function(exports, require, module) {
var Caller, Store, readCall, writeCall;

Caller = require('javascripts/faas/ix/caller');

Store = require('javascripts/faas/ix/store');

exports.invoke = function(apiName, args, cb_err_data) {
  var argsJson, cacheVal, wrappedCallback;
  argsJson = JSON.stringify(args);
  cacheVal = readCall(apiName, argsJson);
  if (cacheVal) {
    return cb_err_data(cacheVal.err, cacheVal.data);
  } else {
    wrappedCallback = function(err, data) {
      var doCache, jqXHR;
      doCache = true;
      if (err) {
        jqXHR = (err != null ? err.jqRaw : void 0) && err.jqRaw[0];
        if ((jqXHR != null ? jqXHR.status : void 0) && jqXHR.status >= 400) {
          doCache = false;
        }
      }
      if (doCache) {
        writeCall(apiName, argsJson, err, data);
      }
      return cb_err_data(err, data);
    };
    return Caller.invoke(apiName, args, wrappedCallback);
  }
};


/*
 * Read and write to the cache as JSON, so that returned objects are immutable.
 */

readCall = function(apiName, argsJson) {
  var calls, err_data;
  calls = Store.getObj(apiName);
  if (calls) {
    err_data = calls[argsJson];
  }
  if (err_data) {
    return {
      err: err_data[0],
      data: err_data[1]
    };
  } else {
    return null;
  }
};

writeCall = function(apiName, argsJson, err, data) {
  var calls;
  calls = Store.getObj(apiName) || {};
  calls[argsJson] = [err, data];
  return Store.setObj(apiName, calls);
};

});

require.register("javascripts/faas/ix/caller", function(exports, require, module) {
var Base, Caller, Crypto, Middleware, OnlineTester,
  __hasProp = {}.hasOwnProperty;

Base = require('javascripts/faas/base');

Crypto = require('javascripts/faas/ix/crypto');

OnlineTester = require('javascripts/faas/ix/online_tester');

Middleware = require('javascripts/faas/ix/middleware');

Caller = (function() {
  var DEVICE_KEY, URL_BASE, ajaxPost, setUrlBase, urlBase;

  function Caller() {}

  URL_BASE = null;

  DEVICE_KEY = null;

  urlBase = function() {
    if (!URL_BASE) {
      setUrlBase();
    }
    return URL_BASE;
  };

  setUrlBase = function() {
    var api_key, device_key, host_api, pageOptions;
    pageOptions = Base.getPageFaasOptions();
    host_api = pageOptions.host_ix;
    api_key = pageOptions.api_key;
    device_key = DEVICE_KEY || pageOptions.device_key;
    URL_BASE = "https://" + host_api + "/" + api_key;
    if (device_key) {
      URL_BASE += "/" + device_key;
    }
    return URL_BASE += "/ix/";
  };

  Caller.setDeviceKey = function(deviceKey) {
    DEVICE_KEY = deviceKey;
    return setUrlBase();
  };

  ajaxPost = function(url, object, callback) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      var err, jsonErr, key, resp, val, _ref;
      if (xhr.readyState === 4) {
        if (xhr.responseText) {
          try {
            resp = JSON.parse(xhr.responseText);
          } catch (_error) {
            jsonErr = _error;
            resp = {
              parseError: jsonErr
            };
          }
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          return callback(null, resp);
        } else {
          err = resp;
          if (!err) {
            if (xhr.statusText || xhr.status) {
              err = {
                statusText: xhr.statusText,
                status: xhr.status
              };
            } else {
              err = {};
              _ref = OnlineTester.offlineError();
              for (key in _ref) {
                val = _ref[key];
                err[key] = val;
              }
            }
          }
          return callback(err);
        }
      }
    };
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
    return xhr.send(JSON.stringify(object));
  };

  Caller.invoke = function(apiName, args, callback_err_data) {
    var middlewareData;
    if (typeof callback_err_data !== 'function') {
      throw 'ERROR: Last argument to ' + apiName + '(...) is not a callback function. arguments.length: ' + (args.length + (args.length === 0 && typeof callback_err_data === 'undefined' ? 0 : 1)) + ', last: ' + (typeof callback_err_data);
    }
    middlewareData = {
      api: apiName,
      args: args,
      callback: callback_err_data,
      custom: null,
      token: null
    };
    return Middleware.runBeforeHooks(middlewareData, function() {
      var params, unpackedCallback;
      params = {
        api: middlewareData.api,
        args: middlewareData.args,
        client: 'ix.js 0.1.0'
      };
      if (middlewareData.custom) {
        params.custom = middlewareData.custom;
      }
      if (middlewareData.token) {
        params.token = middlewareData.token;
      }
      unpackedCallback = function(err, data) {
        var errData, key, value;
        if (err != null ? err.data : void 0) {
          errData = err.data;
          delete err.data;
          for (key in errData) {
            if (!__hasProp.call(errData, key)) continue;
            value = errData[key];
            err[key] = value;
          }
        }
        if (data && data.hasOwnProperty('data')) {
          data = data.data;
        }
        middlewareData.err = err;
        middlewareData.data = data;
        return Middleware.runAfterHooks(middlewareData, function() {
          return middlewareData.callback(middlewareData.err, middlewareData.data);
        });
      };
      return OnlineTester.test(function(isOnline) {
        var decryptingCallback, url;
        if (isOnline) {
          if (!Crypto.enabled()) {
            url = urlBase() + params.api;
            return ajaxPost(url, params, unpackedCallback);
          } else {
            url = urlBase() + 'ix-x';
            decryptingCallback = Crypto.decryptingCallback(unpackedCallback);
            return Crypto.encrypt(params, function(cipherParams) {
              return ajaxPost(url, cipherParams, decryptingCallback);
            });
          }
        } else {
          return unpackedCallback(OnlineTester.offlineError());
        }
      });
    });
  };

  Caller.pingClient = function(callback_success) {
    return ajaxPost(urlBase() + 'ix-ping', {}, function(err, data) {
      var success;
      success = !err && data && data.data && data.data.success;
      return callback_success(success);
    });
  };

  return Caller;

})();

module.exports = Caller;

});

require.register("javascripts/faas/ix/crypto", function(exports, require, module) {
var Crypto, CryptoJS, salt, saltHex;

CryptoJS = window.CryptoJS;

saltHex = '985ceb6dcec614f4a6cb156e7e2a14398cf964b1568f4d2213b60a6449d7c1d9';

salt = CryptoJS.enc.Hex.parse(saltHex);

Crypto = (function() {
  function Crypto() {}

  Crypto.CryptoJS = CryptoJS;

  Crypto.decrypt = function(data, callback_err_ptParams) {
    var cipherParams, cpData, e, key, opts, plaintext, ptArr, ptParams;
    try {
      cpData = data.data;
      key = CryptoJS.PBKDF2(Crypto.getKey(), Crypto.getSalt(), {
        keySize: 256 / 32,
        iterations: 256
      });
      opts = {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Hex.parse(cpData.iv)
      };
      cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(cpData.ct)
      });
      ptArr = CryptoJS.AES.decrypt(cipherParams, key, opts);
      plaintext = CryptoJS.enc.Utf8.stringify(ptArr);
      ptParams = JSON.parse(plaintext.slice(16));
      return callback_err_ptParams(null, ptParams);
    } catch (_error) {
      e = _error;
      return callback_err_ptParams(e);
    }
  };

  Crypto.decryptingCallback = function(callback_err_data) {
    return function(err, cipherParams) {
      return Crypto.decrypt(cipherParams, function(err2, ptParams) {
        return callback_err_data(err || err2, ptParams);
      });
    };
  };

  Crypto.enabled = function() {
    return Crypto.KEY != null;
  };

  Crypto.encrypt = function(ptParams, callback_cipherParams) {
    var cipherParams, key, opts, plaintext, prefix, rand;
    rand = CryptoJS.lib.WordArray.random(12);
    prefix = CryptoJS.enc.Base64.stringify(rand);
    plaintext = prefix + JSON.stringify(ptParams);
    key = CryptoJS.PBKDF2(Crypto.getKey(), Crypto.getSalt(), {
      keySize: 256 / 32,
      iterations: 256
    });
    opts = {
      mode: CryptoJS.mode.CBC,
      iv: CryptoJS.lib.WordArray.random(128 / 8)
    };
    cipherParams = CryptoJS.AES.encrypt(plaintext, key, opts);
    return callback_cipherParams({
      ct: cipherParams.ciphertext.toString(),
      iv: cipherParams.iv.toString()
    });
  };

  Crypto.getKey = function() {
    return Crypto.KEY;
  };

  Crypto.getSalt = function() {
    return salt;
  };

  Crypto.setKey = function(key) {
    return Crypto.KEY = key;
  };

  return Crypto;

})();

module.exports = Crypto;

});

require.register("javascripts/faas/ix/definer", function(exports, require, module) {
var BackgroundQueuer, Cacher, Caller, Crypto, Faas, Store, addExportsTo, defineApiFromMeta, defineApisFromMeta, makeInvokeWrapper,
  __hasProp = {}.hasOwnProperty;

Faas = require('javascripts/faas');

Caller = require('javascripts/faas/ix/caller');

Store = require('javascripts/faas/ix/store');

Cacher = require('javascripts/faas/ix/cacher');

BackgroundQueuer = require('javascripts/faas/ix/background_queuer');

Crypto = require('javascripts/faas/ix/crypto');


/*
 * setExports(proxyExports)
 * This is called by the Faas library to set up client-side (browser) javascript
 * integration functions that are published by the client's integration server.
 */

exports.setExports = function(exportInfo) {
  var apis, ix, ixa, key, value;
  apis = {
    ix: {},
    cache: {},
    background: {},
    backgroundCache: {}
  };
  addExportsTo(apis, '', exportInfo);
  ix = apis.ix;
  ixa = apis;
  ixa.cacheClear = Store.cacheClear;

  /*
   * Enable calling like Faas.ix.cache.something() instead of
   * Faas.ixa.cache.something(), but only if APIs are not defined
   * for those properties.
   */
  for (key in ixa) {
    if (!__hasProp.call(ixa, key)) continue;
    value = ixa[key];
    if (key === 'ix') {
      continue;
    }
    if (!ix.hasOwnProperty(key)) {
      ix[key] = value;
    }
  }
  Faas.ix = ix;
  Faas.ixa = ixa;
  return Faas.ixCrypto = Crypto;
};

addExportsTo = function(apis, parentPrefix, exportInfo) {
  var apiType, meta, newApis, prop, propPath, _results;
  _results = [];
  for (prop in exportInfo) {
    if (!__hasProp.call(exportInfo, prop)) continue;
    propPath = parentPrefix + prop;
    meta = exportInfo[prop];
    if (meta.exports) {
      meta = meta.exports;
    }
    newApis = defineApisFromMeta(apis, prop, propPath, meta);
    for (apiType in apis) {
      if (!__hasProp.call(apis, apiType)) continue;
      apis[apiType][prop] = newApis[apiType];
    }
    if (meta.atts) {
      _results.push(addExportsTo(newApis, propPath + '.', meta.atts));
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

defineApisFromMeta = function(apis, prop, propPath, meta) {
  var apiType, ixApi, newApis;
  ixApi = defineApiFromMeta(propPath, meta);
  newApis = {
    ix: ixApi
  };
  if (typeof ixApi === 'function') {
    newApis.cache = makeInvokeWrapper(propPath, Cacher.invoke);
    newApis.background = makeInvokeWrapper(propPath, BackgroundQueuer.invoke);
    newApis.backgroundCache = {};
  } else {
    for (apiType in apis) {
      if (!__hasProp.call(apis, apiType)) continue;
      if (apiType === 'ix') {
        continue;
      }
      if (typeof ixApi === 'object') {
        newApis[apiType] = {};
      } else {
        newApis[apiType] = ixApi;
      }
    }
  }
  return newApis;
};

defineApiFromMeta = function(propPath, meta) {
  var obj;
  if (meta.isFunc) {
    obj = makeInvokeWrapper(propPath, Caller.invoke);
  } else if (meta.hasOwnProperty('value')) {
    obj = meta.value;
  } else {
    obj = {};
  }
  return obj;
};

makeInvokeWrapper = function(apiName, invokeFunction) {
  return function() {
    var args, callback_err_data;
    args = Array.prototype.slice.call(arguments, 0);
    callback_err_data = args.pop();
    return invokeFunction(apiName, args, callback_err_data);
  };
};

});

require.register("javascripts/faas/ix/middleware", function(exports, require, module) {
var Middleware;

Middleware = (function() {
  var AFTER_HOOKS, BEFORE_HOOKS, runHooks;

  function Middleware() {}

  AFTER_HOOKS = [];

  BEFORE_HOOKS = [];

  Middleware.appendAfterAPI = function(callback_data_next) {
    return AFTER_HOOKS.push(callback_data_next);
  };

  Middleware.appendBeforeAPI = function(callback_data_next) {
    return BEFORE_HOOKS.push(callback_data_next);
  };

  Middleware.prependAfterAPI = function(callback_data_next) {
    return AFTER_HOOKS.unshift(callback_data_next);
  };

  Middleware.prependBeforeAPI = function(callback_data_next) {
    return BEFORE_HOOKS.unshift(callback_data_next);
  };

  Middleware.runBeforeHooks = function(hookData, apiCall) {
    return runHooks(hookData, apiCall, BEFORE_HOOKS);
  };

  Middleware.runAfterHooks = function(hookData, defaultCallback) {
    return runHooks(hookData, defaultCallback, AFTER_HOOKS);
  };

  runHooks = function(hookData, last, hooks) {
    var callback, makeNewNext, next, _i;
    makeNewNext = function(newNext, oldNext) {
      return function() {
        return newNext(hookData, oldNext);
      };
    };
    next = last;
    for (_i = hooks.length - 1; _i >= 0; _i += -1) {
      callback = hooks[_i];
      next = makeNewNext(callback, next);
    }
    return next();
  };

  return Middleware;

})();

module.exports = Middleware;

});

require.register("javascripts/faas/ix/online_tester", function(exports, require, module) {
var OnlineTester,
  __hasProp = {}.hasOwnProperty;

OnlineTester = (function() {
  var ERR_OFFLINE;

  function OnlineTester() {}

  ERR_OFFLINE = {
    error: 'OFFLINE',
    status: 0
  };

  OnlineTester.test = function(callback_isOnline) {
    return callback_isOnline(true);
  };

  OnlineTester.offlineError = function() {
    return ERR_OFFLINE;
  };

  OnlineTester.isOfflineError = function(err) {
    var key, val;
    if (!err) {
      return false;
    }
    for (key in ERR_OFFLINE) {
      if (!__hasProp.call(ERR_OFFLINE, key)) continue;
      val = ERR_OFFLINE[key];
      if (err[key] !== val) {
        return false;
      }
    }
    return true;
  };

  return OnlineTester;

})();

module.exports = OnlineTester;

});

require.register("javascripts/faas/ix/store", function(exports, require, module) {
var NAMES_KEY, QUEUE_KEY_NAME, Store, keyFor, recordKey;

Store = (function() {
  function Store() {}

  Store.getObj = function(key) {
    var e, obj, str;
    try {
      str = localStorage.getItem(keyFor(key));
      if (str) {
        obj = JSON.parse(str);
      }
    } catch (_error) {
      e = _error;
    }
    return obj;
  };

  Store.setObj = function(key, obj) {
    var e;
    try {
      if (key !== QUEUE_KEY_NAME) {
        recordKey(key);
      }
      return localStorage.setItem(keyFor(key), JSON.stringify(obj));
    } catch (_error) {
      e = _error;
    }
  };

  Store.cacheClear = function() {
    var e, key, keys, keysStr, _i, _len;
    try {
      keysStr = localStorage.getItem(NAMES_KEY);
      if (!keysStr) {
        return;
      }
      keys = keysStr.split(',');
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        if (key) {
          localStorage.removeItem(keyFor(key));
        }
      }
      return localStorage.removeItem(NAMES_KEY);
    } catch (_error) {
      e = _error;
    }
  };

  Store.getBackgroundQueue = function() {
    return this.getObj(QUEUE_KEY_NAME);
  };

  Store.setBackgroundQueue = function(queue) {
    return this.setObj(QUEUE_KEY_NAME, queue);
  };

  return Store;

})();

keyFor = function(name) {
  return 'Faas.IX:' + name;
};

QUEUE_KEY_NAME = ':QUEUE';

NAMES_KEY = keyFor(':NAMES');

recordKey = function(name) {
  var keysStr;
  keysStr = localStorage.getItem(NAMES_KEY) || ',';
  if (keysStr.indexOf(',' + name + ',') < 0) {
    keysStr += name + ',';
    return localStorage.setItem(NAMES_KEY, keysStr);
  }
};

module.exports = Store;

});

require.register("javascripts/faas/url", function(exports, require, module) {
var URL;

URL = (function() {
  function URL() {}

  URL.parse = function(url) {
    var baseIdx, name, param, parsed, parts, proto_host, value, _i, _len, _ref, _ref1;
    parts = url.match(/^((?:\w+:)?\/\/[^\/]*)?([^?]+)\??([^#]*)#?(.*)$/);
    parsed = {
      origin: parts[1],
      path: parts[2],
      query: parts[3],
      hash: parts[4]
    };
    if (parsed.origin) {
      proto_host = parsed.origin.split('://');
      parsed.protocol = proto_host[0];
      parsed.host = proto_host[1];
    }
    if (parsed.path) {
      baseIdx = parsed.path.lastIndexOf('/');
      if (baseIdx > -1) {
        parsed.basename = parsed.path.slice(baseIdx + 1);
        parsed.dirname = parsed.path.slice(0, baseIdx);
      } else {
        parsed.basename = parsed.path;
        parsed.dirname = '';
      }
    }
    parsed.params = {};
    if (parsed.query) {
      _ref = parsed.query.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        _ref1 = param.split('='), name = _ref1[0], value = _ref1[1];
        parsed.params[decodeURIComponent(name)] = decodeURIComponent(value.replace(/\+/g, ' '));
      }
    }
    return parsed;
  };

  return URL;

})();

module.exports = URL;

});

;(function(window){
  var undef = {}['undefined']
  var e
  var isIO = false

  // Grab Faas before killing require().
  var Faas = require('javascripts/faas')
  // Load faas.ext.js extensions if available.
  try {
    require('javascripts/faas-ext')
  } catch (e) {}
  // Load faas.io.js extensions if available.
  try {
    require('javascripts/faas-io')
    isIO = true
  } catch (e) {}

  var FAAS_BACKUPS = window.FAAS_BACKUPS // Gets clobbered soon.
  // var GLOBAL_PROPS = FAAS_BACKUPS.GLOBAL_PROPS
  var RESTORE_NAMES = FAAS_BACKUPS.RESTORE_NAMES
  var RESTORES = FAAS_BACKUPS.RESTORES

  ////
  // Restore global state to original.
  ////
  if (isIO && window.jQuery && window.jQuery.noConflict) {
    window.jQuery.noConflict(true) // Don't clobber client jQuery or $.
  }
  var name
  for (var i = 0; i < RESTORE_NAMES.length; i++) {
    name = RESTORE_NAMES[i]
    if (RESTORES.hasOwnProperty(name)) {
      window[name] = RESTORES[name]
    }
    else if (window.hasOwnProperty(name)) {
      try {
        window[name] = undef
        delete window[name]
      }catch(e){}
    }
  }

  ////
  // 2014-12-18: Remove cleanup for IX.
  ////
  // ////
  // // Clean up any accidentally set global properties that aren't
  // // specifically identified.
  // ////
  // for (var k in window) {
  //   if (window.hasOwnProperty(k) && window[k] !== undef) {
  //     if (!GLOBAL_PROPS[k]) {
  //       try { // Don't throw errors if any of the below aren't supported.
  //         // jQuery.noConflict() doesn't delete the global variables :(.
  //         if (k !== '$' && k !== 'jQuery') {
  //           console.log('Global scope variable leak, cleaning up: '+k+', type: '+(typeof window[k]))
  //         }
  //         window[k] = undef
  //         delete window[k]
  //       }catch(e){}
  //     }
  //   }
  // }

  ////
  // Set window.Faas.
  ////
  var Faas_conflict = window.Faas
  window.Faas = Faas
  window.Faas.CONFLICT = Faas_conflict

}(window))
;

;Faas.ixDefiner.setExports({"Api":{"exports":{"isFunc":false,"atts":{"V0":{"isFunc":false,"atts":{"Activity":{"isFunc":false,"atts":{"user_activity":{"isFunc":true}}},"App":{"isFunc":false,"atts":{"get_config":{"isFunc":true},"get_upgrade_info":{"isFunc":true},"send_user_feedback":{"isFunc":true}}},"Auth":{"isFunc":false,"atts":{"login":{"isFunc":true},"get_share_with_colleague_messages":{"isFunc":true},"check_patient":{"isFunc":true},"create_patient":{"isFunc":true},"create_provider":{"isFunc":true}}},"Device":{"isFunc":false,"atts":{"register_ios":{"isFunc":true},"register_device":{"isFunc":true},"get_current_badge_number":{"isFunc":true}}},"Messaging":{"isFunc":false,"atts":{"get_provider_patients":{"isFunc":true},"send_message_to_patient":{"isFunc":true},"get_patient_conversation":{"isFunc":true},"get_attachment_url":{"isFunc":true}}}}}}}}});