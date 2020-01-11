import testImage from "./test.png";

const addImage = () => {
    const img = document.createElement("img");
    img.alt = "test";
    img.width = 300;
    img.src = testImage;

    const body = document.querySelector("body");
    body.appendChild(img);
};

export default addImage;