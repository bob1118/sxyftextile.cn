// 自动插入footer年份
function setCopyrightYear(lang) {
	const year = new Date().getFullYear();
	const el = document.getElementById('copyright-year');
	if (el) {
		el.textContent = el.getAttribute(lang === 'zh' ? 'data-zh' : 'data-en') + ' 2021-' + year;
	}
}

// 页面导航切换
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
navLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();
		navLinks.forEach(l => l.classList.remove('active'));
		link.classList.add('active');
		const sectionId = link.getAttribute('data-section');
		sections.forEach(sec => {
			sec.classList.remove('active');
			if (sec.id === sectionId) sec.classList.add('active');
		});
	});
});

// 语言切换
const langBtns = document.querySelectorAll('.lang-btn');
function setLang(lang) {
	document.documentElement.lang = lang;
	langBtns.forEach(btn => btn.classList.remove('active'));
	document.getElementById('lang-' + lang).classList.add('active');
	// 切换所有带data-zh、data-en的内容
	document.querySelectorAll('[data-zh][data-en]').forEach(el => {
		el.textContent = el.getAttribute(lang === 'zh' ? 'data-zh' : 'data-en');
	});
	setCopyrightYear(lang);
}
langBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		setLang(btn.id === 'lang-zh' ? 'zh' : 'en');
	});
});

// 根据浏览器语言自动切换
window.addEventListener('DOMContentLoaded', () => {
	let browserLang = navigator.language || navigator.userLanguage;
	if (browserLang.startsWith('zh')) {
		setLang('zh');
	} else {
		setLang('en');
	}
});

// 首页轮播
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let carouselIndex = 0;
function showCarousel(idx) {
	carouselItems.forEach((item, i) => {
		item.classList.toggle('active', i === idx);
	});
}
prevBtn.addEventListener('click', () => {
	carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
	showCarousel(carouselIndex);
});
nextBtn.addEventListener('click', () => {
	carouselIndex = (carouselIndex + 1) % carouselItems.length;
	showCarousel(carouselIndex);
});
setInterval(() => {
	carouselIndex = (carouselIndex + 1) % carouselItems.length;
	showCarousel(carouselIndex);
}, 4000);

// 产品图片弹窗
const modal = document.getElementById('img-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.modal .close');
document.querySelectorAll('.fabric-thumb').forEach(img => {
	img.addEventListener('click', () => {
		modal.classList.add('show');
		modalImg.src = img.getAttribute('data-full');
		modalImg.alt = img.alt;
	});
});
closeModal.addEventListener('click', () => {
	modal.classList.remove('show');
	modalImg.src = '';
});
modal.addEventListener('click', e => {
	if (e.target === modal) {
		modal.classList.remove('show');
		modalImg.src = '';
	}
});
