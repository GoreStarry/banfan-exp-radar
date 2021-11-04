const label = "SAVED_LABEL_DATA";

export function saveLabelToLocalStorage(data) {
  localStorage.setItem(
    label,
    JSON.stringify(
      data.map(({ name }, index) => {
        return {
          name,
          value: 2,
        };
      })
    )
  );
}

export function getLabelFromLocalStorage() {
  return JSON.parse(localStorage.getItem(label));
}

const name_key = "USER_NAME";

export function saveUserName(name) {
  return localStorage.setItem(name_key, name);
}

export function getUserName() {
  return localStorage.getItem(name_key) || "";
}
