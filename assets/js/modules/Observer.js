import { each } from 'underscore';

const options = {
  rootMargin:"-20% 0%"
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			if(entry.target.classList.contains('js-inview--andchildren')){
				entry.target.querySelectorAll('.js-inview-child').forEach(element => {
					element.classList.add('is-visible');
				});
				entry.target.classList.add('is-visible');
			}else if(entry.target.classList.contains('js-inview--haschildren')){
				entry.target.querySelectorAll('.js-inview-child').forEach(element => {
					element.classList.add('is-visible');
				});
			}else{
				entry.target.classList.add('is-visible');
			}

			//unobserve
			if(entry.target.classList.contains('js-inview--toggle')){
			}else{
				observer.unobserve(entry.target);
			}
		} else {
			if(entry.target.classList.contains('js-inview--toggle')){
				entry.target.classList.remove('is-visible');
			}
		}
	})
},options)

/* Set：IntersectionObserver
--------------------------------------------------------------------------*/
export const setIntersectionObserver = (targetList) => {
	each(targetList,(target) => {
		observer.observe(target);
	})
}