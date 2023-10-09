class baliseSpeciale extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `<div class="compteur">Il reste <span class="countdown"></span> avant le partiel de M.Lehmann</div>`;
    let styles = document.createElement("link");
    styles.setAttribute("rel", "stylesheet");
    styles.setAttribute("href", "style.css");
    this.shadow.appendChild(styles);

    // Définir la date précise de fin du compte à rebours (par exemple, le 1er janvier 2024 à 15h30)
    this.endDate = new Date(Date.UTC(2023, 9, 10, 10, 10));

    // Appeler la fonction updateCountdown pour mettre en place le compte à rebours
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const currentDate = new Date();
    const timeDifference = this.endDate - currentDate;

    // Calculer les minutes et les secondes restantes
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const countdownElement = this.shadow.querySelector(".countdown");
    countdownElement.textContent = `${hours} heures ${minutes} minutes ${seconds} secondes`;

    if (timeDifference <= 0) {
      clearInterval(this.interval);
      countdownElement.textContent = "Temps écoulé !";
    }
  }
}
customElements.define("balise-speciale", baliseSpeciale);
