class Formater {
  constructor() {
    this.currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    this.periodFormatter = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
    });

    this.dateFormatter = new Intl.DateTimeFormat("pt-BR");
  }

  currency(value) {
    return this.currencyFormatter.format(value);
  }

  period({ month, year }) {
    return this.periodFormatter.format(new Date(year, month - 1));
  }

  date(dateString) {
    const [year, month, day] = dateString.split("-");
    return this.dateFormatter.format(new Date(year, month, day));
  }
}

export default new Formater();
