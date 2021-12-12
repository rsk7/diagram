export default async function SvgToImageService(
  svg: HTMLElement
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const { width, height } = svg.getBoundingClientRect();
    const blob = new Blob([svg.outerHTML], {
      type: "image/svg+xml;charset=utf-8"
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = (e) => {
      const dataUrl = reader.result;
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(image, 0, 0, width, height);
          resolve(canvas.toDataURL());
        } catch (err) {
          reject(err);
        }
      };
      image.src = dataUrl + "";
    };
  });
}
