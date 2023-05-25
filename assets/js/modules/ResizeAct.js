import _, { defer,each } from 'underscore';

const App = {
	width: null,
	breakpoint: 768-0.02,
	mode: '',// PC or SP
	resizeTimer: null, // Interval
	pw: 0,
	gap: 0,
	swiperCatalog: null,
	swiperCollection: null,
	swiperPict: null,
};

/* resize時にアニメーションを一時的にoff. → Androidで不具合あり??
--------------------------------------------------------------------*/
const ResizeAnimationStop = () => {
	document.body.classList.add('resize-animation-stopper');
	clearTimeout(App.resizeTimer);
	App.resizeTimer = setTimeout( () =>{
		document.body.classList.remove('resize-animation-stopper');
	}, 400);
}

export const ResizeAct = () => {


	/* get info.
	--------------------------------------------------------------------*/
	App.width = document.documentElement.clientWidth;
	document.documentElement.style.setProperty('--w', `${App.width}px`);


	/* rope : header margin adjust.
	--------------------------------------------------------------------*/
	//document.documentElement.style.setProperty('--gh', `${document.getElementById('js-globalHeader').clientHeight}px`);


	/* responsive chk.
	--------------------------------------------------------------------*/
	if(App.width <= App.breakpoint){
		if(App.mode != 'SP'){
			App.mode = 'SP';
			ResizeAnimationStop();
			// if(document.body.dataset.page!='index'){
			// }
		}
	}else{
		if(App.mode != 'PC'){
			App.mode = 'PC';
			ResizeAnimationStop();
			// if(document.body.dataset.page!='index'){
			// }
		}
	}
}