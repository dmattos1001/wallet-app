const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  const tableHeader = document.createElement("tr");

  const titleText = document.createTextNode("Título");
  const titleElement = document.createElement("th");
  titleElement.appendChild(titleText);
  tableHeader.appendChild(titleElement);

  const categoryText = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th");
  categoryElement.appendChild(categoryText);
  tableHeader.appendChild(categoryElement);

  const dateText = document.createTextNode("Data");
  const dateElement = document.createElement("th");
  dateElement.appendChild(dateText);
  tableHeader.appendChild(dateElement);

  const valueText = document.createTextNode("Valor");
  const valueElement = document.createElement("th");
  valueElement.className = "center";
  valueElement.appendChild(valueText);
  tableHeader.appendChild(valueElement);

  const actionText = document.createTextNode("Ação");
  const actionElement = document.createElement("th");
  actionElement.className = "right";
  actionElement.appendChild(actionText);
  tableHeader.appendChild(actionElement);

  table.appendChild(tableHeader);

  data.map((item) => {
    const tableRow = document.createElement("tr");

    // title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    // category
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    // date
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    // value
    const valueTd = document.createElement("td");
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
      format(item.value)
    );
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    // delete
    const deleteTd = document.createElement("td");
    const deleteText = document.createTextNode("Deletar");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    // table add table row
    table.appendChild(tableRow);
  });
  /*  <td>Item1</td>
  <td>Item1</td>
  <td>Item1</td>
  <td class="center">Item1</td>
  <td class="right">Item1</td>
</tr>/ */
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  //render total items
  const financeCard1 = document.getElementById("finance-card-1");
  financeCard1.innerHTML = "";
  const totalSubText = document.createTextNode("Total de lançamentos");
  const totalSubTextElement = document.createElement("h3");
  totalSubTextElement.appendChild(totalSubText);
  financeCard1.appendChild(totalSubTextElement);
  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenueSubText = document.createTextNode("Receitas");
  const revenueSubTextElement = document.createElement("h3");
  revenueSubTextElement.appendChild(revenueSubText);
  financeCard2.appendChild(revenueSubTextElement);

  const revenueText = document.createTextNode(Number(revenues));
  const renevueTextElement = document.createElement("h1");
  renevueTextElement.appendChild(revenueText);
  financeCard2.appendChild(renevueTextElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  financeCard3.innerHTML = "";

  const expensesSubText = document.createTextNode("Despesas");
  const expensesSubTextElement = document.createElement("h3");
  expensesSubTextElement.appendChild(expensesSubText);
  financeCard3.appendChild(expensesSubTextElement);

  const expensesText = document.createTextNode(Number(expenses));
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  // render balance
  const financeCard4 = document.getElementById("finance-card-4");
  financeCard4.innerHTML = "";

  const balanceSubText = document.createTextNode("Balanço");
  const balanceSubTextElement = document.createElement("h3");
  balanceSubTextElement.appendChild(balanceSubText);
  financeCard4.appendChild(balanceSubTextElement);

  const balanceText = document.createTextNode(Number(totalValue));
  const balanceTextElement = document.createElement("h1");
  balanceTextElement.style.color = "#5936cd";
  balanceTextElement.appendChild(balanceText);
  financeCard4.appendChild(balanceTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navBarUserInfo = document.getElementById("nav-bar-user-container");
  const navBarUserAvatar = document.getElementById("nav-bar-user-avatar");

  // add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navBarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navBarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navBarUserAvatar.appendChild(nameElement);
};

const OnLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
    const response = await fetch(
      "https://mp-wallet-app-api.herokuapp.com/categories"
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.appendChild(categoryText);
      option.id = `category_${category.id}`;
      option.value = category.id;
      categoriesSelect.append(option);
    });
  } catch (error) {
    alert("erro ao carregar");
  }
};

const onOpenModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");

    const response = fetch("https://mp-wallet-app-api.herokuapp.com/finances", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
      body: JSON.stringify(data),
    });

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao adicionar novo dado financeiro");
      return;
    }
    onCloseModal();
    onLoadFinancesData();
  } catch (error) {
    alert("Erro ao adicionar novo dado financeiro");
  }
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
  OnLoadCategories();

  const form = document.getElementById("form-finance-release");
  form.onsubmit = (event) => {
    event.preventDefault();

    onCreateFinanceRelease(event.target);
  };
};
