export function handlePointerOverIn(type = "pointer") {
  // console.log("in");
  document.body.style.cursor = type;
}
export function handlePointerOverOut() {
  document.body.style.cursor = "auto";
}
