document.addEventListener("DOMContentLoaded", () => {
  chrome.management.getAll(extensions => {
    const extensionsList = document.getElementById("extensionsList");
    extensions.forEach(extension => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = extension.id;
      checkbox.checked = extension.enabled;
      const label = document.createElement("label");
      label.htmlFor = extension.id;
      label.textContent = extension.name;
      extensionsList.appendChild(checkbox);
      extensionsList.appendChild(label);
      checkbox.addEventListener("change", () => {
        chrome.runtime.sendMessage({
          type: "toggle",
          extensionId: extension.id,
          enabled: checkbox.checked
        }, response => {
          if (!response.success) {
            checkbox.checked = !checkbox.checked;
          }
        });
      });
    });
  });
});
