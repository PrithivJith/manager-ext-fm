let data;
async function load() {
  const response = await fetch("./data.json");
  data = await response.json();
  const container = document.getElementById("extension-container");
  data.forEach((ext) => {
    container.appendChild(createExtension(ext));
  });
  const all = document.getElementById("all");
  const active = document.getElementById("active");
  const inactive = document.getElementById("inactive");
  [all, active, inactive].forEach((element) => {
    element.onchange = filter;
  });
  const theme = document.getElementById("theme-button");
  theme.onclick = toggle;
}
function toggle(e) {
  if (document.getElementsByTagName("body")[0].className === "darkmode") {
    document.getElementsByTagName("body")[0].className = "";
    document.getElementById("logo").src = "./assets/images/logo.svg";
    document.getElementById("themeimg").src = "./assets/images/icon-moon.svg";
  } else {
    document.getElementsByTagName("body")[0].className = "darkmode";
    document.getElementById("logo").src = "./assets/images/dark.svg";

    document.getElementById("themeimg").src = "./assets/images/icon-sun.svg";
  }
}
function filter(e) {
  const newContainer = document.createElement("div");
  newContainer.id = "extension-container";
  if (e.target.value === "Active") {
    data.forEach((ext) => {
      if (ext.isActive) {
        newContainer.appendChild(createExtension(ext));
      }
    });
  } else if (e.target.value === "Inactive") {
    data.forEach((ext) => {
      if (!ext.isActive) {
        newContainer.appendChild(createExtension(ext));
      }
    });
  } else {
    data.forEach((ext) => {
      newContainer.appendChild(createExtension(ext));
    });
  }
  document.getElementById("extension-container").remove();
  document.getElementById("main").appendChild(newContainer);
}
function remove(e) {
  document.getElementById(e.target.id.slice(0, -1)).remove();
}
function createExtension({ logo, name, description, isActive }) {
  const extensionBox = document.createElement("div");
  extensionBox.className = "extension-box";
  extensionBox.id = name;
  const extensionContent = document.createElement("div");
  extensionContent.className = "extension-content";
  extensionBox.appendChild(extensionContent);
  const logoImg = document.createElement("img");
  logoImg.src = logo;
  logoImg.alt = "Extension Logo";
  extensionContent.appendChild(logoImg);
  const desc = document.createElement("div");
  desc.className = "desc";
  extensionContent.appendChild(desc);
  const title = document.createElement("h3");
  title.innerHTML = name;
  desc.appendChild(title);
  const text = document.createElement("p");
  text.innerHTML = description;
  desc.appendChild(text);
  const actions = document.createElement("div");
  actions.className = "actions";
  extensionBox.appendChild(actions);
  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
  removeButton.className = "remove-button";
  removeButton.id = name + "_";
  removeButton.onclick = remove;
  actions.appendChild(removeButton);
  const activeCheck = document.createElement("input");
  activeCheck.type = "checkbox";
  activeCheck.checked = isActive;
  actions.appendChild(activeCheck);
  return extensionBox;
}
load();
