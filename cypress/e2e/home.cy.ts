describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.wait(1000);
  });

  it("should render the header component", () => {
    cy.get('header[role="banner"]').should("be.visible");

    cy.get('header[role="banner"]').contains("Carlos Jr.").should("be.visible");

    cy.get('button[data-testid="toggle-theme"]').should("be.visible");
  });

  it("should render the filters component", () => {
    cy.contains("h3", "Lista").should("be.visible");

    cy.contains("Rastreados").should("be.visible");
    cy.contains("Outros").should("be.visible");

    cy.get('input[placeholder="Buscar por placa ou frota"]').should("be.visible");

    cy.get('input[placeholder="Buscar por placa ou frota"]')
      .parent()
      .find("button")
      .should("be.visible");
  });

  it("should render the vehicle map component", () => {
    cy.contains("h3", "Mapa rastreador").should("be.visible");

    cy.get("div.rounded-2xl.overflow-hidden").should("be.visible");
  });

  it("should render the vehicle table component", () => {
    cy.contains("th", "Placa").should("be.visible");
    cy.contains("th", "Frota").should("be.visible");
    cy.contains("th", "Tipo").should("be.visible");
    cy.contains("th", "Modelo").should("be.visible");
    cy.contains("th", "Status").should("be.visible");

    cy.wait(1000);

    cy.get("body").then(($body) => {
      if ($body.find("tbody tr").length > 0) {
        cy.get("tbody tr").should("have.length.at.least", 1);
      } else {
        cy.contains("Nenhum veículo encontrado").should("be.visible");
      }
    });
  });

  it("should toggle between tracked and other vehicles", () => {
    cy.contains("Outros").click();

    cy.contains("Outros").should("have.attr", "data-state", "on");
    cy.contains("Rastreados").should("have.attr", "data-state", "off");

    cy.contains("Rastreados").click();

    cy.contains("Rastreados").should("have.attr", "data-state", "on");
    cy.contains("Outros").should("have.attr", "data-state", "off");
  });

  it("should search for vehicles", () => {
    const searchTerm = "ABC123";
    cy.get('input[placeholder="Buscar por placa ou frota"]').type(searchTerm);

    cy.get('input[placeholder="Buscar por placa ou frota"]').parent().find("button").click();

    cy.wait(1000);

    cy.get("body").then(($body) => {
      if ($body.find("tbody tr").length > 0) {
        // If results exist, they should contain the search term
        cy.get("tbody").contains(searchTerm).should("be.visible");
      } else {
        cy.contains("Nenhum veículo encontrado").should("be.visible");
      }
    });

    cy.get('input[placeholder="Buscar por placa ou frota"]').parent().find("button").click();

    cy.get('input[placeholder="Buscar por placa ou frota"]').should("have.value", "");
  });

  it("should handle theme toggle to dark", () => {
    cy.get('button[data-testid="toggle-theme"]').click();

    cy.contains("Dark").should("be.visible");

    cy.get('[data-testid="theme-dark"]').click();

    cy.get("html").should("have.class", "dark");
  });

  it("should handle theme toggle to light", () => {
    cy.get('button[data-testid="toggle-theme"]').click();
    cy.get('[data-testid="theme-dark"]').click();
    cy.get("html").should("have.class", "dark");

    cy.wait(500);

    cy.get('button[data-testid="toggle-theme"]').click();

    cy.wait(500);

    cy.get('[data-testid="theme-light"]').should("be.visible").click();

    cy.get("html").should("not.have.class", "dark");
  });

  it("should identify API endpoints", () => {
    cy.intercept("**/*").as("allRequests");

    cy.visit("/");

    cy.wait(5000);

    cy.get("@allRequests.all").then((requests) => {
      const urls = requests.map((req: any) => req.request.url);
      console.log("All requests:", urls);

      const vehicleRequests = requests.filter(
        (req: any) =>
          req.request.url.toLowerCase().includes("vehicle") ||
          req.request.url.toLowerCase().includes("car") ||
          req.request.url.toLowerCase().includes("track"),
      );

      console.log(
        "Possible vehicle-related requests:",
        vehicleRequests.map((req: any) => req.request.url),
      );
    });
  });
});
