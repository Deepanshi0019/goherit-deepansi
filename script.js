document.addEventListener('DOMContentLoaded', function(){
	console.log('GOHERIT Website Loaded');

	// Smooth internal link scrolling
	document.querySelectorAll('a[href^="#"]').forEach(function(link){
		link.addEventListener('click', function(e){
			const target = document.querySelector(this.getAttribute('href'));
			if(target){
				e.preventDefault();
				target.scrollIntoView({behavior:'smooth', block:'start'});
			}
		});
	});

	// Reveal-on-scroll for a set of elements
	const revealObserver = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if(entry.isIntersecting){
				entry.target.classList.add('in-view');
				obs.unobserve(entry.target);
			}
		});
	},{threshold:0.12});

	// Observe a broad set of targets and any element already marked with `.reveal`
	const revealSelector = '.reveal, .card, .section-title, .hero h1, .hero h2, .hero p, .contact-box, .form, .form-card, .badge, .btn, .contact-left, .contact-right';
	document.querySelectorAll(revealSelector).forEach(el => {
		if(!el.classList.contains('reveal')) el.classList.add('reveal');
		revealObserver.observe(el);
	});

	// Header tint when hero scrolls out
	const header = document.querySelector('header');
	const hero = document.querySelector('.hero');
	if(header && hero){
		const headerObserver = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if(!e.isIntersecting){
					header.style.background = 'linear-gradient(180deg, rgba(2,8,23,0.45), rgba(2,8,23,0.25))';
					header.style.boxShadow = '0 6px 30px rgba(2,8,23,0.6)';
				} else {
					header.style.background = 'transparent';
					header.style.boxShadow = 'none';
				}
			});
		},{threshold:0.02});
		headerObserver.observe(hero);
	}

});