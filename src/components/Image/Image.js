import testImage from "./test.png";
import "./Image.scss";

const Image = () => {
    const img = document.createElement("img");
    img.alt = "test";
    img.src = testImage;
    img.classList.add("image-component")

    const body = document.querySelector("body");
    body.appendChild(img);
};

export default Image;