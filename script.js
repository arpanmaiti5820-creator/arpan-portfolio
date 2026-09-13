const navbar=document.querySelector(".navbar");
const navlinks=document.querySelector(".nav-links");
const hero=document.querySelector("#home");
const about=document.querySelector("#about");

const skills=document.querySelector("#skills");
const contact=document.querySelector("#contact");
const menutoggle=document.querySelector(".menu-toggle");
const navItem=document.querySelectorAll(".nav-links a");
const education = document.querySelector("#education");
const certifications = document.querySelector("#certifications");
const revealElements = document.querySelectorAll(".reveal");
const backToTop = document.querySelector("#backToTop");
const year = document.querySelector("#year");
const projects = document.querySelector("#projects");
const experience = document.querySelector("#experience");

year.textContent = new Date().getFullYear();

menutoggle.addEventListener("click", function(){
    navlinks.classList.toggle("active");
});

navItem.forEach(function(item){
    item.addEventListener(  "click", function(){
        navlinks.classList.remove("active");
    });
});

 window.addEventListener("scroll", function(){
    const position=hero.getBoundingClientRect();
    const sections = [hero, about, skills, education, projects, certifications, experience, contact];
    sections.forEach(function(section) {
    const position = section.getBoundingClientRect();
        if (position.top <= 100 && position.bottom >=100) {
            const sectionId = section.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            navItem.forEach(function(item) {
                item.classList.remove("active");
            });
            navLink.classList.add("active");    
        }
    });
 })
const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            entry.target.classList.add("show");
        }
    });
});
revealElements.forEach(function(element){

    observer.observe(element);

});

window.addEventListener("scroll", function(){
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    }
    else{
         backToTop.classList.remove("show");

    }
});

backToTop.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})