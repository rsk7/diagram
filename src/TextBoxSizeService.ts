export function getSize(
  text: string,
  fontSize: number,
  maxWidth: number,
  minWidth: number
) {
  const renderDiv = document.createElement("div");
  renderDiv.innerText = text;
  renderDiv.style.position = "absolute";
  renderDiv.style.fontSize = `${fontSize}px`;
  renderDiv.style.display = "block";
  renderDiv.style.minWidth = `${minWidth}px`;
  renderDiv.style.maxWidth = `${maxWidth}px`;
  renderDiv.style.padding = "5px";
  document.getElementsByTagName("body")[0].appendChild(renderDiv);
  const result = {
    height: renderDiv.clientHeight + 1,
    width: renderDiv.clientWidth + 1
  };
  renderDiv.remove();
  return result;
}
