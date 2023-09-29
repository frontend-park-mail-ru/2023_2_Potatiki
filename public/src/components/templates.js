!function(){var n=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l["button.hbs"]=n({1:function(n,l,e,a,o){var t=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' <img class="button__img" src="'+n.escapeExpression("function"==typeof(e=null!=(e=t(e,"imgSrc")||(null!=l?t(l,"imgSrc"):l))?e:n.hooks.helperMissing)?e.call(null!=l?l:n.nullContext||{},{name:"imgSrc",hash:{},data:o,loc:{start:{line:2,column:50},end:{line:2,column:60}}}):e)+'"> '},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<button class="button '+u(typeof(t=null!=(t=i(e,"class")||(null!=l?i(l,"class"):l))?t:s)==c?t.call(r,{name:"class",hash:{},data:o,loc:{start:{line:1,column:22},end:{line:1,column:31}}}):t)+'" type="'+u(typeof(t=null!=(t=i(e,"type")||(null!=l?i(l,"type"):l))?t:s)==c?t.call(r,{name:"type",hash:{},data:o,loc:{start:{line:1,column:39},end:{line:1,column:47}}}):t)+'" id="'+u(typeof(t=null!=(t=i(e,"id")||(null!=l?i(l,"id"):l))?t:s)==c?t.call(r,{name:"id",hash:{},data:o,loc:{start:{line:1,column:53},end:{line:1,column:59}}}):t)+'">\n    '+(null!=(n=i(e,"if").call(r,null!=l?i(l,"withImg"):l,{name:"if",hash:{},fn:n.program(1,o,0),inverse:n.noop,data:o,loc:{start:{line:2,column:4},end:{line:2,column:70}}}))?n:"")+'\n    <span class="button__text">'+u(typeof(t=null!=(t=i(e,"text")||(null!=l?i(l,"text"):l))?t:s)==c?t.call(r,{name:"text",hash:{},data:o,loc:{start:{line:3,column:31},end:{line:3,column:39}}}):t)+"</span>\n</button>\n"},useData:!0}),l["carousel.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="carousel">\n    <div class="carousel-name">\n        '+u(typeof(t=null!=(t=n(e,"name")||(null!=l?n(l,"name"):l))?t:s)==c?t.call(r,{name:"name",hash:{},data:o,loc:{start:{line:3,column:8},end:{line:3,column:16}}}):t)+'\n    </div>\n    <div id="'+u(typeof(t=null!=(t=n(e,"id")||(null!=l?n(l,"id"):l))?t:s)==c?t.call(r,{name:"id",hash:{},data:o,loc:{start:{line:5,column:13},end:{line:5,column:19}}}):t)+'" class="carousel__cards">\n    </div>\n</div>'},useData:!0}),l["form.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<form class="'+u(typeof(t=null!=(t=n(e,"formClass")||(null!=l?n(l,"formClass"):l))?t:s)==c?t.call(r,{name:"formClass",hash:{},data:o,loc:{start:{line:1,column:13},end:{line:1,column:26}}}):t)+'" id="'+u(typeof(t=null!=(t=n(e,"formId")||(null!=l?n(l,"formId"):l))?t:s)==c?t.call(r,{name:"formId",hash:{},data:o,loc:{start:{line:1,column:32},end:{line:1,column:42}}}):t)+'" method="post" name="'+u(typeof(t=null!=(t=n(e,"formName")||(null!=l?n(l,"formName"):l))?t:s)==c?t.call(r,{name:"formName",hash:{},data:o,loc:{start:{line:1,column:64},end:{line:1,column:76}}}):t)+'" novalidate>\n\n</form>'},useData:!0}),l["header.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){return'<div class="header" id="header">\n\n</div>'},useData:!0}),l["input.hbs"]=n({1:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<label class="'+u(typeof(t=null!=(t=n(e,"labelClass")||(null!=l?n(l,"labelClass"):l))?t:s)==c?t.call(r,{name:"labelClass",hash:{},data:o,loc:{start:{line:2,column:31},end:{line:2,column:45}}}):t)+'" for="'+u(typeof(t=null!=(t=n(e,"labelFor")||(null!=l?n(l,"labelFor"):l))?t:s)==c?t.call(r,{name:"labelFor",hash:{},data:o,loc:{start:{line:2,column:52},end:{line:2,column:64}}}):t)+'">'+u(typeof(t=null!=(t=n(e,"labelText")||(null!=l?n(l,"labelText"):l))?t:s)==c?t.call(r,{name:"labelText",hash:{},data:o,loc:{start:{line:2,column:66},end:{line:2,column:79}}}):t)+"</label>"},3:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="'+u(typeof(t=null!=(t=n(e,"inputError")||(null!=l?n(l,"inputError"):l))?t:s)==c?t.call(r,{name:"inputError",hash:{},data:o,loc:{start:{line:4,column:29},end:{line:4,column:43}}}):t)+'">'+u(typeof(t=null!=(t=n(e,"errorText")||(null!=l?n(l,"errorText"):l))?t:s)==c?t.call(r,{name:"errorText",hash:{},data:o,loc:{start:{line:4,column:45},end:{line:4,column:58}}}):t)+"</div>"},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t,r,s=null!=l?l:n.nullContext||{},c=n.hooks.helperMissing,u="function",i=n.escapeExpression,m=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="'+i(typeof(r=null!=(r=m(e,"inputContainerClass")||(null!=l?m(l,"inputContainerClass"):l))?r:c)==u?r.call(s,{name:"inputContainerClass",hash:{},data:o,loc:{start:{line:1,column:12},end:{line:1,column:35}}}):r)+'">\n    '+(null!=(t=m(e,"if").call(s,null!=l?m(l,"label"):l,{name:"if",hash:{},fn:n.program(1,o,0),inverse:n.noop,data:o,loc:{start:{line:2,column:4},end:{line:2,column:94}}}))?t:"")+'\n    <input class="input '+i(typeof(r=null!=(r=m(e,"inputClass")||(null!=l?m(l,"inputClass"):l))?r:c)==u?r.call(s,{name:"inputClass",hash:{},data:o,loc:{start:{line:3,column:24},end:{line:3,column:38}}}):r)+'" type="'+i(typeof(r=null!=(r=m(e,"inputType")||(null!=l?m(l,"inputType"):l))?r:c)==u?r.call(s,{name:"inputType",hash:{},data:o,loc:{start:{line:3,column:46},end:{line:3,column:59}}}):r)+'" autocomplete="'+i(typeof(r=null!=(r=m(e,"autocomplete")||(null!=l?m(l,"autocomplete"):l))?r:c)==u?r.call(s,{name:"autocomplete",hash:{},data:o,loc:{start:{line:3,column:75},end:{line:3,column:91}}}):r)+'" name="'+i(typeof(r=null!=(r=m(e,"inputName")||(null!=l?m(l,"inputName"):l))?r:c)==u?r.call(s,{name:"inputName",hash:{},data:o,loc:{start:{line:3,column:99},end:{line:3,column:112}}}):r)+'" placeholder="'+i(typeof(r=null!=(r=m(e,"inputPlaceholder")||(null!=l?m(l,"inputPlaceholder"):l))?r:c)==u?r.call(s,{name:"inputPlaceholder",hash:{},data:o,loc:{start:{line:3,column:127},end:{line:3,column:147}}}):r)+'"> \n    '+(null!=(t=m(e,"if").call(s,null!=l?m(l,"error"):l,{name:"if",hash:{},fn:n.program(3,o,0),inverse:n.noop,data:o,loc:{start:{line:4,column:4},end:{line:4,column:71}}}))?t:"")+"\n</div>\n"},useData:!0}),l["link.hbs"]=n({1:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' <img class="'+u(typeof(t=null!=(t=n(e,"imgClass")||(null!=l?n(l,"imgClass"):l))?t:s)==c?t.call(r,{name:"imgClass",hash:{},data:o,loc:{start:{line:2,column:32},end:{line:2,column:44}}}):t)+'" src="'+u(typeof(t=null!=(t=n(e,"imgSrc")||(null!=l?n(l,"imgSrc"):l))?t:s)==c?t.call(r,{name:"imgSrc",hash:{},data:o,loc:{start:{line:2,column:51},end:{line:2,column:61}}}):t)+'"> '},3:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' <span class="'+u(typeof(t=null!=(t=n(e,"spanClass")||(null!=l?n(l,"spanClass"):l))?t:s)==c?t.call(r,{name:"spanClass",hash:{},data:o,loc:{start:{line:3,column:34},end:{line:3,column:47}}}):t)+'">'+u(typeof(t=null!=(t=n(e,"text")||(null!=l?n(l,"text"):l))?t:s)==c?t.call(r,{name:"text",hash:{},data:o,loc:{start:{line:3,column:49},end:{line:3,column:57}}}):t)+"</span> "},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a class="link '+u(typeof(t=null!=(t=i(e,"class")||(null!=l?i(l,"class"):l))?t:s)==c?t.call(r,{name:"class",hash:{},data:o,loc:{start:{line:1,column:15},end:{line:1,column:24}}}):t)+'" href="'+u(typeof(t=null!=(t=i(e,"href")||(null!=l?i(l,"href"):l))?t:s)==c?t.call(r,{name:"href",hash:{},data:o,loc:{start:{line:1,column:32},end:{line:1,column:40}}}):t)+'" id="'+u(typeof(t=null!=(t=i(e,"id")||(null!=l?i(l,"id"):l))?t:s)==c?t.call(r,{name:"id",hash:{},data:o,loc:{start:{line:1,column:46},end:{line:1,column:52}}}):t)+'" data-href="'+u(typeof(t=null!=(t=i(e,"href")||(null!=l?i(l,"href"):l))?t:s)==c?t.call(r,{name:"href",hash:{},data:o,loc:{start:{line:1,column:65},end:{line:1,column:73}}}):t)+'">\n    '+(null!=(u=i(e,"if").call(r,null!=l?i(l,"withImg"):l,{name:"if",hash:{},fn:n.program(1,o,0),inverse:n.noop,data:o,loc:{start:{line:2,column:4},end:{line:2,column:71}}}))?u:"")+"\n    "+(null!=(u=i(e,"if").call(r,null!=l?i(l,"withText"):l,{name:"if",hash:{},fn:n.program(3,o,0),inverse:n.noop,data:o,loc:{start:{line:3,column:4},end:{line:3,column:72}}}))?u:"")+"\n</a>\n"},useData:!0}),l["loginForm.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<form class="login-form" id="login-form" method="post" name="'+n.escapeExpression("function"==typeof(e=null!=(e=t(e,"formName")||(null!=l?t(l,"formName"):l))?e:n.hooks.helperMissing)?e.call(null!=l?l:n.nullContext||{},{name:"formName",hash:{},data:o,loc:{start:{line:1,column:61},end:{line:1,column:73}}}):e)+'" novalidate>\n    <span class="login-form__name">\n        Авторизация\n    </span>\n</form>\n'},useData:!0}),l["productCard.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t,r=null!=l?l:n.nullContext||{},s=n.hooks.helperMissing,c="function",u=n.escapeExpression,n=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'\n<div class="product-card" id="'+u(typeof(t=null!=(t=n(e,"id")||(null!=l?n(l,"id"):l))?t:s)==c?t.call(r,{name:"id",hash:{},data:o,loc:{start:{line:2,column:30},end:{line:2,column:36}}}):t)+'">\n\n    <div class="product-card__img"></div>\n\n    <div class="product-card__name"></div>\n\n    <div class="product-card__reviews">\n        <a href="'+u(typeof(t=null!=(t=n(e,"reviewsHref")||(null!=l?n(l,"reviewsHref"):l))?t:s)==c?t.call(r,{name:"reviewsHref",hash:{},data:o,loc:{start:{line:9,column:17},end:{line:9,column:32}}}):t)+'">\n                    <div class="product-card__rate">\n                        <img src="'+u(typeof(t=null!=(t=n(e,"starHref")||(null!=l?n(l,"starHref"):l))?t:s)==c?t.call(r,{name:"starHref",hash:{},data:o,loc:{start:{line:11,column:34},end:{line:11,column:46}}}):t)+'" class="'+u(typeof(t=null!=(t=n(e,"starClass")||(null!=l?n(l,"starClass"):l))?t:s)==c?t.call(r,{name:"starClass",hash:{},data:o,loc:{start:{line:11,column:55},end:{line:11,column:68}}}):t)+'">\n                        <span class="'+u(typeof(t=null!=(t=n(e,"productRateClass")||(null!=l?n(l,"productRateClass"):l))?t:s)==c?t.call(r,{name:"productRateClass",hash:{},data:o,loc:{start:{line:12,column:37},end:{line:12,column:57}}}):t)+'">'+u(typeof(t=null!=(t=n(e,"productRate")||(null!=l?n(l,"productRate"):l))?t:s)==c?t.call(r,{name:"productRate",hash:{},data:o,loc:{start:{line:12,column:59},end:{line:12,column:74}}}):t)+'</span> \n                    </div>\n                    <div>\n                        <span class="product-card__cout-reviews">\n                            '+u(typeof(t=null!=(t=n(e,"reviewsCount")||(null!=l?n(l,"reviewsCount"):l))?t:s)==c?t.call(r,{name:"reviewsCount",hash:{},data:o,loc:{start:{line:16,column:28},end:{line:16,column:44}}}):t)+'\n                        </span>\n                    </div>\n        </a>\n    </div>\n\n    <div class="product-card__price">\n        <span>\n            '+u(typeof(t=null!=(t=n(e,"price")||(null!=l?n(l,"price"):l))?t:s)==c?t.call(r,{name:"price",hash:{},data:o,loc:{start:{line:24,column:12},end:{line:24,column:21}}}):t)+"\n        </span>\n    </div>\n\n   \n\n</div>\n"},useData:!0}),l["searchForm.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<form class="search-form" id="search-form" method="post" name="'+n.escapeExpression("function"==typeof(e=null!=(e=t(e,"formName")||(null!=l?t(l,"formName"):l))?e:n.hooks.helperMissing)?e.call(null!=l?l:n.nullContext||{},{name:"formName",hash:{},data:o,loc:{start:{line:1,column:63},end:{line:1,column:75}}}):e)+'" novalidate>\n\n</form>'},useData:!0}),l["signupForm.hbs"]=n({compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o){var t=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<form class="signup-form" id="signup-form" method="post" name="'+n.escapeExpression("function"==typeof(e=null!=(e=t(e,"formName")||(null!=l?t(l,"formName"):l))?e:n.hooks.helperMissing)?e.call(null!=l?l:n.nullContext||{},{name:"formName",hash:{},data:o,loc:{start:{line:1,column:63},end:{line:1,column:75}}}):e)+'" novalidate>\n    <span class="signup-form__name">\n        Регистрация\n    </span>\n</form>\n'},useData:!0})}();