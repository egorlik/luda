/* Логика сайта: вкладки, карточки, окно «Подробнее», анимации при скролле, посыпка.
   Данные (события, торты, отзывы) лежат в js/data.js */
var $=function(i){return document.getElementById(i)},dlg=$('dlg');
/* экран загрузки: торт собирается, шкала идёт до 100%, потом шторка уезжает вверх */
(function(){var pl=$('pl'),num=$('pln'),bar=$('plb'),msg=$('plm'),ls=pl.querySelectorAll('.L'),th=[6,22,42,60,76,90,100],
 MIN=matchMedia('(prefers-reduced-motion:reduce)').matches?900:2800,t0=performance.now(),loaded=document.readyState==='complete',done=false;
addEventListener('load',function(){loaded=true});setTimeout(function(){loaded=true},6000);
function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
function tick(now){var t=Math.min((now-t0)/MIN,1),p=100*ease(t);if(!loaded)p=Math.min(p,92);
 num.textContent=Math.round(p)+'%';bar.style.width=p+'%';
 for(var i=0;i<ls.length;i++)ls[i].classList.toggle('on',p>=th[i]-(i===6?.01:0));
 if(p>=99.9&&!done){done=true;num.textContent='100%';msg.textContent='Готово! Заходите 💕';
  setTimeout(function(){pl.classList.add('out');document.body.classList.remove('loading')},700);
  setTimeout(function(){pl.remove()},1800);return}
 requestAnimationFrame(tick)}
requestAnimationFrame(tick)})();
function wa(t){return 'https://wa.me/37377730476?text='+encodeURIComponent(t)}
function li(t){return '<li>'+t+'</li>'}
var MON=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
function pd(d){var p=d.split('-');return new Date(+p[0],p[1]-1,+p[2])}
function fd(d){var x=pd(d);return x.getDate()+' '+MON[x.getMonth()]}
function tf(e){return e.tariffs&&e.tariffs.length?e.tariffs:null}
function pn(s){return parseInt(String(s).replace(/\D/g,''),10)||0}
function priceTxt(e){var t=tf(e);return t?'от '+Math.min.apply(null,t.map(function(x){return pn(x.price)}))+' руб.':e.price}
var curE=0,curT=0;
var TODAY=new Date();TODAY.setHours(0,0,0,0);
function isPast(e){return pd(e.dateEnd||e.date)<TODAY}
function when(e){return e.dateEnd?fd(e.date)+' – '+fd(e.dateEnd):fd(e.date)+(e.time?', '+e.time:'')}
function ill(id){return '<svg class="il" aria-hidden="true"><use href="#s-'+id+'"/></svg>'}
function fig(o,x){return '<div class="fig" style="background:'+o.bg+'">'+ill(o.ill)+(o.photos[0]?'<img src="'+o.photos[0]+'" alt="'+(o.title||o.name)+'" loading="lazy" onerror="this.remove()">':'')+(x||'')+'</div>'}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
function watch(r){(r||document).querySelectorAll('.rv:not(.in),.h2:not(.in)').forEach(function(e){io.observe(e)})}
function fill(el,h){el.innerHTML=h;watch(el)}
function tabs(el,labels,cb){labels.forEach(function(k){var b=document.createElement('button');b.className='tab';b.setAttribute('role','tab');b.textContent=k;b.onclick=function(){[].forEach.call(el.children,function(x){x.setAttribute('aria-selected',x===b)});cb(k)};el.appendChild(b)});el.firstChild.click()}
var ROT=[-1.6,1.2,-.8,1.6];
function evCard(x,n){var e=x.e,p=isPast(e),full=e.seatsLeft===0,d=pd(e.date),w=wa('Здравствуйте! '+(full?'Хочу в лист ожидания: «':'Хочу записаться: «')+e.title+'», '+when(e));
 var kind=[e.type,(e.audience||'').toLowerCase()].filter(function(v){return v}).join(', ');
 var seats=p?'':(full?'<small>мест нет</small>':(e.seatsLeft<=3?'<small>осталось '+e.seatsLeft+'</small>':''));
 return '<article class="rc rv'+(p?' past':'')+'" style="--r:'+ROT[n%4]+'deg;--d:'+n*.12+'s" data-k="e" data-i="'+x.i+'"><i class="pin"></i>'+fig(e,'<div class="ds"><b>'+d.getDate()+'</b><span>'+MON[d.getMonth()].slice(0,3)+'</span></div><span class="fb">'+e.format+'</span>')+'<div class="rb"><small>'+kind+'</small><h3>'+e.title+' <span class="e1">'+e.emoji+'</span></h3><p>'+e.desc+'</p>'+(tf(e)?'<div class="tgs">'+tf(e).map(function(x){return '<span>'+x.duration+' · '+pn(x.price)+'</span>'}).join('')+'</div>':'')+'<div class="pf"><span class="pt">'+priceTxt(e)+'</span>'+seats+'</div><div class="row"><button class="btn ghost sm" type="button">Подробнее</button>'+(p?'':(tf(e)?'<button class="btn sm" type="button">Выбрать тариф</button>':'<a class="btn sm" href="'+w+'" target="_blank" rel="noopener">'+(full?'Лист ожидания':'Записаться')+'</a>'))+'</div></div></article>'}
var el=["Ближайшие"];Object.keys(TYPES).forEach(function(t){if(EVENTS.some(function(e){return e.type===t&&!isPast(e)}))el.push(TYPES[t])});["Очно","Онлайн"].forEach(function(f){if(EVENTS.some(function(e){return e.format===f&&!isPast(e)}))el.push(f)});if(EVENTS.some(isPast))el.push("Архив");
tabs($('et'),el,function(k){var l=EVENTS.map(function(e,i){return{e:e,i:i}}).filter(function(x){var p=isPast(x.e);return k==="Архив"?p:(!p&&(k==="Ближайшие"||TYPES[x.e.type]===k||x.e.format===k))}).sort(function(a,b){return pd(a.e.date)-pd(b.e.date)});fill($('ev'),l.length?l.map(evCard).join(''):'<p class="empty">Новые даты скоро появятся. Напишите мне, расскажу о ближайших.</p>')});
var cl=["Все"];CAKES.forEach(function(c){if(cl.indexOf(c.cat)<0)cl.push(c.cat)});
tabs($('ct'),cl,function(k){var h='',n=0;CAKES.forEach(function(c,i){if(k!=="Все"&&c.cat!==k)return;h+='<article class="ck rv" style="--d:'+(n++)*.1+'s" data-k="c" data-i="'+i+'">'+fig(c)+'<div class="cb"><h3>'+c.name+'</h3><p>'+c.short+'</p><div class="pf"><span class="pt">'+c.price+'</span><small>'+c.weight+'</small></div><div class="row"><button class="btn ghost sm" type="button">Подробнее</button><a class="btn sm" href="'+wa('Здравствуйте! Хочу заказать торт «'+c.name+'»')+'" target="_blank" rel="noopener">Хочу такой</a></div></div></article>'});fill($('ck'),h)});
function open1(o,chip,body){var p=o.photos;dlg.innerHTML='<div class="dg"><div><div class="main" style="background:'+o.bg+'">'+ill(o.ill)+(p.length?'<img id="mi" src="'+p[0]+'" alt="" onerror="this.remove()">':'')+'</div>'+(p.length>1?'<div class="th">'+p.map(function(s,j){return '<button type="button" data-j="'+j+'" aria-label="Фото '+(j+1)+'"'+(j?'':' aria-current="true"')+'><img src="'+s+'" alt=""></button>'}).join('')+'</div>':'')+'</div><div class="dd"><button class="x" type="button" aria-label="Закрыть" data-x>✕</button><span class="chip">'+chip+'</span>'+body+'</div></div>';dlg.showModal();dlg.scrollTop=0}
function fc(i,t,id){return '<li><svg class="ico"><use href="#'+i+'"/></svg><span'+(id?' id="'+id+'"':'')+'>'+t+'</span></li>'}
function eMsg(e,x){return 'Здравствуйте! '+(e.seatsLeft===0?'Хочу в лист ожидания: «':'Хочу записаться: «')+e.title+'», '+when(e)+(x?', формат: '+x.name+' ('+x.duration+', '+x.price+')':'')}
function tfBlock(e){var t=tf(e);return t?'<h4>Выберите формат</h4><div class="tfs" role="radiogroup" aria-label="Тариф">'+t.map(function(x,j){return '<button type="button" class="tf'+(j===curT?' on':'')+'" role="radio" aria-checked="'+(j===curT)+'" data-t="'+j+'">'+(x.hit?'<em class="tf-hit">'+x.hit+'</em>':'')+'<i class="ck2"></i><b class="tf-n">'+x.name+'</b><span class="tf-s"><svg class="ico"><use href="#i-clk"/></svg>'+x.duration+'</span><span class="tf-p">'+x.price+'</span><span class="tf-d">'+(x.desc||'')+'</span></button>'}).join('')+'</div>':''}
function applyT(){var e=EVENTS[curE],t=tf(e);if(!t)return;var x=t[curT];
 [].forEach.call(dlg.querySelectorAll('.tf'),function(b,j){b.classList.toggle('on',j===curT);b.setAttribute('aria-checked',j===curT)});
 $('e-price').textContent='Стоимость: '+x.price;$('e-dur').textContent=x.duration;
 var inc=x.includes||e.includes||[];$('e-inc').innerHTML=inc.length?'<h4>Что входит</h4><ul>'+inc.map(li).join('')+'</ul>':'';
 var c=$('e-cta');if(c){c.href=wa(eMsg(e,x));c.textContent=(e.seatsLeft===0?'Лист ожидания':'Записаться')+' · '+x.price}}
function openE(n){var e=EVENTS[n],p=isPast(e),full=e.seatsLeft===0,t=tf(e);curE=n;curT=0;if(t)t.forEach(function(x,j){if(x.hit&&!curT)curT=j});var x=t?t[curT]:null;
 var inc=x?(x.includes||e.includes||[]):(e.includes||[]);
 open1(e,e.type+(e.audience?', '+e.audience.toLowerCase():''),'<h3>'+e.title+' '+e.emoji+'</h3><ul class="fc">'+fc('i-cal',when(e))+((x||e.duration)?fc('i-clk',x?x.duration:e.duration,'e-dur'):'')+fc('i-pin',e.place+', '+e.format.toLowerCase())+fc('i-ht','Стоимость: '+(x?x.price:e.price),'e-price')+(e.seats?fc('i-aw','Мест: '+e.seats+(typeof e.seatsLeft==='number'?', осталось '+e.seatsLeft:'')):'')+'</ul><p>'+(e.details||e.desc)+'</p>'+tfBlock(e)+(e.program&&e.program.length?'<h4>Программа</h4><ul>'+e.program.map(li).join('')+'</ul>':'')+'<div id="e-inc">'+(inc.length?'<h4>Что входит</h4><ul>'+inc.map(li).join('')+'</ul>':'')+'</div><div class="row" style="margin-top:24px">'+(p?'':'<a class="btn" id="e-cta" href="'+wa(eMsg(e,x))+'" target="_blank" rel="noopener">'+(full?'Лист ожидания':'Записаться')+(x?' · '+x.price:'')+'</a>')+(e.tg?'<a class="btn ghost" href="'+e.tg+'" target="_blank" rel="noopener">Пост в Telegram</a>':'')+'</div>')}
function openC(n){var c=CAKES[n];
 open1(c,c.cat,'<h3>'+c.name+'</h3><p style="color:var(--cocoa);font-weight:800;margin-bottom:8px">'+c.price+', '+c.weight+'</p><p>'+c.taste+'</p><h4>Состав и начинка</h4><ul>'+c.ingredients.map(li).join('')+'</ul><h4>Как я делаю</h4><p>'+c.recipe+'</p><p style="margin:16px 0;font-size:.9rem">'+c.notice+' Об аллергиях сообщайте при заказе.</p><a class="btn" href="'+wa('Здравствуйте! Хочу заказать торт «'+c.name+'»')+'" target="_blank" rel="noopener">Хочу такой</a>')}
document.addEventListener('click',function(ev){var a=ev.target.closest('[data-k]');if(a&&!ev.target.closest('a')){a.dataset.k==='e'?openE(+a.dataset.i):openC(+a.dataset.i)}});
dlg.addEventListener('click',function(ev){var tt=ev.target.closest('[data-t]');if(tt){curT=+tt.dataset.t;applyT();return}if(ev.target===dlg||ev.target.closest('[data-x]')){dlg.close();return}var t=ev.target.closest('[data-j]');if(t){var m=$('mi');if(m)m.src=t.querySelector('img').src;[].forEach.call(dlg.querySelectorAll('[data-j]'),function(b){b.setAttribute('aria-current',b===t)})}});
/* работы: галерея с крупным просмотром */
var AR=[1,1.28,.82,1.12,1.34,.9,1.2,.96],wl=["Все"],wCur=[],wShown=0,PAGE=9,lb=$('lb'),lbPos=0;
GALLERY.forEach(function(g){if(wl.indexOf(g.cat)<0)wl.push(g.cat)});
function wTile(i,n){var g=GALLERY[i],pic=g.t==='video'?g.poster:g.src;
 return '<button class="wi rv" type="button" style="--d:'+n*.07+'s" data-w="'+i+'" aria-label="'+g.title+(g.t==='video'?', видео':'')+'"><div class="fig" style="background:'+g.bg+';aspect-ratio:1/'+AR[i%8]+'">'+ill(g.ill)+(pic?'<img src="'+pic+'" alt="'+g.title+'" loading="lazy" onerror="this.remove()">':'')+'</div>'+(g.t==='video'?'<div class="pb"><span><svg class="ico"><use href="#i-play"/></svg></span></div>':'')+'<span class="wcap">'+g.title+'</span></button>'}
function wMore(){var h='';wCur.slice(wShown,wShown+PAGE).forEach(function(i,n){h+=wTile(i,n)});wShown+=PAGE;$('wg').insertAdjacentHTML('beforeend',h);watch($('wg'));$('wm').parentNode.style.display=wShown<wCur.length?'':'none'}
tabs($('wt'),wl,function(k){wCur=[];GALLERY.forEach(function(g,i){if(k==="Все"||g.cat===k)wCur.push(i)});wShown=0;$('wg').innerHTML='';wMore()});
$('wm').onclick=wMore;
function lbShow(){var g=GALLERY[wCur[lbPos]],media=g.t==='video'?(g.src?'<video src="'+g.src+'"'+(g.poster?' poster="'+g.poster+'"':'')+' controls autoplay playsinline onerror="this.remove()"></video>':''):(g.src?'<img src="'+g.src+'" alt="'+g.title+'" onerror="this.remove()">':'');
 $('lbm').innerHTML='<div class="lbf" style="background:'+g.bg+'">'+ill(g.ill)+media+'</div>';$('lbc').textContent=g.title+(g.t==='video'?' (видео)':'');$('lbn').textContent=(lbPos+1)+' из '+wCur.length}
function lbGo(s){lbPos=(lbPos+s+wCur.length)%wCur.length;lbShow()}
document.addEventListener('click',function(ev){var b=ev.target.closest('[data-w]');if(b){lbPos=wCur.indexOf(+b.dataset.w);lbShow();lb.showModal()}});
$('lbp').onclick=function(){lbGo(-1)};$('lbnx').onclick=function(){lbGo(1)};$('lbx').onclick=function(){lb.close()};
lb.addEventListener('click',function(ev){if(ev.target===lb)lb.close()});
lb.addEventListener('close',function(){$('lbm').innerHTML=''});
addEventListener('keydown',function(ev){if(!lb.open)return;if(ev.key==='ArrowLeft')lbGo(-1);if(ev.key==='ArrowRight')lbGo(1)});
/* отзывы-стикеры */
var NB=['#F6D58E','#F4C6CB','#DDE7C7'],NR=[-2.2,1.6,-1];
$('rg').innerHTML=REVIEWS.map(function(r,i){return '<figure class="nt rv" style="--bg:'+NB[i%3]+';--r:'+NR[i%3]+'deg;--d:'+i*.15+'s"><blockquote>«'+r[0]+'»</blockquote><figcaption>'+r[1]+'</figcaption></figure>'}).join('');
$('yr').textContent=new Date().getFullYear();
/* посыпка в первом экране */
(function(){var c=['#C43B55','#F4C6CB','#F6D58E','#8FA56E','#fff'],h='';for(var i=0;i<22;i++){h+='<i class="sp" style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+c[i%5]+';animation-duration:'+(7+Math.random()*7).toFixed(1)+'s;animation-delay:-'+(Math.random()*14).toFixed(1)+'s;opacity:'+(.5+Math.random()*.4).toFixed(2)+'"></i>'}$('spr').innerHTML=h})();
watch();
var hd=$('hd');addEventListener('scroll',function(){hd.classList.toggle('s',scrollY>30)},{passive:true});
