(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,66857,e=>{e.q("/almaymoda/_next/static/media/ort.bundle.min.1hgk-3aon9oz_.mjs")},96756,e=>{"use strict";var t,r,i,a,n,s,o,u,l,d,p,c,h,f,m,g,y,_,$,b,v,w,x,S,k,T,I,C,E,z,A,O={get url(){return e.F("node_modules/onnxruntime-web/dist/ort.bundle.min.mjs")},env:{DEV:!1,PROD:!0,MODE:"production",BASE_URL:"/almaymoda/",SSR:!1}},R=Object.defineProperty,B=Object.getOwnPropertyDescriptor,N=Object.getOwnPropertyNames,M=Object.prototype.hasOwnProperty,D=e.z,P=(e,t)=>()=>(e&&(t=e(e=0)),t),U=(e,t)=>{for(var r in t)R(e,r,{get:t[r],enumerable:!0})},W=e=>((e,t,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of N(t))M.call(e,i)||void 0===i||R(e,i,{get:()=>t[i],enumerable:!(r=B(t,i))||r.enumerable});return e})(R({},"__esModule",{value:!0}),e),q=P(()=>{t=new Map,r=[],i=(e,i,a)=>{if(i&&"function"==typeof i.init&&"function"==typeof i.createInferenceSessionHandler){let n=t.get(e);if(void 0===n)t.set(e,{backend:i,priority:a});else{if(n.priority>a)return;if(n.priority===a&&n.backend!==i)throw Error(`cannot register backend "${e}" using priority ${a}`)}if(a>=0){let i=r.indexOf(e);-1!==i&&r.splice(i,1);for(let i=0;i<r.length;i++)if(t.get(r[i]).priority<=a)return void r.splice(i,0,e);r.push(e)}return}throw TypeError("not a valid backend")},a=async e=>{let r=t.get(e);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let t=!!r.initPromise;try{return t||(r.initPromise=r.backend.init(e)),await r.initPromise,r.initialized=!0,r.backend}catch(e){return t||(r.error=`${e}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},n=async e=>{let t=e.executionProviders||[],i=t.map(e=>"string"==typeof e?e:e.name),n=0===i.length?r:i,s,o=[],u=new Set;for(let e of n){let t=await a(e);"string"==typeof t?o.push({name:e,err:t}):(s||(s=t),s===t&&u.add(e))}if(!s)throw Error(`no available backend found. ERR: ${o.map(e=>`[${e.name}] ${e.err}`).join(", ")}`);for(let{name:e,err:t}of o)i.includes(e)&&console.warn(`removing requested execution provider "${e}" from session options because it is not available: ${t}`);let l=t.filter(e=>u.has("string"==typeof e?e:e.name));return[s,new Proxy(e,{get:(e,t)=>"executionProviders"===t?l:Reflect.get(e,t)})]}}),L=P(()=>{q()}),V=P(()=>{s="1.21.0"}),G=P(()=>{V(),o="warning",Object.defineProperty(u={wasm:{},webgl:{},webgpu:{},versions:{common:s},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);o=e}},get logLevel(){return o}},"logLevel",{enumerable:!0})}),H=P(()=>{G(),l=u}),F=P(()=>{d=(e,t)=>{let r="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(null!=i){let a,n;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,l;void 0===o||void 0===o.mean?u=[255,255,255,255]:"number"==typeof o.mean?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],void 0!==o.mean[3]&&(u[3]=o.mean[3])),void 0===o||void 0===o.bias?l=[0,0,0,0]:"number"==typeof o.bias?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],void 0!==o.bias[3]&&(l[3]=o.bias[3]));let d=n*a,p=0,c=d,h=2*d,f=-1;"RGBA"===s?(p=0,c=d,h=2*d,f=3*d):"RGB"===s?(p=0,c=d,h=2*d):"RBG"===s&&(p=0,h=d,c=2*d);for(let t=0;t<n;t++)for(let r=0;r<a;r++)i.fillStyle="rgba("+(e.data[p++]-l[0])*u[0]+","+(e.data[c++]-l[1])*u[1]+","+(e.data[h++]-l[2])*u[2]+","+(-1===f?255:(e.data[f++]-l[3])*u[3])+")",i.fillRect(r,t,1,1);if("toDataURL"in r)return r.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},p=(e,t)=>{let r="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(null!=r){let a,n,s;t?.tensorLayout!==void 0&&"NHWC"===t.tensorLayout?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let o=void 0!==t&&void 0!==t.format?t.format:"RGB",u=t?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=n*a;if(void 0!==t&&(void 0!==t.format&&4===s&&"RGBA"!==t.format||3===s&&"RGB"!==t.format&&"BGR"!==t.format))throw Error("Tensor format doesn't match input tensor dims");let c=0,h=1,f=2,m=3,g=0,y=p,_=2*p,$=-1;"RGBA"===o?(g=0,y=p,_=2*p,$=3*p):"RGB"===o?(g=0,y=p,_=2*p):"RBG"===o&&(g=0,_=p,y=2*p),i=r.createImageData(a,n);for(let t=0;t<n*a;c+=4,h+=4,f+=4,m+=4,t++)i.data[c]=(e.data[g++]-d[0])*l[0],i.data[h]=(e.data[y++]-d[1])*l[1],i.data[f]=(e.data[_++]-d[2])*l[2],i.data[m]=-1===$?255:(e.data[$++]-d[3])*l[3]}else throw Error("Can not access image data");return i}}),j=P(()=>{Z(),c=(e,t)=>{if(void 0===e)throw Error("Image buffer must be defined");if(void 0===t.height||void 0===t.width)throw Error("Image height and width must be defined");if("NHWC"===t.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;n="number"==typeof a.mean?[a.mean,a.mean,a.mean,a.mean]:[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],s="number"==typeof a.bias?[a.bias,a.bias,a.bias,a.bias]:[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=void 0!==t.format?t.format:"RGBA",u=void 0!==t.tensorFormat&&void 0!==t.tensorFormat?t.tensorFormat:"RGB",l=r*i,d=new Float32Array("RGBA"===u?4*l:3*l),p=4,c=0,h=1,f=2,m=3,g=0,y=l,_=2*l,$=-1;"RGB"===o&&(p=3,c=0,h=1,f=2,m=-1),"RGBA"===u?$=3*l:"RBG"===u?(g=0,_=l,y=2*l):"BGR"===u&&(_=0,y=l,g=2*l);for(let t=0;t<l;t++,c+=p,f+=p,h+=p,m+=p)d[g++]=(e[c]+s[0])/n[0],d[y++]=(e[h]+s[1])/n[1],d[_++]=(e[f]+s[2])/n[2],-1!==$&&-1!==m&&(d[$++]=(e[m]+s[3])/n[3]);return"RGBA"===u?new S("float32",d,[1,4,r,i]):new S("float32",d,[1,3,r,i])},h=async(e,t)=>{let r="u">typeof HTMLImageElement&&e instanceof HTMLImageElement,i="u">typeof ImageData&&e instanceof ImageData,a="u">typeof ImageBitmap&&e instanceof ImageBitmap,n="string"==typeof e,s,o=t??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},l=e=>"u">typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||e instanceof OffscreenCanvas?e.getContext("2d"):null;if(r){let r=u();r.width=e.width,r.height=e.height;let i=l(r);if(null!=i){let r=e.height,a=e.width;if(void 0!==t&&void 0!==t.resizedHeight&&void 0!==t.resizedWidth&&(r=t.resizedHeight,a=t.resizedWidth),void 0!==t){if(o=t,void 0!==t.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=r,o.width=a}else o.tensorFormat="RGBA",o.height=r,o.width=a;i.drawImage(e,0,0),s=i.getImageData(0,0,a,r).data}else throw Error("Can not access image data")}else if(i){let r,i;if(void 0!==t&&void 0!==t.resizedWidth&&void 0!==t.resizedHeight?(r=t.resizedHeight,i=t.resizedWidth):(r=e.height,i=e.width),void 0!==t&&(o=t),o.format="RGBA",o.height=r,o.width=i,void 0!==t){let t=u();t.width=i,t.height=r;let a=l(t);if(null!=a)a.putImageData(e,0,0),s=a.getImageData(0,0,i,r).data;else throw Error("Can not access image data")}else s=e.data}else if(a){if(void 0===t)throw Error("Please provide image config with format for Imagebitmap");let r=u();r.width=e.width,r.height=e.height;let i=l(r);if(null!=i){let t=e.height,r=e.width;return i.drawImage(e,0,0,r,t),s=i.getImageData(0,0,r,t).data,o.height=t,o.width=r,c(s,o)}throw Error("Can not access image data")}else{if(n)return new Promise((t,r)=>{let i=u(),a=l(i);if(!e||!a)return r();let n=new Image;n.crossOrigin="Anonymous",n.src=e,n.onload=()=>{i.width=n.width,i.height=n.height,a.drawImage(n,0,0,i.width,i.height);let e=a.getImageData(0,0,i.width,i.height);o.height=i.height,o.width=i.width,t(c(e.data,o))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==s)return c(s,o);throw Error("Input data provided is not supported - aborted tensor creation")},f=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t;return new S({location:"texture",type:"float32",texture:e,dims:[1,i,r,4],download:a,dispose:n})},m=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new S({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},g=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new S({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},y=(e,t,r)=>new S({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),K=P(()=>{_=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),$=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),b=!1,v=()=>{if(!b){b=!0;let e="u">typeof BigInt64Array&&BigInt64Array.from,t="u">typeof BigUint64Array&&BigUint64Array.from,r=globalThis.Float16Array,i="u">typeof r&&r.from;e&&(_.set("int64",BigInt64Array),$.set(BigInt64Array,"int64")),t&&(_.set("uint64",BigUint64Array),$.set(BigUint64Array,"uint64")),i?(_.set("float16",r),$.set(r,"float16")):_.set("float16",Uint16Array)}}}),Q=P(()=>{Z(),w=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if("number"!=typeof i||!Number.isSafeInteger(i))throw TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},x=(e,t)=>{switch(e.location){case"cpu":return new S(e.type,e.data,t);case"cpu-pinned":return new S({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new S({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new S({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new S({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Z=P(()=>{F(),j(),K(),Q(),S=class{constructor(e,t,r){let i,a;if(v(),"object"==typeof e&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let t=_.get(i);if(!t)throw TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof t))throw TypeError(`buffer should be of type ${t.name}`);this.cpuData=e.data;break}case"texture":if("float32"!==i)throw TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break;case"gpu-buffer":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break;case"ml-tensor":if("float32"!==i&&"float16"!==i&&"int32"!==i&&"int64"!==i&&"uint32"!==i&&"uint64"!==i&&"int8"!==i&&"uint8"!==i&&"bool"!==i&&"uint4"!==i&&"int4"!==i)throw TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,s;if("string"==typeof e)if(i=e,s=r,"string"===e){if(!Array.isArray(t))throw TypeError("A string tensor's data must be a string array.");n=t}else{let r=_.get(e);if(void 0===r)throw TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if("float16"===e&&r===Uint16Array||"uint4"===e||"int4"===e)throw TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${r.name} as data.`);n="uint64"===e||"int64"===e?r.from(t,BigInt):r.from(t)}else if(t instanceof r)n=t;else if(t instanceof Uint8ClampedArray)if("uint8"===e)n=Uint8Array.from(t);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===e&&t instanceof Uint16Array&&r!==Uint16Array)n=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw TypeError(`A ${i} tensor's data must be type of ${r}`)}else if(s=t,Array.isArray(e)){if(0===e.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let t=typeof e[0];if("string"===t)i="string",n=e;else if("boolean"===t)i="bool",n=Uint8Array.from(e);else throw TypeError(`Invalid element type of data array: ${t}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",n=Uint8Array.from(e);else{let t=$.get(e.constructor);if(void 0===t)throw TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=t,n=e}if(void 0===s)s=[n.length];else if(!Array.isArray(s))throw TypeError("A tensor's dims must be a number array");a=s,this.cpuData=n,this.dataLocation="cpu"}let n=w(a);if(this.cpuData&&n!==this.cpuData.length&&("uint4"!==i&&"int4"!==i||Math.ceil(n/2)!==this.cpuData.length))throw Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return h(e,t)}static fromTexture(e,t){return f(e,t)}static fromGpuBuffer(e,t){return m(e,t)}static fromMLTensor(e,t){return g(e,t)}static fromPinnedBuffer(e,t,r){return y(e,t,r)}toDataURL(e){return d(this,e)}toImageData(e){return p(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return x(this,e)}}}),X=P(()=>{Z(),k=S}),Y=P(()=>{G(),T=(e,t)=>{(typeof u.trace>"u"?u.wasm.trace:u.trace)&&console.timeStamp(`${e}::ORT::${t}`)},I=(e,t)=>{let r=Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(i+=`::${t}`),T("CPU",i);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},C=e=>{(typeof u.trace>"u"?u.wasm.trace:u.trace)&&I("BEGIN",e)},E=e=>{(typeof u.trace>"u"?u.wasm.trace:u.trace)&&I("END",e)}}),J=P(()=>{q(),X(),Y(),z=class e{constructor(e){this.handler=e}async run(e,t,r){C();let i={},a={};if("object"!=typeof e||null===e||e instanceof k||Array.isArray(e))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if("object"==typeof t){if(null===t)throw TypeError("Unexpected argument[1]: cannot be null.");if(t instanceof k)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(t)){if(0===t.length)throw TypeError("'fetches' cannot be an empty array.");for(let e of(n=!1,t)){if("string"!=typeof e)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(e))throw RangeError(`'fetches' contains invalid output name: ${e}.`);i[e]=null}if("object"==typeof r&&null!==r)a=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else{let e=!1,s=Object.getOwnPropertyNames(t);for(let r of this.outputNames)if(-1!==s.indexOf(r)){let a=t[r];(null===a||a instanceof k)&&(e=!0,n=!1,i[r]=a)}if(e){if("object"==typeof r&&null!==r)a=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else a=t}}else if("u">typeof t)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let t of this.inputNames)if(typeof e[t]>"u")throw Error(`input '${t}' is missing in 'feeds'.`);if(n)for(let e of this.outputNames)i[e]=null;let s=await this.handler.run(e,i,a),o={};for(let e in s)if(Object.hasOwnProperty.call(s,e)){let t=s[e];t instanceof k?o[e]=t:o[e]=new k(t.type,t.data,t.dims)}return E(),o}async release(){return this.handler.dispose()}static async create(t,r,i,a){C();let s,o={};if("string"==typeof t){if(s=t,"object"==typeof r&&null!==r)o=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,"object"==typeof r&&null!==r)o=r;else if("u">typeof r)throw TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&t instanceof SharedArrayBuffer){let e=0,n=t.byteLength;if("object"==typeof r&&null!==r)o=r;else if("number"==typeof r){if(!Number.isSafeInteger(e=r))throw RangeError("'byteOffset' must be an integer.");if(e<0||e>=t.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${t.byteLength}).`);if(n=t.byteLength-e,"number"==typeof i){if(!Number.isSafeInteger(n=i))throw RangeError("'byteLength' must be an integer.");if(n<=0||e+n>t.byteLength)throw RangeError(`'byteLength' is out of range (0, ${t.byteLength-e}].`);if("object"==typeof a&&null!==a)o=a;else if("u">typeof a)throw TypeError("'options' must be an object.")}else if("u">typeof i)throw TypeError("'byteLength' must be a number.")}else if("u">typeof r)throw TypeError("'options' must be an object.");s=new Uint8Array(t,e,n)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await n(o),d=await u.createInferenceSessionHandler(s,l);return E(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),ee=P(()=>{J(),A=z}),et=P(()=>{}),er=P(()=>{}),ei=P(()=>{}),ea=P(()=>{}),en={};U(en,{InferenceSession:()=>A,TRACE:()=>T,TRACE_FUNC_BEGIN:()=>C,TRACE_FUNC_END:()=>E,Tensor:()=>k,env:()=>l,registerBackend:()=>i});var es=P(()=>{L(),H(),ee(),X(),et(),er(),Y(),ei(),ea()}),eo=P(()=>{}),eu={};U(eu,{default:()=>ed});var el,ed,ep=P(()=>{sj(),nn(),na(),(el=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":ez(r.wasm).then(()=>{sm(r).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})})},e=>{postMessage({type:t,err:e})});break;case"init-ep":{let{epName:e,env:i}=r;sg(i,e).then(()=>{postMessage({type:t})},e=>{postMessage({type:t,err:e})});break}case"copy-from":{let{buffer:e}=r,i=s_(e);postMessage({type:t,out:i});break}case"create":{let{model:e,options:i}=r;s$(e,i).then(e=>{postMessage({type:t,out:e})},e=>{postMessage({type:t,err:e})});break}case"release":sb(r),postMessage({type:t});break;case"run":{let{sessionId:e,inputIndices:i,inputs:a,outputIndices:n,options:s}=r;sw(e,i,a,n,Array(n.length).fill(null),s).then(e=>{e.some(e=>"cpu"!==e[3])?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:e},sS([...a,...e]))},e=>{postMessage({type:t,err:e})});break}case"end-profiling":sx(r),postMessage({type:t})}}catch(e){postMessage({type:t,err:e})}}),ed=el?null:e=>new Worker(e??ey,{type:"module",name:"ort-wasm-proxy-worker"})}),ec={};U(ec,{default:()=>em});var eh,ef,em,eg,ey,e_,e$,eb,ev,ew,ex,eS,ek,eT,eI,eC,eE,ez,eA,eO,eR,eB,eN,eM,eD,eP,eU,eW,eq,eL,eV,eG,eH,eF,ej,eK,eQ,eZ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e9,e7,te,tt,tr,ti,ta,tn,ts,to,tu,tl,td,tp,tc,th,tf,tm,tg,ty,t_,t$,tb,tv,tw,tx,tS,tk,tT,tI,tC,tE,tz,tA,tO,tR,tB,tN,tM,tD,tP,tU,tW,tq,tL,tV,tG,tH,tF,tj,tK,tQ,tZ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t9,t7,re,rt,rr,ri,ra,rn,rs,ro,ru,rl,rd,rp,rc,rh,rf,rm,rg,ry,r_,r$,rb,rv,rw,rx,rS,rk,rT,rI,rC,rE,rz,rA,rO,rR,rB,rN,rM,rD,rP,rU,rW,rq,rL,rV,rG,rH,rF,rj,rK,rQ,rZ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r9,r7,ie,it,ir,ii,ia,is,io,iu,il,id,ip,ic,ih,im,ig,iy,i_,i$,ib,iv,iw,ix,iS,ik,iT,iI,iC,iE,iz,iA,iO,iR,iB,iN,iM,iD,iP,iU,iW,iq,iL,iV,iG,iH,iF,ij,iK,iQ,iZ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i9,i7,ae,at,ar,ai,aa,an,as,ao,au,al,ad,ap,ac,ah,af,am,ag,ay,a_,a$,ab,av,aw,ax,aS,ak,aT,aI,aC,aE,az,aA,aO,aR,aB,aN,aM,aD,aP,aU,aW,aq,aL,aV,aG,aH,aF,aj,aK,aQ,aZ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a9,a7,ne,nt,nr,ni=P(()=>{eh=O.url,em=ef=async function(t={}){var r,i,a=new Promise((e,t)=>{r=e,i=t}),n="object"==typeof window,s="u">typeof WorkerGlobalScope,o=s&&self.name?.startsWith("em-pthread");t.mountExternalData=(e,r)=>{e.startsWith("./")&&(e=e.substring(2)),(t.Bd||(t.Bd=new Map)).set(e,r)},t.unmountExternalData=()=>{delete t.Bd};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let l=()=>{let e=(e,t,r)=>(...i)=>{let a=tW,n=t?.();i=e(...i);let s=t?.();return n!==s&&(e=s,r(n),t=r=null),tW!=a?new Promise((e,t)=>{tF={resolve:e,reject:t}}):i},r=e=>async(...r)=>{try{if(t.Cd)throw Error("Session already started");let i=t.Cd={be:r[0],errors:[]},a=await e(...r);if(t.Cd!==i)throw Error("Session mismatch");t.Dd?.flush();let n=i.errors;if(0<n.length){let e=await Promise.all(n);if(e=e.filter(e=>e),0<e.length)throw Error(e.join(`
`))}return a}finally{t.Cd=null}};t._OrtCreateSession=e(t._OrtCreateSession,()=>t._OrtCreateSession,e=>t._OrtCreateSession=e),t._OrtRun=r(e(t._OrtRun,()=>t._OrtRun,e=>t._OrtRun=e)),t._OrtRunWithBinding=r(e(t._OrtRunWithBinding,()=>t._OrtRunWithBinding,e=>t._OrtRunWithBinding=e)),t._OrtBindInput=e(t._OrtBindInput,()=>t._OrtBindInput,e=>t._OrtBindInput=e),l=void 0};t.jsepInit=(e,r)=>{if(l?.(),"webgpu"===e){[t.Dd,t.Rd,t.Vd,t.Hd,t.Ud,t.hc,t.Wd,t.Zd,t.Sd,t.Td,t.Xd]=r;let e=t.Dd;t.jsepRegisterBuffer=(t,r,i,a)=>e.registerBuffer(t,r,i,a),t.jsepGetBuffer=t=>e.getBuffer(t),t.jsepCreateDownloader=(t,r,i)=>e.createDownloader(t,r,i),t.jsepOnCreateSession=t=>{e.onCreateSession(t)},t.jsepOnReleaseSession=t=>{e.onReleaseSession(t)},t.jsepOnRunStart=t=>e.onRunStart(t),t.$d=(t,r)=>{e.upload(t,r)}}else if("webnn"===e){[t.Dd,t.Yd,t.Id,t.jsepEnsureTensor,t.Jd,t.jsepDownloadTensor]=r,t.jsepReleaseTensorId=t.Id,t.jsepUploadTensor=t.Jd;let e=t.Dd;t.jsepOnRunStart=t=>e.onRunStart(t),t.jsepOnRunEnd=e.onRunEnd.bind(e),t.jsepRegisterMLContext=(t,r)=>{e.registerMLContext(t,r)},t.jsepOnReleaseSession=t=>{e.onReleaseSession(t)},t.jsepCreateMLTensorDownloader=(t,r)=>e.createMLTensorDownloader(t,r),t.jsepRegisterMLTensor=(t,r,i,a)=>e.registerMLTensor(t,r,i,a),t.jsepCreateMLContext=t=>e.createMLContext(t),t.jsepRegisterMLConstant=(r,i,a,n,s)=>e.registerMLConstant(r,i,a,n,s,t.Bd),t.jsepRegisterGraphInput=e.registerGraphInput.bind(e),t.jsepIsGraphInput=e.isGraphInput.bind(e),t.jsepCreateTemporaryTensor=e.createTemporaryTensor.bind(e)}};var d,p,c=Object.assign({},t),h=(e,t)=>{throw t},f="";(n||s)&&(s?f=self.location.href:"u">typeof document&&document.currentScript&&(f=document.currentScript.src),eh&&(f=eh),f=f.startsWith("blob:")?"":f.slice(0,f.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(p=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),d=async e=>{if(N(e))return new Promise((t,r)=>{var i=new XMLHttpRequest;i.open("GET",e,!0),i.responseType="arraybuffer",i.onload=()=>{200==i.status||0==i.status&&i.response?t(i.response):r(i.status)},i.onerror=r,i.send(null)});var t=await fetch(e,{credentials:"same-origin"});if(t.ok)return t.arrayBuffer();throw Error(t.status+" : "+t.url)});var m=console.log.bind(console),g=console.error.bind(console),y=m,_=g;Object.assign(t,c),c=null;var $,b,v,w,x,S,k,T,I,C,E,z,A,R=t.wasmBinary,B=!1,N=e=>e.startsWith("file://");function M(){return $.buffer!=w.buffer&&F(),w}function D(){return $.buffer!=w.buffer&&F(),x}function P(){return $.buffer!=w.buffer&&F(),S}function U(){return $.buffer!=w.buffer&&F(),k}function W(){return $.buffer!=w.buffer&&F(),T}function q(){return $.buffer!=w.buffer&&F(),I}function L(){return $.buffer!=w.buffer&&F(),C}function V(){return $.buffer!=w.buffer&&F(),A}if(o){let e=function(r){try{var i=r.data,a=i.yd;if("load"===a){let r=[];for(let a of(self.onmessage=e=>r.push(e),self.startWorker=()=>{for(let t of(postMessage({yd:"loaded"}),r))e(t);self.onmessage=e},i.Od))t[a]&&!t[a].proxy||(t[a]=(...e)=>{postMessage({yd:"callHandler",Nd:a,args:e})},"print"==a&&(y=t[a]),"printErr"==a&&(_=t[a]));$=i.he,F(),G(i.ie)}else if("run"===a){ev(i.xd),r1(i.xd,0,0,1,0,0),e_(),tT(i.xd),H||(rX(),H=!0);try{ew(i.de,i.Fd)}catch(e){if("unwind"!=e)throw e}}else"setimmediate"!==i.target&&("checkMailbox"===a?H&&tI():a&&(_(`worker: received unknown command ${a}`),_(i)))}catch(e){throw r2(),e}};var G,H=!1;_=function(...e){console.error(e=e.join(" "))},self.alert=function(...e){postMessage({yd:"alert",text:e.join(" "),fe:rY()})},self.onunhandledrejection=e=>{throw e.reason||e},self.onmessage=e}function F(){var e=$.buffer;t.HEAP8=w=new Int8Array(e),t.HEAP16=S=new Int16Array(e),t.HEAPU8=x=new Uint8Array(e),t.HEAPU16=k=new Uint16Array(e),t.HEAP32=T=new Int32Array(e),t.HEAPU32=I=new Uint32Array(e),t.HEAPF32=C=new Float32Array(e),t.HEAPF64=A=new Float64Array(e),t.HEAP64=E=new BigInt64Array(e),t.HEAPU64=z=new BigUint64Array(e)}function j(){o?startWorker(t):rK.Bb()}o||($=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),F());var K,Q=0,Z=null;function X(){if(0==--Q&&Z){var e=Z;Z=null,e()}}function Y(e){throw _(e="Aborted("+e+")"),B=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),i(e),e}function J(){return{a:{Ta:er,Va:et,W:eS,la:eT,b:ez,u:eA,R:eO,Za:eR,d:eB,pb:eM,g:eC,T:eW,Ga:eq,lb:eG,nb:eH,Ha:eF,Ea:ej,wb:eK,Da:eQ,pa:eZ,mb:eX,jb:eY,Fa:eJ,kb:e0,Ma:e3,za:te,eb:tr,cb:td,ya:tp,V:tc,N:th,db:tf,ma:tw,fb:tx,zb:tS,hb:tC,qb:tz,ab:tA,Aa:tO,yb:tT,Ja:tR,S:tM,Wa:tD,$:tQ,G:tX,E:t0,m:tn,H:t2,B:t4,X:t6,J:t8,v:t5,O:t9,D:t7,t:re,A:rt,z:rr,w:ri,r:ra,tb:rn,ub:rl,vb:rd,rb:rp,sb:rc,bb:rm,Oa:rg,La:r_,y:rv,ja:rw,Ba:rx,Ka:ry,qa:rS,Ia:rk,ib:rT,U:rf,fa:rI,Sa:rC,gb:rE,Qa:rR,Pa:rB,Ab:rP,Ca:rU,ob:ep,aa:rW,oa:rq,xb:rL,na:rG,$a:a_,ia:aA,sa:aM,ga:ag,da:aS,ua:aB,p:af,e:i9,c:i8,ea:aw,f:i7,n:at,k:ad,Y:ai,ka:ap,j:am,wa:av,Ra:aU,ca:aE,Ua:aP,P:ax,K:an,_:aC,Q:ay,Z:aO,x:aa,l:i5,va:aI,i:i6,h:ar,ra:aD,ta:aN,o:ae,q:as,s:au,I:al,C:ah,L:ac,xa:ab,_a:a$,F:az,Ya:ak,ba:aR,M:ao,Xa:aT,ha:rH,a:$,Na:el}}}var ee={1319426:()=>"u">typeof wasmOffsetConverter,1319483:(e,r,i,a,n)=>{if(void 0===t||!t.Bd)return 1;if((e=eU(Number(e>>>0))).startsWith("./")&&(e=e.substring(2)),!(e=t.Bd.get(e)))return 2;if(r=Number(r>>>0),i=Number(i>>>0),a=Number(a>>>0),r+i>e.byteLength)return 3;try{let s=e.subarray(r,r+i);switch(n){case 0:D().set(s,a>>>0);break;case 1:t.$d(a,s);break;default:return 4}return 0}catch{return 4}},1320198:(e,r,i)=>{t.Jd(e,D().subarray(r>>>0,r+i>>>0))},1320261:()=>t.Yd(),1320302:e=>{t.Id(e)},1320338:()=>{t.Sd()},1320369:()=>{t.Td()},1320398:()=>{t.Xd()},1320423:e=>t.Rd(e),1320456:e=>t.Vd(e),1320488:(e,r,i)=>{t.Hd(Number(e),Number(r),Number(i),!0)},1320551:(e,r,i)=>{t.Hd(Number(e),Number(r),Number(i))},1320608:e=>{t.hc("Abs",e,void 0)},1320659:e=>{t.hc("Neg",e,void 0)},1320710:e=>{t.hc("Floor",e,void 0)},1320763:e=>{t.hc("Ceil",e,void 0)},1320815:e=>{t.hc("Reciprocal",e,void 0)},1320873:e=>{t.hc("Sqrt",e,void 0)},1320925:e=>{t.hc("Exp",e,void 0)},1320976:e=>{t.hc("Erf",e,void 0)},1321027:e=>{t.hc("Sigmoid",e,void 0)},1321082:(e,r,i)=>{t.hc("HardSigmoid",e,{alpha:r,beta:i})},1321161:e=>{t.hc("Log",e,void 0)},1321212:e=>{t.hc("Sin",e,void 0)},1321263:e=>{t.hc("Cos",e,void 0)},1321314:e=>{t.hc("Tan",e,void 0)},1321365:e=>{t.hc("Asin",e,void 0)},1321417:e=>{t.hc("Acos",e,void 0)},1321469:e=>{t.hc("Atan",e,void 0)},1321521:e=>{t.hc("Sinh",e,void 0)},1321573:e=>{t.hc("Cosh",e,void 0)},1321625:e=>{t.hc("Asinh",e,void 0)},1321678:e=>{t.hc("Acosh",e,void 0)},1321731:e=>{t.hc("Atanh",e,void 0)},1321784:e=>{t.hc("Tanh",e,void 0)},1321836:e=>{t.hc("Not",e,void 0)},1321887:(e,r,i)=>{t.hc("Clip",e,{min:r,max:i})},1321956:e=>{t.hc("Clip",e,void 0)},1322008:(e,r)=>{t.hc("Elu",e,{alpha:r})},1322066:e=>{t.hc("Gelu",e,void 0)},1322118:e=>{t.hc("Relu",e,void 0)},1322170:(e,r)=>{t.hc("LeakyRelu",e,{alpha:r})},1322234:(e,r)=>{t.hc("ThresholdedRelu",e,{alpha:r})},1322304:(e,r)=>{t.hc("Cast",e,{to:r})},1322362:e=>{t.hc("Add",e,void 0)},1322413:e=>{t.hc("Sub",e,void 0)},1322464:e=>{t.hc("Mul",e,void 0)},1322515:e=>{t.hc("Div",e,void 0)},1322566:e=>{t.hc("Pow",e,void 0)},1322617:e=>{t.hc("Equal",e,void 0)},1322670:e=>{t.hc("Greater",e,void 0)},1322725:e=>{t.hc("GreaterOrEqual",e,void 0)},1322787:e=>{t.hc("Less",e,void 0)},1322839:e=>{t.hc("LessOrEqual",e,void 0)},1322898:(e,r,i,a,n)=>{t.hc("ReduceMean",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1323073:(e,r,i,a,n)=>{t.hc("ReduceMax",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1323247:(e,r,i,a,n)=>{t.hc("ReduceMin",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1323421:(e,r,i,a,n)=>{t.hc("ReduceProd",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1323596:(e,r,i,a,n)=>{t.hc("ReduceSum",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1323770:(e,r,i,a,n)=>{t.hc("ReduceL1",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1323943:(e,r,i,a,n)=>{t.hc("ReduceL2",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1324116:(e,r,i,a,n)=>{t.hc("ReduceLogSum",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1324293:(e,r,i,a,n)=>{t.hc("ReduceSumSquare",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1324473:(e,r,i,a,n)=>{t.hc("ReduceLogSumExp",e,{keepDims:!!r,noopWithEmptyAxes:!!i,axes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1324653:e=>{t.hc("Where",e,void 0)},1324706:(e,r,i)=>{t.hc("Transpose",e,{perm:r?Array.from(W().subarray(Number(r)>>>0,Number(i)>>>0)):[]})},1324830:(e,r,i,a)=>{t.hc("DepthToSpace",e,{blocksize:r,mode:eU(i),format:a?"NHWC":"NCHW"})},1324963:(e,r,i,a)=>{t.hc("DepthToSpace",e,{blocksize:r,mode:eU(i),format:a?"NHWC":"NCHW"})},1325096:(e,r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{t.hc("ConvTranspose",e,{format:l?"NHWC":"NCHW",autoPad:r,dilations:[i],group:a,kernelShape:[n],pads:[s,o],strides:[u],wIsConst:()=>!!M()[d>>>0],outputPadding:p?Array.from(W().subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from(W().subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eU(m)})},1325529:(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>{t.hc("ConvTranspose",e,{format:u?"NHWC":"NCHW",autoPad:r,dilations:Array.from(W().subarray(Number(i)>>>0,2+(Number(i)>>>0)>>>0)),group:a,kernelShape:Array.from(W().subarray(Number(n)>>>0,2+(Number(n)>>>0)>>>0)),pads:Array.from(W().subarray(Number(s)>>>0,4+(Number(s)>>>0)>>>0)),strides:Array.from(W().subarray(Number(o)>>>0,2+(Number(o)>>>0)>>>0)),wIsConst:()=>!!M()[l>>>0],outputPadding:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],outputShape:c?Array.from(W().subarray(Number(c)>>>0,Number(h)>>>0)):[],activation:eU(f)})},1326190:(e,r,i,a,n,s,o,u,l,d,p,c,h,f,m)=>{t.hc("ConvTranspose",e,{format:l?"NHWC":"NCHW",autoPad:r,dilations:[i],group:a,kernelShape:[n],pads:[s,o],strides:[u],wIsConst:()=>!!M()[d>>>0],outputPadding:p?Array.from(W().subarray(Number(p)>>>0,Number(c)>>>0)):[],outputShape:h?Array.from(W().subarray(Number(h)>>>0,Number(f)>>>0)):[],activation:eU(m)})},1326623:(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>{t.hc("ConvTranspose",e,{format:u?"NHWC":"NCHW",autoPad:r,dilations:Array.from(W().subarray(Number(i)>>>0,2+(Number(i)>>>0)>>>0)),group:a,kernelShape:Array.from(W().subarray(Number(n)>>>0,2+(Number(n)>>>0)>>>0)),pads:Array.from(W().subarray(Number(s)>>>0,4+(Number(s)>>>0)>>>0)),strides:Array.from(W().subarray(Number(o)>>>0,2+(Number(o)>>>0)>>>0)),wIsConst:()=>!!M()[l>>>0],outputPadding:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],outputShape:c?Array.from(W().subarray(Number(c)>>>0,Number(h)>>>0)):[],activation:eU(f)})},1327284:(e,r)=>{t.hc("GlobalAveragePool",e,{format:r?"NHWC":"NCHW"})},1327375:(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>{t.hc("AveragePool",e,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:i,count_include_pad:a,storage_order:n,dilations:s?Array.from(W().subarray(Number(s)>>>0,Number(o)>>>0)):[],kernel_shape:u?Array.from(W().subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(W().subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1327854:(e,r)=>{t.hc("GlobalAveragePool",e,{format:r?"NHWC":"NCHW"})},1327945:(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>{t.hc("AveragePool",e,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:i,count_include_pad:a,storage_order:n,dilations:s?Array.from(W().subarray(Number(s)>>>0,Number(o)>>>0)):[],kernel_shape:u?Array.from(W().subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(W().subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1328424:(e,r)=>{t.hc("GlobalMaxPool",e,{format:r?"NHWC":"NCHW"})},1328511:(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>{t.hc("MaxPool",e,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:i,count_include_pad:a,storage_order:n,dilations:s?Array.from(W().subarray(Number(s)>>>0,Number(o)>>>0)):[],kernel_shape:u?Array.from(W().subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(W().subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1328986:(e,r)=>{t.hc("GlobalMaxPool",e,{format:r?"NHWC":"NCHW"})},1329073:(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>{t.hc("MaxPool",e,{format:f?"NHWC":"NCHW",auto_pad:r,ceil_mode:i,count_include_pad:a,storage_order:n,dilations:s?Array.from(W().subarray(Number(s)>>>0,Number(o)>>>0)):[],kernel_shape:u?Array.from(W().subarray(Number(u)>>>0,Number(l)>>>0)):[],pads:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],strides:c?Array.from(W().subarray(Number(c)>>>0,Number(h)>>>0)):[]})},1329548:(e,r,i,a,n)=>{t.hc("Gemm",e,{alpha:r,beta:i,transA:a,transB:n})},1329652:e=>{t.hc("MatMul",e,void 0)},1329706:(e,r,i,a)=>{t.hc("ArgMax",e,{keepDims:!!r,selectLastIndex:!!i,axis:a})},1329814:(e,r,i,a)=>{t.hc("ArgMin",e,{keepDims:!!r,selectLastIndex:!!i,axis:a})},1329922:(e,r)=>{t.hc("Softmax",e,{axis:r})},1329985:(e,r)=>{t.hc("Concat",e,{axis:r})},1330045:(e,r,i,a,n)=>{t.hc("Split",e,{axis:r,numOutputs:i,splitSizes:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1330201:e=>{t.hc("Expand",e,void 0)},1330255:(e,r)=>{t.hc("Gather",e,{axis:Number(r)})},1330326:(e,r)=>{t.hc("GatherElements",e,{axis:Number(r)})},1330405:(e,r)=>{t.hc("GatherND",e,{batch_dims:Number(r)})},1330484:(e,r,i,a,n,s,o,u,l,d,p)=>{t.hc("Resize",e,{antialias:r,axes:i?Array.from(W().subarray(Number(i)>>>0,Number(a)>>>0)):[],coordinateTransformMode:eU(n),cubicCoeffA:s,excludeOutside:o,extrapolationValue:u,keepAspectRatioPolicy:eU(l),mode:eU(d),nearestMode:eU(p)})},1330846:(e,r,i,a,n,s,o)=>{t.hc("Slice",e,{starts:r?Array.from(W().subarray(Number(r)>>>0,Number(i)>>>0)):[],ends:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[],axes:s?Array.from(W().subarray(Number(s)>>>0,Number(o)>>>0)):[]})},1331110:e=>{t.hc("Tile",e,void 0)},1331162:(e,r,i)=>{t.hc("InstanceNormalization",e,{epsilon:r,format:i?"NHWC":"NCHW"})},1331276:(e,r,i)=>{t.hc("InstanceNormalization",e,{epsilon:r,format:i?"NHWC":"NCHW"})},1331390:e=>{t.hc("Range",e,void 0)},1331443:(e,r)=>{t.hc("Einsum",e,{equation:eU(r)})},1331524:(e,r,i,a,n)=>{t.hc("Pad",e,{mode:r,value:i,pads:a?Array.from(W().subarray(Number(a)>>>0,Number(n)>>>0)):[]})},1331667:(e,r,i,a,n,s)=>{t.hc("BatchNormalization",e,{epsilon:r,momentum:i,spatial:!!n,trainingMode:!!a,format:s?"NHWC":"NCHW"})},1331836:(e,r,i,a,n,s)=>{t.hc("BatchNormalization",e,{epsilon:r,momentum:i,spatial:!!n,trainingMode:!!a,format:s?"NHWC":"NCHW"})},1332005:(e,r,i)=>{t.hc("CumSum",e,{exclusive:Number(r),reverse:Number(i)})},1332102:(e,r,i)=>{t.hc("DequantizeLinear",e,{axis:r,blockSize:i})},1332192:(e,r,i,a,n)=>{t.hc("GridSample",e,{align_corners:r,mode:eU(i),padding_mode:eU(a),format:n?"NHWC":"NCHW"})},1332362:(e,r,i,a,n)=>{t.hc("GridSample",e,{align_corners:r,mode:eU(i),padding_mode:eU(a),format:n?"NHWC":"NCHW"})},1332532:(e,r)=>{t.hc("ScatterND",e,{reduction:eU(r)})},1332617:(e,r,i,a,n,s,o,u,l)=>{t.hc("Attention",e,{numHeads:r,isUnidirectional:i,maskFilterValue:a,scale:n,doRotary:s,qkvHiddenSizes:o?Array.from(W().subarray(Number(u)>>>0,Number(u)+o>>>0)):[],pastPresentShareBuffer:!!l})},1332889:e=>{t.hc("BiasAdd",e,void 0)},1332944:e=>{t.hc("BiasSplitGelu",e,void 0)},1333005:e=>{t.hc("FastGelu",e,void 0)},1333061:(e,r,i,a,n,s,o,u,l,d,p,c,h,f,m,g)=>{t.hc("Conv",e,{format:c?"NHWC":"NCHW",auto_pad:r,dilations:i?Array.from(W().subarray(Number(i)>>>0,Number(a)>>>0)):[],group:n,kernel_shape:s?Array.from(W().subarray(Number(s)>>>0,Number(o)>>>0)):[],pads:u?Array.from(W().subarray(Number(u)>>>0,Number(l)>>>0)):[],strides:d?Array.from(W().subarray(Number(d)>>>0,Number(p)>>>0)):[],w_is_const:()=>!!M()[Number(h)>>>0],activation:eU(f),activation_params:m?Array.from(L().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1333645:e=>{t.hc("Gelu",e,void 0)},1333697:(e,r,i,a,n,s,o,u,l)=>{t.hc("GroupQueryAttention",e,{numHeads:r,kvNumHeads:i,scale:a,softcap:n,doRotary:s,rotaryInterleaved:o,smoothSoftmax:u,localWindowSize:l})},1333914:(e,r,i,a)=>{t.hc("LayerNormalization",e,{axis:r,epsilon:i,simplified:!!a})},1334025:(e,r,i,a)=>{t.hc("LayerNormalization",e,{axis:r,epsilon:i,simplified:!!a})},1334136:(e,r,i,a,n,s)=>{t.hc("MatMulNBits",e,{k:r,n:i,accuracyLevel:a,bits:n,blockSize:s})},1334263:(e,r,i,a,n,s)=>{t.hc("MultiHeadAttention",e,{numHeads:r,isUnidirectional:i,maskFilterValue:a,scale:n,doRotary:s})},1334422:(e,r)=>{t.hc("QuickGelu",e,{alpha:r})},1334486:(e,r,i,a,n)=>{t.hc("RotaryEmbedding",e,{interleaved:!!r,numHeads:i,rotaryEmbeddingDim:a,scale:n})},1334625:(e,r,i)=>{t.hc("SkipLayerNormalization",e,{epsilon:r,simplified:!!i})},1334727:(e,r,i)=>{t.hc("SkipLayerNormalization",e,{epsilon:r,simplified:!!i})},1334829:(e,r,i,a)=>{t.hc("GatherBlockQuantized",e,{gatherAxis:r,quantizeAxis:i,blockSize:a})},1334950:e=>{t.Wd(e)},1334984:(e,r)=>t.Zd(Number(e),Number(r),t.Cd.be,t.Cd.errors)};function et(e,r,i){return tK(async()=>{await t.Ud(Number(e),Number(r),Number(i))})}function er(){return"u">typeof wasmOffsetConverter}class ei{name="ExitStatus";constructor(e){this.message=`Program terminated with exit(${e})`,this.status=e}}var ea=e=>{e.terminate(),e.onmessage=()=>{}},en=[],es=e=>{0==ec.length&&(eb(),e$(ec[0]));var t=ec.pop();if(!t)return 6;ef.push(t),eg[e.xd]=t,t.xd=e.xd;var r={yd:"run",de:e.ce,Fd:e.Fd,xd:e.xd};return t.postMessage(r,e.Ld),0},eo=0,eu=(e,t,...r)=>{for(var i=2*r.length,a=ii(),n=ir(8*i),s=n>>>3,o=0;o<r.length;o++){var u=r[o];"bigint"==typeof u?(E[s+2*o]=1n,E[s+2*o+1]=u):(E[s+2*o]=0n,V()[s+2*o+1>>>0]=u)}return e=r3(e,0,i,n,t),it(a),e};function el(e){if(o)return eu(0,1,e);if(v=e,!(0<eo)){for(var t of ef)ea(t);for(t of ec)ea(t);ec=[],ef=[],eg={},B=!0}h(0,new ei(e))}function ed(e){if(o)return eu(1,0,e);ep(e)}var ep=e=>{if(v=e,o)throw ed(e),"unwind";el(e)},ec=[],ef=[],em=[],eg={},ey=e=>{var t=e.xd;delete eg[t],ec.push(e),ef.splice(ef.indexOf(e),1),e.xd=0,r4(t)};function e_(){em.forEach(e=>e())}var e$=e=>new Promise(r=>{e.onmessage=i=>{var a=(i=i.data).yd;if(i.Ed&&i.Ed!=rY()){var n=eg[i.Ed];n?n.postMessage(i,i.Ld):_(`Internal error! Worker sent a message "${a}" to target pthread ${i.Ed}, but that thread no longer exists!`)}else"checkMailbox"===a?tI():"spawnThread"===a?es(i):"cleanupThread"===a?ey(eg[i.ee]):"loaded"===a?(e.loaded=!0,r(e)):"alert"===a?alert(`Thread ${i.fe}: ${i.text}`):"setimmediate"===i.target?e.postMessage(i):"callHandler"===a?t[i.Nd](...i.args):a&&_(`worker sent an unknown command ${a}`)},e.onerror=e=>{throw _(`worker sent an error! ${e.filename}:${e.lineno}: ${e.message}`),e};var i,a=[];for(i of[])t.propertyIsEnumerable(i)&&a.push(i);e.postMessage({yd:"load",Od:a,he:$,ie:b})});function eb(){var t=new Worker(O.url.startsWith("file:")?new e.U(e.r(66857)):new URL(O.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ec.push(t)}var ev=e=>{F();var t=q()[e+52>>>2>>>0];e=q()[e+56>>>2>>>0],ie(t,t-e),it(t)},ew=(e,t)=>{eo=0,e=ip(e,t),0<eo?v=e:r6(e)},ex=[];function eS(e){var t=new eI(e>>>=0);if(0==M()[t.wd+12>>>0]){var r=1;M()[t.wd+12>>>0]=r}return r=0,M()[t.wd+13>>>0]=r,ex.push(t),is(e),iu(e)}var ek=0,eT=()=>{r9(0,0);var e=ex.pop();ia(e.Gd),ek=0};class eI{constructor(e){this.Gd=e,this.wd=e-24}}function eC(e){throw ek||=e>>>0}var eE=e=>{var t=ek;if(!t)return r7(0),0;var r=new eI(t);q()[r.wd+16>>>2>>>0]=t;var i=q()[r.wd+4>>>2>>>0];if(!i)return r7(0),t;for(var a of e){if(0===a||a===i)break;if(io(a,i,r.wd+16))return r7(a),t}return r7(i),t};function ez(){return eE([])}function eA(e){return eE([e>>>0])}function eO(e,t){return eE([e>>>0,t>>>0])}var eR=()=>{var e=ex.pop();e||Y("no exception to throw");var t=e.Gd;if(0==M()[e.wd+13>>>0]){ex.push(e);var r=1;M()[e.wd+13>>>0]=r,r=0,M()[e.wd+12>>>0]=r}throw ek=t};function eB(e,t,r){var i=new eI(e>>>=0);throw t>>>=0,r>>>=0,q()[i.wd+16>>>2>>>0]=0,q()[i.wd+4>>>2>>>0]=t,q()[i.wd+8>>>2>>>0]=r,ek=e}function eN(e,t,r,i){return o?eu(2,1,e,t,r,i):eM(e,t,r,i)}function eM(e,t,r,i){if(e>>>=0,r>>>=0,i>>>=0,void 0===u)return 6;var a=[];return o&&0===a.length?eN(e,t>>>=0,r,i):(e={ce:r,xd:e,Fd:i,Ld:a},o?(e.yd="spawnThread",postMessage(e,a),0):es(e))}var eD="u">typeof TextDecoder?new TextDecoder:void 0,eP=(e,t=0,r=0/0)=>{var i=(t>>>=0)+r;for(r=t;e[r]&&!(r>=i);)++r;if(16<r-t&&e.buffer&&eD)return eD.decode(e.buffer instanceof ArrayBuffer?e.subarray(t,r):e.slice(t,r));for(i="";t<r;){var a=e[t++];if(128&a){var n=63&e[t++];if((224&a)==192)i+=String.fromCharCode((31&a)<<6|n);else{var s=63&e[t++];65536>(a=(240&a)==224?(15&a)<<12|n<<6|s:(7&a)<<18|n<<12|s<<6|63&e[t++])?i+=String.fromCharCode(a):(a-=65536,i+=String.fromCharCode(55296|a>>10,56320|1023&a))}}else i+=String.fromCharCode(a)}return i},eU=(e,t)=>(e>>>=0)?eP(D(),e,t):"";function eW(e,t,r){return o?eu(3,1,e,t,r):0}function eq(e,t){if(o)return eu(4,1,e,t)}var eL=e=>{for(var t=0,r=0;r<e.length;++r){var i=e.charCodeAt(r);127>=i?t++:2047>=i?t+=2:55296<=i&&57343>=i?(t+=4,++r):t+=3}return t},eV=(e,t,r)=>{var i=D();if(t>>>=0,0<r){var a=t;r=t+r-1;for(var n=0;n<e.length;++n){var s=e.charCodeAt(n);if(55296<=s&&57343>=s&&(s=65536+((1023&s)<<10)|1023&e.charCodeAt(++n)),127>=s){if(t>=r)break;i[t++>>>0]=s}else{if(2047>=s){if(t+1>=r)break;i[t++>>>0]=192|s>>6}else{if(65535>=s){if(t+2>=r)break;i[t++>>>0]=224|s>>12}else{if(t+3>=r)break;i[t++>>>0]=240|s>>18,i[t++>>>0]=128|s>>12&63}i[t++>>>0]=128|s>>6&63}i[t++>>>0]=128|63&s}}i[t>>>0]=0,e=t-a}else e=0;return e};function eG(e,t){if(o)return eu(5,1,e,t)}function eH(e,t,r){if(o)return eu(6,1,e,t,r)}function eF(e,t,r){return o?eu(7,1,e,t,r):0}function ej(e,t){if(o)return eu(8,1,e,t)}function eK(e,t,r){if(o)return eu(9,1,e,t,r)}function eQ(e,t,r,i){if(o)return eu(10,1,e,t,r,i)}function eZ(e,t,r,i){if(o)return eu(11,1,e,t,r,i)}function eX(e,t,r,i){if(o)return eu(12,1,e,t,r,i)}function eY(e){if(o)return eu(13,1,e)}function eJ(e,t){if(o)return eu(14,1,e,t)}function e0(e,t,r){if(o)return eu(15,1,e,t,r)}var e1,e2,e3=()=>Y(""),e4=e=>{for(var t="";D()[e>>>0];)t+=e1[D()[e++>>>0]];return t},e6={},e8={},e5={};function e9(e,t,r={}){return function(e,t,r={}){var i=t.name;if(!e)throw new e2(`type "${i}" must have a positive integer typeid pointer`);if(e8.hasOwnProperty(e)){if(r.Pd)return;throw new e2(`Cannot register type '${i}' twice`)}e8[e]=t,delete e5[e],e6.hasOwnProperty(e)&&(t=e6[e],delete e6[e],t.forEach(e=>e()))}(e,t,r)}var e7=(e,t,r)=>{switch(t){case 1:return r?e=>M()[e>>>0]:e=>D()[e>>>0];case 2:return r?e=>P()[e>>>1>>>0]:e=>U()[e>>>1>>>0];case 4:return r?e=>W()[e>>>2>>>0]:e=>q()[e>>>2>>>0];case 8:return r?e=>E[e>>>3]:e=>z[e>>>3];default:throw TypeError(`invalid integer width (${t}): ${e}`)}};function te(e,t,r){r>>>=0,e9(e>>>=0,{name:t=e4(t>>>0),fromWireType:e=>e,toWireType:function(e,t){if("bigint"!=typeof t&&"number"!=typeof t)throw t=null===t?"null":"object"==(e=typeof t)||"array"===e||"function"===e?t.toString():""+t,TypeError(`Cannot convert "${t}" to ${this.name}`);return"number"==typeof t&&(t=BigInt(t)),t},zd:tt,readValueFromPointer:e7(t,r,-1==t.indexOf("u")),Ad:null})}var tt=8;function tr(e,t,r,i){e9(e>>>=0,{name:t=e4(t>>>0),fromWireType:function(e){return!!e},toWireType:function(e,t){return t?r:i},zd:tt,readValueFromPointer:function(e){return this.fromWireType(D()[e>>>0])},Ad:null})}var ti=[],ta=[];function tn(e){9<(e>>>=0)&&0==--ta[e+1]&&(ta[e]=void 0,ti.push(e))}var ts=e=>{if(!e)throw new e2("Cannot use deleted val. handle = "+e);return ta[e]},to=e=>{switch(e){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let t=ti.pop()||ta.length;return ta[t]=e,ta[t+1]=1,t}};function tu(e){return this.fromWireType(q()[e>>>2>>>0])}var tl={name:"emscripten::val",fromWireType:e=>{var t=ts(e);return tn(e),t},toWireType:(e,t)=>to(t),zd:8,readValueFromPointer:tu,Ad:null};function td(e){return e9(e>>>0,tl)}function tp(e,t,r){r>>>=0,e9(e>>>=0,{name:t=e4(t>>>0),fromWireType:e=>e,toWireType:(e,t)=>t,zd:tt,readValueFromPointer:((e,t)=>{switch(t){case 4:return function(e){return this.fromWireType(L()[e>>>2>>>0])};case 8:return function(e){return this.fromWireType(V()[e>>>3>>>0])};default:throw TypeError(`invalid float width (${t}): ${e}`)}})(t,r),Ad:null})}function tc(e,t,r,i,a){if(e>>>=0,r>>>=0,t=e4(t>>>0),-1===a&&(a=0xffffffff),a=e=>e,0===i){var n=32-8*r;a=e=>e<<n>>>n}var s=t.includes("unsigned")?function(e,t){return t>>>0}:function(e,t){return t};e9(e,{name:t,fromWireType:a,toWireType:s,zd:tt,readValueFromPointer:e7(t,r,0!==i),Ad:null})}function th(e,t,r){function i(e){var t=q()[e>>>2>>>0];return e=q()[e+4>>>2>>>0],new a(M().buffer,e,t)}var a=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][t];e9(e>>>=0,{name:r=e4(r>>>0),fromWireType:i,zd:tt,readValueFromPointer:i},{Pd:!0})}function tf(e,t){e9(e>>>=0,{name:t=e4(t>>>0),fromWireType:function(e){for(var t,r=q()[e>>>2>>>0],i=e+4,a=i,n=0;n<=r;++n){var s=i+n;n!=r&&0!=D()[s>>>0]||(a=eU(a,s-a),void 0===t?t=a:(t+="\0",t+=a),a=s+1)}return rJ(e),t},toWireType:function(e,t){t instanceof ArrayBuffer&&(t=new Uint8Array(t));var r="string"==typeof t;if(!(r||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int8Array))throw new e2("Cannot pass non-string to std::string");var i=r?eL(t):t.length,a=r0(4+i+1),n=a+4;if(q()[a>>>2>>>0]=i,r)eV(t,n,i+1);else if(r)for(r=0;r<i;++r){var s=t.charCodeAt(r);if(255<s)throw rJ(a),new e2("String has UTF-16 code units that do not fit in 8 bits");D()[n+r>>>0]=s}else for(r=0;r<i;++r)D()[n+r>>>0]=t[r];return null!==e&&e.push(rJ,a),a},zd:tt,readValueFromPointer:tu,Ad(e){rJ(e)}})}var tm="u">typeof TextDecoder?new TextDecoder("utf-16le"):void 0,tg=(e,t)=>{for(var r=e>>1,i=r+t/2;!(r>=i)&&U()[r>>>0];)++r;if(32<(r<<=1)-e&&tm)return tm.decode(D().slice(e,r));for(r="",i=0;!(i>=t/2);++i){var a=P()[e+2*i>>>1>>>0];if(0==a)break;r+=String.fromCharCode(a)}return r},ty=(e,t,r)=>{if(2>(r??=0x7fffffff))return 0;var i=t;r=(r-=2)<2*e.length?r/2:e.length;for(var a=0;a<r;++a){var n=e.charCodeAt(a);P()[t>>>1>>>0]=n,t+=2}return P()[t>>>1>>>0]=0,t-i},t_=e=>2*e.length,t$=(e,t)=>{for(var r=0,i="";!(r>=t/4);){var a=W()[e+4*r>>>2>>>0];if(0==a)break;++r,65536<=a?(a-=65536,i+=String.fromCharCode(55296|a>>10,56320|1023&a)):i+=String.fromCharCode(a)}return i},tb=(e,t,r)=>{if(t>>>=0,4>(r??=0x7fffffff))return 0;var i=t;r=i+r-4;for(var a=0;a<e.length;++a){var n=e.charCodeAt(a);if(55296<=n&&57343>=n&&(n=65536+((1023&n)<<10)|1023&e.charCodeAt(++a)),W()[t>>>2>>>0]=n,(t+=4)+4>r)break}return W()[t>>>2>>>0]=0,t-i},tv=e=>{for(var t=0,r=0;r<e.length;++r){var i=e.charCodeAt(r);55296<=i&&57343>=i&&++r,t+=4}return t};function tw(e,t,r){if(e>>>=0,t>>>=0,r=e4(r>>>=0),2===t)var i=tg,a=ty,n=t_,s=e=>U()[e>>>1>>>0];else 4===t&&(i=t$,a=tb,n=tv,s=e=>q()[e>>>2>>>0]);e9(e,{name:r,fromWireType:e=>{for(var r,a=q()[e>>>2>>>0],n=e+4,o=0;o<=a;++o){var u=e+4+o*t;o!=a&&0!=s(u)||(n=i(n,u-n),void 0===r?r=n:(r+="\0",r+=n),n=u+t)}return rJ(e),r},toWireType:(e,i)=>{if("string"!=typeof i)throw new e2(`Cannot pass non-string to C++ string type ${r}`);var s=n(i),o=r0(4+s+t);return q()[o>>>2>>>0]=s/t,a(i,o+4,s+t),null!==e&&e.push(rJ,o),o},zd:tt,readValueFromPointer:tu,Ad(e){rJ(e)}})}function tx(e,t){e9(e>>>=0,{Qd:!0,name:t=e4(t>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function tS(e){r1(e>>>0,!s,1,!n,131072,!1),e_()}var tk=e=>{if(!B)try{if(e(),!(0<eo))try{o?r6(v):ep(v)}catch(e){e instanceof ei||"unwind"==e||h(0,e)}}catch(e){e instanceof ei||"unwind"==e||h(0,e)}};function tT(e){e>>>=0,"function"==typeof Atomics.ge&&(Atomics.ge(W(),e>>>2,e).value.then(tI),e+=128,Atomics.store(W(),e>>>2,1))}var tI=()=>{var e=rY();e&&(tT(e),tk(r5))};function tC(e,t){(e>>>=0)==t>>>0?setTimeout(tI):o?postMessage({Ed:e,yd:"checkMailbox"}):(e=eg[e])&&e.postMessage({yd:"checkMailbox"})}var tE=[];function tz(e,t,r,i,a){for(t>>>=0,tE.length=i/=2,r=a>>>0>>>3,a=0;a<i;a++)tE[a]=E[r+2*a]?E[r+2*a+1]:V()[r+2*a+1>>>0];return(t?ee[t]:rQ[e])(...tE)}var tA=()=>{eo=0};function tO(e){e>>>=0,o?postMessage({yd:"cleanupThread",ee:e}):ey(eg[e])}function tR(e){}var tB=(e,t)=>{var r=e8[e];if(void 0===r)throw r=e4(e=rZ(e)),rJ(e),new e2(`${t} has unknown type ${r}`);return r},tN=(e,t,r)=>{var i=[];return e=e.toWireType(i,r),i.length&&(q()[t>>>2>>>0]=to(i)),e};function tM(e,t,r){return t>>>=0,r>>>=0,e=ts(e>>>0),tN(t=tB(t,"emval::as"),r,e)}function tD(e,t){return t>>>=0,e=ts(e>>>0),(t=tB(t,"emval::as")).toWireType(null,e)}var tP=e=>{try{e()}catch(e){Y(e)}},tU=0,tW=null,tq=0,tL=[],tV={},tG={},tH=0,tF=null,tj=[];function tK(e){return function(e){if(!B){if(0===tU){var t,r,i,a=!1,n=!1;e((e=0)=>{if(!B&&(tq=e,a=!0,n)){tU=2,tP(()=>i3(tW)),"u">typeof MainLoop&&MainLoop.Md&&MainLoop.resume(),e=!1;try{var t,r=(t=rK[tG[t=W()[tW+8>>>2>>>0]]],--eo,t())}catch(t){r=t,e=!0}var i=!1;if(!tW){var s=tF;s&&(tF=null,(e?s.reject:s.resolve)(r),i=!0)}if(e&&!i)throw r}}),n=!0,a||(tU=1,r=(t=r0(65548))+12,q()[t>>>2>>>0]=r,q()[t+4>>>2>>>0]=r+65536,void 0===(i=tV[r=tL[0]])&&(i=tH++,tV[r]=i,tG[i]=r),r=i,W()[t+8>>>2>>>0]=r,tW=t,"u">typeof MainLoop&&MainLoop.Md&&MainLoop.pause(),tP(()=>i1(tW)))}else 2===tU?(tU=0,tP(i4),rJ(tW),tW=null,tj.forEach(tk)):Y(`invalid state: ${tU}`);return tq}}(t=>{e().then(t)})}function tQ(e){return e>>>=0,tK(async()=>to(await ts(e)))}var tZ=[];function tX(e,t,r,i){return r>>>=0,i>>>=0,(e=tZ[e>>>0])(null,t=ts(t>>>0),r,i)}var tY={},tJ=e=>{var t=tY[e];return void 0===t?e4(e):t};function t0(e,t,r,i,a){return r>>>=0,i>>>=0,a>>>=0,(e=tZ[e>>>0])(t=ts(t>>>0),t[r=tJ(r)],i,a)}var t1=()=>"object"==typeof globalThis?globalThis:Function("return this")();function t2(e){return 0==(e>>>=0)?to(t1()):(e=tJ(e),to(t1()[e]))}var t3=(e,t)=>Object.defineProperty(t,"name",{value:e});function t4(e,t,r){var i,a,n=(t=((e,t)=>{for(var r=Array(e),i=0;i<e;++i)r[i]=tB(q()[t+4*i>>>2>>>0],"parameter "+i);return r})(e,t>>>0)).shift();e--;var s=`return function (obj, func, destructorsRef, args) {
`,o=0,u=[];0===r&&u.push("obj");for(var l=["retType"],d=[n],p=0;p<e;++p)u.push("arg"+p),l.push("argType"+p),d.push(t[p]),s+=`  var arg${p} = argType${p}.readValueFromPointer(args${o?"+"+o:""});
`,o+=t[p].zd;return s+=`  var rv = ${1===r?"new func":"func.call"}(${u.join(", ")});
`,n.Qd||(l.push("emval_returnValue"),d.push(tN),s+=`  return emval_returnValue(retType, destructorsRef, rv);
`),l.push(s+`};
`),e=(function(e){var t=Function;if(!(t instanceof Function))throw TypeError(`new_ called with constructor type ${typeof t} which is not a function`);var r=t3(t.name||"unknownFunctionName",function(){});return r.prototype=t.prototype,r=new r,(e=t.apply(r,e))instanceof Object?e:r})(l)(...d),i=t3(r=`methodCaller<(${t.map(e=>e.name).join(", ")}) => ${n.name}>`,e),a=tZ.length,tZ.push(i),a}function t6(e){return to(t[e=tJ(e>>>0)])}function t8(e,t){return t>>>=0,to((e=ts(e>>>0))[t=ts(t)])}function t5(e){9<(e>>>=0)&&(ta[e+1]+=1)}function t9(){return to([])}function t7(e){e=ts(e>>>0);for(var t=Array(e.length),r=0;r<e.length;r++)t[r]=e[r];return to(t)}function re(e){return to(tJ(e>>>0))}function rt(){return to({})}function rr(e){for(var t=ts(e>>>=0);t.length;){var r=t.pop();t.pop()(r)}tn(e)}function ri(e,t,r){t>>>=0,r>>>=0,e=ts(e>>>0),t=ts(t),r=ts(r),e[t]=r}function ra(e,t){return t>>>=0,to(e=(e=tB(e>>>0,"_emval_take_value")).readValueFromPointer(t))}function rn(e,t){e=-0x20000000000000>e||0x20000000000000<e?0/0:Number(e),t>>>=0,e=new Date(1e3*e),W()[t>>>2>>>0]=e.getUTCSeconds(),W()[t+4>>>2>>>0]=e.getUTCMinutes(),W()[t+8>>>2>>>0]=e.getUTCHours(),W()[t+12>>>2>>>0]=e.getUTCDate(),W()[t+16>>>2>>>0]=e.getUTCMonth(),W()[t+20>>>2>>>0]=e.getUTCFullYear()-1900,W()[t+24>>>2>>>0]=e.getUTCDay(),e=(e.getTime()-Date.UTC(e.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,W()[t+28>>>2>>>0]=e}var rs=e=>e%4==0&&(e%100!=0||e%400==0),ro=[0,31,60,91,121,152,182,213,244,274,305,335],ru=[0,31,59,90,120,151,181,212,243,273,304,334];function rl(e,t){e=-0x20000000000000>e||0x20000000000000<e?0/0:Number(e),t>>>=0,e=new Date(1e3*e),W()[t>>>2>>>0]=e.getSeconds(),W()[t+4>>>2>>>0]=e.getMinutes(),W()[t+8>>>2>>>0]=e.getHours(),W()[t+12>>>2>>>0]=e.getDate(),W()[t+16>>>2>>>0]=e.getMonth(),W()[t+20>>>2>>>0]=e.getFullYear()-1900,W()[t+24>>>2>>>0]=e.getDay();var r=(rs(e.getFullYear())?ro:ru)[e.getMonth()]+e.getDate()-1|0;W()[t+28>>>2>>>0]=r,W()[t+36>>>2>>>0]=-60*e.getTimezoneOffset(),r=new Date(e.getFullYear(),6,1).getTimezoneOffset();var i=new Date(e.getFullYear(),0,1).getTimezoneOffset();e=0|(r!=i&&e.getTimezoneOffset()==Math.min(i,r)),W()[t+32>>>2>>>0]=e}function rd(e){e>>>=0;var t=new Date(W()[e+20>>>2>>>0]+1900,W()[e+16>>>2>>>0],W()[e+12>>>2>>>0],W()[e+8>>>2>>>0],W()[e+4>>>2>>>0],W()[e>>>2>>>0],0),r=W()[e+32>>>2>>>0],i=t.getTimezoneOffset(),a=new Date(t.getFullYear(),6,1).getTimezoneOffset(),n=new Date(t.getFullYear(),0,1).getTimezoneOffset(),s=Math.min(n,a);return 0>r?W()[e+32>>>2>>>0]=+(a!=n&&s==i):0<r!=(s==i)&&(a=Math.max(n,a),t.setTime(t.getTime()+6e4*((0<r?s:a)-i))),W()[e+24>>>2>>>0]=t.getDay(),r=(rs(t.getFullYear())?ro:ru)[t.getMonth()]+t.getDate()-1|0,W()[e+28>>>2>>>0]=r,W()[e>>>2>>>0]=t.getSeconds(),W()[e+4>>>2>>>0]=t.getMinutes(),W()[e+8>>>2>>>0]=t.getHours(),W()[e+12>>>2>>>0]=t.getDate(),W()[e+16>>>2>>>0]=t.getMonth(),W()[e+20>>>2>>>0]=t.getYear(),BigInt(isNaN(e=t.getTime())?-1:e/1e3)}function rp(e,t,r,i,a,n,s){return o?eu(16,1,e,t,r,i,a,n,s):-52}function rc(e,t,r,i,a,n){if(o)return eu(17,1,e,t,r,i,a,n)}var rh={},rf=()=>performance.timeOrigin+performance.now();function rm(e,t){if(o)return eu(18,1,e,t);if(rh[e]&&(clearTimeout(rh[e].id),delete rh[e]),!t)return 0;var r=setTimeout(()=>{delete rh[e],tk(()=>r8(e,performance.timeOrigin+performance.now()))},t);return rh[e]={id:r,ke:t},0}function rg(e,t,r,i){e>>>=0,t>>>=0,r>>>=0,i>>>=0;var a=new Date().getFullYear(),n=new Date(a,0,1).getTimezoneOffset(),s=Math.max(n,a=new Date(a,6,1).getTimezoneOffset());q()[e>>>2>>>0]=60*s,W()[t>>>2>>>0]=+(n!=a),e=(t=e=>{var t=Math.abs(e);return`UTC${0<=e?"-":"+"}${String(Math.floor(t/60)).padStart(2,"0")}${String(t%60).padStart(2,"0")}`})(n),t=t(a),a<n?(eV(e,r,17),eV(t,i,17)):(eV(e,i,17),eV(t,r,17))}var ry=()=>Date.now();function r_(e,t,r){return 0<=e&&3>=e?(e=0===e?Date.now():performance.timeOrigin+performance.now(),E[r>>>0>>>3]=BigInt(Math.round(1e6*e)),0):28}var r$=[],rb=(e,t)=>{r$.length=0;for(var r;r=D()[e++>>>0];){var i=105!=r;t+=(i&=112!=r)&&t%8?4:0,r$.push(112==r?q()[t>>>2>>>0]:106==r?E[t>>>3]:105==r?W()[t>>>2>>>0]:V()[t>>>3>>>0]),t+=i?8:4}return r$};function rv(e,t,r){return e>>>=0,t=rb(t>>>0,r>>>0),ee[e](...t)}function rw(e,t,r){return e>>>=0,t=rb(t>>>0,r>>>0),ee[e](...t)}var rx=()=>{};function rS(e,t){return _(eU(e>>>0,t>>>0))}var rk=()=>{throw eo+=1,"unwind"};function rT(){return 0xffff0000}var rI=()=>navigator.hardwareConcurrency;function rC(){return Y("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function rE(e){e>>>=0;var t=D().length;if(e<=t||0xffff0000<e)return!1;for(var r=1;4>=r;r*=2){var i=t*(1+.2/r);i=Math.min(i,e+0x6000000);e:{i=(Math.min(0xffff0000,65536*Math.ceil(Math.max(e,i)/65536))-$.buffer.byteLength+65535)/65536|0;try{$.grow(i),F();var a=1;break e}catch{}a=void 0}if(a)return!0}return!1}var rz=()=>(Y("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),rA={},rO=e=>{e.forEach(e=>{var t=rz();t&&(rA[t]=e)})};function rR(){var e=Error().stack.toString().split(`
`);return"Error"==e[0]&&e.shift(),rO(e),rA.Kd=rz(),rA.ae=e,rA.Kd}function rB(e,t,r){if(e>>>=0,t>>>=0,rA.Kd==e)var i=rA.ae;else"Error"==(i=Error().stack.toString().split(`
`))[0]&&i.shift(),rO(i);for(var a=3;i[a]&&rz()!=e;)++a;for(e=0;e<r&&i[e+a];++e)W()[t+4*e>>>2>>>0]=rz();return e}var rN,rM={},rD=()=>{if(!rN){var e,t={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in rM)void 0===rM[e]?delete t[e]:t[e]=rM[e];var r=[];for(e in t)r.push(`${e}=${t[e]}`);rN=r}return rN};function rP(e,t){if(o)return eu(19,1,e,t);e>>>=0,t>>>=0;var r=0;return rD().forEach((i,a)=>{var n=t+r;for(a=q()[e+4*a>>>2>>>0]=n,n=0;n<i.length;++n)M()[a++>>>0]=i.charCodeAt(n);M()[a>>>0]=0,r+=i.length+1}),0}function rU(e,t){if(o)return eu(20,1,e,t);e>>>=0,t>>>=0;var r=rD();q()[e>>>2>>>0]=r.length;var i=0;return r.forEach(e=>i+=e.length+1),q()[t>>>2>>>0]=i,0}function rW(e){return o?eu(21,1,e):52}function rq(e,t,r,i){return o?eu(22,1,e,t,r,i):52}function rL(e,t,r,i){return o?eu(23,1,e,t,r,i):70}var rV=[null,[],[]];function rG(e,t,r,i){if(o)return eu(24,1,e,t,r,i);t>>>=0,r>>>=0,i>>>=0;for(var a=0,n=0;n<r;n++){var s=q()[t>>>2>>>0],u=q()[t+4>>>2>>>0];t+=8;for(var l=0;l<u;l++){var d=D()[s+l>>>0],p=rV[e];0===d||10===d?((1===e?y:_)(eP(p)),p.length=0):p.push(d)}a+=u}return q()[i>>>2>>>0]=a,0}function rH(e){return e>>>0}o||function(){for(var e=t.numThreads-1;e--;)eb();en.unshift(()=>{var e;Q++,e=()=>X(),o?e():Promise.all(ec.map(e$)).then(e)})}();for(var rF=Array(256),rj=0;256>rj;++rj)rF[rj]=String.fromCharCode(rj);e1=rF,e2=t.BindingError=class extends Error{constructor(e){super(e),this.name="BindingError"}},t.InternalError=class extends Error{constructor(e){super(e),this.name="InternalError"}},ta.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>ta.length/2-5-ti.length;var rK,rQ=[el,ed,eN,eW,eq,eG,eH,eF,ej,eK,eQ,eZ,eX,eY,eJ,e0,rp,rc,rm,rP,rU,rW,rq,rL,rG];!async function(){function r(e,t){var r,i,a;return rK=e.exports,r=rK=function(){var e={};for(let[t,r]of Object.entries(rK))e[t]="function"==typeof r?(...e)=>{tL.push(t);try{return r(...e)}finally{B||(tL.pop(),tW&&1===tU&&0===tL.length&&(tU=0,eo+=1,tP(i2),"u">typeof Fibers&&Fibers.le()))}}:r;return e}(),i=e=>t=>e(t)>>>0,a=e=>()=>e()>>>0,(r=Object.assign({},r)).Cb=i(r.Cb),r.fc=a(r.fc),r.ic=i(r.ic),r.vc=i(r.vc),r.wc=a(r.wc),r.Ac=i(r.Ac),rK=r,em.push(rK.jc),b=t,X(),rK}Q++;var a=J();if(t.instantiateWasm)return new Promise(e=>{t.instantiateWasm(a,(t,i)=>{r(t,i),e(t.exports)})});if(o)return new Promise(e=>{G=t=>{e(r(new WebAssembly.Instance(t,J()),t))}});K??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new e.U(e.r(36444)).href;try{var n=await async function(e){if(!R&&"function"==typeof WebAssembly.instantiateStreaming&&!N(K))try{var t=fetch(K,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(t,e)}catch(e){_(`wasm streaming compile failed: ${e}`),_("falling back to ArrayBuffer instantiation")}return async function(e,t){try{var r=await async function(e){if(!R)try{var t=await d(e);return new Uint8Array(t)}catch{}if(e==K&&R)e=new Uint8Array(R);else{if(!p)throw"both async and sync fetching of the wasm failed";e=p(e)}return e}(e);return await WebAssembly.instantiate(r,t)}catch(e){_(`failed to asynchronously prepare wasm: ${e}`),Y(e)}}(K,e)}(a);return r(n.instance,n.module)}catch(e){return i(e),Promise.reject(e)}}();var rZ=e=>(rZ=rK.Cb)(e),rX=()=>(rX=rK.Db)();t._OrtInit=(e,r)=>(t._OrtInit=rK.Eb)(e,r),t._OrtGetLastError=(e,r)=>(t._OrtGetLastError=rK.Fb)(e,r),t._OrtCreateSessionOptions=(e,r,i,a,n,s,o,u,l,d)=>(t._OrtCreateSessionOptions=rK.Gb)(e,r,i,a,n,s,o,u,l,d),t._OrtAppendExecutionProvider=(e,r)=>(t._OrtAppendExecutionProvider=rK.Hb)(e,r),t._OrtAddFreeDimensionOverride=(e,r,i)=>(t._OrtAddFreeDimensionOverride=rK.Ib)(e,r,i),t._OrtAddSessionConfigEntry=(e,r,i)=>(t._OrtAddSessionConfigEntry=rK.Jb)(e,r,i),t._OrtReleaseSessionOptions=e=>(t._OrtReleaseSessionOptions=rK.Kb)(e),t._OrtCreateSession=(e,r,i)=>(t._OrtCreateSession=rK.Lb)(e,r,i),t._OrtReleaseSession=e=>(t._OrtReleaseSession=rK.Mb)(e),t._OrtGetInputOutputCount=(e,r,i)=>(t._OrtGetInputOutputCount=rK.Nb)(e,r,i),t._OrtGetInputName=(e,r)=>(t._OrtGetInputName=rK.Ob)(e,r),t._OrtGetOutputName=(e,r)=>(t._OrtGetOutputName=rK.Pb)(e,r),t._OrtFree=e=>(t._OrtFree=rK.Qb)(e),t._OrtCreateTensor=(e,r,i,a,n,s)=>(t._OrtCreateTensor=rK.Rb)(e,r,i,a,n,s),t._OrtGetTensorData=(e,r,i,a,n)=>(t._OrtGetTensorData=rK.Sb)(e,r,i,a,n),t._OrtReleaseTensor=e=>(t._OrtReleaseTensor=rK.Tb)(e),t._OrtCreateRunOptions=(e,r,i,a)=>(t._OrtCreateRunOptions=rK.Ub)(e,r,i,a),t._OrtAddRunConfigEntry=(e,r,i)=>(t._OrtAddRunConfigEntry=rK.Vb)(e,r,i),t._OrtReleaseRunOptions=e=>(t._OrtReleaseRunOptions=rK.Wb)(e),t._OrtCreateBinding=e=>(t._OrtCreateBinding=rK.Xb)(e),t._OrtBindInput=(e,r,i)=>(t._OrtBindInput=rK.Yb)(e,r,i),t._OrtBindOutput=(e,r,i,a)=>(t._OrtBindOutput=rK.Zb)(e,r,i,a),t._OrtClearBoundOutputs=e=>(t._OrtClearBoundOutputs=rK._b)(e),t._OrtReleaseBinding=e=>(t._OrtReleaseBinding=rK.$b)(e),t._OrtRunWithBinding=(e,r,i,a,n)=>(t._OrtRunWithBinding=rK.ac)(e,r,i,a,n),t._OrtRun=(e,r,i,a,n,s,o,u)=>(t._OrtRun=rK.bc)(e,r,i,a,n,s,o,u),t._OrtEndProfiling=e=>(t._OrtEndProfiling=rK.cc)(e),t._JsepOutput=(e,r,i)=>(t._JsepOutput=rK.dc)(e,r,i),t._JsepGetNodeName=e=>(t._JsepGetNodeName=rK.ec)(e);var rY=()=>(rY=rK.fc)(),rJ=t._free=e=>(rJ=t._free=rK.gc)(e),r0=t._malloc=e=>(r0=t._malloc=rK.ic)(e),r1=(e,t,r,i,a,n)=>(r1=rK.kc)(e,t,r,i,a,n),r2=()=>(r2=rK.lc)(),r3=(e,t,r,i,a)=>(r3=rK.mc)(e,t,r,i,a),r4=e=>(r4=rK.nc)(e),r6=e=>(r6=rK.oc)(e),r8=(e,t)=>(r8=rK.pc)(e,t),r5=()=>(r5=rK.qc)(),r9=(e,t)=>(r9=rK.rc)(e,t),r7=e=>(r7=rK.sc)(e),ie=(e,t)=>(ie=rK.tc)(e,t),it=e=>(it=rK.uc)(e),ir=e=>(ir=rK.vc)(e),ii=()=>(ii=rK.wc)(),ia=e=>(ia=rK.xc)(e),is=e=>(is=rK.yc)(e),io=(e,t,r)=>(io=rK.zc)(e,t,r),iu=e=>(iu=rK.Ac)(e),il=t.dynCall_iii=(e,r,i)=>(il=t.dynCall_iii=rK.Bc)(e,r,i),id=t.dynCall_vi=(e,r)=>(id=t.dynCall_vi=rK.Cc)(e,r),ip=t.dynCall_ii=(e,r)=>(ip=t.dynCall_ii=rK.Dc)(e,r),ic=t.dynCall_vii=(e,r,i)=>(ic=t.dynCall_vii=rK.Ec)(e,r,i),ih=t.dynCall_iiii=(e,r,i,a)=>(ih=t.dynCall_iiii=rK.Fc)(e,r,i,a),im=t.dynCall_viii=(e,r,i,a)=>(im=t.dynCall_viii=rK.Gc)(e,r,i,a),ig=t.dynCall_iiiii=(e,r,i,a,n)=>(ig=t.dynCall_iiiii=rK.Hc)(e,r,i,a,n),iy=t.dynCall_viiii=(e,r,i,a,n)=>(iy=t.dynCall_viiii=rK.Ic)(e,r,i,a,n),i_=t.dynCall_viiiiii=(e,r,i,a,n,s,o)=>(i_=t.dynCall_viiiiii=rK.Jc)(e,r,i,a,n,s,o),i$=t.dynCall_viiiiiii=(e,r,i,a,n,s,o,u)=>(i$=t.dynCall_viiiiiii=rK.Kc)(e,r,i,a,n,s,o,u),ib=t.dynCall_ji=(e,r)=>(ib=t.dynCall_ji=rK.Lc)(e,r),iv=t.dynCall_v=e=>(iv=t.dynCall_v=rK.Mc)(e),iw=t.dynCall_viiiii=(e,r,i,a,n,s)=>(iw=t.dynCall_viiiii=rK.Nc)(e,r,i,a,n,s),ix=t.dynCall_i=e=>(ix=t.dynCall_i=rK.Oc)(e),iS=t.dynCall_fii=(e,r,i)=>(iS=t.dynCall_fii=rK.Pc)(e,r,i),ik=t.dynCall_viiiiiiii=(e,r,i,a,n,s,o,u,l)=>(ik=t.dynCall_viiiiiiii=rK.Qc)(e,r,i,a,n,s,o,u,l),iT=t.dynCall_viiiiiiiiii=(e,r,i,a,n,s,o,u,l,d,p)=>(iT=t.dynCall_viiiiiiiiii=rK.Rc)(e,r,i,a,n,s,o,u,l,d,p),iI=t.dynCall_jiii=(e,r,i,a)=>(iI=t.dynCall_jiii=rK.Sc)(e,r,i,a),iC=t.dynCall_dii=(e,r,i)=>(iC=t.dynCall_dii=rK.Tc)(e,r,i),iE=t.dynCall_viiiiiiiii=(e,r,i,a,n,s,o,u,l,d)=>(iE=t.dynCall_viiiiiiiii=rK.Uc)(e,r,i,a,n,s,o,u,l,d),iz=t.dynCall_viiiiiiiiiii=(e,r,i,a,n,s,o,u,l,d,p,c)=>(iz=t.dynCall_viiiiiiiiiii=rK.Vc)(e,r,i,a,n,s,o,u,l,d,p,c),iA=t.dynCall_iiiiii=(e,r,i,a,n,s)=>(iA=t.dynCall_iiiiii=rK.Wc)(e,r,i,a,n,s),iO=t.dynCall_iij=(e,r,i)=>(iO=t.dynCall_iij=rK.Xc)(e,r,i),iR=t.dynCall_iiiiiiiiii=(e,r,i,a,n,s,o,u,l,d)=>(iR=t.dynCall_iiiiiiiiii=rK.Yc)(e,r,i,a,n,s,o,u,l,d),iB=t.dynCall_iiiiiiiiiii=(e,r,i,a,n,s,o,u,l,d,p)=>(iB=t.dynCall_iiiiiiiiiii=rK.Zc)(e,r,i,a,n,s,o,u,l,d,p),iN=t.dynCall_vij=(e,r,i)=>(iN=t.dynCall_vij=rK._c)(e,r,i),iM=t.dynCall_iiif=(e,r,i,a)=>(iM=t.dynCall_iiif=rK.$c)(e,r,i,a),iD=t.dynCall_iiij=(e,r,i,a)=>(iD=t.dynCall_iiij=rK.ad)(e,r,i,a),iP=t.dynCall_fiii=(e,r,i,a)=>(iP=t.dynCall_fiii=rK.bd)(e,r,i,a),iU=t.dynCall_viiiiiiiiiiiii=(e,r,i,a,n,s,o,u,l,d,p,c,h,f)=>(iU=t.dynCall_viiiiiiiiiiiii=rK.cd)(e,r,i,a,n,s,o,u,l,d,p,c,h,f),iW=t.dynCall_vjiii=(e,r,i,a,n)=>(iW=t.dynCall_vjiii=rK.dd)(e,r,i,a,n),iq=t.dynCall_vif=(e,r,i)=>(iq=t.dynCall_vif=rK.ed)(e,r,i),iL=t.dynCall_iiiiiii=(e,r,i,a,n,s,o)=>(iL=t.dynCall_iiiiiii=rK.fd)(e,r,i,a,n,s,o),iV=t.dynCall_iiiij=(e,r,i,a,n)=>(iV=t.dynCall_iiiij=rK.gd)(e,r,i,a,n),iG=t.dynCall_iiiiiiii=(e,r,i,a,n,s,o,u)=>(iG=t.dynCall_iiiiiiii=rK.hd)(e,r,i,a,n,s,o,u),iH=t.dynCall_viiiiiiiiiiii=(e,r,i,a,n,s,o,u,l,d,p,c,h)=>(iH=t.dynCall_viiiiiiiiiiii=rK.id)(e,r,i,a,n,s,o,u,l,d,p,c,h),iF=t.dynCall_diii=(e,r,i,a)=>(iF=t.dynCall_diii=rK.jd)(e,r,i,a),ij=t.dynCall_jiiii=(e,r,i,a,n)=>(ij=t.dynCall_jiiii=rK.kd)(e,r,i,a,n),iK=t.dynCall_viiij=(e,r,i,a,n)=>(iK=t.dynCall_viiij=rK.ld)(e,r,i,a,n),iQ=t.dynCall_fiiii=(e,r,i,a,n)=>(iQ=t.dynCall_fiiii=rK.md)(e,r,i,a,n),iZ=t.dynCall_viiif=(e,r,i,a,n)=>(iZ=t.dynCall_viiif=rK.nd)(e,r,i,a,n),iX=t.dynCall_diiii=(e,r,i,a,n)=>(iX=t.dynCall_diiii=rK.od)(e,r,i,a,n),iY=t.dynCall_viiid=(e,r,i,a,n)=>(iY=t.dynCall_viiid=rK.pd)(e,r,i,a,n),iJ=t.dynCall_iiiijii=(e,r,i,a,n,s,o)=>(iJ=t.dynCall_iiiijii=rK.qd)(e,r,i,a,n,s,o),i0=t.dynCall_iiiiiij=(e,r,i,a,n,s,o)=>(i0=t.dynCall_iiiiiij=rK.rd)(e,r,i,a,n,s,o),i1=e=>(i1=rK.sd)(e),i2=()=>(i2=rK.td)(),i3=e=>(i3=rK.ud)(e),i4=()=>(i4=rK.vd)();function i6(e,t,r){var i=ii();try{ic(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function i8(e,t,r){var i=ii();try{return il(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function i5(e,t){var r=ii();try{id(e,t)}catch(e){if(it(r),e!==e+0)throw e;r9(1,0)}}function i9(e,t){var r=ii();try{return ip(e,t)}catch(e){if(it(r),e!==e+0)throw e;r9(1,0)}}function i7(e,t,r,i){var a=ii();try{return ih(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;r9(1,0)}}function ae(e,t,r,i,a){var n=ii();try{iy(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function at(e,t,r,i,a){var n=ii();try{return ig(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function ar(e,t,r,i){var a=ii();try{im(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;r9(1,0)}}function ai(e,t,r,i,a,n,s){var o=ii();try{return iL(e,t,r,i,a,n,s)}catch(e){if(it(o),e!==e+0)throw e;r9(1,0)}}function aa(e){var t=ii();try{iv(e)}catch(e){if(it(t),e!==e+0)throw e;r9(1,0)}}function an(e,t,r){var i=ii();try{return iO(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function as(e,t,r,i,a,n){var s=ii();try{iw(e,t,r,i,a,n)}catch(e){if(it(s),e!==e+0)throw e;r9(1,0)}}function ao(e,t,r){var i=ii();try{iN(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function au(e,t,r,i,a,n,s){var o=ii();try{i_(e,t,r,i,a,n,s)}catch(e){if(it(o),e!==e+0)throw e;r9(1,0)}}function al(e,t,r,i,a,n,s,o){var u=ii();try{i$(e,t,r,i,a,n,s,o)}catch(e){if(it(u),e!==e+0)throw e;r9(1,0)}}function ad(e,t,r,i,a,n){var s=ii();try{return iA(e,t,r,i,a,n)}catch(e){if(it(s),e!==e+0)throw e;r9(1,0)}}function ap(e,t,r,i,a,n,s,o){var u=ii();try{return iG(e,t,r,i,a,n,s,o)}catch(e){if(it(u),e!==e+0)throw e;r9(1,0)}}function ac(e,t,r,i,a,n,s,o,u,l){var d=ii();try{iE(e,t,r,i,a,n,s,o,u,l)}catch(e){if(it(d),e!==e+0)throw e;r9(1,0)}}function ah(e,t,r,i,a,n,s,o,u){var l=ii();try{ik(e,t,r,i,a,n,s,o,u)}catch(e){if(it(l),e!==e+0)throw e;r9(1,0)}}function af(e){var t=ii();try{return ix(e)}catch(e){if(it(t),e!==e+0)throw e;r9(1,0)}}function am(e,t,r,i,a,n,s,o,u,l){var d=ii();try{return iR(e,t,r,i,a,n,s,o,u,l)}catch(e){if(it(d),e!==e+0)throw e;r9(1,0)}}function ag(e,t,r){var i=ii();try{return iS(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function ay(e,t,r,i){var a=ii();try{return iI(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;return r9(1,0),0n}}function a_(e,t,r){var i=ii();try{return iC(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function a$(e,t,r,i,a,n,s,o,u,l,d,p){var c=ii();try{iz(e,t,r,i,a,n,s,o,u,l,d,p)}catch(e){if(it(c),e!==e+0)throw e;r9(1,0)}}function ab(e,t,r,i,a,n,s,o,u,l,d){var p=ii();try{iT(e,t,r,i,a,n,s,o,u,l,d)}catch(e){if(it(p),e!==e+0)throw e;r9(1,0)}}function av(e,t,r,i,a,n,s,o,u,l,d){var p=ii();try{return iB(e,t,r,i,a,n,s,o,u,l,d)}catch(e){if(it(p),e!==e+0)throw e;r9(1,0)}}function aw(e,t,r,i){var a=ii();try{return iM(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;r9(1,0)}}function ax(e,t,r,i){var a=ii();try{return iD(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;r9(1,0)}}function aS(e,t,r,i){var a=ii();try{return iP(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;r9(1,0)}}function ak(e,t,r,i,a,n,s,o,u,l,d,p,c,h){var f=ii();try{iU(e,t,r,i,a,n,s,o,u,l,d,p,c,h)}catch(e){if(it(f),e!==e+0)throw e;r9(1,0)}}function aT(e,t,r,i,a){var n=ii();try{iW(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function aI(e,t,r){var i=ii();try{iq(e,t,r)}catch(e){if(it(i),e!==e+0)throw e;r9(1,0)}}function aC(e,t){var r=ii();try{return ib(e,t)}catch(e){if(it(r),e!==e+0)throw e;return r9(1,0),0n}}function aE(e,t,r,i,a){var n=ii();try{return iV(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function az(e,t,r,i,a,n,s,o,u,l,d,p,c){var h=ii();try{iH(e,t,r,i,a,n,s,o,u,l,d,p,c)}catch(e){if(it(h),e!==e+0)throw e;r9(1,0)}}function aA(e,t,r,i){var a=ii();try{return iF(e,t,r,i)}catch(e){if(it(a),e!==e+0)throw e;r9(1,0)}}function aO(e,t,r,i,a){var n=ii();try{return ij(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;return r9(1,0),0n}}function aR(e,t,r,i,a){var n=ii();try{iK(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function aB(e,t,r,i,a){var n=ii();try{return iQ(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function aN(e,t,r,i,a){var n=ii();try{iZ(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function aM(e,t,r,i,a){var n=ii();try{return iX(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function aD(e,t,r,i,a){var n=ii();try{iY(e,t,r,i,a)}catch(e){if(it(n),e!==e+0)throw e;r9(1,0)}}function aP(e,t,r,i,a,n,s){var o=ii();try{return iJ(e,t,r,i,a,n,s)}catch(e){if(it(o),e!==e+0)throw e;r9(1,0)}}function aU(e,t,r,i,a,n,s){var o=ii();try{return i0(e,t,r,i,a,n,s)}catch(e){if(it(o),e!==e+0)throw e;r9(1,0)}}return t.stackSave=()=>ii(),t.stackRestore=e=>it(e),t.stackAlloc=e=>ir(e),t.setValue=function(e,t,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":case"i8":M()[e>>>0]=t;break;case"i16":P()[e>>>1>>>0]=t;break;case"i32":W()[e>>>2>>>0]=t;break;case"i64":E[e>>>3]=BigInt(t);break;case"float":L()[e>>>2>>>0]=t;break;case"double":V()[e>>>3>>>0]=t;break;case"*":q()[e>>>2>>>0]=t;break;default:Y(`invalid type for setValue: ${r}`)}},t.getValue=function(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":return M()[e>>>0];case"i16":return P()[e>>>1>>>0];case"i32":return W()[e>>>2>>>0];case"i64":return E[e>>>3];case"float":return L()[e>>>2>>>0];case"double":return V()[e>>>3>>>0];case"*":return q()[e>>>2>>>0];default:Y(`invalid type for getValue: ${t}`)}},t.UTF8ToString=eU,t.stringToUTF8=eV,t.lengthBytesUTF8=eL,function e(){if(0<Q)Z=e;else if(o)r(t),j();else{for(;0<en.length;)en.shift()(t);0<Q?Z=e:(t.calledRun=!0,B||(j(),r(t)))}}(),t.PTR_SIZE=4,a},globalThis.self?.name?.startsWith("em-pthread")&&ef()}),na=P(()=>{eo(),eg=typeof location>"u"?void 0:location.origin,ey=O.url?.startsWith("file:")?new URL(new e.U(e.r(66857)).href,eg).href:O.url,e_=()=>{if(ey&&!ey.startsWith("blob:"))return ey.substring(0,ey.lastIndexOf("/")+1)},e$=(e,t)=>{try{let r=t??ey;return(r?new URL(e,r):new URL(e)).origin===eg}catch{return!1}},eb=async e=>{let t=await (await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ev=async e=>(await import(e)).default,ew=(ep(),W(eu)).default,ex=async()=>{if(!ey)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(e$(ey))return[void 0,ew()];let e=await eb(ey);return[e,ew(e)]},eS=(ni(),W(ec)).default,ek=async(e,t,r)=>{if(!e&&!t&&eS&&ey&&e$(ey))return[void 0,eS];{let i,a,n="ort-wasm-simd-threaded.jsep.mjs",s=e??((e,t)=>{let r=t??ey;try{return(r?new URL(e,r):new URL(e)).href}catch{return}})(n,t),o=r&&s&&!e$(s,t),u=o?await eb(s):s??(i=n,a=t,`${a??"./"}${i}`);return[o?u:void 0,await ev(u)]}}}),nn=P(()=>{na(),eI=!1,eC=!1,eE=!1,ez=async e=>{if(eI)return Promise.resolve();if(eC)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eE)throw Error("previous call to 'initializeWebAssembly()' failed.");eC=!0;let t=e.initTimeout,r=e.numThreads;if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.");let i=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();r>1&&!i&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n="string"==typeof a?a:void 0,s=a?.mjs,o=s?.href??s,u=a?.wasm,l=u?.href??u,d=e.wasmBinary,[p,c]=await ek(o,n,r>1),h=!1,f=[];if(t>0&&f.push(new Promise(e=>{setTimeout(()=>{h=!0,e()},t)})),f.push(new Promise((e,t)=>{let i={numThreads:r};if(d)i.wasmBinary=d;else if(l||n)i.locateFile=e=>l??n+e;else if(o&&0!==o.indexOf("blob:"))i.locateFile=e=>new URL(e,o).href;else if(p){let e=e_();e&&(i.locateFile=t=>e+t)}c(i).then(t=>{eC=!1,eI=!0,eT=t,e(),p&&URL.revokeObjectURL(p)},e=>{eC=!1,eE=!0,t(e)})})),await Promise.race(f),h)throw Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},eA=()=>{if(eI&&eT)return eT;throw Error("WebAssembly is not initialized yet.")}}),ns=P(()=>{nn(),eO=(e,t)=>{let r=eA(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},eR=(e,t,r,i)=>{if("object"==typeof e&&null!==e){if(r.has(e))throw Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([e,a])=>{let n=t?t+e:e;if("object"==typeof a)eR(a,n+".",r,i);else if("string"==typeof a||"number"==typeof a)i(n,a.toString());else if("boolean"==typeof a)i(n,a?"1":"0");else throw Error(`Can't handle extra config type: ${typeof a}`)})},eB=e=>{let t=eA(),r=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);t._OrtGetLastError(i,i+r);let a=Number(t.getValue(i,4===r?"i32":"i64")),n=t.getValue(i+r,"*"),s=n?t.UTF8ToString(n):"";throw Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(r)}}}),no=P(()=>{nn(),ns(),eN=e=>{let t=eA(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if("number"!=typeof e.logSeverityLevel||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if("number"!=typeof e.logVerbosityLevel||!Number.isInteger(e.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=eO(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),0===r&&eB("Can't create run options."),e?.extra!==void 0&&eR(e.extra,"",new WeakSet,(e,a)=>{let n=eO(e,i),s=eO(a,i);0!==t._OrtAddRunConfigEntry(r,n,s)&&eB(`Can't set a run config entry: ${e} - ${a}.`)}),[r,i]}catch(e){throw 0!==r&&t._OrtReleaseRunOptions(r),i.forEach(e=>t._free(e)),e}}}),nu=P(()=>{nn(),ns(),eM=e=>{var t;let r,i=eA(),a=0,n=[],s=e||{};(t=s).extra||(t.extra={}),t.extra.session||(t.extra.session={}),(r=t.extra.session).use_ort_model_bytes_directly||(r.use_ort_model_bytes_directly="1"),t.executionProviders&&t.executionProviders.some(e=>("string"==typeof e?e:e.name)==="webgpu")&&(t.enableMemPattern=!1);try{let e=(e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${e}`)}})(s.graphOptimizationLevel??"all"),t=(e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${e}`)}})(s.executionMode??"sequential"),r="string"==typeof s.logId?eO(s.logId,n):0,o=s.logSeverityLevel??2;if(!Number.isInteger(o)||o<0||o>4)throw Error(`log serverity level is not valid: ${o}`);let u=s.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let l="string"==typeof s.optimizedModelFilePath?eO(s.optimizedModelFilePath,n):0;if(a=i._OrtCreateSessionOptions(e,!!s.enableCpuMemArena,!!s.enableMemPattern,t,!!s.enableProfiling,0,r,o,u,l),0===a&&eB("Can't create session options."),s.executionProviders&&((e,t,r)=>{for(let i of t){let t="string"==typeof i?i:i.name;switch(t){case"webnn":if(t="WEBNN","string"!=typeof i){let t=i?.deviceType;if(t){let i=eO("deviceType",r),a=eO(t,r);0!==eA()._OrtAddSessionConfigEntry(e,i,a)&&eB(`Can't set a session config entry: 'deviceType' - ${t}.`)}}break;case"webgpu":if(t="JS","string"!=typeof i&&i?.preferredLayout){if("NCHW"!==i.preferredLayout&&"NHWC"!==i.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${i.preferredLayout}`);let t=eO("preferredLayout",r),a=eO(i.preferredLayout,r);0!==eA()._OrtAddSessionConfigEntry(e,t,a)&&eB(`Can't set a session config entry: 'preferredLayout' - ${i.preferredLayout}.`)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${t}`)}let a=eO(t,r);0!==eA()._OrtAppendExecutionProvider(e,a)&&eB(`Can't append execution provider: ${t}.`)}})(a,s.executionProviders,n),void 0!==s.enableGraphCapture){if("boolean"!=typeof s.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${s.enableGraphCapture}`);let e=eO("enableGraphCapture",n),t=eO(s.enableGraphCapture.toString(),n);0!==i._OrtAddSessionConfigEntry(a,e,t)&&eB(`Can't set a session config entry: 'enableGraphCapture' - ${s.enableGraphCapture}.`)}if(s.freeDimensionOverrides)for(let[e,t]of Object.entries(s.freeDimensionOverrides)){if("string"!=typeof e)throw Error(`free dimension override name must be a string: ${e}`);if("number"!=typeof t||!Number.isInteger(t)||t<0)throw Error(`free dimension override value must be a non-negative integer: ${t}`);let r=eO(e,n);0!==i._OrtAddFreeDimensionOverride(a,r,t)&&eB(`Can't set a free dimension override: ${e} - ${t}.`)}return void 0!==s.extra&&eR(s.extra,"",new WeakSet,(e,t)=>{let r=eO(e,n),s=eO(t,n);0!==i._OrtAddSessionConfigEntry(a,r,s)&&eB(`Can't set a session config entry: ${e} - ${t}.`)}),[a,n]}catch(e){throw 0!==a&&0!==i._OrtReleaseSessionOptions(a)&&eB("Can't release session options."),n.forEach(e=>i._free(e)),e}}}),nl=P(()=>{eD=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${e}`)}},eP=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${e}`)}},eU=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i="number"==typeof t?t:t.reduce((e,t)=>e*t,1);return r>0?Math.ceil(i*r):void 0},eW=e=>{switch(e){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${e}`)}},eq=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${e}`)}},eL=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,eV=e=>"float32"===e||"float16"===e||"int32"===e||"int64"===e||"uint32"===e||"uint64"===e||"int8"===e||"uint8"===e||"bool"===e||"uint4"===e||"int4"===e,eG=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${e}`)}}}),nd=P(()=>{eo(),eH=async e=>{if("string"!=typeof e)return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e);{let t=await fetch(e);if(!t.ok)throw Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<0x40000000)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw Error(`failed to load external data file: ${e}, no response body.`);let r=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(e){if(e instanceof RangeError){let e=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:e,maximum:e}).buffer}else throw e}let n=0;for(;;){let{done:e,value:t}=await r.read();if(e)break;let i=t.byteLength;new Uint8Array(a,n,i).set(t),n+=i}return new Uint8Array(a,0,i)}}}}),np=P(()=>{nl(),eF=["V","I","W","E","F"],eQ=(e,t)=>{ej=e,eK=t},eZ=(...e)=>{eK&&((e,t)=>{var r,i;let a=eq(e);a>=eq(ej)&&(r=a,i="function"==typeof t?t():t,console.log(`[${eF[r]},${new Date().toISOString()}]${i}`))})(...e)}}),nc=P(()=>{nl(),eX=(e,t)=>new(eW(t))(e)}),nh=P(()=>{}),nf=P(()=>{np(),nh(),eY=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),eJ=[],e0=e=>16*Math.ceil(Number(e)/16),e1=1,e2=()=>e1++,e3=async(e,t,r,i)=>{let a=e0(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let o=n.getMappedRange();if(!i)return new Uint8Array(o.slice(0,r));{let e=i();return e.set(new Uint8Array(o,0,r)),e}}finally{n.destroy()}},e4=class{constructor(e){for(let[t]of(this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,eY))eJ.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=e0(a),s=this.storageCache.get(e);if(!s)throw Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(o.getMappedRange()).set(new Uint8Array(r,i,a)),o.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(o,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([u.finish()]),o.destroy(),eZ("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw Error("inconsistent source and destination gpu data size");let a=e0(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return eZ("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=e2();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),eZ("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){void 0!==e&&(this.storageCache.delete(e),eZ("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=(e=>{for(let t=0;t<eJ.length;t++){let r=eJ[t];if(e<=r)return r}return 16*Math.ceil(e/16)})(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let e=(a?this.freeBuffers:this.freeUniformBuffers).get(r);i=e&&e.length>0?e.pop():this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:e2(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),eZ("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t="bigint"==typeof e?Number(e):e,r=this.storageCache.get(t);if(!r){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return eZ("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw Error("data does not exist");await e3(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let e of this.buffersPending){let t=eY.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];void 0===t||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let t of(e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e)),this.buffersPending))e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(e=>{e.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,0===this.sessionCount&&(eZ("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.storageCache=new Map)}},e6=(...e)=>new e4(...e)}),nm=P(()=>{e8=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},e5=e=>new e8(e)}),ng=P(()=>{e9=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},e7=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(0===i)return t;if(0===a)return e;let n=Math.max(e.length,t.length),s=Array(n);if(r){if(i<2||a<2)return;let r=e9.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(void 0===r)return;[s[n-2],s[n-1]]=r}for(let o=r?3:1;o<=n;o++){let r=i-o<0?1:e[i-o],u=a-o<0?1:t[a-o];if(r!==u&&r>1&&u>1)return;let l=Math.max(r,u);if(r&&u)s[n-o]=Math.max(r,u);else{if(l>1)return;s[n-o]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(1!==e[r-a]&&e[r-a]!==t[i-a])return!1;return!0}},te=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(e,t=4){let r=e.length;if(0===r)return[];let i=Array(r),a=r-1;for(;a>=0;){if(e[a]%t==0){i[a]=e[a]/t;break}if(t%e[a]!=0)throw Error("cannot convert shape");i[a]=1,t/=e[a],a--}for(a--;a>=0;a--)i[a]=e[a];return i}static sizeFromDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(e,t,r){let i=1;for(let a=t;a<r;a++){if(e[a]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(e[a])}return i}static computeStrides(e){let t=e.length;if(0===t)return[];if(1===t)return[1];let r=Array(t);r[t-1]=1,r[t-2]=e[t-1];for(let i=t-3;i>=0;--i)r[i]=r[i+1]*e[i+1];return r}static normalizeAxis(e,t){if(e<-t&&e>=t)throw Error("unsupported axis for this operation.");return e<0?e+t:e}static normalizeAxes(e,t){return e.map(r=>this.normalizeAxis(r,t??e.length))}static sortBasedOnPerm(e,t){return t?t.map(t=>e[t]):e.slice().reverse()}static padShape(e,t){let r=e.length;return e.map((e,i)=>e+t[i]+t[i+r])}static areEqual(e,t){return e.length===t.length&&e.every((e,r)=>e===t[r])}},tt=class e{static adjustPoolAttributes(e,t,r,i,a,n){if(!e&&r.length!==t.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let e=0;e<t.length-2;e++)e>=r.length?r.push(t[e+2]):r[e]=t[e+2];for(let e=0;e<r.length;e++)if(e<i.length){if(i[e]<0)throw Error("strides should be greater than or equal to 1")}else i.push(1);for(let e=0;e<r.length;e++)if(e<a.length){if(a[e]<0)throw Error("dilations should be greater than or equal to 1")}else a.push(1);for(let e=0;e<2*r.length;e++)if(e<n.length){if(n[e]<0)throw Error("pad should be greater than or equal to 1")}else n.push(0);for(let e=0;e<r.length;e++){if(r[e]<=0)throw Error("kernel shapes need to be greater than 0");if(n[e]>=r[e]||n[e+r.length]>=r[e])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,o){if(o){if(n.length!==2*(t.length-2))throw Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(s?1:2)],r[u],i[u],a[u],n,u,u+t.length-2,o)}}static computePoolOutputShape(t,r,i,a,n,s,o){if(r.length<=0)throw Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return e.computeShapeHelper(t,r,u,i,a,n,s,o),u}static computeConvOutputShape(t,r,i,a,n,s,o){if(t.length<=0||r.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return e.computeShapeHelper(!1,t,u,i,a,n,s,o),u}static computeShapeHelper(t,r,i,a,n,s,o,u){if(t)for(let e=0;e<r.length-2;e++)i.push(1);else for(let t=0;t<r.length-2;t++)i.push(e.adjustPadAndReturnShape(r[t+2],a[t],n[t],s[t],o,t,t+r.length-2,u))}static adjustPadAndReturnShape(e,t,r,i,a,n,s,o){let u=r*(i-1)+1;if(!o||"NOTSET"===o)return Math.floor((e+a[n]+a[s]-u)/t+1);switch(o){case"VALID":return a[n]=0,a[s]=0,Math.floor((e-u)/t+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==r)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let r=((e+t-1)/t-1)*t+i-e;return a[n]=Math.floor("SAME_LOWER"===o?(r+1)/2:r/2),a[s]=r-a[n],Math.floor((e+r-i)/t+1)}default:throw Error("Unsupported AutoPad type")}}},tr=class{static getShapeOfGemmResult(e,t,r,i,a){let n,s,o;if(2!==e.length||2!==r.length)throw Error("shape need to be of size 2");t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let u=-1;if(i?(o=r[0],u=1):(o=r[1],u=0),r[u]!==s)throw Error("dimension mismatch");if(n<=0||o<=0||s<=0)throw Error("invalid shape specified");if(a&&!e7.isValidBroadcast(a,[n,o]))throw Error("gemm: invalid bias shape for broadcast");return[n,o,s]}},ti=-34028234663852886e22,ta=34028234663852886e22}),ny=P(()=>{nl(),ng(),tn=64,ts=(e,t)=>{if(3===t)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==t)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${e}`)}},to=(e,t=1)=>{let r=ts(e,t);return"string"==typeof r?r:r[0]},tu=(e,t=1)=>{let r=ts(e,t);return"string"==typeof r?r:r[1]},tl=(...e)=>{let t=[];return e.forEach(e=>{0!==e.length&&t.push({type:12,data:e},{type:12,data:te.computeStrides(e)})}),t},td=e=>e%4==0?4:e%2==0?2:1,tp=(e="f32",t,r="0")=>t&&1!==t?`vec${t}<${e}>(${r})`:`${e}(${r})`,tc=(e,t,r)=>"f32"===e?r:1===t?`f32(${r})`:`vec${t}<f32>(${r})`,th=(e,t)=>4===t?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:2===t?`(${e}.x + ${e}.y)`:3===t?`(${e}.x + ${e}.y + ${e}.z)`:e,tf=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?"string"==typeof t?"f16"===i?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:"f16"===i?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,tm=(e,t,r,i,a)=>{let n,s,o,u,l="number"==typeof r,d=l?r:r.length,p=[...Array(d).keys()],c=d<2?"u32":d<=4?`vec${d}<u32>`:`array<u32, ${d}>`,h=ts(t,a),f="string"==typeof h?h:h[1],m={indices:c,value:f,storage:"string"==typeof h?h:h[0],tensor:t},g=e=>"string"==typeof e?e:`${e}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=l?"uniforms.":"",$=`${_}${e}_shape`,b=`${_}${e}_strides`,v="";for(let e=0;e<d-1;e++)v+=`
    let dim${e} = current / ${tf(b,e,d)};
    let rest${e} = current % ${tf(b,e,d)};
    indices[${e}] = dim${e};
    current = rest${e};
    `;v+=`indices[${d-1}] = current;`;let w=d<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${v}
    return indices;
  }`,x=[];if(d>=2)for(let e=d-1;e>=0;e--)x.push(`${tf(b,e,d)} * (indices[${e}])`);let S=d<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${x.join("+")};
  }`,k=(...e)=>0===d?"0u":`${m.indices}(${e.map(g).join(",")})`,T=(e,t)=>d<2?`${e}`:`${tf(e,t,d)}`,I={},C=(t,r)=>(()=>{if(m.storage===m.value)return`${e}[${t}]=${r};`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${r}), select(0u, 0xFFFFFFFFu, ${r} < 0));`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`${e}[${t}]=vec2<u32>(u32(${r}), 0u);`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`${e}[${t}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${r}));`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),E=t=>(()=>{if(m.storage===m.value)return`${e}[${t}]`;if("vec2<u32>"===m.storage&&"i32"===m.value)return`i32(${e}[${t}].x)`;if("vec2<u32>"===m.storage&&"u32"===m.value)return`u32(${e}[${t}].x)`;if("u32"===m.storage&&"vec4<bool>"===m.value)return`vec4<bool>(bool(${e}[${t}] & 0xFFu), bool(${e}[${t}] & 0xFF00u), bool(${e}[${t}] & 0xFF0000u), bool(${e}[${t}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),z=d<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${E(`i2o_${e}(indices)`)};
  }`,A=d<2?"":(n=p.map(e=>`d${e}: u32`).join(", "),s=p.map(e=>`d${e}`).join(", "),`
  fn get_${e}(${n}) -> ${f} {
    return get_${e}ByIndices(${k(s)});
  }`),O=d<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${C(`i2o_${e}(indices)`,"value")}
  }`,R=d<2?"":(o=p.map(e=>`d${e}: u32`).join(", "),u=p.map(e=>`d${e}`).join(", "),`
  fn set_${e}(${o}, value: ${f}) {
    set_${e}ByIndices(${k(u)}, value);
  }`);return{impl:()=>{let e=[],t=!1;return y.offsetToIndices&&(e.push(w),t=!0),y.indicesToOffset&&(e.push(S),t=!0),y.broadcastedIndicesToOffset&&(Object.values(I).forEach(t=>e.push(t)),t=!0),y.set&&(e.push(R),t=!0),y.setByIndices&&(e.push(O),t=!0),y.get&&(e.push(A),t=!0),y.getByIndices&&(e.push(z),t=!0),!l&&t&&e.unshift(`const ${$} = ${m.indices}(${r.join(",")});`,`const ${b} = ${m.indices}(${te.computeStrides(r).join(",")});`),e.join(`
`)},type:m,offsetToIndices:t=>(y.offsetToIndices=!0,d<2?t:`o2i_${e}(${t})`),indicesToOffset:t=>(y.indicesToOffset=!0,d<2?t:`i2o_${e}(${t})`),broadcastedIndicesToOffset:(t,r)=>{y.broadcastedIndicesToOffset=!0;let i=`${r.name}broadcastedIndicesTo${e}Offset`;if(i in I)return`${i}(${t})`;let a=[];for(let e=d-1;e>=0;e--){let t=r.indicesGet("outputIndices",e+r.rank-d);a.push(`${T(b,e)} * (${t} % ${T($,e)})`)}return I[i]=`fn ${i}(outputIndices: ${r.type.indices}) -> u32 {
             return ${a.length>0?a.join("+"):"0u"};
           }`,`${i}(${t})`},indices:k,indicesGet:T,indicesSet:(e,t,r)=>d<2?`${e}=${r};`:`${tf(e,t,d)}=${r};`,set:(...t)=>{if(t.length!==d+1)throw Error(`indices length must be ${d}`);let r=t[d];if("string"!=typeof r)throw Error("value must be string");let i=t.slice(0,d).map(g).join(",");return 0===d?C("0u",r):1===d?C(i[0],r):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${i}, ${r})`)},setByOffset:C,setByIndices:(t,r)=>d<2?C(t,r):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${t}, ${r});`),get:(...t)=>{if(t.length!==d)throw Error(`indices length must be ${d}`);let r=t.map(g).join(",");return 0===d?E("0u"):1===d?E(r[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${r})`)},getByOffset:E,getByIndices:t=>d<2?E(t):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${t})`),usage:i,name:e,strides:b,shape:$,rank:d}},tg=(e,t,r,i=1)=>tm(e,t,r,"input",i),ty=(e,t,r,i=1)=>tm(e,t,r,"output",i),t_=(e,t,r)=>tm(e,t,r,"atomicOutput",1),t$=(e,t,r,i=1)=>tm(e,t,r,"internal",i),tb=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${"number"==typeof e?`${e}u`:e}) { return; }`}mainStart(e=tn){let t="number"==typeof e?e:e[0],r="number"==typeof e?1:e[1],i="number"==typeof e?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){0!==e.rank&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if("internal"===e.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r="input"===e.usage?"read":"read_write",i="atomicOutput"===e.usage?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if("internal"!==e.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)"f16"===r?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=null==i||1===i?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(e=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(e.type)],e.length??1])}},tv=(e,t)=>new tb(e,t)}),n_=P(()=>{nl(),ng(),nm(),ny(),tw=(e,t)=>0!==t.length?t:[...Array(e).keys()].reverse(),tx=(e,t)=>{let r,i,a=e.dataType,n=e.dims.length,s=tw(n,t),o=(r=e.dims,i=s,te.sortBasedOnPerm(r,tw(r.length,i))),u=e.dims,l=o;if(n<2||((e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(1!==t[e[i]]){if(e[i]<r)return!1;r=e[i]}return!0})(s,e.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=te.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64/4)},programUniforms:[{type:12,data:Math.ceil(t/4)}]}},getShaderSource:e=>{let t=tg("input",a,u,4),r=ty("output",a,l,4);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:d,newPerm:p}=((e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)1!==e[a]&&r.push(e[a]),1!==e[t[a]]&&i.push(t[a]);return{newShape:r,newPerm:i}})(e.dims,s),c=te.areEqual(p,[2,3,1]),h=te.areEqual(p,[3,1,2]);return 2===d.length||c||h?(l=[(u=c?[d[0],d[1]*d[2]]:h?[d[0]*d[1],d[2]]:d)[1],u[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let t=te.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/16),y:Math.ceil(l[0]/16)},programUniforms:[{type:12,data:t},...tl(u,l)]}},getShaderSource:e=>{let t=tg("a",a,u.length),r=ty("output",a,l.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,r)}
  var<workgroup> tile : array<array<${r.type.value}, 17>, 16>;
  ${e.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${t.getByIndices(`${t.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${r.setByIndices(`${r.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let t=te.size(o);return{outputs:[{dims:o,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:[{type:12,data:t},...tl(u,l)]}},getShaderSource:e=>{let t=tg("a",a,u.length),r=ty("output",a,l.length);return`
  ${e.registerUniform("output_size","u32").declareVariables(t,r)}

  ${((e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let r=0;r<t;++r)a+=`a[${e[r]}]=i[${r}];`;return a+"return a;}"})(s,n,t,r)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${r.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${r.setByOffset("global_idx",t.getByIndices("aIndices"))}
  }`}}},tS=(e,t)=>{((e,t)=>{if(!e||1!==e.length)throw Error("Transpose requires 1 input.");if(0!==t.length&&t.length!==e[0].dims.length)throw Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)})(e.inputs,t.perm),e.compute(tx(e.inputs[0],t.perm))},tk=e=>e5({perm:e.perm})}),n$=P(()=>{nl(),ng(),ny(),nb(),n_(),tT={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},tI={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},tC={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},tE={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},tz=(e,t,r,i)=>{var a,n,s,o,u,l,d;let p,c,h,f,m,g,y,_=1===e.inputs.length?r:tG(e.inputs,r),$=_.axes;0!==$.length||_.noopWithEmptyAxes||($=e.inputs[0].dims.map((e,t)=>t));let b=te.normalizeAxes($,e.inputs[0].dims.length),v=b,w=e.inputs[0],x=((e,t)=>{let r=[];if(!((e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0})(e,t)){for(let i=0;i<t;++i)-1===e.indexOf(i)&&r.push(i);e.forEach(e=>r.push(e))}return r})(v,e.inputs[0].dims.length);x.length>0&&(w=e.compute(tx(e.inputs[0],x),{inputs:[0],outputs:[-1]})[0],v=((e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r})(v.length,w.dims.length));let[S,k]=((e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)-1===t.indexOf(a)&&r.push(e[a]);return[r,t.map(t=>e[t])]})(w.dims,v),T=S;_.keepDims&&(T=((e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)-1===t.indexOf(n)?i.push(e[a++]):i.push(1);return i})(S,b)),e.compute((a=t,n=_.cacheKey,s=[w],o=i,u=e.inputs[0].dataType,l=T,d=k,p=s[0].dims,c=te.size(l),h=te.size(d),f=tg("_A",s[0].dataType,p),m=ty("output",u,l),g=64,1===c&&(g=256),y=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,{name:a,shaderCache:{hint:`${n};${g}`,inputDependencies:["type"]},getShaderSource:e=>`
        ${e.registerUniform("reduceSize","u32").declareVariables(f,m)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${e.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${tC[o]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${tT[o]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${tI[o]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${"mean"===o?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${tE[o]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:l,dataType:u}],dispatchGroup:{x:c},programUniforms:[{type:12,data:h}]})}),{inputs:[w]})},tA=(e,t)=>{tz(e,"ReduceMeanShared",t,"mean")},tO=(e,t)=>{tz(e,"ReduceL1Shared",t,"l1")},tR=(e,t)=>{tz(e,"ReduceL2Shared",t,"l2")},tB=(e,t)=>{tz(e,"ReduceLogSumExpShared",t,"logSumExp")},tN=(e,t)=>{tz(e,"ReduceMaxShared",t,"max")},tM=(e,t)=>{tz(e,"ReduceMinShared",t,"min")},tD=(e,t)=>{tz(e,"ReduceProdShared",t,"prod")},tP=(e,t)=>{tz(e,"ReduceSumShared",t,"sum")},tU=(e,t)=>{tz(e,"ReduceSumSquareShared",t,"sumSquare")},tW=(e,t)=>{tz(e,"ReduceLogSumShared",t,"logSum")}}),nb=P(()=>{nl(),ng(),nm(),ny(),n$(),tq=e=>{if(!e||0===e.length||e.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===e.length&&1!==e[1].dims.length)throw Error("Invalid axes input dims.")},tL=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],tV=(e,t,r,i,a,n,s=!1,o=!1)=>{let u=[],l=r[0].dims,d=l.length,p=te.normalizeAxes(a,d),c=!o&&0===p.length;l.forEach((e,t)=>{c||p.indexOf(t)>=0?s&&u.push(1):u.push(e)});let h=u.length,f=te.size(u);return{name:e,shaderCache:t,getShaderSource:e=>{let t=[],a=tg("_A",r[0].dataType,d),o=ty("output",n,h),u=i(a,o,p),f=u[2];for(let e=0,r=0;e<d;e++)c||p.indexOf(e)>=0?(s&&r++,f=`for(var j${e}: u32 = 0; j${e} < ${l[e]}; j${e}++) {
                  ${u[2].includes("last_index")?`let last_index = j${e};`:""}
                  ${a.indicesSet("input_indices",e,`j${e}`)}
                  ${f}
                }`):(t.push(`${a.indicesSet("input_indices",e,o.indicesGet("output_indices",r))};`),r++);return`

        ${e.registerUniform("output_size","u32").declareVariables(a,o)}

        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${a.type.indices};
          let output_indices = ${o.offsetToIndices("global_idx")};

          ${t.join(`
`)}
          ${u[0]}       // init ops for reduce max/min
          ${u[1]}
          ${f}
          ${u[3]}
          ${4===u.length?o.setByOffset("global_idx","value"):u.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:n}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...tl(l,u)]})}},tG=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(e=>r.push(Number(e))),e5({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},tH=(e,t,r,i)=>{let a=e.inputs,n=1===a.length?r:tG(a,r);e.compute(tV(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&0===n.axes.length?tL:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},tF=(e,t,r)=>{if(0===t.length)return r;let i=1,a=1;for(let r=0;r<t.length;r++)-1===t.indexOf(r)?i*=e[r]:a*=e[r];return a<32&&i>1024},tj=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceMean",i,(e,t,i)=>{let a=1;for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&(a*=r.inputs[0].dims[t]);return["var sum = f32(0);","",`sum += f32(${e.getByIndices("input_indices")});`,`let value = ${t.type.value}(sum / ${a});`]})):tA(e,t)},tK=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceL1",i,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += abs(${e.getByIndices("input_indices")});`,""])):tO(e,t)},tQ=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceL2",i,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):tR(e,t)},tZ=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceLogSumExp",i,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += exp(${e.getByIndices("input_indices")});`,"value = log(value);"])):tB(e,t)},tX=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceMax",i,(e,t,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&i.push(e.indicesSet("input_indices",t,0));return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = max(value, ${e.getByIndices("input_indices")});`,""]})):tN(e,t)},tY=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceMin",i,(e,t,r)=>{let i=[];for(let t=0;t<e.rank;t++)(r.indexOf(t)>=0||0===r.length)&&i.push(`input_indices[${t}] = 0;`);return[`${i.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};`,`value = min(value, ${e.getByIndices("input_indices")});`,""]})):tM(e,t)},tJ=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceProd",i,(e,t)=>[`var value = ${t.type.storage}(1);`,"",`value *= ${e.getByIndices("input_indices")};`,""])):tD(e,t)},t0=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceSum",i,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,""])):tP(e,t)},t1=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceSumSquare",i,(e,t)=>[`var t = ${t.type.value}(0); var value = ${t.type.value}(0);`,"",`t = ${e.getByIndices("input_indices")}; value += t * t;`,""])):tU(e,t)},t2=(e,t)=>{var r,i;tF(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?(r=e,i=t,tq(r.inputs),tH(r,"ReduceLogSum",i,(e,t)=>[`var value = ${t.type.storage}(0);`,"",`value += ${e.getByIndices("input_indices")};`,"value = log(value);"])):tW(e,t)}}),nv=P(()=>{nl(),nm(),nb(),t3=e=>{if(!e||0===e.length||e.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==e[0].dataType)throw Error("Invalid input type.")},t4=(e,t)=>{t3(e.inputs),e.compute(tV("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,r,i)=>{let a=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&a.push(`input_indices[${t}] = 0;`);return[`${a.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},t6=(e,t)=>{t3(e.inputs),e.compute(tV("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],(e,r,i)=>{let a=[];for(let t=0;t<e.rank;t++)(i.indexOf(t)>=0||0===i.length)&&a.push(`input_indices[${t}] = 0;`);return[`${a.join(`
`)}`,`var value = ${e.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${e.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${e.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",r.setByOffset("global_idx","best_index")]},[t.axis],7,t.keepDims),{inputs:[0]})},t8=e=>e5(e)}),nw=P(()=>{nl(),ng(),nh(),ny(),t5=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,t9=(e,t,r,i,a,n,s,o,u,l,d,p)=>{var c,h,f,m,g,y,_,$,b,v,w,x,S,k,T,I,C,E,z,A,O,R,B,N,M;let D,P,U,W,q,L,V,G,H,F,j,K,Q,Z,X,Y,J,ee,et,er,ei,ea,en,es,eo,eu,el,ed,ep,ec,eh,ef,em,eg=Math.min(e.outputCount,1+ +!!s+ +!!o),ey=eg>1?l.pastSequenceLength:0,e_=ey+l.kvSequenceLength,e$=u&&te.size(u.dims)>0?u:void 0,eb=[t,r];eg>1&&s&&te.size(s.dims)>0&&eb.push(s),e$&&eb.push(e$),d&&eb.push(d),p&&eb.push(p);let ev=e.compute((c=eg,h=t,f=r,m=s,g=e$,y=l,_=ey,$=d,b=p,D=_+y.kvSequenceLength,P=[y.batchSize,y.numHeads,y.sequenceLength,D],U=c>1&&m,W=y.kvNumHeads?y.kvNumHeads:y.numHeads,q=U?[y.batchSize,W,D,y.headSize]:void 0,L=y.nReps?y.nReps:1,V=0===y.scale?1/Math.sqrt(y.headSize):y.scale,G=td(y.headSize),H=y.headSize/G,F={x:Math.ceil(D/12),y:Math.ceil(y.sequenceLength/12),z:y.batchSize*y.numHeads},j=[{type:12,data:y.sequenceLength},{type:12,data:H},{type:12,data:D},{type:12,data:y.numHeads},{type:12,data:y.headSize},{type:1,data:V},{type:12,data:_},{type:12,data:y.kvSequenceLength},{type:12,data:L}],K=U&&m&&te.size(m.dims)>0,Q=["type","type"],K&&Q.push("type"),g&&Q.push("type"),$&&Q.push("type"),b&&Q.push("type"),Z=[{dims:P,dataType:h.dataType,gpuDataType:0}],U&&Z.push({dims:q,dataType:h.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${G};${void 0!==g};${void 0!==m};${c}`,inputDependencies:Q},getRunData:()=>({outputs:Z,dispatchGroup:F,programUniforms:j}),getShaderSource:e=>{let t=tg("q",h.dataType,h.dims,G),r=[t,tg("key",f.dataType,f.dims,G)];if(K){let e=tg("past_key",m.dataType,m.dims,G);r.push(e)}g&&r.push(tg("attention_bias",g.dataType,g.dims));let i=$?tg("seq_lens",$.dataType,$.dims):void 0;i&&r.push(i);let a=b?tg("total_sequence_length_input",b.dataType,b.dims):void 0;a&&r.push(a);let n=ty("output",h.dataType,P),s=[n];U&&s.push(ty("present_key",h.dataType,q,G));let o=tu(1,G);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${t.type.storage}, 144>;
  var<workgroup> tileK: array<${t.type.storage}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...r,...s)}
  ${e.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===L?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===L?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${t5(i,a,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${K&&U?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${U?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${o}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${K&&U?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${U?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${o}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(G){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${G}`)}})()};
        output[outputIdx] = ${n.type.value} (sum * uniforms.alpha) + ${g?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:eb,outputs:eg>1?[-1,1]:[-1]})[0];e.compute((v=ev,w=l.batchSize,x=l.numHeads,S=ey,k=l.sequenceLength,T=e_,I=d,C=p,X=td(I?1:T),Y=64,(J=T/X)<64&&(Y=32),ee=[{type:12,data:w},{type:12,data:x},{type:12,data:S},{type:12,data:k},{type:12,data:J},{type:12,data:Math.ceil(T/X/Y)}],et=to(v.dataType,X),er=tu(1,X),ei=["type"],I&&ei.push("type"),C&&ei.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${Y};${et};${X}`,inputDependencies:ei},getShaderSource:e=>{let t=ty("x",v.dataType,v.dims,X),r=[t],i=I?tg("seq_lens",I.dataType,I.dims):void 0;i&&r.push(i);let a=C?tg("total_sequence_length_input",C.dataType,C.dims):void 0;a&&r.push(a);let n=tu(v.dataType);return`
  var<workgroup> thread_max: array<f32, ${Y}>;
  var<workgroup> thread_sum: array<f32, ${Y}>;
  ${e.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...r)}
  ${e.mainStart([Y,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${t5(i,a,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${Y}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${I?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${er}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${er}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(X){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${X}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${Y}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${er}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${er}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(X){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${X}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${Y}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${t.type.value}(${n}(1.0) / ${n}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${er}(x[offset + i]);
        x[offset + i] = ${t.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${I?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${t.type.value}(${n}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(T/Y),y:k,z:w*x},programUniforms:ee})}),{inputs:d&&p?[ev,d,p]:[ev],outputs:[]});let ew=[ev,i];eg>1&&o&&te.size(o.dims)>0&&ew.push(o),d&&ew.push(d),p&&ew.push(p),e.compute((E=eg,z=ev,A=i,O=o,R=l,B=ey,N=d,M=p,ea=B+R.kvSequenceLength,en=R.nReps?R.nReps:1,es=R.vHiddenSize*en,eo=E>1&&O,eu=R.kvNumHeads?R.kvNumHeads:R.numHeads,el=eo?[R.batchSize,eu,ea,R.headSize]:void 0,ed=[R.batchSize,R.sequenceLength,es],ep={x:Math.ceil(R.vHeadSize/12),y:Math.ceil(R.sequenceLength/12),z:R.batchSize*R.numHeads},ec=[{type:12,data:R.sequenceLength},{type:12,data:ea},{type:12,data:R.vHeadSize},{type:12,data:R.numHeads},{type:12,data:R.headSize},{type:12,data:es},{type:12,data:B},{type:12,data:R.kvSequenceLength},{type:12,data:en}],eh=eo&&O&&te.size(O.dims)>0,ef=["type","type"],eh&&ef.push("type"),N&&ef.push("type"),M&&ef.push("type"),em=[{dims:ed,dataType:z.dataType,gpuDataType:0}],eo&&em.push({dims:el,dataType:z.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==O};${E}`,inputDependencies:ef},getRunData:()=>({outputs:em,dispatchGroup:ep,programUniforms:ec}),getShaderSource:e=>{let t=tg("probs",z.dataType,z.dims),r=[t,tg("v",A.dataType,A.dims)];eh&&r.push(tg("past_value",O.dataType,O.dims));let i=N?tg("seq_lens",N.dataType,N.dims):void 0;N&&r.push(i);let a=M?tg("total_sequence_length_input",M.dataType,M.dims):void 0;M&&r.push(a);let n=[ty("output",z.dataType,ed)];return eo&&n.push(ty("present_value",z.dataType,el)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${t.type.value}, 144>;
  var<workgroup> tileV: array<${t.type.value}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...r,...n)}
  ${e.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===en?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===en?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${t5(i,a,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${eh&&eo?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${eo?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${t.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${eh&&eo?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${eo?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}),{inputs:ew,outputs:eg>1?[0,2]:[0]})},t7=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p=((e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],o=e[5];if(s&&o)throw Error("Attention cannot have both past and attention_bias");if(3!==r.dims.length)throw Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(1!==a.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==i.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==d)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=a.dims[0]/3,c=p,h=c;if(t.qkvHiddenSizes.length>0){if(3!==t.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let e of t.qkvHiddenSizes)if(e%t.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],c=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}if(p!==c)throw Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==p+c+h)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(s){if(c!==h)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==s.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==s.dims[0])throw Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==c/t.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=s.dims[3])}let m=l+f;if(n)throw Error("Mask not supported");if(s)throw Error("past is not supported");if(o){if(4!==o.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==m)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:l,totalSequenceLength:m,maxSequenceLength:-1,inputHiddenSize:d,hiddenSize:p,vHiddenSize:h,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(e.inputs,t),[c,h,f]=(r=e,a=[(i=p).batchSize,i.numHeads,i.sequenceLength,i.headSize],n=i.sequenceLength,s=i.inputHiddenSize,o=i.headSize,u={x:Math.ceil(i.headSize/12),y:Math.ceil(i.sequenceLength/12),z:i.batchSize*i.numHeads},l=[r.inputs[0],r.inputs[1],r.inputs[2]],d=[{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:i.hiddenSize},{type:12,data:i.hiddenSize+i.hiddenSize+i.vHiddenSize}],r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:a,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:a,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:e=>{let t=ty("output_q",l[0].dataType,a),r=ty("output_k",l[0].dataType,a),i=ty("output_v",l[0].dataType,a),n=tg("input",l[0].dataType,l[0].dims),s=tg("weight",l[1].dataType,l[1].dims),o=tg("bias",l[2].dataType,l[2].dims),u=n.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${u}, 144>;
  var<workgroup> tileWeightQ: array<${u}, 144>;
  var<workgroup> tileWeightK: array<${u}, 144>;
  var<workgroup> tileWeightV: array<${u}, 144>;
  ${e.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(n,s,o,t,r,i)}
  ${e.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${u}(0);
    var valueK = ${u}(0);
    var valueV = ${u}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:l,outputs:[-1,-1,-1]}));return t9(e,c,h,f,e.inputs[4],void 0,void 0,void 0,e.inputs[5],p)}}),nx=P(()=>{es(),nl(),ng(),nm(),ny(),re=(e,t)=>{let r,{inputs:i,outputCount:a}=e,n=(r={...t,outputCount:a},e5(r));if(l.webgpu.validateInputContent&&((e,t)=>{if(!e||5!==e.length)throw Error("BatchNormalization requires 5 inputs");let r=(e,t,r)=>{let i=t.length;if(i!==e.length)throw Error(`${r}: num dimensions != ${i}`);t.forEach((t,i)=>{if(t!==e[i])throw Error(`${r}: dim[${i}] do not match`)})};if(e[0].dims.length>1){let i="NHWC"===t.format?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")})(i,n),t.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");e.compute(((e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?td(n[n.length-1]):1,o="NHWC"===a&&n.length>1?s:1,u=te.size(n)/s,l=i?n.length:n,d=tg("x",e[0].dataType,e[0].dims,s),p=tg("scale",e[1].dataType,e[1].dims,o),c=tg("bias",e[2].dataType,e[2].dims,o),h=tg("inputMean",e[3].dataType,e[3].dims,o),f=tg("inputVar",e[4].dataType,e[4].dims,o),m=ty("y",e[0].dataType,l,s);return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:i?["rank","type","type","type","type"]:void 0},getShaderSource:e=>`
  const epsilon = ${r};
  ${e.registerUniform("outputSize","u32").declareVariables(d,p,c,h,f,m)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${m.offsetToIndices(`global_idx * ${s}`)};
    ${(()=>{let e="";if(i)e=`let cOffset = ${1===n.length?"0u":"NHWC"===a?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if("NCHW"===a)e=`
            ${m.indicesSet("outputIndices","0","0")}
            let cOffset = ${m.indicesToOffset("outputIndices")};`;else{e=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let t=1;t<p.rank;t++)e+=`cIndices[${t}] = outputIndices[${t}];`;e+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return e})()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${c.getByOffset("cOffset")};
    let inputMean = ${h.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${m.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:i?[{type:12,data:u},...tl(n)]:[{type:12,data:u}]})}})(i,n))}}),nS=P(()=>{ng(),ny(),rt=e=>{var t;let r,i,a,n,s,o,u,l;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute((r=(t=e.inputs)[0].dims,i=t[0].dims[2],a=te.size(r)/4,n=t[0].dataType,s=tg("input",n,r,4),o=tg("bias",n,[i],4),u=tg("residual",n,r,4),l=ty("output",n,r,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:e=>`
  const channels = ${i}u / 4;
  ${e.declareVariables(s,o,u,l)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${s.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}))}}),nk=P(()=>{nl(),ng(),nm(),ny(),rr=(e,t,r,i,a,n=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(te.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:t=>{var a,s,u,l,d,p,c;let h,f,m,g,y;return a=t,s=te.size(e.dims),u=e.dataType,l=n,d=r,p=i,c=o,h=Math.ceil(s/4),f="",f="string"==typeof d?`${d}(a)`:d("a"),m=tg("inputData",u,[h],4),g=ty("outputData",l,[h],4),y=[{name:"vec_size",type:"u32"}],c&&y.push(...c),`
      ${a.registerUniforms(y).declareVariables(m,g)}

  ${p??""}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${m.getByOffset("global_idx")};
    ${g.setByOffset("global_idx",f)}
  }`},getRunData:t=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(te.size(t[0].dims)/64/4)},programUniforms:u})}},ri=e=>{e.compute(rr(e.inputs[0],"Abs","abs"))},ra=e=>{e.compute(rr(e.inputs[0],"Acos","acos"))},rn=e=>{e.compute(rr(e.inputs[0],"Acosh","acosh"))},rs=e=>{e.compute(rr(e.inputs[0],"Asin","asin"))},ro=e=>{e.compute(rr(e.inputs[0],"Asinh","asinh"))},ru=e=>{e.compute(rr(e.inputs[0],"Atan","atan"))},rl=e=>{e.compute(rr(e.inputs[0],"Atanh","atanh"))},rd=e=>e5(e),rp=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(rr(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},rc=(e,t)=>{let r=t||(e=>{let t,r,i=e.length>=2&&0!==e[1].data,a=e.length>=3&&0!==e[2].data;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return e5({min:t,max:r})})(e.inputs),i=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"Clip",e=>`clamp(${e}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},rh=e=>{e.compute(rr(e.inputs[0],"Ceil","ceil"))},rf=e=>{e.compute(rr(e.inputs[0],"Cos","cos"))},rm=e=>{e.compute(rr(e.inputs[0],"Cosh","cosh"))},rg=e=>e5(e),ry=(e,t)=>{let r=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"Elu",e=>`elu_vf32(${e})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},r_=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,r$=e=>{let t=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"Erf",e=>`erf_vf32(${e})`,r_(t)))},rb=e=>{e.compute(rr(e.inputs[0],"Exp","exp"))},rv=e=>{e.compute(rr(e.inputs[0],"Floor","floor"))},rw=e=>{let t=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"Gelu",e=>`0.5 * ${e} * (1.0 + erf_vf32(${e} * 0.7071067811865475))`,r_(t)))},rx=(e,t)=>{let r=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"LeakyRelu",e=>`select(leaky_relu_alpha_ * ${e}, ${e}, ${e} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},rS=e=>{e.compute(rr(e.inputs[0],"Not",e=>`!${e}`))},rk=e=>{e.compute(rr(e.inputs[0],"Neg",e=>`-${e}`))},rT=e=>{e.compute(rr(e.inputs[0],"Reciprocal",e=>`1.0/${e}`))},rI=e=>{let t=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"Relu",e=>`select(vec4<${t}>(0.0), ${e}, ${e} > vec4<${t}>(0.0))`))},rC=e=>{e.compute(rr(e.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},rE=e=>e5(e),rz=(e,t)=>{let r=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"HardSigmoid",e=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${e} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},rA=e=>{e.compute(rr(e.inputs[0],"Sin","sin"))},rO=e=>{e.compute(rr(e.inputs[0],"Sinh","sinh"))},rR=e=>{e.compute(rr(e.inputs[0],"Sqrt","sqrt"))},rB=e=>{e.compute(rr(e.inputs[0],"Tan","tan"))},rN=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,rM=e=>{e.compute(rr(e.inputs[0],"Tanh",rN))},rD=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${rN("v")};
}
`,rP=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,rU=e=>{let t=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"FastGelu",rP,rD(t),void 0,e.inputs[0].dataType))},rW=(e,t)=>{let r=tu(e.inputs[0].dataType);return e.compute(rr(e.inputs[0],"ThresholdedRelu",e=>`select(vec4<${r}>(0.0), ${e}, ${e} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},rq=e=>{e.compute(rr(e.inputs[0],"Log","log"))},rL=e=>`quick_gelu_impl(${e})`,rV=(e,t)=>{let r,i,a=tu(e.inputs[0].dataType);e.compute(rr(e.inputs[0],"QuickGelu",rL,(r=a,i=t.alpha,`
const alpha = vec4<${r}>(${i});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),t.cacheKey,e.inputs[0].dataType))}}),nT=P(()=>{ng(),ny(),nk(),rG=e=>{var t;let r,i,a,n,s,o;(e=>{if(3!==e[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==e[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw Error("last dimension of input and bias are not the same")})(e.inputs),e.compute(((r=(t=e.inputs)[0].dims.slice())[2]=r[2]/2,i=tg("input",t[0].dataType,t[0].dims,4),a=tg("bias",t[0].dataType,[t[0].dims[2]],4),n=ty("output",t[0].dataType,r,4),s=te.size(r)/4,o=to(t[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:e=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${t[0].dims[2]/4/2}u;

  ${e.declareVariables(i,a,n)}

  ${r_(o)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),nI=P(()=>{nl(),ng(),ny(),rH=(e,t,r,i,a,n)=>{e.compute(((e,t,r,i,a,n,s=r.dataType)=>{let o=r.dims.map(e=>Number(e)??1),u=i.dims.map(e=>Number(e)??1),l=!te.areEqual(o,u),d=o,p=te.size(o),c=!1,h=!1,f=[l];if(l){let e=e7.calcShape(o,u,!1);if(!e)throw Error("Can't perform binary op on the given tensors");d=e.slice(),p=te.size(d);let t=1===te.size(o),r=1===te.size(u),i=o.length>0&&o[o.length-1]%4==0,a=u.length>0&&u[u.length-1]%4==0;f.push(t),f.push(r),f.push(i),f.push(a);let n=1;for(let e=1;e<d.length;e++){let t=o[o.length-e];if(t===u[u.length-e])n*=t;else break}n%4==0?(h=!0,c=!0):(t||r||i||a)&&(c=!0)}else c=!0;return f.push(c),{name:e,shaderCache:{hint:t+f.map(e=>e.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:e=>((e,t,r,i,a,n,s,o,u,l,d,p)=>{let c,h;"string"==typeof o?c=h=(e,t)=>`${o}((${e}),(${t}))`:"function"==typeof o?c=h=o:(c=o.scalar,h=o.vector);let f=ty("outputData",d,i.length,4),m=tg("aData",u,t.length,4),g=tg("bData",l,r.length,4),y;if(a)if(n){let e=1===te.size(t),i=1===te.size(r),a=t.length>0&&t[t.length-1]%4==0,n=r.length>0&&r[r.length-1]%4==0;y=e||i?f.setByOffset("global_idx",h(e?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),i?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"))):`
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",f)};
            let offsetB = ${g.broadcastedIndicesToOffset("outputIndices",f)};
            ${f.setByOffset("global_idx",h(s||a?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||n?g.getByOffset("offsetB / 4u"):`${g.type.value}(${g.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=f.setByOffset("global_idx",h(m.getByOffset("global_idx"),g.getByOffset("global_idx")));else{if(!n)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let e=(e,t,r="")=>{let i=`aData[indexA${t}][componentA${t}]`,a=`bData[indexB${t}][componentB${t}]`;return`
            let outputIndices${t} = ${f.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offsetA${t} = ${m.broadcastedIndicesToOffset(`outputIndices${t}`,f)};
            let offsetB${t} = ${g.broadcastedIndicesToOffset(`outputIndices${t}`,f)};
            let indexA${t} = offsetA${t} / 4u;
            let indexB${t} = offsetB${t} / 4u;
            let componentA${t} = offsetA${t} % 4u;
            let componentB${t} = offsetB${t} % 4u;
            ${e}[${t}] = ${r}(${c(i,a)});
          `};y=9===d?`
            var data = vec4<u32>(0);
            ${e("data",0,"u32")}
            ${e("data",1,"u32")}
            ${e("data",2,"u32")}
            ${e("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e("outputData[global_idx]",0)}
            ${e("outputData[global_idx]",1)}
            ${e("outputData[global_idx]",2)}
            ${e("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(m,g,f)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`})(e,o,u,d,c,l,h,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(te.size(d)/4)},...tl(o,u,d)]})}})(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},rF=e=>{rH(e,"Add",(e,t)=>`${e}+${t}`)},rj=e=>{rH(e,"Div",(e,t)=>`${e}/${t}`)},rK=e=>{rH(e,"Equal",{scalar:(e,t)=>`u32(${e}==${t})`,vector:(e,t)=>`vec4<u32>(${e}==${t})`},void 0,void 0,9)},rQ=e=>{rH(e,"Mul",(e,t)=>`${e}*${t}`)},rZ=e=>{let t=tg("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;rH(e,"Pow",{scalar:(e,t)=>`pow_custom(${e},${t})`,vector:(e,t)=>`pow_vector_custom(${e},${t})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${"i32"===t?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},rX=e=>{rH(e,"Sub",(e,t)=>`${e}-${t}`)},rY=e=>{rH(e,"Greater",{scalar:(e,t)=>`u32(${e}>${t})`,vector:(e,t)=>`vec4<u32>(${e}>${t})`},void 0,void 0,9)},rJ=e=>{rH(e,"Less",{scalar:(e,t)=>`u32(${e}<${t})`,vector:(e,t)=>`vec4<u32>(${e}<${t})`},void 0,void 0,9)},r0=e=>{rH(e,"GreaterOrEqual",{scalar:(e,t)=>`u32(${e}>=${t})`,vector:(e,t)=>`vec4<u32>(${e}>=${t})`},void 0,void 0,9)},r1=e=>{rH(e,"LessOrEqual",{scalar:(e,t)=>`u32(${e}<=${t})`,vector:(e,t)=>`vec4<u32>(${e}<=${t})`},void 0,void 0,9)}}),nC=P(()=>{nl(),ng(),nm(),ny(),r2=(e,t)=>{let r=e.inputs,i=r[0].dims,a=te.normalizeAxis(t.axis,i.length);var n=r,s=a;if(!n||n.length<1)throw Error("too few inputs");let o=n[0],u=o.dataType,l=o.dims.length;n.forEach((e,t)=>{if(0!==t){if(e.dataType!==u)throw Error("input tensors should be one type");if(e.dims.length!==l)throw Error("input tensors should have the same shape");e.dims.forEach((e,t)=>{if(t!==s&&e!==o.dims[t])throw Error("non concat dimensions must match")})}});let d=i.slice();d[a]=r.reduce((e,t)=>e+(t.dims.length>a?t.dims[a]:0),0);let p=r.filter(e=>te.size(e.dims)>0);e.compute(((e,t,r,i)=>{let a=te.size(r),n=Array(e.length),s=Array(e.length),o=0,u=[],l=[],d=[{type:12,data:a}];for(let r=0;r<e.length;++r)o+=e[r].dims[t],n[r]=o,l.push(e[r].dims.length),s[r]=tg(`input${r}`,i,l[r]),u.push("rank"),d.push({type:12,data:n[r]});for(let t=0;t<e.length;++t)d.push(...tl(e[t].dims));d.push(...tl(r));let p=ty("output",i,r.length),c=p.indicesGet("indices",t),h=Array.from(Array(n.length).keys()).map(e=>`uniforms.sizeInConcatAxis${e}`).join(",");return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:t=>{let r,i;return`

  ${(()=>{t.registerUniform("outputSize","u32");for(let r=0;r<e.length;r++)t.registerUniform(`sizeInConcatAxis${r}`,"u32");return t.declareVariables(...s,p)})()}

  ${r=n.length,i=h,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${i});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${c});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${h});
      ${c} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));1===r?i.push(n):0===a?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)})(s,p)}
  }`}}})(p,a,d,r[0].dataType),{inputs:p})},r3=e=>e5({axis:e.axis})}),nE=P(()=>{nl(),ng(),r4=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${e.activation}`)}},r6=(e,t)=>{"Clip"===e.activation?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):"HardSigmoid"===e.activation?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):"LeakyRelu"===e.activation&&t.push({type:1,data:e.alpha})},r8=(e,t)=>{"Clip"===e.activation?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===e.activation?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===e.activation&&t.push({name:"alpha",type:"f32"})},r5=e=>{let t=e?.activation||"";if("HardSigmoid"===t){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}if("Clip"===t){let[r,i]=e?.activation_params||[ti,ta];return{activation:t,clipMax:i,clipMin:r}}if("LeakyRelu"===t){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),nz=P(()=>{r9=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw Error(`${e}-component is not supported.`)}},r7=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),nA=P(()=>{ie=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),nO=P(()=>{nl(),ng(),ny(),nE(),it=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((r,s)=>`
      if (${tf(t.shape,s,t.rank)} != 1) {
        ${t.indicesSet(e,s,tf(a,s+n,i))}
      } else {
        ${t.indicesSet(e,s,0)}
      }`).join("")}
`},ir=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],l=o[o.length-1],d=s[s.length-1],p=td(l),c=td(d),h=td(u),f=te.size(r)/p/h,m=e.length>2,g=i?i.slice(0,-2):r.slice(0,-2),y=[te.size(g),u,l],_=[{type:12,data:f},{type:12,data:u},{type:12,data:l},{type:12,data:d}];return r6(t,_),_.push(...tl(g,s,o)),m&&_.push(...tl(e[2].dims)),_.push(...tl(y)),{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${c};${h};${a}`,inputDependencies:m?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:_}),getShaderSource:i=>{let n=t$("batch_dims",e[0].dataType,g.length),u=tg("a",e[0].dataType,s.length,c),l=tg("b",e[1].dataType,o.length,p),d=ty("output",e[0].dataType,y.length,p),f=to(d.type.tensor),_=r4(t,d.type.value,f),$=[u,l],b="";if(m){let t=a?p:1;$.push(tg("bias",e[2].dataType,e[2].dims.length,t)),b=`${a?`value += bias[col / ${t}];`:`value += ${d.type.value}(bias[row + i]);`}`}let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return r8(t,v),`
  ${i.registerUniforms(v).registerInternalVariables(n).declareVariables(...$,d)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${2===r.length?"":`let batch_indices = ${n.offsetToIndices("batch")};`}

    var a_indices: ${u.type.indices};
    ${it("a_indices",u,u.rank-2,n.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${l.type.indices};
    ${it("b_indices",l,l.rank-2,n.rank,"batch_indices")}
    ${l.indicesSet("b_indices",l.rank-2,0)}
    ${l.indicesSet("b_indices",l.rank-1,0)}
    let b_offset = ${l.indicesToOffset("b_indices")};
    var values: array<${d.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${(()=>{let e=`var a_data: ${u.type.value};`;for(let t=0;t<c;t++)e+=`
              let b_data${t} = b[(b_offset + (k + ${t}) * uniforms.N + col) / ${p}];`;for(let t=0;t<h;t++){e+=`a_data = a[(a_offset + (row + ${t}) * uniforms.K + k) / ${c}];`;for(let r=0;r<c;r++)e+=`
            values[${t}] = fma(${l.type.value}(a_data${1===c?"":`[${r}]`}), b_data${r}, values[${t}]);
`}return e})()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${b}
      ${_}
      let cur_indices = ${d.type.indices}(batch, row + i, col);
      let offset = ${d.indicesToOffset("cur_indices")};
      ${d.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `}}}}),nR=P(()=>{nl(),ng(),ny(),nE(),nO(),nz(),ii=(e,t,r="f32",i,a=!1,n=32,s=!1,o=32)=>{let u,l,d,p,c=t[1]*e[1],h=t[0]*e[0],f=a?c:n,m=a?n:c,g=f/t[0],y=n/t[1];if(!((a&&4===g&&4===e[1]||!a&&(3===g||4===g))&&f%t[0]==0&&n%t[1]==0&&4===e[0]))throw Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f/g}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${h/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${c};

  let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${u=a,l=i,u?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${l?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${l?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===g?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${d=a,p=g,d?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===p?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===p?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===p?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ia=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,is=(e,t,r="f32",i,a=!1,n=32,s=!1,o=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=a?l:n,c=a?n:l;if(c%t[1]!=0||p%t[0]!=0||n%t[1]!=0)throw Error(`tileAHight ${c} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let h=c/t[1],f=p/t[0],m=n/t[1],g=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${c}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${ia(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${f};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${f}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${ia(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${a?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${c}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${g}
  }
`},io=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),l=o.slice(0,-2),d=i?i.slice(0,-2):r.slice(0,-2),p=te.size(d),c=s[s.length-2],h=s[s.length-1],f=o[o.length-1],m=h%4==0&&f%4==0,g=c<=8?[4,1,1]:[4,4,1],y=[8,8,1],_=[Math.ceil(f/y[0]/g[0]),Math.ceil(c/y[1]/g[1]),Math.ceil(p/y[2]/g[2])],$=m?4:1,b=[...u,c,h/$],v=b.length,w=[...l,h,f/$],x=w.length,S=[p,c,f/$],k=[{type:6,data:c},{type:6,data:f},{type:6,data:h}];r6(t,k),k.push(...tl(d,b,w));let T=["rank","rank"],I=e.length>2;return I&&(k.push(...tl(e[2].dims)),T.push("rank")),k.push(...tl(S)),{name:"MatMul",shaderCache:{hint:`${g};${t.activation};${m};${a}`,inputDependencies:T},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:k}),getShaderSource:r=>{let i=d.length,n=t$("batchDims",e[0].dataType,i,1),s=to(e[0].dataType),o=tg("a",e[0].dataType,v,$),u=tg("b",e[1].dataType,x,$),l=ty("result",e[0].dataType,S.length,$),p=[o,u];if(I){let t=a?$:1;p.push(tg("bias",e[2].dataType,e[2].dims.length,t))}let c=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];r8(t,c);let h=to(l.type.tensor),f=((e,t,r,i,a=!1)=>{let[n,s,o,u]=i,l=to(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${r9(e,l)} {
      var value = ${r9(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${it("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${r9(e,l)} {
      var value = ${r9(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${it("bIndices",o,o.rank-2,n.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${r9(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${r9(e,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})($,I,r4(t,l.type.value,h),[n,o,u,l],a);return`
  ${r.registerUniforms(c).registerInternalVariables(n).declareVariables(...p,l)}
  ${f}
  ${m?ii(g,y,s,n):is(g,y,s,n)}
                   `}}}}),nB=P(()=>{nl(),np(),ny(),nE(),nz(),nA(),nR(),iu=(e,t,r,i,a,n,s,o,u)=>{let l="NHWC"===t.format,d=l?e[0].dims[3]:e[0].dims[1],p=r[0],c=l?r[2]:r[3],h=l?r[1]:r[2],f=l?r[3]:r[1],m=l&&(d%4==0||d%3==0)&&f%4==0,g=l?f:c*h,y=l?c*h:f,_=[8,8,1],$=i<=8?[4,1,1]:[4,4,1],b=[Math.ceil(g/_[0]/$[0]),Math.ceil(y/_[1]/$[1]),Math.ceil(p/_[2]/$[2])];eZ("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let v=m?l&&d%4!=0?3:4:1,w=_[1]*$[1],x=_[0]*$[0],S=Math.max(_[0]*v,_[1]),k=i%w==0,T=a%x==0,I=n%S==0,C=m?[v,4,4]:[1,1,1],E=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];r6(t,E),E.push(...tl(e[0].dims,e[1].dims));let z=["rank","rank"];return s&&(E.push(...tl(e[2].dims)),z.push("rank")),E.push(...tl(r)),{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${v};${m};${k};${T};${I};${w};${x};${S}`,inputDependencies:z},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:E}),getShaderSource:i=>{let a=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];r8(t,a);let n=m?4:1,u=to(e[0].dataType),d=`
      fn setOutputAtIndex(flatIndex : i32, value : ${m?`vec4<${u}>`:u}) {
        result[flatIndex] = ${m?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${m?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${m?"/ 4":""}, value);
      }`,p=[tg("x",e[0].dataType,e[0].dims.length,3===v?1:v),tg("w",e[1].dataType,e[1].dims.length,n)],c=ty("result",e[0].dataType,r.length,n);if(s){let t=tg("bias",e[2].dataType,e[2].dims.length,n);p.push(t),d+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${m?`vec4<${u}>`:u} {
          return bias[coords.${l?"w":"y"}${m?"/ 4":""}];
        }`}return`
        ${ie("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${i.registerUniforms(a).declareVariables(...p,c)}
        ${d}
        ${((e,t,r,i,a=!1,n,s=4,o=4,u=4,l="f32")=>{let d=e=>{switch(e){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${e} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,c=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,h=e?"row":"col",f=e?"col":"row",m=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${h} / outWidth;
    let outCol = ${h} % outWidth;

    let WRow = ${f} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${f} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${f} % inChannels;
    var resData = ${r9(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(e=>{switch(e){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${e} is not supported.`)}})(s)}
    }
    return resData;`,g=e?t&&i?`
    let col = colIn * ${s};
    ${m}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${m}
    }
    return ${r9(s,l)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${m}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m}
    }
    return ${r9(s,l)}(0.0);`,y=e?i&&r?d(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${d(o)}
    }
    return ${r9(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${d(o)}
    }
    return ${r9(o,l)}(0.0);`,_=r9(u,l),$=e?r9(s,l):r9(o,l),b=e?r9(o,l):r9(s,l),v=r4(n,_,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${e?g:y}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${b} {
      ${e?y:g}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${_}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${c}
      ${r7(a)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(l,k,T,I,s,t,C[0],C[1],C[2],u)}
        ${m?ii($,_,u,void 0,!l,S):is($,_,u,void 0,!l,S,!1,void 0,o)}`}}}}),nN=P(()=>{nl(),np(),ng(),ny(),nE(),nz(),il=e=>"number"==typeof e?[e,e,e]:e,id=(e,t)=>t<=1?e:e+(e-1)*(t-1),ip=(e,t,r,i,a)=>{null==a&&(a=((e,t,r,i=1)=>{let a=id(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)})(e,t[0],i[0]));let n=[0,0,0,r];for(let r=0;r<3;r++)e[r]+2*a>=t[r]&&(n[r]=Math.trunc((e[r]-t[r]+2*a)/i[r]+1));return n},ic=(e,t,r,i,a,n=!1,s="channelsLast")=>{let o,u,l,d,p;if("channelsLast"===s)[o,u,l,d,p]=e;else if("channelsFirst"===s)[o,p,u,l,d]=e;else throw Error(`Unknown dataFormat ${s}`);let[c,,h,f,m]=t,[g,y,_]=il(r),[$,b,v]=il(i),w=id(h,$),x=id(f,b),S=id(m,v),{padInfo:k,outDepth:T,outHeight:I,outWidth:C}=((e,t,r,i,a,n,s,o,u,l)=>{let d,p,c,h;if("VALID"===e&&(e=0),"number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let f=ip([t,r,i,1],[o,u,l],1,[a,n,s],e);p=f[0],c=f[1],h=f[2]}else if(Array.isArray(e)){if(!e.every((e,t,r)=>e===r[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let f=ip([t,r,i,1],[o,u,l],1,[a,n,s],e[0]);p=f[0],c=f[1],h=f[2]}else if("SAME_UPPER"===e){p=Math.ceil(t/a),c=Math.ceil(r/n),h=Math.ceil(i/s);let e=(p-1)*a+o-t,f=(c-1)*n+u-r,m=(h-1)*s+l-i,g=Math.floor(e/2),y=Math.floor(f/2),_=Math.floor(m/2);d={top:y,bottom:f-y,left:_,right:m-_,front:g,back:e-g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:c,outWidth:h}})(a,u,l,d,g,y,_,w,x,S),E=n?c*p:c,z=[0,0,0,0,0];return"channelsFirst"===s?z=[o,E,T,I,C]:"channelsLast"===s&&(z=[o,T,I,C,E]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:T,outHeight:I,outWidth:C,outChannels:E,padInfo:k,strideDepth:g,strideHeight:y,strideWidth:_,filterDepth:h,filterHeight:f,filterWidth:m,effectiveFilterDepth:w,effectiveFilterHeight:x,effectiveFilterWidth:S,dilationDepth:$,dilationHeight:b,dilationWidth:v,inShape:e,outShape:z,filterShape:t}},ih=(e,t,r,i,a,n)=>{let s="channelsLast"===n,o=[Math.ceil((e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t})((s?e[0].dims[3]:e[0].dims[1],{x:r.map((e,t)=>t)}).x.map(e=>r[e]))/64),1,1];eZ("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${o}`);let u=[{type:12,data:te.size(r)},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];r6(t,u),u.push(...tl(e[0].dims,e[1].dims));let l=["rank","rank"],d=3===e.length;return d&&(u.push(...tl(e[2].dims)),l.push("rank")),u.push(...tl(r)),{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};1;${d}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:o[0],y:o[1],z:o[2]},programUniforms:u}),getShaderSource:n=>{let o=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];r8(t,o);let u=to(e[0].dataType),l=tg("x",e[0].dataType,e[0].dims.length,1),p=tg("W",e[1].dataType,e[1].dims.length,1),c=[l,p],h=ty("result",e[0].dataType,r.length,1),f="";if(d){let t=tg("bias",e[2].dataType,e[2].dims.length,1);c.push(t),f+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u} {
          return bias[${s?tf("coords",4,5):tf("coords",1,5)}];
        }`}let m=r9(1,u),g=r4(t,m,u);return`
            ${f}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${l.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${p.getByIndices("aIndices")};
            }
          ${n.registerUniforms(o).declareVariables(...c,h)}
          ${n.mainStart()}
          ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${h.offsetToIndices("global_idx")};
              let batch = ${tf("coords",0,l.rank)};
              let d2 = ${s?tf("coords",l.rank-1,l.rank):tf("coords",1,l.rank)};
              let xFRCCorner = vec3<u32>(${s?tf("coords",1,l.rank):tf("coords",2,l.rank)},
              ${s?tf("coords",2,l.rank):tf("coords",3,l.rank)},
              ${s?tf("coords",3,l.rank):tf("coords",4,l.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?tf("uniforms.x_shape",1,l.rank):tf("uniforms.x_shape",2,l.rank)};
              let xShapeZ = ${s?tf("uniforms.x_shape",2,l.rank):tf("uniforms.x_shape",3,l.rank)};
              let xShapeW = ${s?tf("uniforms.x_shape",3,l.rank):tf("uniforms.x_shape",4,l.rank)};
              let xShapeU = ${s?tf("uniforms.x_shape",4,l.rank):tf("uniforms.x_shape",1,l.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${d?"value = value + getBiasByOutputCoords(coords)":""};
              ${g}
              result[global_idx] = f32(value);
          }`}}}}),nM=P(()=>{nl(),ng(),ny(),nE(),im=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u="NHWC"===t.format,l=u?r[3]:r[1],d=l/t.group,p=u&&d>=4?td(l):1,c=te.size(r)/p,h=[{type:12,data:c},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];return r6(t,h),h.push(...tl(s,[o[0],o[1],o[2],o[3]/p])),h.push(...tl([r[0],r[1],r[2],r[3]/p])),{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:a?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:i=>{let l=ty("output",e[0].dataType,r.length,p),d=to(l.type.tensor),c=r4(t,l.type.value,d),h=tg("x",e[0].dataType,s.length),f=tg("w",e[1].dataType,o.length,p),m=[h,f];a&&m.push(tg("b",e[2].dataType,e[2].dims,p));let g=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];r8(t,g);let y=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${h.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${f.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${h.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${f.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${i.registerUniforms(g).declareVariables(...m,l)}

  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${l.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${l.type.value} = ${l.type.value}(0);
    ${y}
    ${n}
    ${c}
    ${l.setByOffset("global_idx","value")}
  }`}}},ig=(e,t,r,i)=>{let a=e.length>2,n=td(r[3]),s=td(r[2]),o=te.size(r)/n/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],d=[r[0],r[1],r[2],r[3]/n],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];r6(t,p),p.push(...tl(u,l,d));let c=(s-1)*t.strides[1]+l[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${c};${l[0]};${l[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:r=>{let i=ty("output",e[0].dataType,d.length,n),o=to(i.type.tensor),p=r4(t,i.type.value,o),h=tg("x",e[0].dataType,u.length,n),f=tg("w",e[1].dataType,l.length,n),m=[h,f];a&&m.push(tg("b",e[2].dataType,e[2].dims,n));let g=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return r8(t,g),`
  ${r.registerUniforms(g).declareVariables(...m,i)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${h.type.value}, ${c}>;
    var values: array<${i.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${h.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${h.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${f.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${a?"value += b[output_channel];":""}
      ${p}
      ${i.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),nD=P(()=>{ng(),nB(),nN(),nR(),nM(),nE(),nO(),n_(),iy=[2,3,1,0],i_=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let e=2;e<t[1].dims.length;++e)0===r[e-2]&&(r[e-2]=t[1].dims[e]);let i=e.pads.slice();tt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,"NHWC"===e.format,e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},i$=e=>{let t=r5(e),r=e.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],format:r,dilations:e.dilations,group:e.group,kernelShape:e.kernel_shape,pads:e.pads,strides:e.strides,wIsConst:e.w_is_const(),...t,cacheKey:`${e.format};${t.activation};`}},ib=(e,t,r,i)=>{var a,n,s,o,u,l;let d,p,c,h,f,m,g="NHWC"===r.format,y=(a=t[0].dims,n=t[1].dims,s=r.dilations,o=r.pads,u=r.strides,l=g,d=a[0],c=(p=a.slice(l?1:2,l?3:4)).length,h=n[0],f=n.slice(2).map((e,t)=>e+(e-1)*(s[t]-1)),(m=p.map((e,t)=>e+o[t]+o[t+c]).map((e,t)=>Math.floor((e-f[t]+u[t])/u[t]))).splice(0,0,d),m.splice(l?3:1,0,h),m);if(1!==r.group){let a=[t[0]];if(g){let i=e.kernelCustomData.wT??e.compute(tx(t[1],iy),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),a.push(i)}else a.push(t[1]);3===t.length&&a.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&g&&t[1].dims[0]===r.group&&1===t[1].dims[1]&&1===r.dilations[0]&&1===r.dilations[1]?e.compute(ig(a,r,y,i),{inputs:a}):e.compute(im(a,r,y,i),{inputs:a});return}let _=3===t.length,$=t[0].dims[g?1:2],b=t[0].dims[g?2:3],v=t[0].dims[g?3:1],w=t[1].dims[2],x=t[1].dims[3],S=y[g?1:2],k=y[g?2:3],T=y[g?3:1],I=g&&w===$&&x===b&&0===r.pads[0]&&0===r.pads[1];if(I||1===w&&1===x&&1===r.dilations[0]&&1===r.dilations[1]&&1===r.strides[0]&&1===r.strides[1]&&0===r.pads[0]&&0===r.pads[1]){let a=y[0],n,s,o,u=[];if(g){let i=e.kernelCustomData.wT??e.compute(tx(t[1],iy),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i),I){let e=$*b*v;n=t[0].reshape([1,a,e]),s=i.reshape([1,e,T]),o=[1,a,T]}else n=t[0].reshape([a,$*b,v]),s=i.reshape([1,v,T]),o=[a,S*k,T];u.push(n),u.push(s)}else n=t[0].reshape([a,v,$*b]),s=t[1].reshape([1,T,v]),o=[a,T,S*k],u.push(s),u.push(n);_&&u.push(t[2]);let l=o[2],d=u[0].dims[u[0].dims.length-1];l<8&&d<8?e.compute(ir(u,r,y,o,g,i),{inputs:u}):e.compute(io(u,r,y,o,g,i),{inputs:u});return}let C=e.kernelCustomData.wT??e.compute(tx(t[1],iy),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=C);let E=[t[0],C];_&&E.push(t[2]);let z=g?S*k:T,A=g?T:S*k,O=w*x*v;e.compute(iu(E,r,y,z,A,O,_,!0,i),{inputs:E})},iv=(e,t)=>{var r,i,a,n,s;if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[1]*t.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===e.length&&(1!==e[2].dims.length||e[1].dims[0]!==e[2].dims[0]))throw Error("invalid bias");let r=e[0].dims.length-2;if(t.dilations.length!==r)throw Error(`dilations should be ${r}D`);if(t.strides.length!==r)throw Error(`strides should be ${r}D`);if(t.pads.length!==2*r)throw Error(`pads should be ${2*r}D`);if(0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape")})(e.inputs,t),3===e.inputs[0].dims.length){let a,n,s,o,u,l,d;r=e,a="NHWC"===(i=t).format,n=[r.inputs[0].reshape(a?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])],3===r.inputs.length&&n.push(r.inputs[2]),s=[0,i.pads[0],0,i.pads[1]],o=[1].concat(i.strides),u=[1].concat(i.dilations),l=[1].concat(i.kernelShape),d=i_({...i,pads:s,strides:o,dilations:u,kernelShape:l},n),ib(r,n,d,e=>a?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else if(5===e.inputs[0].dims.length){let r,i,o,u;a=e,n=e.inputs,r="NHWC"===(s=t).format?"channelsLast":"channelsFirst",i=i_(s,n),o="NOTSET"===s.autoPad?s.pads:s.autoPad,u=ic(n[0].dims,n[1].dims,s.strides,s.dilations,o,!1,r),a.compute(ih(n,i,u.outShape,[u.filterDepth,u.filterHeight,u.filterWidth],[u.padInfo.front,u.padInfo.top,u.padInfo.left],r))}else{let r=i_(t,e.inputs);ib(e,e.inputs,r)}}}),nP=P(()=>{nl(),np(),ng(),ny(),iw=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n="NHWC"===t.format,s=t.group,o=e[1].dims,u=o[2]/s,l=o[3],d=n?td(u):1,p=n?td(l):1,c=n?1===l?d:p:1,h=te.size(a)/p,f=[Math.ceil(h/64),1,1];eZ("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${f}`);let m=["rank","rank"],g=[t.strides[0],t.strides[1]],y=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],_=[t.dilations[0],t.dilations[1]],$=[y[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),y[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],b=[$[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),$[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],v=[{type:12,data:h},{type:12,data:g},{type:12,data:y},{type:12,data:_},{type:12,data:$},{type:6,data:b},{type:12,data:u},{type:12,data:l},...tl(e[0].dims,e[1].dims)];return i&&(v.push(...tl(e[2].dims)),m.push("rank")),v.push(...tl(a)),{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${c}${p}${1===l}`,inputDependencies:m},getRunData:()=>({dispatchGroup:{x:f[0],y:f[1],z:f[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:v}),getShaderSource:t=>{let r=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:g.length},{name:"filter_dims",type:"u32",length:y.length},{name:"dilations",type:"u32",length:y.length},{name:"effective_filter_dims",type:"u32",length:$.length},{name:"pads",type:"i32",length:b.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],s=to(e[0].dataType),o=n?1:2,u=n?2:3,h=n?3:1,f=tg("W",e[1].dataType,e[1].dims.length,c),m=tg("Dy",e[0].dataType,e[0].dims.length,d),_=[m,f];i&&_.push(tg("bias",e[2].dataType,[a[h]].length,p));let v=ty("result",e[0].dataType,a.length,p),w=`
            let outputIndices = ${v.offsetToIndices(`global_idx * ${p}`)};
            let batch = ${v.indicesGet("outputIndices",0)};
            let d1 = ${v.indicesGet("outputIndices",h)};
            let r = ${v.indicesGet("outputIndices",o)};
            let c = ${v.indicesGet("outputIndices",u)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${v.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${o}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }

              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${u}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${d}) {
                  let xValue = ${n?m.getByOffset(`${m.indicesToOffset(`${m.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):m.get("batch","inputChannel","idyR","idyC")};
                  ${(()=>{let e="";if(1===d)e+=`
        let w_offset = ${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${f.getByOffset(`w_offset / ${c}`)};
        dotProd = dotProd + xValue * wValue;`;else if(1===l)e+=`
          let wValue = ${f.getByOffset(`${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${c}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let t=0;t<d;t++)e+=`
            let wValue${t} = ${f.getByOffset(`${f.indicesToOffset(`${f.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${t}, wOutChannel)`)} / ${c}`)};
            dotProd = dotProd + xValue[${t}] * wValue${t};`;return e})()}
                  inputChannel = inputChannel + ${d};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${p}]`:""};
            ${v.setByOffset("global_idx","value")};
          `;return`
    ${t.registerUniforms(r).declareVariables(..._,v)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${w}}`}}}}),nU=P(()=>{nP(),nE(),n_(),ix=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,iS=(e,t,r,i,a)=>{let n=Math.floor(e/2);"SAME_UPPER"===t?(r[i]=n,r[a]=e-n):"SAME_LOWER"===t&&(r[i]=e-n,r[a]=n)},ik=(e,t)=>{let r=e.kernelShape.slice();if(0===e.kernelShape.length||0===e.kernelShape.reduce((e,t)=>e*t,1)){r.length=0;for(let e=2;e<t[1].dims.length;++e)r.push(t[1].dims[e])}let i="NHWC"===e.format;r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();0===u.reduce((e,t)=>e+t,0)&&(u=Array(t[0].dims.length-2).fill(1));let l=e.strides.slice();0===l.reduce((e,t)=>e+t,0)&&(l=Array(t[0].dims.length-2).fill(1)),((e,t,r,i,a,n,s,o,u,l)=>{let d=e.length-2,p=0===l.length;u.length<d&&u.push(...Array(d-u.length).fill(0));let c=e[0],h=t[o?3:1]*a;for(let a=0,c=e.length-d-!!o;a<d;++a,++c){let o=e[c],h=p?o*s[a]:l[a];iS(ix(o,s[a],n[a],t[c],r[a],h),i,n,a,a+d),p&&l.push(s[a]*(o-1)+u[a]+(t[c]-1)*r[a]+1-n[a]-n[a+d])}l.splice(0,0,c),l.splice(o?3:1,0,h)})(o,r,u,e.autoPad,e.group,a,l,i,s,n);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:u,strides:l}),d},iT=e=>{let t=r5(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group,s=e.kernelShape,o=e.pads,u=e.strides,l=e.wIsConst();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:e.outputPadding,outputShape:e.outputShape,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},iI=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(tx(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];3===t.length&&n.push(t[2]),e.compute(iw(n,r,i),{inputs:n})},iC=(e,t)=>{if(((e,t)=>{if(!e||2!==e.length&&3!==e.length)throw Error("Conv requires 2 or 3 inputs");if(4!==e[0].dims.length&&3!==e[0].dims.length)throw Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw Error("filter does not have same dimension as input");if(e[0].dims["NHWC"===t.format?e[0].dims.length-1:1]!==e[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let r=e[1].dims[1]*t.group;if(3===e.length&&(1!==e[2].dims.length||e[2].dims[0]!==r))throw Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((e,t)=>e+t,0)>0&&t.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(t.strides.reduce((e,t)=>e+t,0)>0&&t.strides.length!==i)throw Error(`strides should be ${i}D`);if(t.pads.reduce((e,t)=>e+t,0)>0&&t.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(t.outputPadding.length!==i&&0!==t.outputPadding.length)throw Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((e,t)=>e+t,0)>0&&0!==t.kernelShape.length&&t.kernelShape.length!==e[1].dims.length-2)throw Error("invalid kernel shape");if(0!==t.outputShape.length&&t.outputShape.length!==e[0].dims.length-2)throw Error("invalid output shape")})(e.inputs,t),3===e.inputs[0].dims.length){var r,i;let a,n,s,o,u,l,d,p;r=e,a="NHWC"===(i=t).format,n=[r.inputs[0].reshape(a?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])],3===r.inputs.length&&n.push(r.inputs[2]),(0===(s=i.kernelShape).length||0===s[0])&&(s=[r.inputs[1].dims[2]]),(0===(o=i.dilations).length||0===o[0])&&(o=[1]),(0===(u=i.strides).length||0===u[0])&&(u=[1]),0===(l=i.pads).length&&(l=[0,0]),l=[0,l[0],0,l[1]],u=[1].concat(u),o=[1].concat(o),s=[1].concat(s),d=[0].concat(d=i.outputPadding),p=ik({...i,pads:l,strides:u,dilations:o,kernelShape:s,outputPadding:d},n),iI(r,n,p,e=>a?[e[0],e[2],e[3]]:[e[0],e[1],e[3]])}else{let r=ik(t,e.inputs);iI(e,e.inputs,r)}}}),nW=P(()=>{nl(),ng(),nm(),ny(),iE=(e,t)=>{var r,i,a,n;let s,o,u,l,d,p,c=e.inputs[0].dims,h=e.inputs[0].dataType,f=e.inputs[1];e.compute((r=h,i=c,a=f,n=t,s=te.size(i),o=i.length,u=tg("input",r,o),l=ty("output",r,o),d=6===a.dataType?a.getInt32Array()[0]:Number(a.getBigInt64Array()[0]),p=te.normalizeAxis(d,o),{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},{type:12,data:p},...tl(i,i)]}),getShaderSource:e=>{let t=` i32(${u.indicesGet("inputIndices","uniforms.axis")}) `,r=tf("uniforms.input_shape","uniforms.axis",o),i=n.reverse?t+(n.exclusive?" + 1":""):"0",a=n.reverse?r:t+(n.exclusive?"":" + 1");return`
                ${e.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(u,l)}
                ${e.mainStart()}
                  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${i};
                  let last : i32 = ${a};
                  for (var i : i32 = first; i < last; i++) {
                    ${u.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${u.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},iz=e=>{let t=1===e.exclusive,r=1===e.reverse;return e5({exclusive:t,reverse:r})}}),nq=P(()=>{nl(),ng(),nm(),ny(),iA=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p,c,h,f,m,g,y;(e=>{if(!e||1!==e.length)throw Error("DepthToSpace requires 1 input.");if(4!==e[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(e.inputs),e.compute((r=e.inputs[0],d="NHWC"===(i=t).format,p=i.blocksize,c="DCR"===i.mode,d?([a,n,s,o]=r.dims,u=c?[a,n,s,p,p,o/p**2]:[a,n,s,o/p**2,p,p],l=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([a,n,s,o]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],u=c?[a,p,p,o/p**2,n,s]:[a,o/p**2,p,p,n,s],l=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]),f=(h=r.reshape(u)).dims.length,m=r.dataType,g=tg("a",m,f),y=ty("output",m,f),{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${i.blocksize};${i.mode}`,inputDependencies:["rank"]},getRunData:e=>{let t=d?[a,n*p,s*p,o/p**2]:[a,o/p**2,n*p,s*p],r=te.size(t),i=h.dims,u=te.sortBasedOnPerm(i,l);return{outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...tl(i,u)]}},getShaderSource:e=>`
  ${e.registerUniform("output_size","u32").declareVariables(g,y)}

  ${((e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)a.push(r.indicesSet("a",e[i],`i[${i}]`));return a.push("return a;}"),a.join(`
`)})(l,f,g,y)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`}))},iO=e=>e5({blocksize:e.blocksize,mode:e.mode,format:e.format})}),nL=P(()=>{nl(),ng(),nm(),ny(),iN="^"+(iB="("+(iR="[a-zA-Z]|\\.\\.\\.")+")+")+"$",iM="^"+("("+iB+",)*")+iB+"$",iD=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);void 0===r?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},iP=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(iM)))throw Error("Invalid LHS term");if(r.split(",").forEach((t,r)=>{let i=e[r].dims.slice();if(!t.match(RegExp(iN)))throw Error("Invalid LHS term");let a=this.processTerm(t,!0,i,r);this.lhs.push(a)}),""===i)i+=[...this.symbolToInfo.entries()].filter(([e,t])=>1===t.count||"..."===e).map(([e])=>e).join("");else if(!i.match(RegExp(iB)))throw Error("Invalid RHS");i.match(RegExp(iR,"g"))?.forEach(e=>{if("..."===e)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let t=this.symbolToInfo.get(e);if(void 0===t)throw Error("Invalid RHS symbol");this.outputDims.push(t.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(void 0!==i){if(i.dimValue!==t&&1!==i.count)throw Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],o=0;if(!e.match(RegExp(iN))&&!t&&""!==e)throw Error("Invalid LHS term");let u=e.match(RegExp(iR,"g")),l=new iD(i);return u?.forEach((e,d)=>{if("..."===e){if(n)throw Error("Only one ellipsis is allowed per input term");n=!0;let e=a-u.length+1;if(e<0)throw Error("Ellipsis out of bounds");if(s=r.slice(o,o+e),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw Error("Ellipsis must be specified in the LHS");for(let e=0;e<s.length;e++){let t=String.fromCharCode(48+e);l.addSymbol(t,d+e),this.addSymbol(t,r[o++],i)}}else l.addSymbol(e,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(e,r[o++],i)}),l}},iU=(e,t)=>{var r,i,a,n;let s,o,u,l,d=new iP(e.inputs,t.equation),p=d.outputDims,c=e.inputs.map((e,t)=>e.dims);e.compute((r=c,i=e.inputs[0].dataType,a=d,n=p,s=r.map(e=>e.length).map((e,t)=>tg(`input${t}`,i,e)),o=te.size(n),u=ty("output",i,n.length),l=[...a.symbolToInfo.keys()].filter(e=>!a.rhs.symbolToIndices.has(e)),{name:"Einsum",shaderCache:{hint:a.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let e=l.filter(e=>a.symbolToInfo.has(e)).map(e=>({type:12,data:a.symbolToInfo.get(e)?.dimValue||0}));e.push({type:12,data:o});let t=r.map((e,t)=>[...tl(e)]).reduce((e,t)=>e.concat(t),e);return t.push(...tl(n)),{outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:t}},getShaderSource:e=>{let t=[],r=[],i=[],n=[],o=[],d=a.symbolToInfo.size===a.rhs.symbolToIndices.size;a.symbolToInfo.forEach((e,l)=>{if(a.rhs.symbolToIndices.has(l)){let r=a.rhs.symbolToIndices.get(l)?.[0];void 0!==r&&a.lhs.forEach((i,a)=>{if(e.inputIndices.includes(a)){let e=i.symbolToIndices.get(l);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{t.push(`${s[a].indicesSet(`input${a}Indices`,e,u.indicesGet("outputIndices",r))}`)})}})}else a.lhs.forEach((t,i)=>{if(e.inputIndices.includes(i)){let e=t.symbolToIndices.get(l);if(void 0===e)throw Error("Invalid symbol error");e.forEach(e=>{r.push(`${s[i].indicesSet(`input${i}Indices`,e,`${l}`)}`)}),o.push(`prod *= ${s[i].getByIndices(`input${i}Indices`)};`)}}),i.push(`for(var ${l}: u32 = 0; ${l} < uniforms.${l+"_max"}; ${l}++) {`),n.push("}")});let p=d?[...t,`let sum = ${s.map((e,t)=>e.getByIndices(`input${t}Indices`)).join(" * ")};`]:[...t,"var sum = 0.0;",...i,...r,"var prod = 1.0;",...o,"sum += prod;",...n];return`
            ${e.registerUniforms(l.map(e=>({name:`${e+"_max"}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,u)}

            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${s.map((e,t)=>`var input${t}Indices: ${s[t].type.indices};`).join(`
`)}
            ${p.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`}}))},iW=e=>{let t=e.equation.replace(/\s+/g,"");return e5({equation:t})}}),nV=P(()=>{nl(),ng(),ny(),iq=(e,t)=>{let r=e.length-t.length,i=[];for(let t=0;t<r;++t)i.push(e[t]);for(let a=0;a<t.length;++a)i.push(1===t[a]?e[a+r]:t[a]);return i},iL=e=>{var t;let r,i,a,n,s,o,u,l,d,p;(e=>{if(!e||2!==e.length)throw Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&1!==r[i]&&1!==t[a])throw Error("Expand requires shape to be broadcastable to input")})(e.inputs),e.compute((n=(r=a=(t=e.inputs)[0].dims,i=Array.from(t[1].getBigInt64Array(),Number),r.length>i.length?iq(r,i):iq(i,r)),o=9===(s=t[0].dataType)||1===te.size(a),u=9===s||a.length>0&&a[a.length-1]%4==0?4:1,l=o||n.length>0&&n[n.length-1]%4==0?4:1,p=[{type:12,data:d=Math.ceil(te.size(n)/l)},...tl(a,n)],{name:"Expand",shaderCache:{hint:`${n.length};${u}${l}`,inputDependencies:["rank"]},getShaderSource:e=>{let t=tg("input",s,a.length,u),r=ty("output",s,n.length,l),i;if(9===s){let e=(e,i,a="")=>`
          let outputIndices${i} = ${r.offsetToIndices(`outputOffset + ${i}u`)};
          let offset${i} = ${t.broadcastedIndicesToOffset(`outputIndices${i}`,r)};
          let index${i} = offset${i} / 4u;
          let component${i} = offset${i} % 4u;
          ${e}[${i}] = ${a}(${t.getByOffset(`index${i}`)}[component${i}]);
        `;i=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${e("data",0,"u32")}
        ${e("data",1,"u32")}
        ${e("data",2,"u32")}
        ${e("data",3,"u32")}
        ${r.setByOffset("global_idx","data")}
      }`}else i=`
        let outputIndices = ${r.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${t.broadcastedIndicesToOffset("outputIndices",r)};
        let data = ${r.type.value}(${t.getByOffset(`inputOffset / ${u}`)});
        ${r.setByOffset("global_idx","data")}
      }`;return`
    ${e.registerUniform("vec_size","u32").declareVariables(t,r)}
    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${i}`},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p})}),{inputs:[0]})}}),nG=P(()=>{nl(),ng(),ny(),nk(),iV=e=>{var t;let r,i,a,n;e.inputs.length<2||0===te.size(e.inputs[1].dims)?rU(e):e.compute((r=(t=e.inputs)[0].dataType,i=te.size(t[0].dims),n=(a=te.size(t[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:e=>{let t=tg("x",r,[1],4),i=tg("bias",r,[1],4),a=ty("y",r,[1],4),s=e=>`
      let bias${e}_offset: u32 = (global_idx * 4 + ${e}) % uniforms.bias_size;
      let bias${e} = ${i.getByOffset(`bias${e}_offset / 4`)}[bias${e}_offset % 4];`,o=n?`
      let bias = ${i.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${s(0)}${s(1)}${s(2)}${s(3)}
      let bias = ${t.type.value}(bias0, bias1, bias2, bias3);`;return`${e.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(t,i,a)}

    ${rD(tu(r))}

    ${e.mainStart(tn)}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${t.getByOffset("global_idx")};
      ${o}
      let x_in = x + bias;
      ${a.setByOffset("global_idx",rP("x_in"))}
    }`},getRunData:e=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],programUniforms:[{type:12,data:Math.ceil(i/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(i/tn/4)}})}))}}),nH=P(()=>{nl(),ng(),nm(),ny(),iG=e=>e5({axis:e.axis}),iH=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p,c;(e=>{if(!e||2!==e.length)throw Error("Gather requires 2 inputs.")})(e.inputs),e.compute((r=e.inputs,i=t,a=r[0].dims,n=r[1].dims,s=a.length,o=te.normalizeAxis(i.axis,s),(u=a.slice(0)).splice(o,1,...n),l=a[o],d=9===r[0].dataType?4:1,c=[{type:12,data:p=Math.ceil(te.size(u)/d)},{type:6,data:l},{type:12,data:o},...tl(r[0].dims,r[1].dims,u)],{name:"Gather",shaderCache:{hint:i.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:e=>{let t=tg("data",r[0].dataType,r[0].dims.length,d),i=tg("inputIndices",r[1].dataType,r[1].dims.length),a=ty("output",r[0].dataType,u.length,d),l=e=>{let r=n.length,a=`var indicesIndices${e}  = ${i.type.indices}(0);`;for(let t=0;t<r;t++)a+=`${r>1?`indicesIndices${e}[${t}]`:`indicesIndices${e}`} = ${u.length>1?`outputIndices${e}[uniforms.axis + ${t}]`:`outputIndices${e}`};`;a+=`
          var idx${e} = ${i.getByIndices(`indicesIndices${e}`)};
          if (idx${e} < 0) {
            idx${e} = idx${e} + uniforms.axisDimLimit;
          }
          var dataIndices${e} : ${t.type.indices};
        `;for(let t=0,i=0;t<s;t++)t===o?(a+=`${s>1?`dataIndices${e}[${t}]`:`dataIndices${e}`} = u32(idx${e});`,i+=r):(a+=`${s>1?`dataIndices${e}[${t}]`:`dataIndices${e}`} = ${u.length>1?`outputIndices${e}[${i}]`:`outputIndices${e}`};`,i++);return a},p;if(9===r[0].dataType){let e=(e,r,i="")=>`
          let outputIndices${r} = ${a.offsetToIndices(`outputOffset + ${r}u`)};
          ${l(r)};
          let offset${r} = ${t.indicesToOffset(`dataIndices${r}`)};
          let index${r} = offset${r} / 4u;
          let component${r} = offset${r} % 4u;
          ${e}[${r}] = ${i}(${t.getByOffset(`index${r}`)}[component${r}]);
        `;p=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${e("value",0,"u32")}
        ${e("value",1,"u32")}
        ${e("value",2,"u32")}
        ${e("value",3,"u32")}
        ${a.setByOffset("global_idx","value")}
      `}else p=`
      let outputIndices = ${a.offsetToIndices("global_idx")};
      ${l("")};
      let value = ${t.getByIndices("dataIndices")};
      ${a.setByOffset("global_idx","value")};
      `;return`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(t,i,a)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${p}
      }`}}))}}),nF=P(()=>{nl(),ng(),ny(),iF=(e,t)=>{var r,i,a,n,s,o;let u,l,d=e.inputs,p=d[0].dims,c=d[0].dataType,h=d[1].dims,f=h[h.length-1],m=te.sizeToDimension(h,h.length-1),g=te.sizeFromDimension(p,t.batchDims+f),y=te.sizeToDimension(p,t.batchDims),_=te.sizeFromDimension(p,t.batchDims),$=Array(f),b=g;for(let e=0;e<f;++e)$[f-1-e]=b,b*=p[t.batchDims+f-1-e];let v=(r=e,i=d[1],a=$,n=t.batchDims,s=p,u=[{type:12,data:o=m},{type:12,data:n},{type:12,data:s},{type:12,data:a},{type:12,data:m/y},{type:12,data:_},{type:12,data:f}],l=[o],u.push(...tl(i.dims,l)),r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${s.length}_${a.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:e=>{let t=tg("indices_data",i.dataType,i.dims.length),r=ty("input_slice_offsets_data",12,1,1),n=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:s.length},{name:"sizes_from_slice_dims_data",type:"u32",length:a.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${e.registerUniforms(n).declareVariables(t,r)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${1===s.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===a.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[i],outputs:[-1]})[0]),w=t.batchDims+f;if(w>p.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let x=h.slice(0,-1).concat(p.slice(w)),S=te.size(x),k=[{type:12,data:S},{type:12,data:g},...tl(d[0].dims,v.dims,x)];e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:c}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:k}),getShaderSource:e=>{let t=tg("data",d[0].dataType,d[0].dims.length),r=tg("slice_offsets",12,v.dims.length),i=ty("output",d[0].dataType,x.length);return`
          ${e.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(t,r,i)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[d[0],v]})},ij=e=>({batchDims:e.batch_dims,cacheKey:""})}),nj=P(()=>{nl(),ng(),nm(),ny(),iK=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p,c,h;((e,t)=>{if(e.length<3||e.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=te.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=4===e.length?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((e,t)=>t===r?Math.ceil(e/i)===n.dims[t]:e===n.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((e,t)=>e===n.dims[t]).reduce((e,t)=>e&&t,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(e.inputs,t),e.compute((r=e.inputs,i=t,a=r[0].dims,n=r[1].dims,s=a.length,o=te.normalizeAxis(i.gatherAxis,s),u=te.normalizeAxis(i.quantizeAxis,s),(l=a.slice(0)).splice(o,1,...n),d=te.size(l),p=r[2].dataType,c=22===r[0].dataType,h=[{type:12,data:d},{type:12,data:u},{type:12,data:o},{type:12,data:i.blockSize},...tl(...r.map((e,t)=>e.dims),l)],{name:"GatherBlockQuantized",shaderCache:{hint:`${i.cacheKey};${r.filter((e,t)=>1!==t).map(e=>e.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(e,t)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:e=>{let t=tg("data",r[0].dataType,r[0].dims.length),i=tg("inputIndices",r[1].dataType,r[1].dims.length),s=tg("scales",r[2].dataType,r[2].dims.length),u=r.length>3?tg("zeroPoint",r[3].dataType,r[3].dims.length):void 0,d=ty("output",p,l.length),h=[t,i,s];return u&&h.push(u),`
        ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...h,d)}
        ${e.mainStart()}
        let output_indices = ${d.offsetToIndices("global_idx")};
        var indices_indices = ${i.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${d.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${i.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${d.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${t.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${d.indicesGet("output_indices","i")};
          ${t.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${i.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${a[o]};
        }
        ${t.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${d.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${t.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${t.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${t.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${s.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${s.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${s.getByIndices("scale_indices")};
        ${u?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${u.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${u.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tu(p)}(quantized_data - zero_point) * scale;
        ${d.setByOffset("global_idx","dequantized_data")};
    }`}}))},iQ=e=>e5({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),nK=P(()=>{nl(),ng(),nm(),ny(),iZ=e=>e5({axis:e.axis}),iX=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p,c,h,f,m,g;(e=>{if(!e||2!==e.length)throw Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(e.inputs),e.compute((r=e.inputs,i=t,a=r[0].dims,n=r[0].dataType,s=a.length,o=r[1].dims,u=r[1].dataType,d=a[l=te.normalizeAxis(i.axis,s)],p=o.slice(0),c=te.size(p),h=tg("input",n,s),f=tg("indicesInput",u,o.length),m=ty("output",n,p.length),(g=[{type:12,data:c},{type:6,data:d},{type:12,data:l}]).push(...tl(a,o,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:g}),getShaderSource:e=>`
      ${e.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,f,m)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}))}}),nQ=P(()=>{nl(),ng(),ny(),iY=e=>({transA:e.transA,transB:e.transB,alpha:e.alpha,beta:e.beta,cacheKey:`${e.transA};${e.transB};${1===e.alpha}`}),iJ=(e,t)=>{(e=>{if(!e)throw Error("Input is missing");if(e.length<2||e.length>3)throw Error("Invaid input number.");if(3===e.length&&e[2].dims.length>2)throw Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||3===e.length&&e[0].dataType!==e[2].dataType)throw Error("Input types are mismatched")})(e.inputs),e.compute(((e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=tr.getShapeOfGemmResult(r,t.transA,i,t.transB,3===e.length?e[2].dims:void 0),o=[a,n],u=Math.ceil(n/16),l=Math.ceil(a/16),d=(te.size(o),[{type:12,data:u},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}]),p=["type","type"];return 3===e.length&&(d.push(...tl(e[2].dims)),p.push("rank")),d.push(...tl(o)),{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:u*l},programUniforms:d}),getShaderSource:r=>{let i=tg("a",e[0].dataType,e[0].dims),a=tg("b",e[1].dataType,e[1].dims),n=null,s=[i,a];3===e.length&&(n=tg("c",e[2].dataType,e[2].dims.length),s.push(n));let u=ty("output",e[0].dataType,o.length);s.push(u);let l="",d="";t.transA&&t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(d=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):t.transA||t.transB||(d=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${i.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${a.type.value}(0);
      }
      `,l="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let p=1===t.alpha?"":"value *= uniforms.alpha;";return`
  ${r.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...s)}
  var<workgroup> tile_a: array<array<${i.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${a.type.storage}, 16>, 16>;
  ${r.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${u.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${d}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${l}
      }
      workgroupBarrier();
    }

    ${p}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=n?`let cOffset = ${n.broadcastedIndicesToOffset("vec2(m, n)",u)}; value += ${u.type.value}(uniforms.beta) * ${n.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(e.inputs,t))}}),nZ=P(()=>{nl(),ng(),nm(),ny(),[i0,i1,i2,i3]=[0,1,2,3],i4=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,i6=(e,t)=>{var r,i;let a,n,s,o,u,l,d;(e=>{if(4!==e[0].dims.length)throw Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw Error("grid batch size must match input batch size")})(e.inputs),e.compute((r=e.inputs,i=t,a=tg("x",r[0].dataType,r[0].dims.length),n=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],s=tg("grid",r[1].dataType,n.length,2),o=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]],"NHWC"===i.format&&(o=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[i0,i1,i2,i3]=[0,3,1,2]),u=ty("output",r[0].dataType,o.length),l=a.type.value,d=[{type:12,data:te.size(o)},...tl(r[0].dims,n,o)],{name:"GridSample",shaderCache:{hint:`${i.cacheKey}`,inputDependencies:["type","type"]},getRunData:e=>{let t=te.size(o);return{outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:d}},getShaderSource:e=>{let t,r,n,o,d,p,c,h,f;return`
  ${e.registerUniform("output_size","u32").declareVariables(a,s,u)}
  ${i4}
  ${t=l,`
  fn gs_bicubic_interpolate(p: mat4x4<${t}>, x: f32, y: f32) -> ${t} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${t}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${r=i,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===r.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${n=i,`
  ${"reflection"===n.paddingMode?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`}
  ${o=a,d=l,p=i,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${d} {
     var pixel = ${d}(0);
     var indices = vec4<u32>(0);
     indices[${i0}] = batch;
     indices[${i1}] = channel;`+(()=>{switch(p.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${i2}] = u32(r);
            indices[${i3}] = u32(c);
          }
        `;case"border":return`
          indices[${i2}] = u32(clamp(r, 0, H - 1));
          indices[${i3}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${i2}] = gs_reflect(r, border[1], border[3]);
          indices[${i3}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${p.paddingMode} is not supported`)}})()+`
    return ${o.getByIndices("indices")};
  }
`}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${i2}]);
      let W_in = i32(uniforms.x_shape[${i3}]);

      ${0===i.alignCorners?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${u.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${i0}], indices[${i2}], indices[${i3}]);
      let nxy = ${s.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${c=u,h=l,f=i,(()=>{switch(f.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${i0}], indices[${i1}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${i0}], indices[${i1}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${i0}], indices[${i1}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${i0}], indices[${i1}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${i0}], indices[${i1}], border);

          let dx2 = ${h}(f32(x2) - x);
          let dx1 = ${h}(x - f32(x1));
          let dy2 = ${h}(f32(y2) - y);
          let dy1 = ${h}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${h}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${i0}], indices[${i1}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${f.mode} is not supported`)}})()+`${c.setByOffset("global_idx","result")}`}
  }`}}))},i8=e=>e5({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),nX=P(()=>{nl(),ng(),nm(),nh(),nw(),ny(),n_(),i5=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,i9=e=>e5({...e}),i7=e5({perm:[0,2,1,3]}),ae=(e,t,r,i,a,n,s,o)=>{var u,l,d,p,c,h,f;let m,g,y,_=n;if(!(s&&te.size(s.dims)>0))return 3===n.dims.length&&(_=n.reshape([t,i,r,a])),1===r||1===i?_:e.compute(tx(_,i7.perm),{inputs:[_],outputs:[-1]})[0];if(1===i)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return _=(u=e,l=n,d=s,p=t,c=i,h=r*a,f=o,m=[p,c,h],y=[{type:12,data:g=te.size(m)},{type:12,data:f},{type:12,data:h}],_=u.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:l.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:e=>{let t=ty("qkv_with_bias",l.dataType,m),r=tg("qkv",l.dataType,m),i=tg("bias",d.dataType,m);return`
  ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(r,i,t)}
  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[l,d],outputs:[-1]})[0]).reshape([t,i,r,a]),1===r||1===i?_:e.compute(tx(_,i7.perm),{inputs:[_],outputs:[-1]})[0]},at=(e,t)=>{let r=((e,t)=>{let r,i=e[0],a=i5(e,1),n=i5(e,2),s=i5(e,3),o=i5(e,4),u=i5(e,5),l=i5(e,6),d=i5(e,7);if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let p=i.dims[0],c=i.dims[1],h=3===i.dims.length?i.dims[2]:t.numHeads*i.dims[4],f=c,m=0,g=0,y=Math.floor(h/t.numHeads);if(l&&d&&te.size(l.dims)&&te.size(d.dims)){if(4!==l.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==p||l.dims[1]!==t.numHeads||l.dims[3]!==y)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==p||d.dims[1]!==t.numHeads||d.dims[3]!==y)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==d.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l&&te.size(l.dims)||d&&te.size(d.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(a&&te.size(a.dims)>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(a.dims[2]!==i.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');r=2,f=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==t.numHeads||2!==a.dims[3]||a.dims[4]!==y)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw Error('Expect "value" be none when "key" has packed kv format.');r=5,f=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==y)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');r=0,f=a.dims[2]}}else{if(5!==i.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||3!==i.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');r=3}if(s&&te.size(s.dims)>0){if(1!==s.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(a&&5===a.dims.length&&2===a.dims[3])throw Error("bias is not allowed for packed kv.")}let _=m+f,$=0;if(o&&te.size(o.dims)>0){$=8;let e=o.dims;throw 1===e.length?e[0]===p?$=1:e[0]===3*p+2&&($=3):2===e.length&&e[0]===p&&e[1]===_&&($=5),8===$?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let b=!1,v=h;if(n&&te.size(n.dims)>0){if(3!==n.dims.length&&4!==n.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===n.dims.length){if(f!==n.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=n.dims[2]}else{if(f!==n.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=n.dims[1]*n.dims[3],b=!0}}if(o&&te.size(o.dims)>0)throw Error("Key padding mask is not supported");if(u&&te.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==p||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==_)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:p,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:_,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:v,headSize:y,vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:r}})(e.inputs,t),i=e.inputs[0],a=i5(e.inputs,1),n=i5(e.inputs,2),s=i5(e.inputs,3),o=i5(e.inputs,4),u=i5(e.inputs,5),l=i5(e.inputs,6),d=i5(e.inputs,7);if(5===i.dims.length)throw Error("Packed QKV is not implemented");if(a?.dims.length===5)throw Error("Packed KV is not implemented");let p=a&&n&&4===a.dims.length&&4===n.dims.length,c=ae(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(p)return t9(e,c,a,n,o,void 0,l,d,u,r);if(!a||!n)throw Error("key and value must be provided");let h=ae(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),f=ae(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);t9(e,c,h,f,o,void 0,l,d,u,r)}}),nY=P(()=>{nl(),ng(),nm(),ny(),ar=(e,t)=>{let r=e[0].dims,i=te.size(r),a=e[0].dataType,n=te.normalizeAxis(t.axis,r.length),s=Array(t.numOutputs),o=tg("input",a,r.length),u=Array(t.numOutputs),l=[],d=[],p=0,c=[{type:12,data:i}];for(let i=0;i<t.numOutputs;i++){p+=t.splitSizes[i],u[i]=p;let o=r.slice();o[n]=t.splitSizes[i],d.push(o),s[i]=ty(`output${i}`,a,o.length),l.push({dims:d[i],dataType:e[0].dataType})}return c.push({type:12,data:u},...tl(r,...d)),{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:e=>{let t;return`
  ${e.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${t=u.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${tf("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`}
  ${(e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");1===t?r.push(a):0===i?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`})(s)}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tf("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c})}},ai=(e,t)=>{let r,i;var a,n,s=e.inputs;if(!s||s.length<1)throw Error("too few inputs");let o=1===e.inputs.length?t:(a=e.inputs,r=[],i=(n=t).numOutputs,a[1].dims[0]>0&&(a[1].getBigInt64Array().forEach(e=>r.push(Number(e))),i=r.length),e5({numOutputs:i,axis:n.axis,splitSizes:r}));e.compute(ar(e.inputs,o),{inputs:[0]})},aa=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw Error("numOutputs and splitSizes lengh must be equal");return e5({axis:t,numOutputs:i,splitSizes:r})}}),nJ=P(()=>{nm(),nw(),nX(),nY(),n_(),an=e5({perm:[0,2,1,3]}),as=(e,t,r)=>{let i=t,a=r.kvNumHeads;return 3===t.dims.length&&0!==r.kvSequenceLength&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(tx(i,an.perm),{inputs:[i],outputs:[-1]})[0]),i},ao=(e,t)=>{let r=((e,t)=>{if(t.doRotary)throw Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(-1!==t.localWindowSize)throw Error("Local attention is not supported");if(0!==t.softcap)throw Error("Softcap is not supported");if(0!==t.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==r.dims.length&&5!==r.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let o=r.dims[0],u=r.dims[1],l=3===r.dims.length?r.dims[2]:t.numHeads*r.dims[4],d=u,p=0,c=!i||0===i.dims.length,h=Math.floor(c?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);c&&(l=h*t.numHeads);let f=n&&0!==n.dims.length,m=s&&0!==s.dims.length;if(f&&4===n.dims.length&&n.dims[0]===o&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===h)throw Error("BSNH pastKey/pastValue is not supported");if(f&&m){if(4!==n.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==s.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');p=n.dims[2]}else if(f||m)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(i&&i.dims.length>0){if(3!==r.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===i.dims.length){if(r.dims[2]%i.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');d=i.dims[1]}else if(5===i.dims.length){if(i.dims[2]!==t.numHeads||2!==i.dims[3]||i.dims[4]!==h)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw Error('Expect "value" be none when "key" has packed kv format.');d=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==h)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=i.dims[2]}}else{if(3!==r.dims.length&&5!==r.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===r.dims.length&&(r.dims[2]!==t.numHeads||3!==r.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let y=!1,_=t.kvNumHeads?h*t.kvNumHeads:l;if(a&&a.dims.length>0){if(3!==a.dims.length&&4!==a.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===a.dims.length){if(d!==a.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');_=a.dims[2]}else{if(d!==a.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');_=a.dims[1]*a.dims[3],y=!0}}let $=e.length>4?e[5]:void 0;if($&&1!==$.dims.length&&$.dims[0]!==o)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:o,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:_,headSize:h,vHeadSize:Math.floor(_/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:t.scale,broadcastResPosBias:!1,passPastInKv:y,qkvFormat:g}})(e.inputs,t);if(5===e.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&0!==e.inputs[3].dims.length?e.inputs[3]:void 0,o=e.inputs[4]&&0!==e.inputs[4].dims.length?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=e5({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[c,h,f]=a||n?[i,a,n]:e.compute(ar([i],p),{inputs:[i],outputs:[-1,-1,-1]}),m=ae(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,c,void 0,0);t9(e,m,as(e,h,r),as(e,f,r),void 0,void 0,s,o,void 0,r,u,l)}}),n0=P(()=>{nl(),ng(),n_(),ny(),au=(e,t,r,i,a,n,s,o)=>{let u=td(n),l=1===u?"f32":`vec${u}f`,d=1===u?"vec2f":`mat2x${u}f`,p=a*s,c=64;1===p&&(c=256);let h=[a,s,n/u],f=[a,s,2],m=[];return m.push(...tl(h,f)),e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${c}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:f,dataType:1}],dispatchGroup:{x:p},programUniforms:m}),getShaderSource:e=>{let a=tg("x",t.dataType,3,u),n=[a,tg("scale",r.dataType,r.dims),tg("bias",i.dataType,i.dims),ty("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${d}, ${c}>;
  const workgroup_size = ${c}u;
  ${e.declareVariables(...n)}
  ${e.mainStart(c)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${a.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${th("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${th("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[t,r,i],outputs:[-1]})[0]},al=(e,t)=>{var r,i,a;let n,s,o,u,l,d,p,c,h;"NHWC"===t.format?((e,t,r)=>{let i=t[0].dims,a=i[0],n=i[i.length-1],s=te.sizeFromDimension(i,1)/n,o=td(n),u=te.size(i)/o,l=[{type:12,data:s},{type:12,data:Math.floor(n/o)}],d=!1,p=[0,i.length-1];for(let e=0;e<i.length-2;e++)d=d||1!==i[e+1],p.push(e+1);let c=(d=d&&1!==i[i.length-1])?e.compute(tx(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(e,t)=>i[p[t]])),h=au(e,c,t[1],t[2],a,s,n,r.epsilon);e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:e=>{let r=to(t[0].dataType),a=1===o?"vec2f":`mat${o}x2f`,n=e=>{let t=0===e?"x":"y",i=1===o?"f32":`vec${o}f`;switch(o){case 1:return`${r}(${i}(scale.${t}))`;case 2:return`vec2<${r}>(${i}(scale[0].${t}, scale[1].${t}))`;case 4:return`vec4<${r}>(${i}(scale[0].${t}, scale[1].${t}, scale[2].${t}, scale[3].${t}))`;default:throw Error(`Not supported compoents ${o}`)}},s=tg("input",t[0].dataType,t[0].dims,o),u=ty("output",t[0].dataType,i,o);return`
  @group(0) @binding(0) var<storage, read> input : array<${s.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${a}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${u.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${e.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${n(0)}, ${n(1)});
  }`}},{inputs:[t[0],h]})})(e,e.inputs,t):(r=e,i=e.inputs,a=t,s=(n=i[0].dims)[0],o=n[1],u=te.sizeFromDimension(n,2),l=td(u),d=te.size(n)/l,p=au(r,i[0],i[1],i[2],s,u,o,a.epsilon),c=[s,o,u/l],h=[s,o],r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:n,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...tl(c,h,c)]}),getShaderSource:e=>{let t=tg("x",i[0].dataType,c.length,l),r=tg("scale_shift",1,h.length,2),a=ty("output",i[0].dataType,c.length,l),n=[t,r,a];return`
  ${e.registerUniform("output_size","u32").declareVariables(...n)}
  ${e.mainStart()}
  ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${a.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${r.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${t.getByOffset("global_idx")} * ${a.type.value}(scale_shift.x) + ${a.type.value}(scale_shift.y);
      ${a.setByOffset("global_idx","value")};
  }`}},{inputs:[i[0],p]}))}}),n1=P(()=>{nl(),ng(),ny(),ad=(e,t)=>{(e=>{if(!e||e.length<2)throw Error("layerNorm requires at least 2 inputs.")})(e.inputs),e.compute(((e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],o=te.normalizeAxis(t.axis,a.length),u=te.sizeToDimension(a,o),l=te.sizeFromDimension(a,o),d=te.size(n.dims),p=s?te.size(s.dims):0;if(d!==l||s&&p!==l)throw Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${p}`);let c=[];for(let e=0;e<a.length;++e)e<o?c.push(a[e]):c.push(1);let h=td(l),f=["type","type"],m=[{type:12,data:u},{type:1,data:l},{type:12,data:Math.floor(l/h)},{type:1,data:t.epsilon}];s&&f.push("type");let g=r>1,y=r>2,_=[{dims:a,dataType:e[0].dataType}];return g&&_.push({dims:c,dataType:1}),y&&_.push({dims:c,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${h};${r};${i}`,inputDependencies:f},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:t=>{let r=to(e[0].dataType),o=[tg("x",e[0].dataType,e[0].dims,h),tg("scale",n.dataType,n.dims,h)];return s&&o.push(tg("bias",s.dataType,s.dims,h)),o.push(ty("output",e[0].dataType,a,h)),g&&o.push(ty("mean_data_output",1,c)),y&&o.push(ty("inv_std_output",1,c)),`
  ${t.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...o)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tp("f32",h)};
    var mean_square_vector = ${tp("f32",h)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tc(r,h,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${th("mean_vector",h)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${th("mean_square_vector",h)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tc(r,h,"x[j + offset]")};
      let f32scale = ${tc(r,h,"scale[j]")};
      output[j + offset] = ${o[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${tc(r,h,"bias[j]")}`:""}
      );
    }

    ${g?"mean_data_output[global_idx] = mean":""};
    ${y?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(e.inputs,t,e.outputCount))}}),n2=P(()=>{ng(),nO(),nR(),ap=e=>{var t=e.inputs;if(!t||2!==t.length)throw Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw Error("shared dimension does not match.");let r=e7.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!r)throw Error("Can't use matmul on the given tensors");let i=r[r.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(i<8&&a<8)e.compute(ir(e.inputs,{activation:""},r));else{let t=r[r.length-2],n=te.size(e.inputs[0].dims.slice(0,-2)),s=te.size(e.inputs[1].dims.slice(0,-2));if(1!==n&&1===t&&1===s){let t=e.inputs[0].reshape([1,n,a]),s=e.inputs[1].reshape([1,a,i]),o=[1,n,i],u=[t,s];e.compute(io(u,{activation:""},r,o),{inputs:u})}else e.compute(io(e.inputs,{activation:""},r))}}}),n3=P(()=>{nl(),ng(),nm(),ny(),ac=(e,t)=>{var r,i,a,n;let s,o,u,l,d,p,c,h,f,m,g,y,_,$,b,v,w,x,S,k,T,I,C,E,z,A,O,R,B,N,M,D,P,U,W,q,L,V,G,H,F;((e,t)=>{if(e.length<3||e.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!te.areEqual(s.dims,[t.n,a,n]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(te.size(o)!==t.n*a)throw Error("scales input size error.");if(4===e.length){let r=e[3].dims,i=t.bits>4?t.n*a:t.n*Math.floor((a+1)/2);if(te.size(r)!==i)throw Error("zeroPoints input size error.")}})(e.inputs,t),32===t.blockSize&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute((r=e.inputs,i=t,o=(s=r[0].dims).length,u=s[o-2],l=i.k,d=i.n,p=s.slice(0,o-2),c=te.size(p),h=r[1].dims[2]/4,f=r[0].dataType,m=td(i.k),g=td(h),y=p.concat([u,d]),v=(b=($=128/(_=d%8==0?8:d%4==0?4:1))*g*8)/m,w=b/i.blockSize,x=te.size(y)/_,S=[],k=[c,u,l/m],(T=te.convertShape(r[1].dims).slice()).splice(-1,1,h/g),S.push(...tl(k)),S.push(...tl(T)),S.push(...tl(r[2].dims)),4===r.length&&S.push(...tl(te.convertShape(r[3].dims))),I=[c,u,d],S.push(...tl(I)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${i.blockSize};${m};${g};${$};${_}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:x},programUniforms:S}),getShaderSource:e=>{let t=k.length,a=tg("a",r[0].dataType,t,m),n=tg("b",12,T.length,g),s=tg("scales",r[2].dataType,r[2].dims.length),o=[a,n,s],u=4===r.length?tg("zero_points",12,r[3].dims.length):void 0;u&&o.push(u);let l=I.length,d=ty("output",r[0].dataType,l),p=to(r[0].dataType);return`
        var<workgroup> sub_a: array<${a.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${d.type.value}, ${$}>, ${_}>;
        ${e.declareVariables(...o,d)}
        ${e.mainStart([$,_,1])}
          let output_indices = ${d.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${w} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${a.getByIndices(`${a.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${a.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${w} + local_id.x;
            ${u?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${p}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${p}(8);`}
            let scale = ${s.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${n.getByIndices(`${n.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${i.blockSize/m};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${(()=>{switch(m){case 1:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${p}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${p}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${m}-component is not supported.`)}})()}
              let b_value = ${1===g?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${p}>(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${p}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(e,t)=>`dot(a_data${t}, b_dequantized_values[${t}])`).join(" + ")};
              word_offset += ${8/m};
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${d.setByIndices(`${d.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):e.compute((a=e.inputs,n=t,E=(C=a[0].dims).length,z=C[E-2],A=n.k,O=n.n,R=C.slice(0,E-2),B=te.size(R),N=a[1].dims[2]/4,M=a[0].dataType,D=td(n.k),P=td(N),U=td(O),W=R.concat([z,O]),q=z>1&&O/U%2==0?2:1,L=te.size(W)/U/q,V=[],G=[B,z,A/D],(H=te.convertShape(a[1].dims).slice()).splice(-1,1,N/P),V.push(...tl(G)),V.push(...tl(H)),V.push(...tl(a[2].dims)),4===a.length&&V.push(...tl(te.convertShape(a[3].dims))),F=[B,z,O/U],V.push(...tl(F)),{name:"MatMulNBits",shaderCache:{hint:`${n.blockSize};${n.bits};${D};${P};${U};${q};64`,inputDependencies:Array(a.length).fill("rank")},getRunData:()=>({outputs:[{dims:W,dataType:M}],dispatchGroup:{x:L},programUniforms:V}),getShaderSource:e=>{let t=G.length,r=tg("a",a[0].dataType,t,D),i=tg("b",12,H.length,P),s=tg("scales",a[2].dataType,a[2].dims.length),o=[r,i,s],u=4===a.length?tg("zero_points",12,a[3].dims.length):void 0;u&&o.push(u);let l=F.length,d=ty("output",a[0].dataType,l,U),p=to(a[0].dataType),c=(()=>{switch(D){case 1:return`array<${p}, 8>`;case 2:return`mat4x2<${p}>`;case 4:return`mat2x4<${p}>`;default:throw Error(`${D}-component is not supported.`)}})();return`
        var<workgroup> workgroup_shared: array<${d.type.value}, ${64*q}>;
        ${e.declareVariables(...o,d)}
        ${e.mainStart([64,1,1])}
          let output_indices = ${d.offsetToIndices(`(global_idx / 64) * ${q}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${n.blockSize/D};
            ${(()=>{let e=`
            var col_index = col * ${U};
            ${u?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${p}(8);`}
            `;for(let t=0;t<U*q;t++)e+=`
            let scale${t} = ${s.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${t} = ${p}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return e})()}
            for (var word: u32 = 0; word < ${N}; word += ${P}) {
              ${(()=>{let e=`col_index = col * ${U};`;for(let t=0;t<U*q;t++)e+=`
            let b${t}_data = ${i.getByIndices(`${i.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return e+`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${c};
            var b_dequantized_values: ${c};`})()}
              for (var i: u32 = 0; i < ${P}; i++) {
                ${(()=>{let e=`
          // reuse a data
            var input_offset = ${r.indicesToOffset(`${r.type.indices}(batch, row, word_offset)`)};
            var a_data: ${c};
            for (var j: u32 = 0; j < ${8/D}; j++) {
              a_data[j] = ${r.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let t=0;t<U*q;t++)e+=`
            b_value = ${1===P?`b${t}_data`:`b${t}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${c}(${Array.from({length:4},(e,t)=>`${p}(b_value_lower[${t}]), ${p}(b_value_upper[${t}])`).join(", ")});
            b_dequantized_values = ${1===D?`${c}(${Array.from({length:8},(e,r)=>`(b_quantized_values[${r}] - ${u?`zero_point${t}`:"zero_point"}) * scale${t}`).join(", ")});`:`(b_quantized_values - ${c}(${Array(8).fill(`${u?`zero_point${t}`:"zero_point"}`).join(",")})) * scale${t};`};
            workgroup_shared[local_id.x * ${q} + ${Math.floor(t/U)}]${U>1?`[${t%U}]`:""} += ${Array.from({length:8/D},(e,t)=>`${1===D?`a_data[${t}] * b_dequantized_values[${t}]`:`dot(a_data[${t}], b_dequantized_values[${t}])`}`).join(" + ")};
          `;return e})()}
                word_offset += ${8/D};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${q}) {
            var output_value: ${d.type.value} = ${d.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${q};
            }
            ${d.setByIndices(`${d.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},ah=e=>e5(e)}),n4=P(()=>{nl(),ng(),ny(),af=(e,t)=>{let r,i,a,n;var s,o,u=e.inputs;if(!u||u.length<1)throw Error("Too few inputs");if(1!==u[0].dataType&&10!==u[0].dataType)throw Error("Input type must be float or float16.");if(u.length>=2){let e=2*u[0].dims.length===u[1].dims[0];if(4===u.length&&(e=2*u[3].dims[0]===u[1].dims[0]),!e)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let l=((e,t)=>{if(!(e.length>1))return t;{let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?10===e[2].dataType?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let t=e[3].getBigInt64Array();for(let e=0;e<t.length;e++)n[Number(t[e])]=Number(r[e]),n[Number(t[e])+a]=Number(r[e+t.length])}else r.forEach((e,t)=>n[Number(t)]=Number(e));let s=[];return n.forEach(e=>s.push(e)),{mode:t.mode,value:i,pads:s}}})(e.inputs,t);e.compute((s=e.inputs,o=l,r=te.padShape(s[0].dims.slice(),o.pads),i=s[0].dims,a=[{type:12,data:te.size(r)},{type:6,data:o.pads}],n=s.length>=3&&s[2].data,0===o.mode&&a.push({type:n?s[2].dataType:1,data:o.value}),a.push(...tl(s[0].dims,r)),{name:"Pad",shaderCache:{hint:`${o.mode}${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:r,dataType:s[0].dataType}],dispatchGroup:{x:Math.ceil(te.size(r)/64)},programUniforms:a}),getShaderSource:e=>{let t=ty("output",s[0].dataType,r.length),a=tg("x",s[0].dataType,i.length),u=a.type.value,l=((e,t,r)=>{switch(r.mode){case 0:var i=e,a=t,n=r.pads.length;let s="";for(let e=a-1;e>=0;--e)s+=`
            k = i32(${i.indicesGet("indices",e)}) - ${tf("uniforms.pads",e,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tf("uniforms.x_shape",e,a)})) {
              break;
            }
            offset += k * i32(${tf("uniforms.x_strides",e,a)});
        `;return`
          value = ${i.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${s}
            value = x[offset];
          }
      `;case 1:var o=e,u=t,l=r.pads.length;let d="";for(let e=u-1;e>=0;--e)d+=`
                k = i32(${o.indicesGet("indices",e)}) - ${tf("uniforms.pads",e,l)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tf("uniforms.x_shape",e,u)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tf("uniforms.x_shape",e,u)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tf("uniforms.x_strides",e,u)});
            `;return`
              var offset = 0;
              var k = 0;
              ${d}
              value = x[offset];
          `;case 2:var p=e,c=t,h=r.pads.length;let f="";for(let e=c-1;e>=0;--e)f+=`
                k = i32(${p.indicesGet("indices",e)}) - ${tf("uniforms.pads",e,h)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tf("uniforms.x_shape",e,c)})) {
                  k = i32(${tf("uniforms.x_shape",e,c)}) - 1;
                }
                offset += k * i32(${tf("uniforms.x_strides",e,c)});
            `;return`
              var offset = 0;
              var k = 0;
              ${f}
              value = x[offset];
          `;case 3:var m=e,g=t,y=r.pads.length;let _="";for(let e=g-1;e>=0;--e)_+=`
                k = i32(${m.indicesGet("indices",e)}) - ${tf("uniforms.pads",e,y)};
                if (k < 0)  {
                  k += i32(${tf("uniforms.x_shape",e,g)}]);
                }
                if (k >= i32(${tf("uniforms.x_shape",e,g)})) {
                  k -= i32(${tf("uniforms.x_shape",e,g)});
                }
                offset += k * i32(${tf("uniforms.x_strides",e,g)});
            `;return`
              var offset = 0;
              var k = 0;
              ${_}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(t,i.length,o),d=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:o.pads.length}];return 0===o.mode&&d.push({name:"constant_value",type:n?u:"f32"}),`
            ${e.registerUniforms(d).declareVariables(a,t)}
            ${e.mainStart()}
            ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${t.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${l}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),n6=P(()=>{es(),nl(),ng(),ny(),am=e=>{if(l.webgpu.validateInputContent&&(!e||1!==e.length))throw Error("Pool ops requires 1 input.")},ag=(e,t,r)=>{let i="NHWC"===t.format,a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=n?t.dilations.slice():[],l=t.pads.slice();tt.adjustPoolAttributes(r,a,s,o,u,l);let d=tt.computePoolOutputShape(r,a,o,u,s,l,t.autoPad),p=Object.assign({},t);n?Object.assign(p,{kernelShape:s,strides:o,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:o,pads:l,cacheKey:t.cacheKey});let c=d.slice();return c.push(c.splice(1,1)[0]),[p,i?c:d]},ay=(e,t)=>{let r="NHWC"===t.format,i=[{type:12,data:te.size(e)},{type:12,data:te.size(t.kernelShape)}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let e=t.kernelShape[t.kernelShape.length-1],r=t.strides[t.strides.length-1],n=t.pads[t.pads.length/2-1],s=t.pads[t.pads.length-1],o=!!(n+s);i.push({type:12,data:e},{type:12,data:r},{type:12,data:n},{type:12,data:s}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===t.kernelShape.length){let e=t.kernelShape[t.kernelShape.length-2],r=t.strides[t.strides.length-2],n=t.pads[t.pads.length/2-2],s=t.pads[t.pads.length-2];u=!!(n+s),i.push({type:12,data:e},{type:12,data:r},{type:12,data:n},{type:12,data:s}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,o,u]}{if(r)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let e=te.computeStrides(t.kernelShape);return i.push({type:12,data:e},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:e.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length}),[i,a,!!t.pads.reduce((e,t)=>e+t),!1,!1]}},a_=(e,t,r,i,a,n,s,o,u,l,d,p)=>{let c="NHWC"===a.format,h=t.type.value,f=ty("output",t.type.tensor,i);if(a.kernelShape.length<=2){let i="",l="",m="",g=r-(c?2:1);if(i=d?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,2===a.kernelShape.length){let e=r-(c?3:2);l=p?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${e}] < 0 || xIndices[${e}] >= uniforms.x_shape[${e}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${e}] = indices[${e}] * uniforms.sh - uniforms.phStart + j;
                `,m=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var value = ${h}(${o});
              var pad = 0;
              ${l}
              ${i}
              ${m}
              ${s}

              output[global_idx] = value;
            }`}{if(c)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let i=a.kernelShape.length,d=a.pads.length,p="";return p=l?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(u).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${i}>;

              var value = ${h}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${i-1}u; j++) {
                  offsets[j] = offset / ${tf("uniforms.kernelStrides","j",i)};
                  offset -= offsets[j] * ${tf("uniforms.kernelStrides","j",i)};
                }
                offsets[${i-1}] = offset;

                isPad = false;
                for (var j = ${r-i}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${tf("uniforms.strides",`j - ${r-i}u`,i)}
                    + offsets[j - ${r-i}u] - ${tf("uniforms.pads","j - 2u",d)};
                  ${p}
              }
              ${s}

              output[global_idx] = value;
            }`}},a$=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ab=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),av=(e,t,r,i)=>{let[a,n]=ag(t,i,r),s=tg("x",t.dataType,t.dims.length),o=s.type.value,u="";a.countIncludePad?u+=`value /= ${o}(uniforms.kernelSize);`:u+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[l,d,p,c,h]=ay(n,a);return l.push(...tl(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(te.size(n)/64)},programUniforms:l}),getShaderSource:e=>a_(e,s,t.dims.length,n.length,a,"value += x_val;",u,0,d,p,c,h)}},aw=e=>{let t,r=0!==e.count_include_pad,i=ab(e);if(0!==i.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:r,...i,cacheKey:""};return{...a,cacheKey:(t=a,`${a$(t)};${t.countIncludePad}`)}},ax=(e,t)=>{am(e.inputs),e.compute(av("AveragePool",e.inputs[0],!1,t))},aS={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ak=e=>{let t=e.format;return{format:t,...aS,cacheKey:t}},aT=(e,t)=>{am(e.inputs),e.compute(av("GlobalAveragePool",e.inputs[0],!0,t))},aI=(e,t,r,i)=>{let[a,n]=ag(t,i,r),s=`
      value = max(x_val, value);
    `,o=tg("x",t.dataType,t.dims.length),[u,l,d,p,c]=ay(n,a);return u.push(...tl(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${d};${p};${c}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(te.size(n)/64)},programUniforms:u}),getShaderSource:e=>a_(e,o,t.dims.length,n.length,a,s,"",10===t.dataType?-65504:-1e5,l,d,p,c)}},aC=(e,t)=>{am(e.inputs),e.compute(aI("MaxPool",e.inputs[0],!1,t))},aE=e=>{let t,r=e.storage_order,i=e.dilations,a=ab(e);if(0!==r)throw Error("column major storage order is not yet supported for MaxPool");if(0!==a.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:r,dilations:i,...a,cacheKey:""};return{...n,cacheKey:(t=n,`${a$(t)};${t.storageOrder};${t.dilations}`)}},az=e=>{let t=e.format;return{format:t,...aS,cacheKey:t}},aA=(e,t)=>{am(e.inputs),e.compute(aI("GlobalMaxPool",e.inputs[0],!0,t))}}),n8=P(()=>{nl(),ng(),nm(),ny(),aO=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p,c,h,f,m,g,y,_,$,b,v,w,x,S,k,T;((e,t)=>{if(e.length<2||e.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===e.length&&e[1].dims===e[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===e.length&&e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(6===e[0].dataType&&e.length>2)throw Error("In the case of dequantizing int32 there is no zero point.");if(0!==e[1].dims.length&&1!==e[1].dims.length&&e[1].dims.length!==e[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((t,r)=>t===e[2].dims[r]).reduce((e,t)=>e&&t,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(0===e[1].dims.length||1===e[1].dims.length&&1===e[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((r,i)=>i===t.axis||r===e[0].dims[i]).reduce((e,t)=>e&&t,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(e.inputs,t),e.compute((r=e.inputs,i=t,a=te.normalizeAxis(i.axis,r[0].dims.length),s=3===(n=r[0].dataType),o=r[0].dims,u=r[1].dataType,l=te.size(o),p=(d=3===n||2===n)?[Math.ceil(te.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,f=(h=r.length>2?r[2]:void 0)?d?[Math.ceil(te.size(h.dims)/4)]:h.dims:void 0,g=!1==(m=0===c.length||1===c.length&&1===c[0])&&1===c.length,y=td(l),$=(_=m&&(!d||4===y))?y:1,b=tg("input",d?12:n,p.length,_&&!d?y:1),v=tg("scale",u,c.length),w=h?tg("zero_point",d?12:n,f.length):void 0,x=ty("output",u,o.length,$),S=[b,v],w&&S.push(w),k=[p,c],h&&k.push(f),T=[{type:12,data:l/$},{type:12,data:a},{type:12,data:i.blockSize},...tl(...k,o)],{name:"DequantizeLinear",shaderCache:{hint:i.cacheKey,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getShaderSource:e=>`
      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...S,x)}
      ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${x.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${b.getByOffset("global_idx / 4")};
            let x_vec = ${s?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===$?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${b.getByOffset("global_idx")};`};

          // Set scale input
          ${m?`let scale_value= ${v.getByOffset("0")}`:g?`
            let scale_index = ${x.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${w?m?d?`
                let zero_point_input = ${w.getByOffset("0")};
                let zero_point_vec =  ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${w.getByOffset("0")}`:g?d?`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${w.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${x.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${w.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${w.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${w.getByIndices("scale_indices")};`:`let zero_point_value = ${d?s?"i32":"u32":b.type.value}(0);`};
      // Compute and write output
      ${x.setByOffset("global_idx",`${x.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:o,dataType:u}],dispatchGroup:{x:Math.ceil(l/$/64),y:1,z:1},programUniforms:T})}))},aR=e=>e5({axis:e.axis,blockSize:e.blockSize})}),n5=P(()=>{es(),nl(),ny(),aB=e=>{var t,r,i,a;let n,s,o,u=0,d=0,p=0;6===e.inputs[0].dataType?(u=e.inputs[0].getInt32Array()[0],d=e.inputs[1].getInt32Array()[0],p=e.inputs[2].getInt32Array()[0]):1===e.inputs[0].dataType&&(u=e.inputs[0].getFloat32Array()[0],d=e.inputs[1].getFloat32Array()[0],p=e.inputs[2].getFloat32Array()[0]),l.webgpu.validateInputContent&&((e,t,r)=>{if(e===t||e<t&&r<0||e>t&&r>0)throw Error("Range these inputs' contents are invalid.")})(u,d,p),e.compute((t=u,r=d,i=p,a=e.inputs[0].dataType,s=[n=Math.abs(Math.ceil((r-t)/i))],o=[{type:12,data:n},{type:a,data:t},{type:a,data:i},...tl(s)],{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:e=>{let t=ty("output",a,s.length),r=t.type.value;return`
        ${e.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:r},{name:"delta",type:r}]).declareVariables(t)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${r}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:o})}),{inputs:[]})}}),n9=P(()=>{nl(),ng(),nm(),ny(),aN=e=>e5({reduction:e.reduction}),aM=(e,t)=>{var r,i;let a,n,s,o,u,l;e.compute((r=e.inputs,i=t,a=r[0].dims,n=r[1].dims,s=Math.ceil(te.size(n)/1),o=n[n.length-1],u=te.sizeFromDimension(a,o),l=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...tl(r[1].dims,r[2].dims,a)],{name:"ScatterND",shaderCache:{hint:`${i.cacheKey}_${i.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:e=>{let t=tg("indices",r[1].dataType,r[1].dims.length),s=tg("updates",r[2].dataType,r[2].dims.length,1),o="none"!==i.reduction&&""!==i.reduction?t_("output",r[0].dataType,a.length):ty("output",r[0].dataType,a.length,1);return`
      ${e.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(t,s,o)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${"none"===i.reduction}) {
    let n = ${te.size(n)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${"none"===i.reduction} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===r[0].dims.length?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${((e,t,r,i)=>{if("none"!==e&&"i32"!==i&&"u32"!==i&&"f32"!==i)throw Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return"i32"===i||"u32"===i?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return"i32"===i||"u32"===i?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return"i32"===i||"u32"===i?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw Error(`Reduction ${e} is not supported.`)}})(i.reduction,"output[data_offset + i]","value",o.type.value)}
  }

      }`}}),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),n7=P(()=>{nl(),ng(),nm(),ny(),aD=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,aP=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",aU=(e,t)=>{var r,i,a,n,s,o,u,l,d,p,c,h;let f,m,g,y,_,$,b,v,w,x,S,k,T,I,C,E,z=[],A=[],O=[],R=new Uint32Array(f=e.customDataBuffer,f.byteOffset,1)[0];if(0!==t.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((e,t,r,i,a,n)=>{let[s,o,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(e=>n.push(e));else if("tf_crop_and_resize"===t.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&1===e[o].dims.length&&e[o].dims[0]>0){var d,p,c;let a;if(e[o].getFloat32Array().forEach(e=>i.push(e)),0!==i.length&&i.length!==l&&r>=18&&i.length!==t.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((e,t)=>{if(e.every(e=>e>0||(()=>{throw Error("Resize requires scales input values to be positive")})),e.length>0){if("linear"===t.mode){if(2!==e.length&&3!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3])&&(5!==e.length||1!==e[0]||1!==e[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===t.mode&&2!==e.length&&(4!==e.length||1!==e[0]||1!==e[1])&&(4!==e.length||1!==e[0]||1!==e[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(i,t),t.axes.length>0&&(d=i,p=t.axes,c=l,p.every(e=>e>=0&&e<c||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),a=Array(c).fill(1),p.forEach((e,t)=>a[e]=d[t]),a).forEach((e,t)=>i[t]=e)}if(u>0&&e.length>u&&1===e[u].dims.length&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(e=>a.push(Number(e))),0!==a.length&&a.length!==l&&r>=18&&a.length!==t.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(0!==i.length&&i.length!==t.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==a.length&&a.length!==t.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof i&&"u">typeof a&&i.length>0&&a.length>l)throw Error("Resize requires only of scales or sizes to be specified")})(e.inputs,t,R,z,A,O),e.compute((r=e.inputs[0],i=t,a=R,n=z,s=A,o=O,y=r.dims,_=(u=o,l=i.axes,m=Array(d=y.length).fill(0).concat(Array(d).fill(1)),g=0===u.length?m:u.slice(),l.length>0?(l.forEach((e,t)=>{m[e]=g[t],m[t+d]=g[l.length+t]}),m):g),$=((e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(e=>a.push(e)),Math.max(...i)>e.length)throw Error("axes is out of bound");i.forEach((e,t)=>a[e]=r[t])}else r.forEach(e=>a.push(e));else{if(0===t.length)throw Error("Resize requires either scales or sizes.");a=e.map((e,r)=>Math.round(e*t[r]))}return a})(y,n,s,i.axes),b=n.slice(),0===n.length&&(b=y.map((e,t)=>0===e?1:$[t]/e),"stretch"!==i.keepAspectRatioPolicy&&(p=y,c=b,h=i,v=(()=>{switch(h.keepAspectRatioPolicy){case"not_larger":return h.axes.length>0?Math.min(...h.axes.map(e=>c[e]),Number.MAX_VALUE):Math.min(...c,Number.MAX_VALUE);case"not_smaller":return h.axes.length>0?Math.max(...h.axes.map(e=>c[e]),5e-324):Math.max(...c,5e-324);default:throw Error(`Keep aspect ratio policy ${h.keepAspectRatioPolicy} is not supported`)}})(),c.fill(1,0,c.length),w=p.slice(),h.axes.length>0?(h.axes.forEach(e=>c[e]=v),h.axes.forEach(e=>w[e]=Math.round(p[e]*c[e]))):(c.fill(v,0,c.length),w.forEach((e,t)=>w[t]=Math.round(e*c[t]))),$=w)),x=ty("output",r.dataType,$.length),S=tg("input",r.dataType,y.length),k=te.size($),T=y.length===$.length&&y.every((e,t)=>e===$[t]),I="tf_crop_and_resize"===i.coordinateTransformMode,C=i.extrapolationValue,E=S.type.value,{name:"Resize",shaderCache:{hint:`${i.cacheKey}|${a}|${b.length>0?"cubic"===i.mode?b:b.length:""}|${s.length>0?s:""}|${_.length>0?_:""}|${T}|${"nearest"===i.mode?y.length:y}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,r;return`
      ${T?"":`
      ${t=i.coordinateTransformMode,r=E,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${r} { `+(()=>{switch(t){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${r}(xResized) / ${r}(xScale);
          } else {
            ${aD("xResized","lengthOriginal","lengthResized",r)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${r}(xResized) + 0.5) / ${r}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${r}(xResized) + 0.5) / ${r}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${aD("xResized","lengthOriginal - 1","lengthResized - 1",r)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${r}(roiStart) * ${r}(lengthOriginal - 1) +
                        (${r}(xResized) * ${r}(roiEnd - roiStart) * ${r}(lengthOriginal - 1)) /
                        ${r}(lengthResized - 1);
                  } else {
                    return 0.5 * ${r}(roiStart + roiEnd) * ${r}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${r}xScale * ${r}(lengthResized);
                  const adjustment = ${r}(lengthResized) / outputWidth;
                  const center = ${r}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${r}(xResized) + 0.5) / ${r}(xScale)) - 0.5;`;case"half_pixel":return`return ((${r}(xResized) + 0.5) / ${r}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${t} is not supported`)}})()+"}"};
      ${(()=>{switch(i.mode){case"nearest":let e,t,r,n,s,o,u,l,d,p,c,h;return`
              ${e=S,t=y,`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tf("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${r=i.nearestMode,n=a,s=E,`fn getNearestPixelFromOriginal(xOriginal: ${s}, isDownSample: bool) -> ${s} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(n<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${r} is not supported`)}})()+"}"};
              ${o=S,u=x,l=y,d=$,p=b.length,c=_.length,h=I,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${u.type.indices}) -> ${o.type.indices} {
      var input_indices: ${o.type.indices};
      for (var i:u32 = 0; i < ${d.length}; i++) {
        var output_index = ${u.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tf("uniforms.scales","i",p)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tf("uniforms.roi","i",c)};
          var roi_hi = ${tf("uniforms.roi",`i + ${l.length}`,c)};
          var input_shape_i = ${tf("uniforms.input_shape","i",l.length)};
          var output_shape_i = ${tf("uniforms.output_shape","i",d.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${h} || (original_idx >= 0 && original_idx < ${u.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${u.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${o.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let f,m,g,v,w;return`
              ${f=x,m=y,g=$,v=b.length,w=_.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${f.type.indices}) -> array<${f.type.value}, ${g.length}> {
      var original_indices: array<${f.type.value}, ${g.length}>;
      for (var i:u32 = 0; i < ${g.length}; i++) {
        var output_index = ${f.indicesGet("output_indices","i")};
        var scale = ${tf("uniforms.scales","i",v)};
        var roi_low = ${tf("uniforms.roi","i",w)};
        var roi_hi = ${tf("uniforms.roi",`i + ${m.length}`,w)};
        if (scale == 1.0) {
          original_indices[i] = ${f.type.value}(output_index);
        } else {
          var input_shape_i = ${tf("uniforms.input_shape","i",m.length)};
          var output_shape_i = ${tf("uniforms.output_shape","i",g.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===y.length||4===y.length)return`${((e,t,r,i,a)=>{let[n,s,o,u]=2===r.length?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${aP(e,u,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${s}];
      var col:${l} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`})(S,x,y,I,C)}`;if(3===y.length||5===y.length)return`${((e,t,r,i,a)=>{let[n,s,o,u,l]=3===r.length?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${aP(e,l,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${s}];
      var height:${d} = originalIndices[${o}];
      var width:${d} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`})(S,x,y,I,C)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===y.length||4===y.length)return`${((e,t,r,i,a,n,s,o,u,l)=>{let[d,p]=2===r.length?[0,1]:[2,3],c=e.type.value,h=s=>{let p=s===d?"row":"col";return`
      fn ${p}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${c} {
        var output_index = ${t.indicesGet("output_indices",s)};
        var originalIdx: ${c} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[s]},
        ${i[s]}, ${r[s]}, ${n[s]}, ${n[s]} + ${r.length});
        var fractOriginalIdx: ${c} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[s]} - 1))) {
          return ${u};
        }
        var data: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${p}: ${c} = originalIdx + ${c}(i);
          if (${p} < 0 || ${p} >= ${r[s]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${p} = max(0, min(${p}, ${r[s]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",s,`u32(${p})`)};
          data[i + 1] = ${s===d?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(d)};
    ${h(p)};
  fn getCubicInterpolationCoefs(s: ${c}) -> array<${c}, 4> {
    var absS = abs(s);
    var coeffs: array<${c}, 4> = array<${c}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${c} = 1.0 - absS;
    var twoMinusAbsS: ${c} = 2.0 - absS;
    var onePlusAbsS: ${c} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${c}, 4>, coefs: array<${c}, 4>) -> ${c} {
    var coefsSum: ${c} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${c} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(S,x,y,$,b,_,i.cubicCoeffA,I,i.extrapolationValue,i.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${e.registerUniform("output_size","u32").registerUniform("scales","f32",b.length).registerUniform("roi","f32",_.length).declareVariables(S,x)}
      ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${T?"output[global_idx] = input[global_idx];":`
        let output_indices = ${x.offsetToIndices("global_idx")};
        var input_indices: ${S.type.indices};
        ${(()=>{switch(i.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${S.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${i.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===y.length||4===y.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${i.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:$,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},{type:1,data:b},{type:1,data:_},...tl(y,$)]})}),{inputs:[0]})},aW=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=0!==e.excludeOutside,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,l=""===e.nearestMode?"simple":e.nearestMode;return e5({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:l})}}),se=P(()=>{nl(),ng(),nm(),ny(),aq=(e,t)=>{((e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(3!==r.dims.length&&4!==r.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!te.areEqual(i.dims,[])&&!te.areEqual(i.dims,[1])&&2!==i.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(2!==a.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(2!==n.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!te.areEqual(a.dims,n.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&0===s)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=a.dims[0],p=te.sizeFromDimension(r.dims,1)/l,c=0===o?2*a.dims[1]:p/s;if(o>c)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===i.dims.length){if(u!==i.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(c/2!==a.dims[1]&&o/2!==a.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(l>d)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(e.inputs,t),e.compute(((e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],o=te.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=o/u,d=e[2].dims[1],p=0===a?2*d:l/i,c=[s,u,l/p,p-d],h=te.computeStrides(c),f=[{type:1,data:n},{type:12,data:c},{type:12,data:h},...3===e[0].dims.length?Array({type:12,data:[o,l,p,1]}):[],...4===e[0].dims.length?Array({type:12,data:[o,p,u*p,1]}):[],...tl(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:e5({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:t=>{let i=tg("input",e[0].dataType,e[0].dims.length),a=tg("position_ids",e[1].dataType,e[1].dims.length),n=tg("cos_cache",e[2].dataType,e[2].dims.length),s=tg("sin_cache",e[3].dataType,e[3].dims.length),o=ty("output",e[0].dataType,e[0].dims.length);return t.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:c.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${t.declareVariables(i,a,n,s,o)}

        ${t.mainStart(tn)}
          let half_rotary_emb_dim = uniforms.${n.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${a.broadcastedIndicesToOffset("bsnh.xy",ty("",a.type.tensor,2))};
            let position_id =
                u32(${a.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${i.getByOffset("i")} * ${n.get("position_id","bsnh[3]")} -
                ${i.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${o.setByOffset("i","re")}
            let im = ${i.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} +
                ${i.getByOffset("j")} * ${n.get("position_id","bsnh[3]")};
            ${o.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${o.setByOffset("k",i.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(te.size(c)/tn)},programUniforms:f})}})(e.inputs,t))}}),st=P(()=>{nl(),ng(),ny(),aL=(e,t)=>{var r,i,a,n;let s,o,u,l,d,p,c,h,f,m,g,y,_;(e=>{if(!e||e.length<3)throw Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw Error("All inputs must have the same data type");if(3!==t.dims.length&&2!==t.dims.length)throw Error("Input must be 2D or 3D");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw Error("Skip must have the same sequence length as input");if(1!==i.dims.length)throw Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw Error("Gamma must have the same hidden size as input");if(e.length>3){let t=e[3];if(1!==t.dims.length)throw Error("Beta must be 1D");if(t.dims[t.dims.length-1]!==a)throw Error("Beta must have the same hidden size as input")}if(e.length>4){let t=e[4];if(1!==t.dims.length)throw Error("Bias must be 1D");if(t.dims[t.dims.length-1]!==a)throw Error("Bias must have the same hidden size as input")}})(e.inputs);let $=[0];e.outputCount>1&&$.push(-3),e.outputCount>2&&$.push(-3),e.outputCount>3&&$.push(3),e.compute((r=e.inputs,i=t,a=e.outputCount,n=!1,s=i.simplified,o=r[0].dims,u=te.size(o),l=o.slice(-1)[0],d=n?o.slice(0,-1).concat(1):[],p=!s&&r.length>3,c=r.length>4,h=n&&a>1,f=n&&a>2,m=a>3,y=[{type:12,data:u},{type:12,data:g=td(l)},{type:12,data:l},{type:1,data:i.epsilon}],_=[{dims:o,dataType:r[0].dataType}],a>1&&_.push({dims:d,dataType:1}),a>2&&_.push({dims:d,dataType:1}),a>3&&_.push({dims:o,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${g};${h};${f};${m}`,inputDependencies:r.map((e,t)=>"type")},getShaderSource:e=>{let t=[tg("x",r[0].dataType,r[0].dims,g),tg("skip",r[1].dataType,r[1].dims,g),tg("gamma",r[2].dataType,r[2].dims,g)];p&&t.push(tg("beta",r[3].dataType,r[3].dims,g)),c&&t.push(tg("bias",r[4].dataType,r[4].dims,g)),t.push(ty("output",r[0].dataType,o,g)),h&&t.push(ty("mean_output",1,d)),f&&t.push(ty("inv_std_output",1,d)),m&&t.push(ty("input_skip_bias_sum",r[0].dataType,o,g));let i=to(r[0].dataType),a=to(1,g);return`

      ${e.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...t)}
      var<workgroup> sum_shared : array<${a}, 64>;
      var<workgroup> sum_squared_shared : array<${a}, 64>;

      ${e.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${c?"bias[offset1d + i]":i+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tc(i,g,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${th("sum",g)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${th("square_sum",g)} / f32(uniforms.hidden_size) ${s?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${s?"":`- ${i}(mean)`}) *
            ${i}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:y})}),{outputs:$})}}),sr=P(()=>{nl(),ng(),nm(),ny(),aV=(e,t)=>{let r=[];if(e.length>t)if(7===e[t].dataType)e[t].getBigInt64Array().forEach(e=>r.push(Number(e)));else if(6===e[t].dataType)e[t].getInt32Array().forEach(e=>r.push(Number(e)));else throw Error(`Input ${t} must be an array of int32 or int64`);return r},aG=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},aH=(e,t)=>{var r=e.inputs,i=t;if(!r||r.length<1)throw Error("too few inputs");if(0!==i.axes.length){if(i.axes.length!==i.starts.length||i.axes.length!==i.ends.length)throw Error("axes, starts and ends must have the same length")}else if(i.starts.length!==i.ends.length)throw Error("starts and ends must have the same length");r.slice(1).forEach((e,t)=>{if(6!==r[t+1].dataType&&7!==r[t+1].dataType)throw Error(`Input ${t} must be an array of int32 or int64`)});let a=((e,t)=>{if(!(e.length>1))return t;{let t=aV(e,1),r=aV(e,2),i=aV(e,3);return 0===i.length&&(i=[...Array(e[0].dims.length).keys()]),e5({starts:t,ends:r,axes:i})}})(e.inputs,t);e.compute(((e,t)=>{let r=e[0].dims,i=te.size(r),a=t.axes.length>0?te.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=aV(e,4);n.forEach(e=>0!==e||(()=>{throw Error("step cannot be 0")})),0===n.length&&(n=Array(a.length).fill(1));let s=t.starts.map((e,t)=>aG(e,t,r,a,n)),o=t.ends.map((e,t)=>aG(e,t,r,a,n));if(a.length!==s.length||a.length!==o.length)throw Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let e=0;e<r.length;++e)a.includes(e)||(s.splice(e,0,0),o.splice(e,0,r[e]),n.splice(e,0,1));let u=n.map(e=>Math.sign(e));n.forEach((e,t,r)=>{if(e<0){let i=(o[t]-s[t])/e,a=s[t],u=a+i*n[t];s[t]=u,o[t]=a,r[t]=-e}});let l=r.slice(0);a.forEach((e,t)=>{l[e]=Math.ceil((o[e]-s[e])/n[e])});let d={dims:l,dataType:e[0].dataType},p=ty("output",e[0].dataType,l.length),c=tg("input",e[0].dataType,e[0].dims.length),h=te.size(l),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:n.length}],m=[{type:12,data:h},{type:12,data:s},{type:6,data:u},{type:12,data:n},...tl(e[0].dims,l)];return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:e=>{let t,i,a;return`
      ${e.registerUniforms(f).declareVariables(c,p)}
        ${t=c,i=p,a=r,`fn calculateInputIndices(output_indices: ${i.type.indices}) -> ${t.type.indices} {
          var input_indices: ${t.type.indices};
          var carry = 0u;
          for (var i = ${a.length}; i >= 0; i--) {
            let input_shape_i = ${tf("uniforms.input_shape","i",a.length)};
            let steps_i = ${tf("uniforms.steps","i",a.length)};
            let signs_i = ${tf("uniforms.signs","i",a.length)};
            let starts_i = ${tf("uniforms.starts","i",a.length)};
            var output_index = ${i.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${t.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${e.mainStart()}
          ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",c.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m})}})(e.inputs,a),{inputs:[0]})},aF=e=>{let t=e.starts,r=e.ends,i=e.axes;return e5({starts:t,ends:r,axes:i})}}),si=P(()=>{nl(),ng(),nm(),n_(),ny(),aj=(e,t)=>{var r,i;let a,n,s,o,u,l,d,p,c,h,f,m,g,y,_,$,b,v,w;(e=>{if(!e||1!==e.length)throw Error("Softmax op requires 1 input.")})(e.inputs),r=e,i=t,n=(a=r.inputs[0]).dims,s=te.size(n),o=n.length,l=(u=te.normalizeAxis(i.axis,o))<n.length-1,p=[],l?((p=Array.from({length:o},(e,t)=>t))[u]=o-1,p[o-1]=u,d=r.compute(tx(a,p),{inputs:[a],outputs:[-1]})[0]):d=a,f=s/(h=(c=d.dims)[o-1]),m=td(h),g=h/m,y=64,1===f&&(y=256),_=tg("x",d.dataType,d.dims,m),$=ty("result",d.dataType,d.dims,m),b=_.type.value,v="f32"===to(d.dataType)?`var threadMax = ${b}(-3.402823e+38f);`:`var threadMax = ${b}(-65504.0h);`,w=r.compute({name:"Softmax",shaderCache:{hint:`${m};${y}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:d.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:g}]}),getShaderSource:e=>{let t;return`
      var<workgroup> rowMaxShared : ${b};
      var<workgroup> rowSumShared : ${b};
      var<workgroup> threadShared : array<${b}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${b} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${b}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${e.registerUniform("packedCols","i32").declareVariables(_,$)}
      ${e.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${b}(${t="threadShared[0]",4===m?`max(max(${t}.x, ${t}.y), max(${t}.z, ${t}.w))`:2===m?`max(${t}.x, ${t}.y)`:3===m?`max(max(${t}.x, ${t}.y), ${t}.z)`:t});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${b}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${b}(${th("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[d],outputs:[l?-1:0]})[0],l&&r.compute(tx(w,p),{inputs:[w]})},aK=e=>e5({axis:e.axis})}),sa=P(()=>{nl(),ng(),ny(),aQ=e=>Array.from(e.getBigInt64Array(),Number),aZ=e=>{var t;let r,i,a,n,s,o,u;(e=>{if(!e||2!==e.length)throw Error("Tile requires 2 inputs.");if(1!==e[0].dataType&&10!==e[0].dataType&&6!==e[0].dataType&&12!==e[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==e[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==e[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(aQ(e[1]).length!==e[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(e.inputs),e.compute((r=(t=e.inputs)[0].dims,a=((e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r})(r,i=(void 0)??aQ(t[1])),n=te.size(a),s=t[0].dataType,o=tg("input",s,r.length),u=ty("output",s,a.length),{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...tl(t[0].dims,a)]}),getShaderSource:e=>`
      const inputShape = ${o.indices(...r)};
      ${e.registerUniform("output_size","u32").declareVariables(o,u)}
      ${e.mainStart()}
      ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),sn=P(()=>{nl(),ng(),ny(),aX=e=>{e.compute((e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(te.areEqual(t,r)&&te.areEqual(r,i)),s=t,o=te.size(t);if(n){let e=e7.calcShape(e7.calcShape(t,r,!1),i,!1);if(!e)throw Error("Can't perform where op on the given tensors");s=e,o=te.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:t=>((e,t,r,i,a)=>{let n=ty("output_data",a,r.length,4),s=tg("a_data",t[1].dataType,t[1].dims.length,4),o=tg("b_data",t[2].dataType,t[2].dims.length,4),u=tg("c_data",t[0].dataType,t[0].dims.length,4),l,d=(e,t,r)=>`select(${t}, ${e}, ${r})`;if(i){let e=(e,t,r="")=>{let i=`a_data[index_a${t}][component_a${t}]`,a=`b_data[index_b${t}][component_b${t}]`,l=`bool(c_data[index_c${t}] & (0xffu << (component_c${t} * 8)))`;return`
            let output_indices${t} = ${n.offsetToIndices(`global_idx * 4u + ${t}u`)};
            let offset_a${t} = ${s.broadcastedIndicesToOffset(`output_indices${t}`,n)};
            let offset_b${t} = ${o.broadcastedIndicesToOffset(`output_indices${t}`,n)};
            let offset_c${t} = ${u.broadcastedIndicesToOffset(`output_indices${t}`,n)};
            let index_a${t} = offset_a${t} / 4u;
            let index_b${t} = offset_b${t} / 4u;
            let index_c${t} = offset_c${t} / 4u;
            let component_a${t} = offset_a${t} % 4u;
            let component_b${t} = offset_b${t} % 4u;
            let component_c${t} = offset_c${t} % 4u;
            ${e}[${t}] = ${r}(${d(i,a,l)});
          `};l=9===a?`
            var data = vec4<u32>(0);
            ${e("data",0,"u32")}
            ${e("data",1,"u32")}
            ${e("data",2,"u32")}
            ${e("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${e("output_data[global_idx]",0)}
            ${e("output_data[global_idx]",1)}
            ${e("output_data[global_idx]",2)}
            ${e("output_data[global_idx]",3)}
          `}else l=n.setByOffset("global_idx",d(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`})(t,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...tl(i,t,r,s)]})}})(e.inputs))}}),ss=P(()=>{nv(),nw(),nx(),nS(),nT(),nI(),nC(),nD(),nU(),nW(),nq(),nL(),nV(),nG(),nH(),nF(),nj(),nK(),nQ(),nZ(),nJ(),n0(),n1(),n2(),n3(),nX(),n4(),n6(),n8(),n5(),n9(),nb(),n7(),se(),st(),sr(),si(),nY(),sa(),n_(),nk(),sn(),aY=new Map([["Abs",[ri]],["Acos",[ra]],["Acosh",[rn]],["Add",[rF]],["ArgMax",[t6,t8]],["ArgMin",[t4,t8]],["Asin",[rs]],["Asinh",[ro]],["Atan",[ru]],["Atanh",[rl]],["Attention",[t7]],["AveragePool",[ax,aw]],["BatchNormalization",[re]],["BiasAdd",[rt]],["BiasSplitGelu",[rG]],["Cast",[rp,rd]],["Ceil",[rh]],["Clip",[rc]],["Concat",[r2,r3]],["Conv",[iv,i$]],["ConvTranspose",[iC,iT]],["Cos",[rf]],["Cosh",[rm]],["CumSum",[iE,iz]],["DepthToSpace",[iA,iO]],["DequantizeLinear",[aO,aR]],["Div",[rj]],["Einsum",[iU,iW]],["Elu",[ry,rg]],["Equal",[rK]],["Erf",[r$]],["Exp",[rb]],["Expand",[iL]],["FastGelu",[iV]],["Floor",[rv]],["FusedConv",[iv,i$]],["Gather",[iH,iG]],["GatherElements",[iX,iZ]],["GatherBlockQuantized",[iK,iQ]],["GatherND",[iF,ij]],["Gelu",[rw]],["Gemm",[iJ,iY]],["GlobalAveragePool",[aT,ak]],["GlobalMaxPool",[aA,az]],["Greater",[rY]],["GreaterOrEqual",[r0]],["GridSample",[i6,i8]],["GroupQueryAttention",[ao]],["HardSigmoid",[rz,rE]],["InstanceNormalization",[al]],["LayerNormalization",[ad]],["LeakyRelu",[rx,rg]],["Less",[rJ]],["LessOrEqual",[r1]],["Log",[rq]],["MatMul",[ap]],["MatMulNBits",[ac,ah]],["MaxPool",[aC,aE]],["Mul",[rQ]],["MultiHeadAttention",[at,i9]],["Neg",[rk]],["Not",[rS]],["Pad",[af]],["Pow",[rZ]],["QuickGelu",[rV,rg]],["Range",[aB]],["Reciprocal",[rT]],["ReduceMin",[tY]],["ReduceMean",[tj]],["ReduceMax",[tX]],["ReduceSum",[t0]],["ReduceProd",[tJ]],["ReduceL1",[tK]],["ReduceL2",[tQ]],["ReduceLogSum",[t2]],["ReduceLogSumExp",[tZ]],["ReduceSumSquare",[t1]],["Relu",[rI]],["Resize",[aU,aW]],["RotaryEmbedding",[aq]],["ScatterND",[aM,aN]],["Sigmoid",[rC]],["Sin",[rA]],["Sinh",[rO]],["Slice",[aH,aF]],["SkipLayerNormalization",[aL]],["Split",[ai,aa]],["Sqrt",[rR]],["Softmax",[aj,aK]],["Sub",[rX]],["Tan",[rB]],["Tanh",[rM]],["ThresholdedRelu",[rW,rg]],["Tile",[aZ]],["Transpose",[tS,tk]],["Where",[aX]]])}),so=P(()=>{es(),np(),ny(),aJ=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){C(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let o=[];for(let e of t)o.push({binding:o.length,resource:{buffer:e.buffer}});for(let e of r)o.push({binding:o.length,resource:{buffer:e.buffer}});a&&o.push({binding:o.length,resource:a});let u=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if("capturing"===this.backend.sessionStatus){let t={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(t)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),E(e.programInfo.name)}dispose(){}build(e,t){C(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(e=>{r.features.has(e.feature)&&i.push(`enable ${e.extension};`)});let a=tv(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,o=r.createShaderModule({code:s,label:e.name});eZ("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return E(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t="number"==typeof e?e:e.x,r="number"==typeof e?1:e.y||1,i="number"==typeof e?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(!(s>a))return[s,s,1];if((s=Math.ceil(Math.cbrt(n)))>a)throw Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}}}),su=P(()=>{es(),nl(),np(),nc(),nf(),ss(),so(),a0=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},a1=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let t=e.limits;this.subgroupsSupported&&t.minSubgroupSize&&t.maxSubgroupSize?this.subgroupSizeRange=[t.minSubgroupSize,t.maxSubgroupSize]:this.subgroupSizeRange=void 0}},a2=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=e=>t.features.has(e)&&r.push(e)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups")&&a("subgroups-f16"),this.device=await t.requestDevice(i),this.deviceInfo=new a1(this.device),this.adapterInfo=new a0(t.info||await t.requestAdapterInfo()),this.gpuDataManager=e6(this),this.programManager=new aJ(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,eQ(e.logLevel,!!e.debug),this.device.onuncapturederror=e=>{e.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${e.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};"at-passes"===this.queryType&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let e;this.commandEncoder&&(C(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),e=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let e=0;e<t.length/2;e++){let i=r[e],a=i.kernelId,n=this.kernels.get(a),s=n.kernelType,o=n.kernelName,u=i.programName,l=i.inputTensorViews,d=i.outputTensorViews,p=t[2*e],c=t[2*e+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);let h=Number(p-this.queryTimeBase),f=Number(c-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(f))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:l.map(e=>({dims:e.dims,dataType:eP(e.dataType)})),outputsMetadata:d.map(e=>({dims:e.dims,dataType:eP(e.dataType)})),kernelId:a,kernelType:s,kernelName:o,programName:u,startTime:h,endTime:f});else{let e="";l.forEach((t,r)=>{e+=`input[${r}]: [${t.dims}] | ${eP(t.dataType)}, `});let t="";d.forEach((e,r)=>{t+=`output[${r}]: [${e.dims}] | ${eP(e.dataType)}, `}),console.log(`[profiling] kernel "${a}|${s}|${o}|${u}" ${e}${t}execution time: ${f-h} ns`)}T("GPU",`${u}::${p}::${c}`)}e.unmap(),this.pendingQueries.delete(e)}),E())}run(e,t,r,i,a,n){var s,o,u;let l,d;C(e.name);let p=[];for(let e=0;e<t.length;++e){let r=t[e].data;if(0===r)continue;let i=this.gpuDataManager.get(r);if(!i)throw Error(`no GPU data for input: ${r}`);p.push(i)}let{outputs:c,dispatchGroup:h,programUniforms:f}=e.getRunData(t),m=0===r.length?c.map((e,t)=>t):r;if(m.length!==c.length)throw Error(`Output size ${m.length} must be equal to ${c.length}.`);let g=[],y=[];for(let e=0;e<c.length;++e){if(!Number.isInteger(m[e])||m[e]<-3||m[e]>=n)throw Error(`Invalid output index: ${m[e]}`);if(-3===m[e])continue;let t=-1===m[e],r=-2===m[e],s=t||r?a(c[e].dataType,c[e].dims):i(m[e],c[e].dataType,c[e].dims);if(g.push(s),0===s.data)continue;let o=this.gpuDataManager.get(s.data);if(!o)throw Error(`no GPU data for output: ${s.data}`);if(t&&this.temporaryData.push(o),r){let e=this.kernelPersistentData.get(this.currentKernelId);e||(e=[],this.kernelPersistentData.set(this.currentKernelId,e)),e.push(o)}y.push(o)}if(p.length!==t.length||y.length!==g.length){if(0===y.length)return E(e.name),g;throw Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(f){let e=0,t=[];f.forEach(r=>{let i="number"==typeof r.data?[r.data]:r.data;if(0===i.length)return;let a=10===r.type?2:4,n,s;10===r.type?(s=i.length>4?16:i.length>2?8:i.length*a,n=i.length>4?16:a*i.length):(s=i.length<=2?i.length*a:16,n=16),e=Math.ceil(e/s)*s,t.push(e);let o=10===r.type?8:4;e+=i.length>4?Math.ceil(i.length/o)*n:i.length*a});let r=new ArrayBuffer(e=16*Math.ceil(e/16));f.forEach((e,i)=>{let a=t[i],n="number"==typeof e.data?[e.data]:e.data;if(6===e.type)new Int32Array(r,a,n.length).set(n);else if(12===e.type)new Uint32Array(r,a,n.length).set(n);else if(10===e.type)new Uint16Array(r,a,n.length).set(n);else if(1===e.type)new Float32Array(r,a,n.length).set(n);else throw Error(`Unsupported uniform type: ${eP(e.type)}`)});let i=this.gpuDataManager.create(e,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(i.buffer,0,r,0,e),this.gpuDataManager.release(i.id),l={offset:0,size:e,buffer:i.buffer}}let _=this.programManager.normalizeDispatchGroupSize(h),$=(s=e,o=t,u=1===_[1]&&1===_[2],d=s.name,s.shaderCache?.hint&&(d+="["+s.shaderCache.hint+"]"),d+=":"+u+`:${((e,t)=>{if(t.length!==e.length)throw Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":r.push("");break;case"type":r.push(`${a}`);break;case"rank":{let t=e[i].dims.length;r.push(`${a};${t}`);break}case"dims":{let t=e[i].dims.join(",");r.push(`${a};${t}`);break}default:throw Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")})(o,s.shaderCache?.inputDependencies??Array(o.length).fill("dims"))}`),b=this.programManager.getArtifact($);if(b||(b=this.programManager.build(e,_),this.programManager.setArtifact($,b),eZ("info",()=>`[artifact] key: ${$}, programName: ${e.name}`)),f&&b.uniformVariablesInfo){if(f.length!==b.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${b.uniformVariablesInfo.length}, got ${f.length} in program "${b.programInfo.name}".`);for(let e=0;e<f.length;e++){let t=f[e],r=t.type,i="number"==typeof t.data?1:t.data.length,[a,n]=b.uniformVariablesInfo[e];if(r!==a||i!==n)throw Error(`Uniform variable ${e} mismatch: expect type ${a} with size ${n}, got type ${r} with size ${i} in program "${b.programInfo.name}".`)}}if(eZ("info",()=>`[ProgramManager] run "${e.name}" (key=${$}) with ${_[0]}x${_[1]}x${_[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let e={kernelId:this.currentKernelId,programName:b.programInfo.name,inputTensorViews:t,outputTensorViews:g};this.pendingKernels.push(e),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(e)}return this.programManager.run(b,p,y,_,l),E(e.name),g}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=aY.get(e);if(!a)throw Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let e of t)this.gpuDataManager.release(e.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,o=i.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),eZ("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(e){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${e}`)),1}finally{for(let e of(u&&r.push(this.device.popErrorScope().then(e=>e?`GPU validation error for kernel "[${a}] ${n}": ${e.message}`:null)),this.temporaryData))this.gpuDataManager.release(e.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(e=>this.gpuDataManager.unregisterExternalBuffer(e[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await e3(this,e,t);return eX(i.buffer,r)}}writeTimestamp(e){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){eZ("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){eZ("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){eZ("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let r=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(2*this.pendingDispatchNumber),r.setPipeline(a.computePipeline),r.setBindGroup(0,a.bindGroup),r.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),sl=P(()=>{np(),a3=1,a4=()=>a3++,a6=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),a8=(e,t)=>{let r=a6.get(e);if(!r)throw Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((e,t)=>e*t)*r/8):0},a5=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return a8(this.dataType,this.tensorShape)}destroy(){eZ("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((e,t)=>e===r[t])}},a9=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e);if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==a8(t,r))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let n=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,n,!0,!0),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength)return void this.wrapper.write(e);else eZ("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e)return void(e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload));else return this.activeUpload.buffer;if(!this.wrapper)throw Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},a7=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw Error("MLContext not found for session.");return t}reserveTensorId(){let e=a4();return this.tensorTrackersById.set(e,new a9(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){eZ("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");r.upload(t)}async download(e,t){eZ("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=a4(),s=new a5({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new a9(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n){let s=this.getMLContext(e);for(let[i,a]of this.freeTensors.entries())if(a.canReuseTensor(s,t,r)){eZ("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let a=this.freeTensors.splice(i,1)[0];return a.sessionId=e,a}eZ("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let o=await s.createTensor({dataType:t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new a5({sessionId:e,context:s,tensor:o,dataType:t,shape:r})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},ne=(...e)=>new a7(...e)}),sd=P(()=>{nl(),nn(),nc(),sl(),np(),nt=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),nr=class{constructor(e){this.tensorManager=ne(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.temporaryGraphInputs=[],this.temporarySessionTensorIds=new Map,eQ(e.logLevel,!!e.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(e){eZ("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){eZ("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let e of t)eZ("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(t=>t.gpuDevice===e);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:t}),t}}if(void 0===e){let e=this.mlContextCache.findIndex(e=>void 0===e.options&&void 0===e.gpuDevice);if(-1!==e)return this.mlContextCache[e].mlContext;{let e=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:e}),e}}let t=this.mlContextCache.findIndex(t=>((e,t)=>{if(e===t)return!0;if(void 0===e||void 0===t)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((r,a)=>r===i[a]&&e[r]===t[r])})(t.options,e));if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),0===r.size){this.sessionIdsByMLContext.delete(t);let e=this.mlContextCache.findIndex(e=>e.mlContext===t);-1!==e&&this.mlContextCache.splice(e,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){eZ("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=nt.get(r);if(!n)throw Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){eZ("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=nt.get(t);if(!i)throw Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!eA().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");eZ("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return eX(r,t)}}registerMLTensor(e,t,r,i){let a=nt.get(r);if(!a)throw Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return eZ("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,r,i,a,n){if(!n)throw Error("External mounted files are not available.");let s=e;e.startsWith("./")&&(s=e.substring(2));let o=n.get(s);if(!o)throw Error(`File with name ${s} not found in preloaded files.`);if(t+r>o.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let u=o.slice(t,t+r).buffer,l;switch(a.dataType){case"float32":l=new Float32Array(u);break;case"float16":l=new Uint16Array(u);break;case"int32":l=new Int32Array(u);break;case"uint32":l=new Uint32Array(u);break;case"int64":l=new BigInt64Array(u);break;case"uint64":l=new BigUint64Array(u);break;case"int8":l=new Int8Array(u);break;case"int4":case"uint4":case"uint8":l=new Uint8Array(u);break;default:throw Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return eZ("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}}`),i.constant(a,l)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return!!r&&r.includes(t)}flush(){}}}),sp={};U(sp,{init:()=>sf});var sc,sh,sf,sm,sg,sy,s_,s$,sb,sv,sw,sx,sS,sk,sT,sI,sC,sE,sz,sA,sO,sR,sB,sN,sM,sD,sP,sU,sW,sq,sL,sV,sG,sH,sF=P(()=>{nl(),su(),np(),ng(),sd(),sc=class e{constructor(e,t,r,i){this.module=e,this.dataType=t,this.data=r,this.dims=i}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let e=te.size(this.dims);return 0===e?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let e=te.size(this.dims);return 0===e?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let e=te.size(this.dims);return 0===e?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let e=te.size(this.dims);return 0===e?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(t){if(te.size(t)!==te.size(this.dims))throw Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},sh=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceInfo=t.deviceInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=4===i?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let o=[];for(let t=0;t<s;t++){let t=Number(e.getValue(i*a++,n)),r=Number(e.getValue(i*a++,"*")),s=Number(e.getValue(i*a++,n)),u=[];for(let t=0;t<s;t++)u.push(Number(e.getValue(i*a++,n)));o.push(new sc(e,t,r,u))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(e=>"number"==typeof e?this.inputs[e]:e)??this.inputs,i=t?.outputs??[],a=(e,t,r)=>new sc(this.module,t,this.output(e,r),r),n=(e,t)=>{let r=eU(e,t);if(!r)throw Error(`Unsupported data type: ${e}`);let i=r>0?this.backend.gpuDataManager.create(r).id:0;return new sc(this.module,e,i,t)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let r=this.module.PTR_SIZE,i=4===r?"i32":"i64",a=this.module.stackAlloc((1+t.length)*r);this.module.setValue(a,t.length,i);for(let e=0;e<t.length;e++)this.module.setValue(a+r*(e+1),t[e],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(r){throw Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(r)}}},sf=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===e){let e=new a2;await e.initialize(r,i),a("webgpu",[e,t=>e.alloc(Number(t)),t=>e.free(t),(r,i,a,n=!1)=>{if(n)eZ("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(r)}, dst=${Number(i)}, size=${Number(a)}`),e.memcpy(Number(r),Number(i));else{eZ("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(r)}, gpuDataId=${Number(i)}, size=${Number(a)}`);let n=t.HEAPU8.subarray(Number(r>>>0),Number(r>>>0)+Number(a));e.upload(Number(i),n)}},async(r,i,a)=>{eZ("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${r}, dataOffset=${i}, size=${a}`),await e.download(Number(r),()=>t.HEAPU8.subarray(Number(i)>>>0,Number(i+a)>>>0))},(r,i,a)=>e.createKernel(r,Number(i),a,t.UTF8ToString(t._JsepGetNodeName(Number(i)))),t=>e.releaseKernel(t),(r,i,a,n)=>{eZ("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${a}, kernel=${r}, contextDataOffset=${i}`);let s=new sh(t,e,Number(i));return e.computeKernel(Number(r),s,n)},()=>e.captureBegin(),()=>e.captureEnd(),()=>e.replay()])}else{let e=new nr(r);a("webnn",[e,()=>e.reserveTensorId(),t=>e.releaseTensorId(t),async(t,r,i,a,n)=>e.ensureTensor(t,r,i,a,n),(t,r)=>{e.uploadTensor(t,r)},async(t,r)=>e.downloadTensor(t,r)])}}}),sj=P(()=>{no(),nu(),nl(),nn(),ns(),nd(),sm=async e=>{var t,r;t=e.wasm.numThreads,r=eq(e.logLevel),0!==eA()._OrtInit(t,r)&&eB("Can't initialize onnxruntime.")},sg=async(e,t)=>{{let r=(sF(),W(sp)).init;if("webgpu"===t){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");let t=e.webgpu.adapter;if(t){if("object"!=typeof t.limits||"object"!=typeof t.features||"function"!=typeof t.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let i=e.webgpu.forceFallbackAdapter;if(void 0!==i&&"boolean"!=typeof i)throw Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(!(t=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:i})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",eA(),e,t)}if("webnn"===t){if(typeof navigator>"u"||!navigator.ml)throw Error("WebNN is not supported in current environment");await r("webnn",eA(),e)}}},sy=new Map,s_=e=>{let t=eA(),r=t._malloc(e.byteLength);if(0===r)throw Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},s$=async(e,t)=>{let r,i,a=eA();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=s_(e);let n=0,s=0,o=0,u=[],l=[],d=[];try{if([s,u]=eM(t),t?.externalData&&a.mountExternalData){let e=[];for(let r of t.externalData){let t="string"==typeof r?r:r.path;e.push(eH("string"==typeof r?r:r.data).then(e=>{a.mountExternalData(t,e)}))}await Promise.all(e)}for(let e of t?.executionProviders??[])if(("string"==typeof e?e:e.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,"string"!=typeof e){let t=e?.context,r=e?.gpuDevice,i=e?.deviceType,n=e?.powerPreference;t?a.currentContext=t:r?a.currentContext=await a.jsepCreateMLContext(r):a.currentContext=await a.jsepCreateMLContext({deviceType:i,powerPreference:n})}else a.currentContext=await a.jsepCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),0===n&&eB("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.jsepRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[e,p]=(e=>{let t=eA(),r=t.stackSave();try{let r=t.PTR_SIZE,i=t.stackAlloc(2*r);0!==t._OrtGetInputOutputCount(e,i,i+r)&&eB("Can't get session input/output count.");let a=4===r?"i32":"i64";return[Number(t.getValue(i,a)),Number(t.getValue(i+r,a))]}finally{t.stackRestore(r)}})(n),c=!!t?.enableGraphCapture,h=[],f=[],m=[];for(let t=0;t<e;t++){let e=a._OrtGetInputName(n,t);0===e&&eB("Can't get an input name."),l.push(e),h.push(a.UTF8ToString(e))}for(let e=0;e<p;e++){let r=a._OrtGetOutputName(n,e);0===r&&eB("Can't get an output name."),d.push(r);let i=a.UTF8ToString(r);f.push(i);{if(c&&t?.preferredOutputLocation===void 0){m.push("gpu-buffer");continue}let e="string"==typeof t?.preferredOutputLocation?t.preferredOutputLocation:t?.preferredOutputLocation?.[i]??"cpu";if("cpu"!==e&&"cpu-pinned"!==e&&"gpu-buffer"!==e&&"ml-tensor"!==e)throw Error(`Not supported preferred output location: ${e}.`);if(c&&"gpu-buffer"!==e)throw Error(`Not supported preferred output location: ${e}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);m.push(e)}}let g=null;return m.some(e=>"gpu-buffer"===e||"ml-tensor"===e)&&(o=a._OrtCreateBinding(n),0===o&&eB("Can't create IO binding."),g={handle:o,outputPreferredLocations:m,outputPreferredLocationsEncoded:m.map(e=>eG(e))}),sy.set(n,[n,l,d,g,c,!1]),[n,h,f]}catch(e){throw l.forEach(e=>a._OrtFree(e)),d.forEach(e=>a._OrtFree(e)),0!==o&&0!==a._OrtReleaseBinding(o)&&eB("Can't release IO binding."),0!==n&&0!==a._OrtReleaseSession(n)&&eB("Can't release session."),e}finally{a._free(r),0!==s&&0!==a._OrtReleaseSessionOptions(s)&&eB("Can't release session options."),u.forEach(e=>a._free(e)),a.unmountExternalData?.()}},sb=e=>{let t=eA(),r=sy.get(e);if(!r)throw Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,o]=r;s&&(o&&0!==t._OrtClearBoundOutputs(s.handle)&&eB("Can't clear bound outputs."),0!==t._OrtReleaseBinding(s.handle)&&eB("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),a.forEach(e=>t._OrtFree(e)),n.forEach(e=>t._OrtFree(e)),0!==t._OrtReleaseSession(i)&&eB("Can't release session."),sy.delete(e)},sv=async(e,t,r,i,a,n=!1)=>{if(!e)return void t.push(0);let s=eA(),o=s.PTR_SIZE,u=e[0],l=e[1],d=e[3],p=d,c,h;if("string"===u&&("gpu-buffer"===d||"ml-tensor"===d))throw Error("String tensor is not supported on GPU.");if(n&&"gpu-buffer"!==d)throw Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if("gpu-buffer"===d){let t=e[2].gpuBuffer;h=eU(eD(u),l);let r=s.jsepRegisterBuffer;if(!r)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=r(i,a,t,h)}else if("ml-tensor"===d){let t=e[2].mlTensor;h=eU(eD(u),l);let r=s.jsepRegisterMLTensor;if(!r)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=r(i,t,eD(u),l)}else{let t=e[2];if(Array.isArray(t)){h=o*t.length,c=s._malloc(h),r.push(c);for(let e=0;e<t.length;e++){if("string"!=typeof t[e])throw TypeError(`tensor data at index ${e} is not a string`);s.setValue(c+e*o,eO(t[e],r),"*")}}else{let e=s.jsepIsGraphInput;if("string"!==u&&e){let n=s._OrtGetInputName(i,a);if(e(i,s.UTF8ToString(n))){let e=eD(u);h=eU(e,l),p="ml-tensor";let r=s.jsepCreateTemporaryTensor,a=s.jsepUploadTensor;if(!r||!a)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let n=await r(i,e,l);a(n,new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),c=n}else h=t.byteLength,c=s._malloc(h),r.push(c),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,h),c)}else h=t.byteLength,c=s._malloc(h),r.push(c),s.HEAPU8.set(new Uint8Array(t.buffer,t.byteOffset,h),c)}}let f=s.stackSave(),m=s.stackAlloc(4*l.length);try{l.forEach((e,t)=>s.setValue(m+t*o,e,4===o?"i32":"i64"));let e=s._OrtCreateTensor(eD(u),c,h,m,l.length,eG(p));0===e&&eB(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(e)}finally{s.stackRestore(f)}},sw=async(e,t,r,i,a,n)=>{let s=eA(),o=s.PTR_SIZE,u=sy.get(e);if(!u)throw Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],c=u[3],h=u[4],f=u[5],m=t.length,g=i.length,y=0,_=[],$=[],b=[],v=[],w=s.stackSave(),x=s.stackAlloc(m*o),S=s.stackAlloc(m*o),k=s.stackAlloc(g*o),T=s.stackAlloc(g*o);try{let u;[y,_]=eN(n);for(let i=0;i<m;i++)await sv(r[i],$,v,e,t[i],h);for(let t=0;t<g;t++)await sv(a[t],b,v,e,m+i[t],h);for(let e=0;e<m;e++)s.setValue(x+e*o,$[e],"*"),s.setValue(S+e*o,d[t[e]],"*");for(let e=0;e<g;e++)s.setValue(k+e*o,b[e],"*"),s.setValue(T+e*o,p[i[e]],"*");if(c&&!f){let{handle:r,outputPreferredLocations:n,outputPreferredLocationsEncoded:o}=c;if(d.length!==m)throw Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);for(let i=0;i<m;i++){let a=t[i];await s._OrtBindInput(r,d[a],$[i])!==0&&eB(`Can't bind input[${i}] for session=${e}.`)}for(let t=0;t<g;t++){let u=i[t];a[t]?.[3]?0!==s._OrtBindOutput(r,p[u],b[t],0)&&eB(`Can't bind pre-allocated output[${t}] for session=${e}.`):0!==s._OrtBindOutput(r,p[u],0,o[u])&&eB(`Can't bind output[${t}] to ${n[t]} for session=${e}.`)}sy.set(e,[l,d,p,c,h,!0])}s.jsepOnRunStart?.(l),u=c?await s._OrtRunWithBinding(l,c.handle,g,k,y):await s._OrtRun(l,S,x,m,T,g,k,y),0!==u&&eB("failed to call OrtRun().");let w=[];for(let t=0;t<g;t++){let r=Number(s.getValue(k+t*o,"*"));if(r===b[t]){w.push(a[t]);continue}let n=s.stackSave(),u=s.stackAlloc(4*o),d=!1,p,h=0;try{0!==s._OrtGetTensorData(r,u,u+o,u+2*o,u+3*o)&&eB(`Can't access output tensor data on index ${t}.`);let a=4===o?"i32":"i64",n=Number(s.getValue(u,a));h=s.getValue(u+o,"*");let l=s.getValue(u+2*o,"*"),f=Number(s.getValue(u+3*o,a)),m=[];for(let e=0;e<f;e++)m.push(Number(s.getValue(l+e*o,a)));0!==s._OrtFree(l)&&eB("Can't free memory for tensor dims.");let g=m.reduce((e,t)=>e*t,1);p=eP(n);let y=c?.outputPreferredLocations[i[t]];if("string"===p){if("gpu-buffer"===y||"ml-tensor"===y)throw Error("String tensor is not supported on GPU.");let e=[];for(let t=0;t<g;t++){let r=s.getValue(h+t*o,"*"),i=s.getValue(h+(t+1)*o,"*"),a=t===g-1?void 0:i-r;e.push(s.UTF8ToString(r,a))}w.push([p,m,e,"cpu"])}else if("gpu-buffer"===y&&g>0){let e=s.jsepGetBuffer;if(!e)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let t=e(h),i=eU(n,g);if(void 0===i||!eL(p))throw Error(`Unsupported data type: ${p}`);d=!0,w.push([p,m,{gpuBuffer:t,download:s.jsepCreateDownloader(t,i,p),dispose:()=>{0!==s._OrtReleaseTensor(r)&&eB("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===y&&g>0){let t=s.jsepEnsureTensor;if(!t)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===eU(n,g)||!eV(p))throw Error(`Unsupported data type: ${p}`);let i=await t(e,h,n,m,!1);d=!0,w.push([p,m,{mlTensor:i,download:s.jsepCreateMLTensorDownloader(h,p),dispose:()=>{s.jsepReleaseTensorId(h),s._OrtReleaseTensor(r)}},"ml-tensor"])}else{let e=new(eW(p))(g);new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(s.HEAPU8.subarray(h,h+e.byteLength)),w.push([p,m,e,"cpu"])}}finally{s.stackRestore(n),"string"===p&&h&&s._free(h),d||s._OrtReleaseTensor(r),s.jsepOnRunEnd?.(l)}}return c&&!h&&(0!==s._OrtClearBoundOutputs(c.handle)&&eB("Can't clear bound outputs."),sy.set(e,[l,d,p,c,h,!1])),w}finally{s.stackRestore(w),$.forEach(e=>s._OrtReleaseTensor(e)),b.forEach(e=>s._OrtReleaseTensor(e)),v.forEach(e=>s._free(e)),0!==y&&s._OrtReleaseRunOptions(y),_.forEach(e=>s._free(e))}},sx=e=>{let t=eA(),r=sy.get(e);if(!r)throw Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);0===a&&eB("Can't get an profile file name."),t._OrtFree(a)},sS=e=>{let t=[];for(let r of e){let e=r[2];!Array.isArray(e)&&"buffer"in e&&t.push(e.buffer)}return t}}),sK=P(()=>{es(),sj(),nn(),na(),sk=()=>!!l.wasm.proxy&&"u">typeof document,sI=!1,sC=!1,sE=!1,sO=new Map,sR=(e,t)=>{let r=sO.get(e);r?r.push(t):sO.set(e,[t])},sB=()=>{if(sI||!sC||sE||!sT)throw Error("worker not ready")},sN=e=>{switch(e.data.type){case"init-wasm":sI=!1,e.data.err?(sE=!0,sA[1](e.data.err)):(sC=!0,sA[0]()),sz&&(URL.revokeObjectURL(sz),sz=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=sO.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out)}}},sM=async()=>{if(!sC){if(sI)throw Error("multiple calls to 'initWasm()' detected.");if(sE)throw Error("previous call to 'initWasm()' failed.");if(sI=!0,sk())return new Promise((t,r)=>{sT?.terminate(),ex().then(([i,a])=>{try{(sT=a).onerror=e=>r(e),sT.onmessage=sN,sA=[t,r];let n={type:"init-wasm",in:l};!n.in.wasm.wasmPaths&&(i||O.url?.startsWith("file:"))&&(n.in.wasm.wasmPaths={wasm:new e.U(e.r(36444)).href}),sT.postMessage(n),sz=i}catch(e){r(e)}},r)});try{await ez(l.wasm),await sm(l),sC=!0}catch(e){throw sE=!0,e}finally{sI=!1}}},sD=async e=>{if(sk())return sB(),new Promise((t,r)=>{sR("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:l}};sT.postMessage(i)});await sg(l,e)},sP=async e=>sk()?(sB(),new Promise((t,r)=>{sR("copy-from",[t,r]),sT.postMessage({type:"copy-from",in:{buffer:e}},[e.buffer])})):s_(e),sU=async(e,t)=>{if(!sk())return s$(e,t);if(t?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return sB(),new Promise((r,i)=>{sR("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),sT.postMessage(a,n)})},sW=async e=>{if(sk())return sB(),new Promise((t,r)=>{sR("release",[t,r]),sT.postMessage({type:"release",in:e})});sb(e)},sq=async(e,t,r,i,a,n)=>{if(!sk())return sw(e,t,r,i,a,n);if(r.some(e=>"cpu"!==e[3]))throw Error("input tensor on GPU is not supported for proxy.");if(a.some(e=>e))throw Error("pre-allocated output tensor is not supported for proxy.");return sB(),new Promise((a,s)=>{sR("run",[a,s]),sT.postMessage({type:"run",in:{sessionId:e,inputIndices:t,inputs:r,outputIndices:i,options:n}},sS(r))})},sL=async e=>{if(sk())return sB(),new Promise((t,r)=>{sR("end-profiling",[t,r]),sT.postMessage({type:"end-profiling",in:e})});sx(e)}}),sQ=P(()=>{es(),sK(),nl(),eo(),nd(),sV=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${e.location} for ${t()}`)}},sG=e=>{switch(e[3]){case"cpu":return new k(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!eL(t))throw Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return k.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!eV(t))throw Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return k.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw Error(`invalid data location: ${e[3]}`)}},sH=class{async fetchModelAndCopyToWasmMemory(e){return sP(await eH(e))}async loadModel(e,t){let r;C(),r="string"==typeof e?await this.fetchModelAndCopyToWasmMemory(e):e,[this.sessionId,this.inputNames,this.outputNames]=await sU(r,t),E()}async dispose(){return sW(this.sessionId)}async run(e,t,r){C();let i=[],a=[];Object.entries(e).forEach(e=>{let t=e[0],r=e[1],n=this.inputNames.indexOf(t);if(-1===n)throw Error(`invalid input '${t}'`);i.push(r),a.push(n)});let n=[],s=[];Object.entries(t).forEach(e=>{let t=e[0],r=e[1],i=this.outputNames.indexOf(t);if(-1===i)throw Error(`invalid output '${t}'`);n.push(r),s.push(i)});let o=i.map((e,t)=>sV(e,()=>`input "${this.inputNames[a[t]]}"`)),u=n.map((e,t)=>e?sV(e,()=>`output "${this.outputNames[s[t]]}"`):null),l=await sq(this.sessionId,a,o,s,u,r),d={};for(let e=0;e<l.length;e++)d[this.outputNames[s[e]]]=n[e]??sG(l[e]);return E(),d}startProfiling(){}endProfiling(){sL(this.sessionId)}}}),sZ={};U(sZ,{OnnxruntimeWebAssemblyBackend:()=>sY,initializeFlags:()=>sX,wasmBackend:()=>sJ});var sX,sY,sJ,s0=P(()=>{es(),sK(),sQ(),sX=()=>{if(("number"!=typeof l.wasm.initTimeout||l.wasm.initTimeout<0)&&(l.wasm.initTimeout=0),!1===l.wasm.simd&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),"boolean"!=typeof l.wasm.proxy&&(l.wasm.proxy=!1),"boolean"!=typeof l.wasm.trace&&(l.wasm.trace=!1),"number"!=typeof l.wasm.numThreads||!Number.isInteger(l.wasm.numThreads)||l.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)l.wasm.numThreads=1;else{let e=typeof navigator>"u"?D("node:os").cpus().length:navigator.hardwareConcurrency;l.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},sJ=new(sY=class{async init(e){sX(),await sM(),await sD(e)}async createInferenceSessionHandler(e,t){let r=new sH;return await r.loadModel(e,t),Promise.resolve(r)}})});es(),es(),es();{let e=(s0(),W(sZ)).wasmBackend;i("webgpu",e,5),i("webnn",e,5),i("cpu",e,10),i("wasm",e,10)}Object.defineProperty(l.versions,"web",{value:"1.21.0",enumerable:!0}),e.s(["default",0,en])}]);