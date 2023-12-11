const pages = [
  { name: "Главная", link: "index.html" },
  { name: "Портфолио", link: "portfolio.html" },
  { name: "Резюме", link: "resume.html" },
  { name: "Обо мне", link: "about.html" },
  { name: "Контакты", link: "contact.html" },
];

const socials = [
  { img: "./assets/telegram.svg", link: "tg://resolve?domain=HamzinRenat" },
  { img: "./assets/mail.svg", link: "mailto:rxxxx.xxxxxx@mail.ru" },
];

const renderNavigation = () => {
  const navigationContainer = document.getElementById("navigation");

  pages.forEach(({ name, link }) => {
    const element = document.createElement("a");
    element.href = link;
    element.className = "navigation__item";
    element.innerHTML = name;

    navigationContainer.append(element);
  });
};

const renderSocials = () => {
  const socialContainer = document.createElement("div");
  socialContainer.className = "social";

  socials.forEach(({ img, link }) => {
    const element = document.createElement("a");
    element.href = link;
    element.className = "social__link";

    const image = document.createElement("img");
    image.setAttribute("height", "20px");
    image.setAttribute("src", img);

    element.append(image);
    socialContainer.append(element);
  });

  document.body.append(socialContainer);
};

renderNavigation();
renderSocials();
